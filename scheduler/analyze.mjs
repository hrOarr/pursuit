// Pursuit — daily analysis job (runs in GitHub Actions).
// 1) Maintenance: recompute each program's application window state (no API).
// 2) AI research: verify open/close dates, tuition, IELTS and requirements
//    against official sources via Claude + web search, and apply changes.
// Every applied change is logged (with its previous value) to analysis_log,
// so an auto-overwrite is always recoverable.

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL  = need("SUPABASE_URL");
const SUPABASE_KEY  = need("SUPABASE_SECRET_KEY");      // secret key — Action secret only
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY || ""; // optional; no key => maintenance only
const MODEL         = process.env.ANALYZE_MODEL || "claude-sonnet-5-5";

function need(k){ const v = process.env[k]; if(!v){ console.error("Missing env "+k); process.exit(1);} return v; }

const sb = createClient(SUPABASE_URL, SUPABASE_KEY, { auth:{ persistSession:false } });
const todayISO = new Date().toISOString();
const todayDate = todayISO.slice(0,10);

function daysLeft(d){ if(!d) return null; const t=new Date(d+"T00:00:00").getTime(); if(isNaN(t)) return null; const n=new Date(); n.setHours(0,0,0,0); return Math.round((t-n.getTime())/864e5); }
function windowState(p){
  const c = daysLeft(p.close_date);
  if(c==null) return "no_date";
  if(c<0) return "closed";
  if(c<=30) return "closing_soon";
  const o = daysLeft(p.open_date);
  return (o!=null && o>0) ? "upcoming" : "open";
}

function extractJsonArray(text){
  if(!text) return null;
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const body = fence ? fence[1] : text;
  const a = body.indexOf("["), b = body.lastIndexOf("]");
  if(a<0 || b<a) return null;
  try { return JSON.parse(body.slice(a, b+1)); } catch(e){ return null; }
}

async function researchCountry(country, list){
  if(!ANTHROPIC_KEY) return [];
  const brief = list.map(p=>({ id:p.id, university:p.name, program:p.program, degree:p.degree, intake:p.intake||"next 2027 intake" }));
  const user =
`You are verifying CURRENT graduate-admission facts for programs in ${country}. Use web search and prefer each university's own official admissions pages.
For every program below, find for its stated intake (2027 entry / next cycle):
- application OPEN date and CLOSE/deadline date as YYYY-MM-DD (the non-EU/international deadline when applicable),
- tuition (short string),
- IELTS overall requirement (short string),
- 4 to 8 concise admission requirements.
Programs: ${JSON.stringify(brief)}

Return ONLY a JSON array, no prose, each item:
{"id": "<the id>", "open_date": "YYYY-MM-DD|null", "close_date": "YYYY-MM-DD|null", "intake": "string|null", "tuition": "string|null", "ielts": "string|null", "requirements": ["..."]|null, "source": "<official url>|null", "confidence": "high|medium|low"}
Use null when unsure. Mark "high" ONLY when the value comes from the official university/admissions site for the correct intake.`;

  const body = {
    model: MODEL,
    max_tokens: 4096,
    system: "You verify facts and return strict JSON only. Never invent dates; use null when a source is not found.",
    tools: [{ type:"web_search_20250305", name:"web_search", max_uses:8 }],
    messages: [{ role:"user", content:user }]
  };
  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method:"POST",
    headers:{ "x-api-key":ANTHROPIC_KEY, "anthropic-version":"2023-06-01", "content-type":"application/json" },
    body: JSON.stringify(body)
  });
  if(!resp.ok){ const t=await resp.text(); throw new Error(`Anthropic ${resp.status}: ${t.slice(0,300)}`); }
  const data = await resp.json();
  const text = (data.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("\n");
  const arr = extractJsonArray(text);
  if(!Array.isArray(arr)) throw new Error("Could not parse model JSON for "+country);
  return arr;
}

