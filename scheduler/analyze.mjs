// Pursuit — daily sync job (runs in GitHub Actions). No LLM, no cost.
// 1) Maintenance: recompute each program's application window state.
// 2) Overrides: apply verified fields from data/overrides.json to the DB.
//    (Claude updates that file on demand from chat; this job syncs it.)
// Every applied change is logged (with its previous value) to analysis_log.

import { createClient } from "@supabase/supabase-js";
import { readFile } from "node:fs/promises";

const SUPABASE_URL = need("SUPABASE_URL");
const SUPABASE_KEY = need("SUPABASE_SECRET_KEY");   // secret key — Action secret only

function need(k){ const v=process.env[k]; if(!v){ console.error("Missing env "+k); process.exit(1);} return v; }

const sb = createClient(SUPABASE_URL, SUPABASE_KEY, { auth:{ persistSession:false } });
const todayISO = new Date().toISOString();
const todayDate = todayISO.slice(0,10);

function daysLeft(d){ if(!d) return null; const t=new Date(d+"T00:00:00").getTime(); if(isNaN(t)) return null; const n=new Date(); n.setHours(0,0,0,0); return Math.round((t-n.getTime())/864e5); }
function windowState(p){
  const c=daysLeft(p.close_date);
  if(c==null) return "no_date";
  if(c<0) return "closed";
  if(c<=30) return "closing_soon";
  const o=daysLeft(p.open_date);
  return (o!=null && o>0) ? "upcoming" : "open";
}

async function loadOverrides(){
  try{
    const raw = await readFile(new URL("../data/overrides.json", import.meta.url), "utf8");
    const j = JSON.parse(raw);
    return { programs: j.programs||{}, scholarships: j.scholarships||{} };
  }catch(e){
    console.log("No data/overrides.json (or unreadable) — maintenance only.");
    return { programs:{}, scholarships:{} };
  }
}

// which fields overrides may set (never touches user-only fields like status/notes/docs)
const PROG_FIELDS = ["country","cc","name","program","degree","tuition","open_date","close_date","intake","ielts","eligibility","elig_note","requirements","link","priority","verify","ai_source"];
const SCH_FIELDS  = ["country","name","cover","open_date","deadline","link","verify"];

function diff(row, over, allowed){
  const patch={}, before={};
  for(const k of allowed){
    if(!(k in over)) continue;
    const nv=over[k], cv=row[k];
    const same = JSON.stringify(nv)===JSON.stringify(cv);
    if(!same){ before[k]=cv; patch[k]=nv; }
  }
  return { patch, before };
}

async function main(){
  const [{ data:programs, error:pe }, { data:schols, error: se }] = await Promise.all([
    sb.from("programs").select("*"),
    sb.from("scholarships").select("*"),
  ]);
  if(pe) throw pe;
  const overrides = await loadOverrides();
  const changes=[], errors=[];

  // 1) maintenance
  for(const p of (programs||[])){
    const ws=windowState(p);
    if(p.window_state!==ws){
      const { error:e }=await sb.from("programs").update({ window_state:ws, updated_at:todayISO }).eq("id",p.id);
      if(e) errors.push(`maint ${p.id}: ${e.message}`); else p.window_state=ws;
    }
  }

  // 2) apply program overrides
  for(const [id, over] of Object.entries(overrides.programs)){
    const p=(programs||[]).find(x=>x.id===id);
    if(!p){ errors.push(`override: program ${id} not found`); continue; }
    const { patch, before }=diff(p, over, PROG_FIELDS);
    if(Object.keys(patch).length===0) continue;
    patch.last_analyzed=todayISO; patch.ai_source=over.ai_source||"manual-refresh"; patch.updated_at=todayISO;
    const { error:e }=await sb.from("programs").update(patch).eq("id",id);
    if(e){ errors.push(`update ${id}: ${e.message}`); continue; }
    await sb.from("analysis_log").insert({ program_id:id, run_date:todayDate, fields:Object.keys(before), before, after:patch, source:patch.ai_source, confidence:"manual", created_at:Date.now() });
    Object.assign(p, patch);
    changes.push({ id, name:p.name, fields:Object.keys(before) });
  }

  // 3) apply scholarship overrides
  for(const [id, over] of Object.entries(overrides.scholarships)){
    const scrow=(schols||[]).find(x=>x.id===id);
    if(!scrow){ errors.push(`override: scholarship ${id} not found`); continue; }
    const { patch, before }=diff(scrow, over, SCH_FIELDS);
    if(Object.keys(patch).length===0) continue;
    patch.updated_at=todayISO;
    const { error:e }=await sb.from("scholarships").update(patch).eq("id",id);
    if(e){ errors.push(`sch update ${id}: ${e.message}`); continue; }
    await sb.from("analysis_log").insert({ program_id:"sch:"+id, run_date:todayDate, fields:Object.keys(before), before, after:patch, source:"manual-refresh", confidence:"manual", created_at:Date.now() });
    changes.push({ id, name:scrow.name, fields:Object.keys(before) });
  }

  // 4) summary -> profile row 'analysis' (the app reads this)
  const next=(programs||[])
    .map(p=>({ name:p.name, days:daysLeft(p.close_date), status:p.status }))
    .filter(x=>x.days!=null && x.days>=0 && !["applied","admitted","rejected","waitlisted"].includes(x.status))
    .sort((a,b)=>a.days-b.days).slice(0,3)
    .map(x=>({ name:x.name, days:x.days }));

  const summary={ last_run:todayISO, checked:(programs||[]).length, changed:changes.length, ai:false, mode:"maintenance+overrides", changes:changes.slice(0,50), errors:errors.slice(0,20), next };
  const { error:supErr }=await sb.from("profile").upsert({ id:"analysis", data:summary, updated_at:todayISO });
  if(supErr) console.error("summary write failed:", supErr.message);

  console.log(`Done. programs=${(programs||[]).length} changed=${changes.length} errors=${errors.length}`);
  if(errors.length) console.log("Errors:\n"+errors.join("\n"));
}

main().catch(e=>{ console.error("FATAL:", e); process.exit(1); });