// decide which fields to apply. Protect curated data: overwrite only when the
// model is confident, or when the current value is empty.
function buildPatch(p, r){
  const patch={}, before={};
  const conf = (r.confidence||"low").toLowerCase();
  const canReplace = (cur) => conf==="high" || cur==null || String(cur).trim()==="";
  const dateOK = (s) => typeof s==="string" && /^\d{4}-\d{2}-\d{2}$/.test(s);
  const strOK  = (s) => typeof s==="string" && s.trim()!=="";

  if(dateOK(r.open_date)  && r.open_date!==p.open_date   && canReplace(p.open_date)) { before.open_date=p.open_date; patch.open_date=r.open_date; }
  if(dateOK(r.close_date) && r.close_date!==p.close_date && canReplace(p.close_date)){ before.close_date=p.close_date; patch.close_date=r.close_date; }
  if(strOK(r.intake)   && r.intake!==p.intake     && canReplace(p.intake))  { before.intake=p.intake; patch.intake=r.intake; }
  if(strOK(r.tuition)  && r.tuition!==p.tuition    && canReplace(p.tuition)) { before.tuition=p.tuition; patch.tuition=r.tuition; }
  if(strOK(r.ielts)    && r.ielts!==p.ielts       && canReplace(p.ielts))   { before.ielts=p.ielts; patch.ielts=r.ielts; }
  if(Array.isArray(r.requirements) && r.requirements.length>=3 && conf!=="low"){
    const nu = JSON.stringify(r.requirements)!==JSON.stringify(p.requirements||[]);
    if(nu){ before.requirements=p.requirements||[]; patch.requirements=r.requirements.map(String).slice(0,10); }
  }
  return { patch, before, conf };
}

async function main(){
  const { data: programs, error } = await sb.from("programs").select("*");
  if(error) throw error;
  if(!programs || !programs.length){ console.log("No programs to analyze."); return; }

  const changes = [];
  const errors = [];

  // 1) maintenance (always)
  for(const p of programs){
    const ws = windowState(p);
    if(p.window_state !== ws){
      const { error:e } = await sb.from("programs").update({ window_state:ws, updated_at:todayISO }).eq("id", p.id);
      if(e) errors.push(`maint ${p.id}: ${e.message}`);
      else p.window_state = ws;
    }
  }

  // 2) AI research per country (if key present)
  if(ANTHROPIC_KEY){
    const byCountry = new Map();
    for(const p of programs){ const k=p.country||"Unknown"; (byCountry.get(k)||byCountry.set(k,[]).get(k)).push(p); }
    for(const [country, list] of byCountry){
      try{
        const results = await researchCountry(country, list);
        for(const r of results){
          const p = list.find(x=>x.id===r.id); if(!p) continue;
          const { patch, before, conf } = buildPatch(p, r);
          if(Object.keys(patch).length===0) continue;
          patch.last_analyzed = todayISO;
          if(r.source) patch.ai_source = String(r.source);
          if(conf==="high") patch.verify = false;
          patch.updated_at = todayISO;
          const { error:e } = await sb.from("programs").update(patch).eq("id", p.id);
          if(e){ errors.push(`update ${p.id}: ${e.message}`); continue; }
          await sb.from("analysis_log").insert({
            program_id:p.id, run_date:todayDate, fields:Object.keys(before),
            before, after:patch, source:r.source||null, confidence:conf, created_at:Date.now()
          });
          Object.assign(p, patch);
          changes.push({ id:p.id, name:p.name, fields:Object.keys(before) });
        }
      }catch(err){
        console.error("Country "+country+" failed:", err.message);
        errors.push(`${country}: ${err.message}`);
      }
    }
  } else {
    console.log("ANTHROPIC_API_KEY not set — maintenance only, skipping AI research.");
  }

  // 3) summary -> profile row 'analysis' (the app reads this)
  const next = programs
    .map(p=>({ name:p.name, days:daysLeft(p.close_date), status:p.status }))
    .filter(x=>x.days!=null && x.days>=0 && !["applied","admitted","rejected","waitlisted"].includes(x.status))
    .sort((a,b)=>a.days-b.days).slice(0,3)
    .map(x=>({ name:x.name, days:x.days }));

  const summary = {
    last_run: todayISO,
    checked: programs.length,
    changed: changes.length,
    ai: !!ANTHROPIC_KEY,
    changes: changes.slice(0,50),
    errors: errors.slice(0,20),
    next
  };
  const { error:se } = await sb.from("profile").upsert({ id:"analysis", data:summary, updated_at:todayISO });
  if(se) console.error("summary write failed:", se.message);

  console.log(`Done. checked=${programs.length} changed=${changes.length} errors=${errors.length}`);
  if(errors.length) console.log("Errors:\n"+errors.join("\n"));
}

main().catch(e=>{ console.error("FATAL:", e); process.exit(1); });
