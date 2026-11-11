/* Pursuit research data. Everything here was checked against official pages in
   November 2026 unless an entry is flagged verify:true (not yet confirmed).
   Loaded before the app script; merged into the recommended catalog. */
(function(){
const SE_OPEN="2026-10-16", SE_CLOSE="2027-01-15";
const AT_FEE="No tuition for Bangladeshi citizens (student-union fee ~€26/sem only)";
const AT_NOTE=" Fees, checked Nov 2026: Bangladesh is on the tuition-exemption country list published by TU Wien (Annex 1 of the Austrian tuition-fee decree), so citizens pay only the student-union fee. Confirm Bangladesh is still on the list when you enrol.";
const SE_REQ=["Bachelor's in CS or related (about 180 ECTS)","IELTS 6.5 with no section below 5.5 (checked Nov 2026)","Apply on universityadmissions.se, 16 Oct 2026 - 15 Jan 2027","SEK 900 application fee; documents by 1 Feb 2027","Apply to the Swedish Institute scholarship 8-24 Feb 2027","CV + motivation letter"];

/* ---- corrections to programmes already in the catalog ---- */
const PATCH={
 "at-tuwien-se":{tuition:AT_FEE,_noteAdd:AT_NOTE},
 "at-tuwien-ds":{tuition:AT_FEE,_noteAdd:AT_NOTE},
 "at-jku-cs":{tuition:AT_FEE,_noteAdd:AT_NOTE},
 "at-jku-ai":{tuition:AT_FEE,_noteAdd:AT_NOTE},
 "at-univie-cs":{tuition:AT_FEE,_noteAdd:AT_NOTE},
 "at-tugraz-se":{tuition:AT_FEE,_noteAdd:AT_NOTE},
 "nl-tudelft-cs":{_noteAdd:" TU Delft has asked applicants with non-Dutch degrees for a GRE in past cycles; check before applying."},
 "us-utd-phd":{close_date:"2026-12-15",verify:true,
   elig_note:"Good fit on eligibility. Checked Nov 2026: IELTS 6.5 minimum, waived if your bachelor's was taught and examined in English. The department's last posted cycle required a complete file by 15 Dec to be considered for funding, and GRE was optional. Funding is through TA/RA offers and is competitive, not automatic. The page does not say whether bachelor's-only applicants are admitted to the PhD; ask before paying the fee.",
   requirements:["Bachelor's in CS or related","IELTS 6.5, or an English-medium degree waiver","GRE optional (last posted cycle)","Complete file by 15 Dec for funding consideration","3 recommendation letters","SOP naming faculty you want to work with"]},
 "us-stonybrook-phd":{close_date:"2027-01-15",verify:true,priority:"high",
   elig_note:"Good fit. Checked Nov 2026: IELTS 6.5 overall (no band below 6; English-medium degrees are exempt), GRE not required for PhD applicants, and a bachelor's degree is the baseline requirement. Full-time PhD admits are offered TA/RA support with tuition scholarships, though the department does not call it guaranteed. The last posted deadline was 15 Jan; the Fall 2027 date is not published yet.",
   requirements:["Bachelor's in CS or related","IELTS 6.5 overall, no band below 6","GRE not required","Deadline: 15 Jan in the last posted cycle - confirm","SOP + 3 recommendation letters","Evidence of research potential"]},
 "ca-usask-cs":{ielts:"7.0",eligibility:"caution",open_date:null,close_date:"2026-12-15",verify:false,
   tuition:"CAD 12,837/yr (intl); funding normally covers tuition + CAD 18,000",
   elig_note:"English gap, checked Nov 2026: IELTS 7.0 with no band below 6.5, and the department does not accept a medium-of-instruction letter. Needs 70% in your last two years. Applicants are automatically considered for funding, which is 'normally' provided: tuition plus CAD 18,000 for the first 12 months. Deadline 15 Dec; fee CAD 145. The PhD here requires a Master's.",
   requirements:["IELTS 7.0, no band below 6.5 - your 6.5 is below","70% average in the last two years","Apply by 15 Dec 2026 (fee CAD 145)","Funding considered automatically","Transcripts, SOP, recommendation letters","Contact a supervisor (e.g. Prof. Chanchal Roy)"]},
 "ca-sfu-cs":{close_date:"2027-01-19",eligibility:"match",verify:false,
   elig_note:"Checked Nov 2026: Fall 2027 deadline is 19 Jan 2027. SFU's graduate minimum is IELTS 6.5 with 6.0 in each section (a programme may set higher; confirm with Computing Science). Thesis MSc funding comes from supervisor RA and TA work; the admissions page does not state a guarantee. Direct PhD entry from a bachelor's needs 3.5/4.33.",
   requirements:["Bachelor's in computing science or related","IELTS 6.5, 6.0 in each section","Apply by 19 Jan 2027","Identify a supervisor","Transcripts, SOP, 3 letters","Ask about RA/TA funding before accepting"]},
 "ca-concordia-cs":{_noteAdd:" Checked Nov 2026: Concordia's stated minimum is IELTS 6.5; three years at an English-only institution can exempt you."},
 "au-mq-mres":{eligibility:"caution",priority:"medium",tuition:"~AUD 42,000/yr unless a scholarship is won",
   elig_note:"The realistic entry route to an Australian PhD from a 4-year bachelor's, but funding is not assured. Checked Nov 2026: Macquarie's 'Road to Research' MRes scholarship requires you to already be in Australia on a valid visa, so it does not apply from Bangladesh. International MRes/PhD scholarships are ranked competitively on academic record and research evidence. Email a supervisor before applying.",
   requirements:["4-year Bachelor's in CS or related","Meet Macquarie's English requirement for research degrees","Find a supervisor first (e.g. A/Prof. Xi Zheng)","Research proposal + two academic referee reports","Apply through the combined admission + scholarship form","Do not rely on 'Road to Research' (onshore only)"]}
};

/* ---- new programmes ---- */
function se(id,name,program,city,note){return {id,country:"Sweden",cc:"SE",name,program,degree:"Masters",tuition:"Tuition applies to non-EU students (see programme page); target the SI scholarship",open_date:SE_OPEN,close_date:SE_CLOSE,intake:"Autumn 2027",ielts:"6.5",eligibility:"match",elig_note:note+" All Swedish master's programmes share one application round (16 Oct 2026 - 15 Jan 2027) and one English rule: IELTS 6.5 with no section below 5.5. Programme details are from general knowledge; confirm on the university page.",link:"https://www.universityadmissions.se/",priority:"medium",verify:true,requirements:SE_REQ};}
function at(id,name,program,note,link,open,close){return {id,country:"Austria",cc:"AT",name,program,degree:"Masters",tuition:AT_FEE,open_date:open||null,close_date:close||null,intake:"Winter 2027/28",ielts:"",eligibility:"caution",elig_note:note+" English-taught as far as I know; admission window and English level are not confirmed - check the programme page."+AT_NOTE,link,priority:"medium",verify:true,requirements:["Bachelor's in CS or closely related","English proof (level set by the university)","Legalised transcripts + degree certificate","Check the non-EU admission window","SOP + CV"]};}
const EXTRA=[
 {id:"us-uh-phd",country:"USA",cc:"US",name:"University of Houston",program:"PhD Computer Science",degree:"PhD",tuition:"Funded only with a TA/RA offer",open_date:"2026-08-01",close_date:"2027-01-15",intake:"Fall 2027",ielts:"6.5",eligibility:"match",
  elig_note:"Checked Nov 2026 on the department page: IELTS 6.5 overall (English-medium degrees from listed countries can be exempt), GRE optional for the PhD, international deadline 15 Jan, fee $80 with no waiver for international applicants. A 3.0+ GPA is cited as competitive. The page does not say whether bachelor's-only applicants are admitted or what funding is offered - email gradcs@central.uh.edu before paying.",
  link:"https://uh.edu/nsm/computer-science/graduate/admissions/index.php",priority:"medium",verify:false,
  requirements:["Bachelor's in CS or related","IELTS 6.5 overall","GRE optional for PhD","Apply by 15 Jan 2027 (fee $80)","SOP + recommendation letters","Ask about direct entry and TA/RA funding first"]},
 {id:"us-uta-phd",country:"USA",cc:"US",name:"UT Arlington",program:"PhD Computer Science (BS-to-PhD track)",degree:"PhD",tuition:"Funding not described in the PhD guide",open_date:null,close_date:null,intake:"Fall 2027",ielts:"",eligibility:"caution",
  elig_note:"Checked Nov 2026 in the department's PhD guide: a BS-to-PhD track exists, GRE is 'strongly recommended but not required', and priority goes to GPA 3.2+. IELTS below 7.5 (TOEFL below 92) may mean extra English courses after admission. The guide gives no deadline and no funding terms, so confirm both with the department.",
  link:"https://cdn.web.uta.edu/-/media/project/website/engineering/computer-science-department/_documents/phdguide.ashx",priority:"low",verify:true,
  requirements:["Bachelor's (BS-to-PhD track) or Master's","GPA 3.2+ for priority consideration","GRE optional, recommended","IELTS: below 7.5 may add English courses","3 recommendation letters (academic preferred)","SOP naming specific research areas"]},
 {id:"at-uibk-phd",country:"Austria",cc:"AT",name:"University of Innsbruck",program:"PhD position: cloud/edge computing and AI (Prof. Radu Prodan)",degree:"PhD",tuition:"Salaried position (salary not stated on the page)",open_date:null,close_date:null,intake:"Start immediately, 2-3 years",ielts:"",eligibility:"stretch",
  elig_note:"A real advertised vacancy, seen Nov 2026: asks for excellent knowledge of cloud/edge computing systems and/or AI and an MSc in computer science, so it comes after a Master's. No deadline or salary is given. Your production distributed-systems background is exactly the profile; keep it for after an MSc or ask whether strong industry experience is considered.",
  link:"https://edgeai-informatik.uibk.ac.at/vacancies/post-doc-phd-position/",priority:"low",verify:false,
  requirements:["MSc in computer science (stated on the vacancy)","Cloud/edge computing and/or AI experience","Contact: radu.prodan@uibk.ac.at","CV + transcripts","No deadline stated"]},
 {id:"at-jku-litphd",country:"Austria",cc:"AT",name:"JKU Linz - LIT AI Lab Graduate School",program:"PhD positions in machine learning",degree:"PhD",tuition:"Salaried when positions open",open_date:null,close_date:null,intake:"Not hiring at the moment",ielts:"",eligibility:"stretch",
  elig_note:"Checked Nov 2026: the graduate school says it is currently not hiring and that further PhD positions will be announced. Applications ask for a master's thesis abstract, strong mathematics, transcripts and a letter naming a preferred advisor, in one PDF. Watch the page; it follows naturally from the JKU MSc in AI.",
  link:"https://jku.at/en/lit-artificial-intelligence-lab/graduate-school/about/admission",priority:"low",verify:false,
  requirements:["Master's-level background (thesis abstract requested)","Strong mathematics","One PDF: diplomas, transcripts, CV, letter of intent, recommendations","English or German","Wait for the next announced call"]},
 se("se-chalmers-dsai","Chalmers","MSc Data Science and AI","Gothenburg","AI and data-science track at Chalmers."),
 se("se-kth-ml","KTH Royal Institute","MSc Machine Learning","Stockholm","KTH's dedicated machine-learning master's; among the most selective in Sweden."),
 se("se-lund-ml","Lund University","MSc Machine Learning, Systems and Control","Lund","Machine learning with a systems and control emphasis."),
 se("se-umu-ai","Umeå University","MSc Artificial Intelligence","Umeå","AI master's at a university with a strong autonomous distributed systems lab (Prof. Erik Elmroth)."),
 at("at-tuwien-lc","TU Wien","MSc Logic and Computation","Theory-leaning master's (logic, algorithms, knowledge-based AI).","https://www.tuwien.at/en/studies/admission/academic-calendar","2027-01-16","2027-07-15"),
 at("at-univie-ds","University of Vienna","MSc Data Science","Data-science master's run by the computer science and mathematics faculties.","https://studieren.univie.ac.at/en/"),
 at("at-tugraz-cs","TU Graz","MSc Computer Science","Broad CS master's with machine learning, security and software tracks.","https://www.tugraz.at/en/studying-and-teaching/degree-and-certificate-programmes/masters-degree-programmes"),
 at("at-aau-ai","University of Klagenfurt","MSc Artificial Intelligence and Cybersecurity","Joint programme with the University of Udine; matches your security and AI interests.","https://www.aau.at/en/"),
 at("at-uibk-cs","University of Innsbruck","MSc Computer Science","Home of the distributed and parallel systems group, and of Prof. Radu Prodan's edge-AI group which is advertising a PhD position.","https://www.uibk.ac.at/en/informatik/"),
 {id:"nl-uva-ai",country:"Netherlands",cc:"NL",name:"University of Amsterdam",program:"MSc Artificial Intelligence",degree:"Masters",tuition:"Non-EU fee in the EUR 17,000-34,000/yr range (see programme page)",open_date:null,close_date:null,intake:"Fall 2027",ielts:"",eligibility:"caution",elig_note:"Research-oriented two-year AI master's and a known route to Dutch PhD positions, but highly selective and self-funded: the NL Scholarship is only EUR 5,000 once. Deadline and English level not confirmed this round. Financially risky unless you have other funding.",link:"https://www.uva.nl/en/programmes",priority:"low",verify:true,requirements:["Bachelor's in CS/AI with strong maths","English proof (confirm level)","Apply via Studielink + UvA","Budget for full non-EU tuition","Motivation letter, CV"]},
 {id:"nl-leiden-cs",country:"Netherlands",cc:"NL",name:"Leiden University",program:"MSc Computer Science (AI specialisation)",degree:"Masters",tuition:"Non-EU fee in the EUR 17,000-34,000/yr range (see programme page)",open_date:null,close_date:null,intake:"Fall 2027",ielts:"",eligibility:"caution",elig_note:"Home of the Reinforcement Learning Group led by Dr Thomas Moerland (checked Nov 2026). Self-funded for non-EU students; deadline and English level not confirmed this round.",link:"https://www.universiteitleiden.nl/en/education/study-programmes",priority:"low",verify:true,requirements:["Bachelor's in CS or related","English proof (confirm level)","Apply via Studielink + Leiden","Budget for full non-EU tuition","Motivation letter, CV"]},
 {id:"hu-szeged-phd",country:"Hungary",cc:"HU",name:"University of Szeged",program:"Doctoral School of Computer Science",degree:"PhD",tuition:"Full scholarship via Stipendium Hungaricum if awarded",open_date:"2026-11-14",close_date:"2027-01-15",intake:"Fall 2027",ielts:"",eligibility:"stretch",elig_note:"Requires a Master's. Szeged hosts the HUN-REN-SZTE AI research group, where Márk Jelasity's team works on decentralised (gossip) learning as an alternative to federated learning - the closest match in Hungary to your federated-learning project. Dates follow last year's Stipendium Hungaricum pattern and are not confirmed for 2027/28.",link:"https://stipendiumhungaricum.hu/",priority:"low",verify:true,requirements:["Completed Master's in CS","Supervisor acceptance","Research plan","Apply via the Stipendium Hungaricum portal","Entrance interview"]},
 {id:"ca-manitoba-cs",country:"Canada",cc:"CA",name:"University of Manitoba",program:"MSc Computer Science (Thesis)",degree:"Masters",tuition:"See the graduate fees page; departmental funding is competitive",open_date:null,close_date:null,intake:"Fall 2027",ielts:"",eligibility:"caution",elig_note:"Checked Nov 2026: you need a support letter from a faculty member willing to supervise you before you apply. Funding (including the University of Manitoba Graduate Fellowship) is competitive. The programme page did not show the English requirement or the deadline; confirm both.",link:"https://umanitoba.ca/graduate-studies/admissions/programs-of-study/computer-science-msc",priority:"low",verify:true,requirements:["Supervisor support letter BEFORE applying","Bachelor's in CS (or 3.5 GPA with a CS minor)","English proof (confirm level)","Transcripts, SOP, letters","Confirm the Fall 2027 deadline"]},
 {id:"au-uts-phd",country:"Australia",cc:"AU",name:"University of Technology Sydney",program:"PhD (Engineering and IT) - federated learning group",degree:"PhD",tuition:"Needs the International Research Scholarship (tuition) + President's Scholarship (stipend)",open_date:null,close_date:null,intake:"2027-2028",ielts:"",eligibility:"stretch",elig_note:"Checked Nov 2026: Prof. Guodong Long (federated learning, on-device models with LLMs) says he is always seeking self-directed PhD candidates and asks for a CV by email. One UTS form covers both scholarships; the last round ran 7 Sep - 7 Oct 2026 and the next is not announced. Entry qualification and English level were not on the pages I read; Australian PhDs normally expect honours-level research or a Master's.",link:"https://www.uts.edu.au/for-students/admissions-entry/scholarships/international-research-scholarship",priority:"medium",verify:true,requirements:["Email Prof. Long with CV and research idea first","Research degree entry: confirm whether a 4-year BSc qualifies","English proof (confirm level)","Research proposal","Apply in the next scholarship round (not yet announced)"]}
];

/* ---- structured labels for every programme ----
   fund: full | position | schol | competitive | supervisor | lowcost | none
   gre: no | opt | req | ""      direct (PhD): yes | exc | ms | hon | ""
   fit: strong | good | moderate | reach | concern | later
   areas: ai rl fl genai ds se dist sec     type: thesis | course | research | position */
function m(city,fund,gre,fit,areas,type,fee,direct){return {city,fund,gre,fit,areas,type,fee:fee||"",direct:direct||""};}
const META={
 "at-tuwien-se":m("Vienna","lowcost","no","good",["se","dist"],"thesis"),
 "at-tuwien-ds":m("Vienna","lowcost","no","good",["ds","ai"],"thesis"),
 "at-tuwien-lc":m("Vienna","lowcost","no","moderate",["ai"],"thesis"),
 "at-jku-cs":m("Linz","lowcost","no","good",["se"],"thesis"),
 "at-jku-ai":m("Linz","lowcost","no","good",["ai","genai"],"thesis"),
 "at-univie-cs":m("Vienna","lowcost","no","moderate",["dist","ds"],"thesis"),
 "at-univie-ds":m("Vienna","lowcost","no","moderate",["ds","ai"],"thesis"),
 "at-tugraz-se":m("Graz","lowcost","no","moderate",["se"],"thesis"),
 "at-tugraz-cs":m("Graz","lowcost","no","moderate",["ai","sec","se"],"thesis"),
 "at-aau-ai":m("Klagenfurt","lowcost","no","moderate",["ai","sec"],"thesis"),
 "at-uibk-cs":m("Innsbruck","lowcost","no","moderate",["dist","ai"],"thesis"),
 "at-phd-logics":m("Vienna","position","no","later",["ai"],"position","","ms"),
 "at-uibk-phd":m("Innsbruck","position","no","later",["dist","ai"],"position","","ms"),
 "at-jku-litphd":m("Linz","position","no","later",["ai","genai"],"position","","ms"),
 "nl-tudelft-cs":m("Delft","none","","moderate",["ai","se","dist"],"thesis"),
 "nl-tue-cse":m("Eindhoven","none","no","moderate",["ds","se"],"thesis"),
 "nl-uva-se":m("Amsterdam","none","no","moderate",["se"],"course"),
 "nl-uva-ai":m("Amsterdam","none","no","reach",["ai","rl","genai"],"thesis"),
 "nl-leiden-cs":m("Leiden","none","no","moderate",["ai","rl"],"thesis"),
 "nl-rug-ai":m("Groningen","none","no","moderate",["ai"],"thesis"),
 "nl-utwente-cs":m("Enschede","none","no","moderate",["dist","sec","se"],"thesis"),
 "nl-phd-cs":m("Various","position","no","later",["ai","se","dist"],"position","","ms"),
 "fi-aalto-cs":m("Espoo","competitive","no","moderate",["ai","dist","se"],"thesis","€100"),
 "fi-helsinki-cs":m("Helsinki","competitive","no","moderate",["ai","ds","dist"],"thesis","€100"),
 "fi-tampere-cs":m("Tampere","competitive","no","good",["se","ds"],"thesis","€100"),
 "fi-aalto-phd":m("Espoo","position","no","later",["ai"],"position","","ms"),
 "se-kth-dist":m("Stockholm","schol","no","good",["dist","se"],"thesis","SEK 900"),
 "se-kth-cs":m("Stockholm","schol","no","moderate",["ai","dist"],"thesis","SEK 900"),
 "se-kth-ml":m("Stockholm","schol","no","reach",["ai","rl"],"thesis","SEK 900"),
 "se-chalmers-se":m("Gothenburg","schol","no","good",["se"],"thesis","SEK 900"),
 "se-chalmers-dsai":m("Gothenburg","schol","no","moderate",["ai","ds"],"thesis","SEK 900"),
 "se-liu-cs":m("Linköping","schol","no","good",["ai"],"thesis","SEK 900"),
 "se-uu-cs":m("Uppsala","schol","no","good",["ds","ai"],"thesis","SEK 900"),
 "se-lund-ml":m("Lund","schol","no","moderate",["ai"],"thesis","SEK 900"),
 "se-umu-ai":m("Umeå","schol","no","good",["ai","dist"],"thesis","SEK 900"),
 "se-phd-cs":m("Stockholm / Gothenburg","position","no","later",["dist","ai","se"],"position","","ms"),
 "us-utd-cs":m("Richardson, TX","none","","good",["ai","se","dist"],"course"),
 "us-neu-se":m("Boston, MA","none","","moderate",["se"],"course"),
 "us-uta-ms":m("Arlington, TX","none","","good",["ai","se"],"course"),
 "us-gatech-phd":m("Atlanta, GA","competitive","","reach",["ai","rl","dist"],"research","","yes"),
 "us-utd-phd":m("Richardson, TX","competitive","opt","good",["se","ai","sec"],"research","",""),
 "us-asu-phd":m("Tempe, AZ","competitive","opt","concern",["ai","sec"],"research","","exc"),
 "us-stonybrook-phd":m("Stony Brook, NY","competitive","no","good",["dist","ai"],"research","","yes"),
 "us-uh-phd":m("Houston, TX","competitive","opt","good",["ai","dist","ds"],"research","$80",""),
 "us-uta-phd":m("Arlington, TX","competitive","opt","moderate",["ai","se"],"research","","yes"),
 "ca-waterloo-cs":m("Waterloo, ON","supervisor","","concern",["ai","dist","se"],"thesis"),
 "ca-ubc-cs":m("Vancouver, BC","supervisor","","reach",["ai","dist"],"thesis"),
 "ca-ualberta-cs":m("Edmonton, AB","supervisor","","concern",["rl","ai"],"thesis"),
 "ca-ualberta-phd":m("Edmonton, AB","supervisor","","concern",["rl","ai"],"research","","exc"),
 "ca-sfu-cs":m("Burnaby, BC","supervisor","","good",["dist","ai"],"thesis"),
 "ca-concordia-cs":m("Montreal, QC","supervisor","","good",["se","ai"],"thesis"),
 "ca-usask-cs":m("Saskatoon, SK","competitive","","concern",["se"],"thesis","CAD 145"),
 "ca-manitoba-cs":m("Winnipeg, MB","supervisor","","moderate",["ai","ds"],"thesis"),
 "hu-bme-cse":m("Budapest","schol","no","good",["se","dist"],"thesis","None via Stipendium"),
 "hu-elte-cs":m("Budapest","schol","no","good",["ai","se"],"thesis","None via Stipendium"),
 "hu-szeged-cs":m("Szeged","schol","no","good",["ai","fl","se"],"thesis","None via Stipendium"),
 "hu-debrecen-cs":m("Debrecen","schol","no","good",["ai","ds"],"thesis","None via Stipendium"),
 "hu-sh-phd":m("Various","schol","no","later",["ai"],"research","","ms"),
 "hu-szeged-phd":m("Szeged","schol","no","later",["fl","ai","se"],"research","","ms"),
 "au-mq-mres":m("Sydney","competitive","no","moderate",["fl","se","ai"],"research"),
 "au-melb-cs":m("Melbourne","none","no","moderate",["ai"],"course"),
 "au-monash-ds":m("Melbourne","none","no","moderate",["ds"],"course"),
 "au-unsw-it":m("Sydney","none","no","moderate",["ai","sec"],"course"),
 "au-rmit-phd":m("Melbourne","competitive","no","concern",["ai"],"research","","hon"),
 "au-adelaide-phd":m("Adelaide","competitive","no","concern",["se","sec"],"research","","hon"),
 "au-uts-phd":m("Sydney","competitive","no","concern",["fl","ai","genai"],"research","","hon")
};

/* ---- professors. Emails are only those printed on an official university page;
   blank means I could not verify one. ev: 1 open funded position stated,
   2 says they are seeking students, 3 accepts inquiries (funding unknown), 4 research match only. */
const PROFS=[
 {id:"p-nguyen",rank:1,name:"Tien N. Nguyen",uni:"UT Dallas",country:"USA",pos:"Professor, Computer Science",areas:["se","ai","sec"],ev:1,evNote:"His page states: \"I have open TA/RA positions. Please contact me via emails.\"",email:"tien.n.nguyen@utdallas.edu",emailNote:"Printed on his page as \"tien dot n dot nguyen at utdallas.edu\".",profile:"https://personal.utdallas.edu/~tien.n.nguyen/",prio:"high",prog:"us-utd-phd",overlap:"AI and NLP for software engineering, software security and program analysis.",angle:"Lead with your automated vulnerability-analysis and remediation workflow and your LLM-agent tooling, and ask about the TA/RA openings his page mentions."},
 {id:"p-chen-c",rank:2,name:"Tse-Hsun (Peter) Chen",uni:"Concordia University",country:"Canada",pos:"Associate Professor, Computer Science and Software Engineering",areas:["se","ai"],ev:3,evNote:"University profile marks him as a thesis supervisor \"accepting inquiries\".",email:"tse-hsun.chen@concordia.ca",profile:"https://www.concordia.ca/faculty/tsehsun-chen.html",prio:"high",prog:"ca-concordia-cs",overlap:"AI for software engineering, coding agents, automated debugging and AIOps.",angle:"You run notification and payment infrastructure at 100M messages a month: propose AIOps or automated-debugging research grounded in real production incidents, plus your coding-agent experience."},
 {id:"p-long",rank:3,name:"Guodong Long",uni:"University of Technology Sydney",country:"Australia",pos:"Professor, Faculty of Engineering and IT (Australian AI Institute)",areas:["fl","genai","ai"],ev:2,evNote:"Profile says he is always seeking talented, self-directed PhD candidates and asks for a CV by email.",email:"Guodong.Long@uts.edu.au",profile:"https://profiles.uts.edu.au/guodong.long",prio:"high",prog:"au-uts-phd",overlap:"Federated learning for trustworthy AI; on-device intelligence working with server-side foundation models.",angle:"Describe your GAN-assisted federated learning experiments on non-IID CIFAR-10 honestly as a project, not a publication, and ask what entry qualification UTS would need from you."},
 {id:"p-gandhi",rank:4,name:"Anshul Gandhi",uni:"Stony Brook University",country:"USA",pos:"PI, PACE Lab, Computer Science",areas:["dist"],ev:4,evNote:"No statement to prospective students on the lab page.",email:"anshul@cs.stonybrook.edu",emailNote:"Printed as \"anshul (at) cs.stonybrook.edu\".",profile:"https://www3.cs.stonybrook.edu/~pace",prio:"high",prog:"us-stonybrook-phd",overlap:"Performance modelling and resource management for cloud systems.",angle:"Bring concrete numbers from your production systems (throughput, scaling and reliability work) and a question about performance modelling you could not answer in industry."},
 {id:"p-jelasity",rank:5,name:"Márk Jelasity",uni:"University of Szeged (HUN-REN-SZTE AI research group)",country:"Hungary",pos:"Contact person, decentralised learning topic",areas:["fl","dist","ai"],ev:4,evNote:"Group page lists no open positions.",email:"",emailNote:"No address is printed on the group page; use the contact link there.",profile:"https://rgai.inf.u-szeged.hu/self",prio:"high",prog:"hu-szeged-cs",overlap:"Gossip learning: fully decentralised machine learning as an alternative to federated learning.",angle:"Your non-IID federated learning project plus distributed-systems experience fit gossip learning directly; ask about an MSc thesis topic under Stipendium Hungaricum."},
 {id:"p-zheng",rank:6,name:"Xi (James) Zheng",uni:"Macquarie University",country:"Australia",pos:"Associate Professor and ARC Future Fellow, School of Computing",areas:["se","fl","ai"],ev:4,evNote:"Profile does not say whether he is taking students.",email:"james.zheng@mq.edu.au",emailNote:"Shown in obfuscated form on the university profile; confirm it there before sending.",profile:"https://researchers.mq.edu.au/en/persons/xi-zheng/",prio:"high",prog:"au-mq-mres",overlap:"Testing and verification of ML-enabled systems, AI safety, and distributed learning.",angle:"Combine your federated-learning project with your software-engineering background and ask about the Master of Research route and scholarship ranking."},
 {id:"p-girdz",rank:7,name:"Šarūnas Girdzijauskas",uni:"KTH Royal Institute of Technology",country:"Sweden",pos:"Professor in Cloud Computing",areas:["fl","dist","ai"],ev:4,evNote:"No openings seen.",email:"",emailNote:"Not printed on the page I read; look it up on his KTH profile.",profile:"https://www.kth.se/en/om/upptack/akademiska-hogtider/professorsinstallation/2023/ar-nas-girdzijauskas-1.1330530",prio:"high",prog:"se-kth-dist",overlap:"Decentralised AI at the meeting point of machine learning and distributed systems: federated and gossip learning, graph learning.",angle:"The strongest research overlap on this list. Contact him about master's thesis topics once admitted to KTH; Swedish PhDs need a Master's."},
 {id:"p-chen-l",rank:8,name:"Lydia Y. Chen",uni:"TU Delft",country:"Netherlands",pos:"Associate Professor, Computer Science (per TU Delft page)",areas:["fl","dist","ai"],ev:4,evNote:"No statement about open PhD positions. She is also listed at the University of Neuchâtel; check where she currently recruits.",email:"Y.Chen-10@tudelft.nl",profile:"https://www.tudelft.nl/ewi/over-de-faculteit/afdelingen/software-technology/distributed-systems/people/lydia-chen",prio:"medium",prog:"nl-phd-cs",overlap:"Dependability, resource allocation and privacy for large-scale data processing and AI systems.",angle:"Dutch PhDs are salaried jobs that need a Master's; follow her group's vacancies rather than cold-emailing for a PhD now."},
 {id:"p-leitner",rank:9,name:"Philipp Leitner",uni:"Chalmers University of Technology",country:"Sweden",pos:"Professor, Software Engineering",areas:["se","dist"],ev:4,evNote:"No openings seen.",email:"philipp.leitner@chalmers.se",profile:"https://www.chalmers.se/en/persons/phileitn/",prio:"medium",prog:"se-chalmers-se",overlap:"His listed publications study serverless and microservice engineering in industrial practice.",angle:"Your microservices and cloud operations experience is first-hand evidence for his empirical studies; raise it when asking about thesis topics."},
 {id:"p-zdun",rank:10,name:"Uwe Zdun",uni:"University of Vienna",country:"Austria",pos:"Head, Research Group Software Architecture",areas:["se","dist"],ev:4,evNote:"No openings seen.",email:"sek.swa@univie.ac.at",emailNote:"This is the group's contact address; no personal address is printed in the directory.",profile:"https://ufind.univie.ac.at/en/pvz_sub.html?id=785",prio:"medium",prog:"at-univie-cs",overlap:"Software architecture, including continuous design of microservice APIs.",angle:"Six years of microservice architecture decisions at bank scale is unusual for an MSc applicant; ask about architecture research during the master's."},
 {id:"p-sun",rank:11,name:"Lichao Sun",uni:"Lehigh University",country:"USA",pos:"Assistant Professor, Computer Science and Engineering",areas:["fl","sec","genai"],ev:4,evNote:"No recruiting statement on the faculty page. Lehigh's PhD requirements are not yet checked.",email:"lis221@lehigh.edu",profile:"https://engineering.lehigh.edu/cse/faculty/131419",prio:"medium",prog:"",overlap:"AI security and privacy, machine learning and data mining.",angle:"Connect privacy-preserving ML to your vulnerability-management work. Check Lehigh's English and GRE rules before applying."},
 {id:"p-liu",rank:12,name:"Jiangchuan Liu",uni:"Simon Fraser University",country:"Canada",pos:"Professor, Computing Science",areas:["dist"],ev:4,evNote:"No statement about taking graduate students.",email:"jcliu@sfu.ca",profile:"https://www.sfu.ca/fas/computing/people/faculty/faculty-members/jcl-iu.html",prio:"medium",prog:"ca-sfu-cs",overlap:"Cloud computing, big-data networking and multimedia systems.",angle:"SFU accepts IELTS 6.5 and has a 19 Jan 2027 deadline; write well before then with a specific cloud-systems question."},
 {id:"p-monperrus",rank:13,name:"Martin Monperrus",uni:"KTH Royal Institute of Technology",country:"Sweden",pos:"Professor of Software Technology",areas:["se","ai"],ev:3,evNote:"Profile invites students to contact him for a \"hard and cool\" master's thesis.",email:"monperrus@kth.se",profile:"https://www.kth.se/profile/monp?l=en",prio:"medium",prog:"se-kth-cs",overlap:"Teaches automated software testing, DevOps and distributed systems.",angle:"A thesis contact once you are at KTH, not a PhD inquiry now."},
 {id:"p-elmroth",rank:14,name:"Erik Elmroth",uni:"Umeå University",country:"Sweden",pos:"Professor, Computing Science",areas:["dist"],ev:3,evNote:"A 2022 university article describes his lab hiring many doctoral students; I found no current call.",email:"erik.elmroth@umu.se",profile:"https://www.umu.se/en/staff/erik-elmroth",prio:"medium",prog:"se-umu-ai",overlap:"Autonomous distributed systems, cloud and edge computing.",angle:"Autonomous resource management maps onto your infrastructure work; watch Umeå's vacancy page for doctoral positions."},
 {id:"p-brandic",rank:15,name:"Ivona Brandić",uni:"TU Wien",country:"Austria",pos:"Full Professor, High Performance Computing Systems",areas:["dist"],ev:4,evNote:"Her group page lists no open positions.",email:"ivona.brandic@tuwien.ac.at",profile:"https://informatics.tuwien.ac.at/people/ivona-brandic",prio:"medium",prog:"at-tuwien-se",overlap:"Cloud and edge computing, edge intelligence.",angle:"A master's thesis supervisor to aim for at TU Wien."},
 {id:"p-dustdar",name:"Schahram Dustdar",uni:"TU Wien",country:"Austria",pos:"Full Professor, head of the Distributed Systems research unit",areas:["dist","se"],ev:4,evNote:"No openings seen.",email:"schahram.dustdar@tuwien.ac.at",profile:"https://informatics.tuwien.ac.at/people/schahram-dustdar",prio:"medium",prog:"at-tuwien-se",overlap:"Distributed systems, cloud and edge computing, service-oriented computing."},
 {id:"p-prodan",name:"Radu Prodan",uni:"University of Innsbruck",country:"Austria",pos:"University Professor",areas:["dist","ai"],ev:1,evNote:"Advertised PhD position in cloud/edge computing and AI (seen Nov 2026). It asks for an MSc.",email:"radu.prodan@uibk.ac.at",profile:"https://edgeai-informatik.uibk.ac.at/vacancies/post-doc-phd-position/",prio:"medium",prog:"at-uibk-phd",overlap:"Cloud and edge computing systems with AI.",angle:"A funded vacancy that matches your background but asks for an MSc; ask whether extensive industry experience can be considered."},
 {id:"p-hochreiter",name:"Sepp Hochreiter",uni:"JKU Linz",country:"Austria",pos:"Director of the LIT AI Lab, head of the Deep Learning Group",areas:["ai","genai"],ev:4,evNote:"The lab's graduate school says it is currently not hiring.",email:"hochreit@ml.jku.at",emailNote:"Printed as \"hochreit(at)ml.jku.at\".",profile:"https://jku.at/en/lit-artificial-intelligence-lab/about-us/team",prio:"low",prog:"at-jku-ai",overlap:"Deep learning.",angle:"Do not cold-email as a master's applicant; apply to the MSc in AI and approach the group for a thesis."},
 {id:"p-deursen",name:"Arie van Deursen",uni:"TU Delft",country:"Netherlands",pos:"Professor of Software Engineering",areas:["se","ai"],ev:4,evNote:"No openings seen.",email:"Arie.vanDeursen@tudelft.nl",profile:"https://www.tudelft.nl/en/staff/arie.vandeursen",prio:"medium",prog:"nl-tudelft-cs",overlap:"Language models for code, software testing, trustworthy AI, software architecture."},
 {id:"p-moerland",name:"Thomas Moerland",uni:"Leiden University",country:"Netherlands",pos:"Assistant Professor, leads the Reinforcement Learning Group",areas:["rl","ai"],ev:4,evNote:"No openings seen.",email:"t.m.moerland@liacs.leidenuniv.nl",profile:"https://universiteitleiden.nl/en/staffmembers/thomas-moerland",prio:"low",prog:"nl-leiden-cs",overlap:"Reinforcement learning."},
 {id:"p-roy",name:"Chanchal K. Roy",uni:"University of Saskatchewan",country:"Canada",pos:"Professor, Software Engineering",areas:["se"],ev:4,evNote:"No openings stated. Note the department's IELTS 7.0 requirement.",email:"chanchal.roy@usask.ca",emailNote:"Printed as \"chanchal DOT roy AT usask.ca\".",profile:"https://clones.usask.ca/",prio:"medium",prog:"ca-usask-cs",overlap:"Software clones, maintenance and evolution, recommender systems in software engineering."},
 {id:"p-taylor",name:"Matthew E. Taylor",uni:"University of Alberta",country:"Canada",pos:"Full Professor, Computing Science",areas:["rl","ai"],ev:4,evNote:"No statement to prospective students. Alberta needs IELTS 7.0.",email:"matthew.e.taylor@ualberta.ca",profile:"https://apps.ualberta.ca/directory/person/mtaylor3",prio:"low",prog:"ca-ualberta-cs",overlap:"Reinforcement learning and multi-agent systems."},
 {id:"p-sharma",name:"Tushar Sharma",uni:"Dalhousie University",country:"Canada",pos:"SMART Lab lead, Faculty of Computer Science",areas:["se","ai"],ev:3,evNote:"His page sets the bar plainly: PhD applicants need IELTS 7 in every band, GPA 3.7/4.3 and research evidence; most master's students there are self-funded.",email:"tushar@dal.ca",profile:"https://web.cs.dal.ca/~tushar/smart/pages/opportunities.html",prio:"low",prog:"",overlap:"AI for software engineering, code quality and refactoring."},
 {id:"p-babar",name:"M. Ali Babar",uni:"University of Adelaide",country:"Australia",pos:"Professor, School of Computer Science and IT",areas:["se","sec"],ev:3,evNote:"Listed as eligible to supervise master's and PhD students; asks prospective students to email.",email:"ali.babar@adelaide.edu.au",profile:"https://researchers.adelaide.edu.au/profile/ali.babar",prio:"medium",prog:"au-adelaide-phd",overlap:"Software engineering."},
 {id:"p-payberah",name:"Amir H. Payberah",uni:"KTH Royal Institute of Technology",country:"Sweden",pos:"Associate Professor of Computer Science",areas:["genai"],ev:4,evNote:"His current research is equity and justice in AI, particularly large language models, rather than distributed ML.",email:"payberah@kth.se",profile:"https://www.kth.se/profile/payberah?l=en",prio:"low",prog:"se-kth-cs",overlap:"Large language models."},
 {id:"p-ferenc",name:"Rudolf Ferenc",uni:"University of Szeged",country:"Hungary",pos:"Associate Professor, head of the Department of Software Engineering",areas:["se"],ev:4,evNote:"No openings seen.",email:"",emailNote:"His page shows the address only as an image.",profile:"https://www.inf.u-szeged.hu/~ferenc/",prio:"medium",prog:"hu-szeged-cs",overlap:"Static analysis, code quality, bug detection and refactoring."}
];

/* ---- scholarships ---- */
const SCH_PATCH={
 "sc-sisgp":{name:"Swedish Institute Scholarship for Global Professionals",open_date:"2027-02-08",deadline:"2027-02-24",link:"https://si.se/en/apply/scholarships/swedish-institute-scholarships-for-global-professionals/",verify:true,
   cover:"Full tuition, SEK 12,000 a month and a SEK 15,000 travel grant. Bangladesh is on the eligible list; you need 3,000+ hours of work experience and leadership evidence, both of which you have. Apply to programmes on universityadmissions.se by 15 Jan 2027, then to SI 8-24 Feb 2027. Dates come from a secondary source quoting si.se (the SI page did not load) - confirm there."},
 "sc-holland":{name:"NL Scholarship (formerly Holland Scholarship)",link:"https://studyinnl.org/finances/nl-scholarship",verify:true,
   cover:"EUR 5,000 once, in the first year, for non-EEA students at participating universities (checked Nov 2026). Not a full scholarship: non-EU tuition alone is roughly EUR 17,000-34,000 a year. Each university sets its own deadline."},
 "sc-mq-ivs":{open_date:null,deadline:null,name:"Macquarie research scholarships (MRes / PhD)",verify:true,
   cover:"Competitive scholarships ranked on academic record and research evidence. Checked Nov 2026: the 'Road to Research' MRes award requires you to already be in Australia, so it is not available from Bangladesh. Rounds and 2027 amounts were not on the pages I could read."},
 "sc-oead":{open_date:null,deadline:null,name:"OeAD grants (Ernst Mach and others)",verify:true,
   cover:"As far as I know these fund research stays for doctoral students and postdocs, not a full master's degree. Listed so you do not budget on it; confirm on oead.at."},
 "sc-vanier":{open_date:null,deadline:null,name:"Canadian federal doctoral awards",verify:true,
   cover:"I could not confirm the current federal award scheme this round. For a thesis master's or PhD in Canada, the realistic funding is the department and supervisor package (for example Saskatchewan: tuition plus CAD 18,000 in year one)."},
 "sc-stiphun":{verify:true,cover:"Tuition-free study, a monthly stipend, an accommodation contribution and medical insurance, with no application fee; you may work up to 30 hours a week. Requires nomination by the sending partner in Bangladesh. The last call ran 14 Nov 2025 - 15 Jan 2026; I could not open an official page for the 2027/28 call, so check stipendiumhungaricum.hu now."},
 "sc-dept-us":{open_date:null,deadline:null,verify:true,cover:"US PhD funding comes as a teaching or research assistantship offered with admission: tuition waiver plus stipend. None of the department pages I read calls it guaranteed, and each programme has its own deadline (see the programme cards)."},
 "sc-rtp":{open_date:null,deadline:null,verify:true,cover:"Australian research scholarship: full tuition, a stipend of AUD 44,293 a year (University of Sydney figure for 2027) and overseas student health cover. Highly competitive for international applicants and normally needs honours-level research or a Master's."}
};
const SCH_EXTRA=[
 {id:"sc-at-exempt",country:"Austria",name:"Austrian tuition exemption for Bangladeshi citizens",cover:"Not a scholarship, but worth more than most: Bangladesh is on the exemption list, so you pay only the ~€26 student-union fee each semester at Austrian public universities (checked Nov 2026 on TU Wien's fee page). Living costs are not covered. Confirm the list at enrolment.",open_date:null,deadline:null,link:"https://www.tuwien.at/en/studies/admission/students-union-fee-and-tuition-fee/tuition-fee",verify:false},
 {id:"sc-uts-irs",country:"Australia",name:"UTS International Research Scholarship + President's Scholarship",cover:"One application covers both: tuition for up to 3.5 years (PhD) or 2 years (master's by research), plus a stipend award. The last round ran 7 Sep - 7 Oct 2026 and is closed; the next is not announced. Eligibility details were not on the page.",open_date:null,deadline:null,link:"https://www.uts.edu.au/for-students/admissions-entry/scholarships/international-research-scholarship",verify:true},
 {id:"sc-usask",country:"Canada",name:"University of Saskatchewan CS funding package",cover:"Considered automatically with admission and 'normally' provided: tuition plus CAD 18,000 for the first 12 months of the MSc (then tuition plus CAD 12,000 for 8 months); PhD tuition plus CAD 20,000 a year for 4 years. Needs IELTS 7.0. Checked Nov 2026.",open_date:null,deadline:"2026-12-15",link:"https://grad.usask.ca/programs/computer-science.php",verify:false}
];
/* bd: yes | check   cls: full | waiver | partial | small | research   pot: strong | good | moderate | hard | concern */
const SCH_META={
 "sc-at-exempt":{bd:"yes",cls:"waiver",pot:"strong"},
 "sc-sisgp":{bd:"yes",cls:"full",pot:"good"},
 "sc-stiphun":{bd:"check",cls:"full",pot:"good"},
 "sc-erasmus":{bd:"check",cls:"full",pot:"hard"},
 "sc-usask":{bd:"yes",cls:"full",pot:"concern"},
 "sc-dept-us":{bd:"yes",cls:"full",pot:"moderate"},
 "sc-rtp":{bd:"yes",cls:"full",pot:"hard"},
 "sc-uts-irs":{bd:"check",cls:"full",pot:"hard"},
 "sc-mq-ivs":{bd:"check",cls:"full",pot:"hard"},
 "sc-aalto":{bd:"check",cls:"waiver",pot:"moderate"},
 "sc-holland":{bd:"yes",cls:"small",pot:"moderate"},
 "sc-oead":{bd:"check",cls:"research",pot:"concern"},
 "sc-vanier":{bd:"check",cls:"research",pot:"concern"}
};

/* ---- country guide: how each system works, from pages read in Nov 2026 ---- */
const GUIDE=[
 {country:"Austria",rank:1,headline:"Cheapest route: no tuition for Bangladeshi citizens",
  points:["Bangladesh is on the tuition-exemption list (TU Wien fee page): only the ~€26 student-union fee per semester.","Master's windows differ by university: TU Wien non-EU 16 Jan - 15 Jul (last cycle's pattern), JKU Linz by 5 Sep, University of Vienna selection 2 Mar - 7 Apr plus a written exam in Vienna.","A PhD is a salaried job and expects a Master's; Innsbruck is advertising one in cloud/edge AI now.","Living costs are yours to fund; I found no general full scholarship for an Austrian master's."]},
 {country:"USA",rank:2,headline:"The only direct bachelor's-to-PhD route with funding",
  points:["Stony Brook: IELTS 6.5, no GRE for PhD, bachelor's is the baseline. Houston and UT Dallas: IELTS 6.5, GRE optional.","ASU and Georgia Tech need IELTS 7.0; Georgia Tech waives it with a medium-of-instruction certificate.","Funding arrives as a TA/RA offer. None of the department pages I read calls it guaranteed, so compare offers before accepting.","A master's here is self-funded and expensive; treat it as a last resort."]},
 {country:"Hungary",rank:3,headline:"Full scholarship that fits IELTS 6.5",
  points:["Stipendium Hungaricum covers tuition, a monthly stipend, an accommodation contribution and medical insurance.","Last call: 14 Nov 2025 - 15 Jan 2026. The 2027/28 call should be opening now; check the official site today.","You need nomination from the sending partner in Bangladesh as well as the university's own selection.","Szeged has the closest research match (decentralised learning)."]},
 {country:"Sweden",rank:4,headline:"One application round, one strong scholarship",
  points:["All master's programmes: universityadmissions.se, 16 Oct 2026 - 15 Jan 2027, IELTS 6.5 with no section below 5.5.","Swedish Institute scholarship: full tuition plus SEK 12,000 a month; Bangladesh eligible; rewards work experience and leadership. Application 8-24 Feb 2027.","Without the scholarship, tuition makes Sweden expensive.","A PhD is a salaried job and needs a Master's."]},
 {country:"Canada",rank:5,headline:"Funded thesis master's, but check English scores",
  points:["Simon Fraser and Concordia accept IELTS 6.5. Saskatchewan, Alberta and Waterloo need 7.0.","Funding comes through a supervisor; Saskatchewan normally adds tuition plus CAD 18,000 in year one.","Manitoba wants a supervisor's support letter before you apply.","Deadlines: Saskatchewan, Alberta and UBC 15 Dec 2026; Simon Fraser 19 Jan 2027."]},
 {country:"Australia",rank:6,headline:"PhD needs research training first",
  points:["PhD entry expects an honours degree with research or a Master's (RMIT states this).","The research scholarship pays AUD 44,293 a year plus tuition, but is highly competitive for international applicants.","Macquarie's entry-level research scholarship requires being in Australia already.","Coursework master's cost AUD 47,000-50,000 a year with little funding."]},
 {country:"Netherlands",rank:7,headline:"Financially the riskiest for a master's",
  points:["Non-EU tuition runs roughly EUR 17,000-34,000 a year; the NL Scholarship is EUR 5,000 once.","TU Delft's non-EU deadline is 15 Jan 2027; Eindhoven 1 May; Amsterdam (Software Engineering) 1 Feb.","A PhD is a salaried job advertised on academictransfer.com and needs a Master's.","Best treated as a PhD destination after a master's elsewhere."]}
];
const NOT_DONE=["Visa fees, proof-of-funds amounts and living-cost estimates per country","Application fees for most programmes","More regional universities in the USA and Canada (only those I could confirm are listed)","The 2027/28 Stipendium Hungaricum call and Bangladesh quota, from the official site"];

/* ---- month-by-month preparation tasks (deadlines are added automatically from the programme list) ---- */
const TASKS={
 "2026-11":["Ask Jahangirnagar University for transcripts, degree certificate and a Medium of Instruction letter","Line up three referees and give them your CV","Draft a statement of purpose and a two-page research statement","Email the first five professors on the list","Check stipendiumhungaricum.hu for the 2027/28 call","Decide whether to re-sit IELTS for the 7.0 programmes"],
 "2026-12":["Submit the December applications (Saskatchewan, Alberta, UBC, UT Dallas, Georgia Tech, ASU)","Rank your Swedish programmes on universityadmissions.se","Start document legalisation for Austria and Hungary"],
 "2027-01":["Sweden closes 15 Jan; TU Delft 15 Jan; Houston 15 Jan; Simon Fraser 19 Jan","Stipendium Hungaricum closed 15 Jan last year","TU Wien's non-EU window opens around 16 Jan"],
 "2027-02":["Pay the Swedish fee and upload documents by 1 Feb","Swedish Institute scholarship application, 8-24 Feb","Follow up politely with professors who have not replied"],
 "2027-03":["University of Vienna registration, 2 Mar - 7 Apr","JKU Linz applications: start early, non-EU processing can take six months"],
 "2027-04":["Swedish admission results 1 Apr; scholarship results 22 Apr","US PhD decisions: compare funding offers by 15 Apr"],
 "2027-05":["Accept an offer; begin proof-of-funds paperwork","Eindhoven non-EU deadline 1 May"],
 "2027-06":["Visa or residence-permit application for your chosen country","Housing search"],
 "2027-07":["TU Wien non-EU window closes around 15 Jul","University of Vienna entrance exam (early July, in Vienna)"],
 "2027-08":["Travel booking, insurance, final document copies"],
 "2027-09":["JKU Linz deadline 5 Sep","Enrolment and arrival"]
};

/* Programmes removed because you do not meet a stated requirement today
   (English score above 6.5, or a Master's / honours research degree required). */
const RETIRE=["us-asu-phd","us-gatech-phd","ca-waterloo-cs","ca-ualberta-cs","ca-ualberta-phd","ca-usask-cs","ca-ubc-cs","at-tugraz-se","at-phd-logics","at-uibk-phd","at-jku-litphd","nl-phd-cs","fi-aalto-phd","se-phd-cs","hu-sh-phd","hu-szeged-phd","au-rmit-phd","au-adelaide-phd","au-uts-phd"];
const SCH_RETIRE=["sc-usask","sc-rtp","sc-uts-irs","sc-vanier","sc-oead","sc-mq-ivs"];
/* ---- second research round (Nov 2026): more programmes you can apply to today ---- */
RETIRE.push("at-tugraz-cs");
const PROF_RETIRE=["p-roy","p-taylor","p-sharma","p-babar"];
for(let i=PROFS.length-1;i>=0;i--)if(PROF_RETIRE.includes(PROFS[i].id))PROFS.splice(i,1);
const TUW_EN=" English, checked Nov 2026: TU Wien asks for level B2, shown by IELTS Academic 6.5 overall. A degree taught in English in Bangladesh is not accepted as proof, so your IELTS certificate must still be valid (two years) when you apply.";
Object.assign(PATCH["at-tuwien-se"],{_noteAdd:AT_NOTE+TUW_EN});
Object.assign(PATCH["at-tuwien-ds"],{_noteAdd:AT_NOTE+TUW_EN});
PATCH["hu-szeged-cs"]={ielts:"5.5",elig_note:"Good fit. Checked Nov 2026 on the Stipendium Hungaricum course page: taught in English, 4 semesters, IELTS 5.5 or better (B2), a BSc in computer science with at least 60 credits of mathematics and computing, and an oral interview. Fully funded if the scholarship is awarded. The course page showed 'not available for applying at the moment', so the 2027/28 call had not opened in the system when I looked.",requirements:["BSc in CS with 60+ credits of maths and computing","IELTS 5.5 or better (B2)","CV (max 2 pages) + motivation letter","Medical certificate","Oral interview","Apply through the Stipendium Hungaricum portal when the call opens"]};
const FIX={
 "at-tuwien-lc":{ielts:"6.5",eligibility:"match",elig_note:"Theory-leaning master's (logic, algorithms, knowledge-based AI), taught in English. Window follows TU Wien's non-EU pattern (16 Jan - 15 Jul); confirm for 2027."+TUW_EN+AT_NOTE},
 "at-aau-ai":{open_date:"2027-01-11",close_date:"2027-02-28",verify:false,eligibility:"match",link:"https://www.aau.at/en/studien/master-artificial-intelligence-and-cybersecurity/",
   elig_note:"Checked Nov 2026: taught in English; needs a bachelor's in computer science, mathematics, statistics or a related field and English at B2. Non-EU applicants apply 11 Jan - 28 Feb 2027 through a special procedure: online registration, a motivation video in English, transcript, degree certificate and passport."+AT_NOTE,
   requirements:["Bachelor's in CS, maths, statistics or related","English B2 certificate at the time of application","Motivation video in English","Transcript + degree certificate + passport copy","Apply 11 Jan - 28 Feb 2027 (non-EU window)"]},
 "at-uibk-cs":{link:"https://www.uibk.ac.at/en/programmes/ma-computer-science/2021w/",elig_note:"Checked Nov 2026: taught in English and open to holders of a relevant bachelor's degree with language certificates. The required English level and the non-EU deadline are on separate pages I have not read yet."+AT_NOTE}
};
EXTRA.forEach(e=>{if(FIX[e.id])Object.assign(e,FIX[e.id]);});

function us(id,name,program,degree,o){return Object.assign({id,country:"USA",cc:"US",name,program,degree,intake:"Fall 2027",open_date:null,close_date:null,ielts:"",eligibility:"match",priority:"medium",verify:true,tuition:"Funded only with an assistantship or fellowship offer"},o);}
function ca(id,name,program,o){return Object.assign({id,country:"Canada",cc:"CA",name,program,degree:"Masters",intake:"Fall 2027",open_date:null,close_date:null,ielts:"",eligibility:"match",priority:"medium",verify:true,tuition:"International tuition applies; see funding note"},o);}
function se2(id,name,program,note,link,verified){return {id,country:"Sweden",cc:"SE",name,program,degree:"Masters",tuition:"Tuition applies to non-EU students; target the SI scholarship",open_date:SE_OPEN,close_date:SE_CLOSE,intake:"Autumn 2027",ielts:"6.5",eligibility:"match",elig_note:note+" Sweden's shared rules apply: one round on universityadmissions.se (16 Oct 2026 - 15 Jan 2027) and IELTS 6.5 with no section below 5.5."+(verified?"":" The programme is listed on the university's own site; I have not read its specific course prerequisites."),link,priority:"medium",verify:!verified,requirements:SE_REQ};}
function hu(id,name,program,city,note,link,ielts,reqs){return {id,country:"Hungary",cc:"HU",name,program,degree:"Masters",tuition:"Free with Stipendium Hungaricum",open_date:"2026-11-14",close_date:"2027-01-15",intake:"Fall 2027",ielts:ielts||"",eligibility:"match",elig_note:note+" Listed on the Stipendium Hungaricum course finder (checked Nov 2026), which showed it as not yet open for applications; dates shown follow last year's call.",link,priority:"medium",verify:true,requirements:reqs||["Bachelor's in CS / computer engineering or related","English at B2","Motivation letter + CV","Medical certificate","Interview or entrance assessment","Apply through the Stipendium Hungaricum portal"]};}
EXTRA.push(
 us("us-iastate-phd","Iowa State University","PhD Computer Science","PhD",{open_date:"2026-08-26",close_date:"2026-12-15",priority:"high",verify:false,tuition:"Funded with admission: 2-year TA, full tuition, health insurance",link:"https://www.cs.iastate.edu/graduate-studies/phd-application-requirements",
  elig_note:"Strong option, checked Nov 2026: the application is free, GRE is optional and not weighted, and admitted applicants receive a two-year teaching assistantship with a monthly stipend, a 100% tuition scholarship and free health insurance; later years are usually funded as a research assistant. Submit by 15 Dec 2026 and complete the file (including letters) by 10 Jan 2027. The English minimum is set by the Graduate College and is not on this page - confirm it accepts IELTS 6.5 - and the page does not say whether a bachelor's alone is enough.",
  requirements:["Submit by 15 Dec 2026; file complete by 10 Jan 2027","No application fee","GRE optional","English test (confirm the Graduate College minimum)","Recommendation letters","Statement of purpose"]}),
 us("us-buffalo-phd","University at Buffalo (SUNY)","PhD Computer Science and Engineering","PhD",{close_date:"2026-12-31",ielts:"6.5",priority:"high",verify:false,link:"https://engineering.buffalo.edu/computer-science-engineering/graduate/admissions/application-materials.html",
  elig_note:"Checked Nov 2026: IELTS 6.5, and the GRE is not required for the MS or the PhD. Apply by 31 Dec for full consideration for funding and fellowships (10 Dec for special scholarships). Fee $100. The page does not state a GPA minimum or whether bachelor's-only applicants are admitted to the PhD; ask the department.",
  requirements:["IELTS 6.5","No GRE","Apply by 31 Dec 2026 for funding","Application fee $100","Transcripts, SOP, recommendation letters","Ask whether direct entry from a bachelor's is accepted"]}),
 us("us-buffalo-ms","University at Buffalo (SUNY)","MS Computer Science and Engineering","Masters",{close_date:"2026-12-31",ielts:"6.5",priority:"low",verify:false,tuition:"Self-funded (see the university fee page)",link:"https://engineering.buffalo.edu/computer-science-engineering/graduate/admissions/application-materials.html",
  elig_note:"Checked Nov 2026: IELTS 6.5 and no GRE. A US master's is self-funded, so treat this as a fallback behind the funded PhD routes. Fee $100.",
  requirements:["IELTS 6.5","No GRE","Application fee $100","Transcripts, SOP, recommendation letters","Budget for tuition and living costs"]}),
 us("us-ttu-phd","Texas Tech University","PhD Computer Science","PhD",{ielts:"6.5",verify:false,tuition:"Funding not described on the admissions page",link:"https://www.depts.ttu.edu/cs/grad/admissions.php",
  elig_note:"Checked Nov 2026: IELTS 6.5, GRE waived 'until further notice', and applicants with a CS bachelor's and a GPA above 3.0 are encouraged to apply. No application-fee waivers. The page gives no deadline and no funding terms, and does not say whether bachelor's-only applicants enter the PhD; confirm all three.",
  requirements:["IELTS 6.5","GRE waived until further notice","GPA above 3.0 with a CS/CE bachelor's","No fee waiver","Confirm the Fall 2027 deadline","Ask about TA/RA funding"]}),
 us("us-ttu-ms","Texas Tech University","MS Computer Science","Masters",{ielts:"6.5",priority:"low",verify:false,tuition:"Self-funded (see the university fee page)",link:"https://www.depts.ttu.edu/cs/grad/admissions.php",
  elig_note:"Checked Nov 2026: IELTS 6.5, GRE waived until further notice, GPA above 3.0 encouraged. Self-funded; a fallback only.",
  requirements:["IELTS 6.5","GRE waived until further notice","GPA above 3.0","Confirm the Fall 2027 deadline","Budget for tuition and living costs"]}),
 us("us-fiu-phd","Florida International University","PhD Computer Science","PhD",{close_date:"2027-02-15",link:"https://www.cis.fiu.edu/degree/doctor-of-philosophy-in-computer-science/",
  elig_note:"Checked Nov 2026: Fall deadline 15 Feb, but apply by 15 Jan to be considered for fellowships. A teaching assistantship, if awarded, is guaranteed for one year; the Director's Fellowship pays USD 30,000 a year for three years with a tuition waiver and subsidised health insurance. The page does not give the English score or GRE rule - confirm both.",
  requirements:["Apply by 15 Jan 2027 for fellowships (final date 15 Feb)","English test (confirm minimum)","GRE: confirm","Transcripts, SOP, recommendation letters","Funding is awarded, not automatic"]}),
 us("us-gmu-phd","George Mason University","PhD Computer Science","PhD",{close_date:"2026-12-01",link:"https://itsapps.gmu.edu/graduate-deadlines-and-requirements/Programs/Details/a3L1I0000002hg6UAA",
  elig_note:"Checked Nov 2026: GRE is not required (recommended for applicants educated outside the US). The last posted cycle had a funding deadline of 1 Dec and a standard deadline of 15 Mar; the date shown here is the funding date and is not confirmed for 2027. English scores and the minimum degree are not on the page.",
  requirements:["Apply by the funding deadline (1 Dec in the last posted cycle)","GRE not required","English test (confirm minimum)","Transcripts, SOP, recommendation letters","Ask for GRA/GTA consideration"]}),
 us("us-binghamton-phd","Binghamton University (SUNY)","PhD Computer Science","PhD",{link:"https://www.binghamton.edu/apps/catalog/application-requirement/view/R92",
  elig_note:"Checked Nov 2026: rolling admission, a bachelor's degree is accepted, GPA 3.0 (overall or in the last 60 credits), and GRE is recommended but not required. Apply early for priority funding and fee-waiver consideration. English minimums are in the university standards, which I have not read.",
  requirements:["Bachelor's or Master's, GPA 3.0+","GRE recommended, not required","English test (confirm minimum)","Apply early for funding","Transcripts, SOP, recommendation letters"]}),
 us("us-ull-phd","University of Louisiana at Lafayette","PhD Computer Science","PhD",{priority:"low",link:"https://computing.louisiana.edu/node/174",
  elig_note:"Checked Nov 2026: GRE is not required. The school says financial support goes only to first-year international students with exceptional academic records, so funding is uncertain with a 3.44 GPA. English score and deadline are not on the page.",
  requirements:["GRE not required","English test (confirm minimum)","Confirm the deadline","Funding only for exceptional records","Transcripts, SOP, recommendation letters"]}),
 ca("ca-guelph-cs","University of Guelph","MSc Computer Science (Thesis)",{close_date:"2027-03-01",priority:"high",tuition:"Guaranteed minimum stipend CAD 20,000/yr for 2 years",link:"https://www.uoguelph.ca/programs/msc-computer-science/",
  elig_note:"Strong option, checked Nov 2026: the school guarantees a minimum stipend of CAD 20,000 a year for up to two years to international MSc students who secure an advisor and admission. Needs a four-year CS degree with a 75% (B) average over the last two years; finding a faculty advisor is mandatory and is your job. Fall 2027 international deadline 1 Mar 2027. The English score is not on this page - confirm it.",
  requirements:["Secure a faculty advisor (mandatory)","75% (B) average in the last two years","Apply by 1 Mar 2027","English test (confirm minimum)","Transcripts, statement, referees"]}),
 ca("ca-regina-cs","University of Regina","MSc Computer Science (Thesis)",{close_date:"2027-02-15",ielts:"6.5",verify:false,link:"https://www.uregina.ca/science/computer-science/graduate-programs/application-process.html",
  elig_note:"Checked Nov 2026: IELTS 6.5; a four-year CS bachelor's with 70% overall and 75% in computer science; you must find a supervisor who is accepting students before you submit. Fall deadline 15 Feb. The page states no funding.",
  requirements:["Find a supervisor before applying","IELTS 6.5","70% overall, 75% in CS","Apply by 15 Feb 2027","Transcripts, statement, referees"]}),
 ca("ca-windsor-cs","University of Windsor","MSc Computer Science (Thesis)",{close_date:"2027-04-15",ielts:"6.5",verify:false,link:"https://www.uwindsor.ca/graduate-studies/494/computer-science",
  elig_note:"Checked Nov 2026: IELTS 6.5 with no band below 6.0 and at most one band at 6.0 - check your individual band scores. Fall deadline 15 Apr. Needs a 500-word research statement naming possible supervisors and two academic referees. No funding amount is stated.",
  requirements:["IELTS 6.5; no band below 6.0, at most one at 6.0","Research statement naming supervisors (500 words)","Two academic referees","Apply by 15 Apr 2027","CV + transcripts"]}),
 ca("ca-mun-cs","Memorial University of Newfoundland","MSc Computer Science (Thesis)",{close_date:"2026-12-01",tuition:"Funding listed as CAD 20,000",link:"https://www.mun.ca/become/graduate/programs-and-courses/computer-science/",
  elig_note:"Checked Nov 2026: needs a CS or computer engineering bachelor's with at least 75%; Fall deadline 1 Dec; the programme page lists funding of CAD 20,000. International applicants are 'strongly encouraged' to send a GRE score, and contacting a supervisor is encouraged. The English score is not on the page.",
  requirements:["75% average in a CS / computer engineering bachelor's","Apply by 1 Dec 2026","GRE encouraged, not required","English test (confirm minimum)","Contact a possible supervisor"]}),
 ca("ca-uvic-cs","University of Victoria","MSc Computer Science",{close_date:"2026-12-15",link:"https://uvic.ca/graduate/programs/graduate-programs/credential-pages/computer-science-msc/computer-science-msc.php",
  elig_note:"Checked Nov 2026: apply by 15 Dec for September. You do not need a supervisor to apply, but supervisors make the final admission decisions, so list the people you want to work with. English score and funding are not on the page.",
  requirements:["Apply by 15 Dec 2026","List potential supervisors","English test (confirm minimum)","Transcripts, statement, referees"]}),
 ca("ca-carleton-cs","Carleton University","Master of Computer Science (Thesis)",{link:"https://carleton.ca/scs/future-students/graduate-studies/masters-program/",
  elig_note:"Checked Nov 2026: you must secure a supervisor from the School of Computer Science to be admitted (you can apply first but must name at least one). Funding is considered automatically and stated in the offer. English score and deadline are on separate pages I have not read.",
  requirements:["Name and secure a supervisor","English test (confirm minimum)","Confirm the Fall 2027 deadline","Transcripts, statement, referees"]}),
 ca("ca-ottawa-cs","University of Ottawa","Master of Computer Science (Thesis)",{link:"https://catalogue.uottawa.ca/en/graduate/master-computer-science/",
  elig_note:"Checked Nov 2026: needs an honours bachelor's in computer science with a B (70%) average, and you must identify a professor willing to supervise your thesis. English score, deadline and funding are on separate pages I have not read.",
  requirements:["Honours CS bachelor's, B (70%) average","Identify a professor willing to supervise","English test (confirm minimum)","Confirm the deadline","Transcripts, statement, referees"]}),
 {id:"au-deakin-ds",country:"Australia",cc:"AU",name:"Deakin University",program:"Master of Data Science",degree:"Masters",tuition:"AUD 45,800/yr (2027); 20-25% merit scholarships, 50-100% Vice-Chancellor's",open_date:null,close_date:null,intake:"Trimester 1, 2 or 3",ielts:"6.5",eligibility:"caution",priority:"low",verify:false,link:"https://www.deakin.edu.au/course/master-data-science-international",
  elig_note:"Checked Nov 2026: IELTS 6.5 with no band below 6.0. With a related bachelor's plus two years of relevant work experience you can be credited down to one year of study. Tuition reductions: Vice-Chancellor's International Scholarship (100% or 50%), International Scholarship for Excellence (25%, select countries), 20% merit scholarship. Still expensive after a 25% reduction.",
  requirements:["Bachelor's degree (related field shortens the course)","IELTS 6.5, no band below 6.0","Apply for a scholarship with the course application","Budget for the remaining tuition"]},
 {id:"at-plus-ds",country:"Austria",cc:"AT",name:"University of Salzburg",program:"MSc Data Science",degree:"Masters",tuition:AT_FEE,open_date:null,close_date:null,intake:"Winter 2027/28",ielts:"",eligibility:"caution",priority:"medium",verify:true,link:"https://www.plus.ac.at/studium/studienangebot/masterstudien/data-science/",
  elig_note:"Checked Nov 2026: taught in English; needs a bachelor's in computer science, mathematics or statistics (others may be asked for up to 45 ECTS of extra work). The English level and the non-EU dates are in separate documents I have not read."+AT_NOTE,
  requirements:["Bachelor's in CS, maths or statistics","English certificate (confirm level)","Check this semester's dates","Legalised transcripts + degree certificate"]},
 se2("se-gu-sai","University of Gothenburg","MSc Software and AI Engineering","Checked Nov 2026: needs 12 credits of programming, 12 of software engineering or design, 6 of AI or machine learning and 6 of mathematics; total cost SEK 294,000.","https://www.gu.se/en/study-gothenburg/software-and-ai-engineering-masters-programme-n2ase",true),
 se2("se-gu-ads","University of Gothenburg","MSc Applied Data Science","Applied data science with machine learning.","https://www.gu.se/en/education/N2ADS",false),
 se2("se-gu-cs","University of Gothenburg","MSc Computer Science","Run jointly with Chalmers' computer science department.","https://www.gu.se/en/education/N2COS",false),
 se2("se-bth-aise","Blekinge Institute of Technology","MSc AI and Software Engineering","Checked Nov 2026: needs 20 credits of computer science or software engineering and 15 of mathematics (linear algebra, statistics). BTH is one of Sweden's main software-engineering research schools.","https://www.bth.se/english/education/programmes/masters-programme-in-ai-and-software-engineering-120-credits",true),
 se2("se-bth-aiml","Blekinge Institute of Technology","MSc AI and Machine Learning","Two-year AI and machine-learning programme.","https://bth.se/eng/education/masters/dvama",false),
 se2("se-bth-cs","Blekinge Institute of Technology","MSc Computer Science","Two-year computer science programme.","https://www.bth.se/english/education/programmes/masters-programme-in-computer-science-120-credits",false),
 se2("se-ltu-ai","Luleå University of Technology","MSc Applied AI","Applied artificial intelligence.","https://www.ltu.se/en/education/programme/tmdia-master-programme-in-applied-ai",false),
 se2("se-ltu-ds","Luleå University of Technology","MSc Data Science","Data science programme.","https://www.ltu.se/en/education/programme/fndsa-master-programme-in-data-science",false),
 se2("se-mdu-se","Mälardalen University","MSc Software Engineering","Software engineering with close industry links.","https://www.mdu.se/en/malardalen-university/education/international/programme/masters-programme-in-software-engineering",false),
 se2("se-mdu-ies","Mälardalen University","MSc Intelligent Embedded Systems","AI for embedded and autonomous systems.","https://www.mdu.se/en/malardalen-university/education/international/programme/masters-programme-in-intelligent-embedded-systems",false),
 se2("se-su-css","Stockholm University","MSc Computer and Systems Sciences","Broad programme at the Department of Computer and Systems Sciences.","https://su.se/coursecatalogue/SCSSO",false),
 se2("se-su-dads","Stockholm University","MSc Decision Analysis and Data Science","Data science and decision analysis.","https://sisu.it.su.se/search/archive_info/SBDSO/en",false),
 hu("hu-elte-ai","ELTE","MSc Artificial Intelligence","Budapest","Checked Nov 2026 on ELTE's page: English, 4 semesters, needs a CS bachelor's or 60 ECTS of informatics and mathematics, English at B2. Self-financed tuition is EUR 3,200 a semester with a 30 Apr 2027 deadline for September; the Stipendium route is free.","https://www.elte.hu/en/node/320686",""),
 hu("hu-elte-auto","ELTE","MSc Computer Science for Autonomous Systems","Budapest","Autonomous-systems programme connected to the EIT Digital master school.","https://elte.hu/en/computer-science-for-autonomous-systems-msc",""),
 hu("hu-pecs-cse","University of Pécs","MSc Computer Science Engineering","Pécs","English, 4 semesters; needs a related BSc and a B2 certificate, with an online interview.","https://apply.stipendiumhungaricum.hu/courses/course/1380",""),
 hu("hu-sze-cse","Széchenyi István University","MSc Computer Science Engineering","Győr","English, 4 semesters; asks for IELTS Academic 6.5 and a motivation letter.","https://apply.stipendiumhungaricum.hu/courses/course/2120","6.5"),
 hu("hu-obuda-cse","Óbuda University","MSc Computer Science Engineering","Budapest","English, 4 semesters, in Budapest; the English score is not stated on the course page.","https://apply.stipendiumhungaricum.hu/courses/course/708",""),
 hu("hu-miskolc-cse","University of Miskolc","MSc Computer Science Engineering","Miskolc","English; asks for IELTS 5.5 and a related BSc. The course page lists a duration of '1 or 2 semesters (60 ECTS)', which looks like a partial-study entry - confirm it is the full degree.","https://apply.stipendiumhungaricum.hu/courses/course/2013","5.5"),
 hu("hu-debrecen-ds","University of Debrecen","MSc Data Science","Debrecen","Data science master's listed on the Stipendium course finder.","https://apply.stipendiumhungaricum.hu/courses/course/4079",""),
 hu("hu-debrecen-cse","University of Debrecen","MSc Computer Science Engineering","Debrecen","Computer science engineering master's listed on the Stipendium course finder.","https://apply.stipendiumhungaricum.hu/courses/course/921","")
);
Object.assign(META,{
 "us-iastate-phd":m("Ames, IA","full","opt","good",["ai","se","dist"],"research","None",""),
 "us-buffalo-phd":m("Buffalo, NY","competitive","no","good",["ai","dist","sec"],"research","$100",""),
 "us-buffalo-ms":m("Buffalo, NY","none","no","good",["ai","dist"],"course","$100"),
 "us-ttu-phd":m("Lubbock, TX","","no","good",["ai","se"],"research","",""),
 "us-ttu-ms":m("Lubbock, TX","none","no","good",["ai","se"],"course"),
 "us-fiu-phd":m("Miami, FL","competitive","","moderate",["ai","sec","dist"],"research","",""),
 "us-gmu-phd":m("Fairfax, VA","competitive","no","moderate",["ai","sec","se"],"research","",""),
 "us-binghamton-phd":m("Binghamton, NY","competitive","opt","good",["dist","ai"],"research","","yes"),
 "us-ull-phd":m("Lafayette, LA","competitive","no","moderate",["ai","dist"],"research","",""),
 "ca-guelph-cs":m("Guelph, ON","full","no","good",["ai","ds","se"],"thesis"),
 "ca-regina-cs":m("Regina, SK","supervisor","no","good",["ai","ds"],"thesis"),
 "ca-windsor-cs":m("Windsor, ON","supervisor","","good",["ai","ds"],"thesis"),
 "ca-mun-cs":m("St. John's, NL","competitive","opt","good",["ai","dist"],"thesis"),
 "ca-uvic-cs":m("Victoria, BC","supervisor","","moderate",["se","ai","dist"],"thesis"),
 "ca-carleton-cs":m("Ottawa, ON","supervisor","","moderate",["ai","sec","dist"],"thesis"),
 "ca-ottawa-cs":m("Ottawa, ON","supervisor","","moderate",["ai","se"],"thesis"),
 "au-deakin-ds":m("Melbourne","partial","no","moderate",["ds","ai"],"course"),
 "at-plus-ds":m("Salzburg","lowcost","no","moderate",["ds","ai"],"thesis"),
 "se-gu-sai":m("Gothenburg","schol","no","good",["se","ai"],"thesis","SEK 900"),
 "se-gu-ads":m("Gothenburg","schol","no","good",["ds","ai"],"thesis","SEK 900"),
 "se-gu-cs":m("Gothenburg","schol","no","moderate",["ai","se"],"thesis","SEK 900"),
 "se-bth-aise":m("Karlskrona","schol","no","good",["se","ai"],"thesis","SEK 900"),
 "se-bth-aiml":m("Karlskrona","schol","no","good",["ai"],"thesis","SEK 900"),
 "se-bth-cs":m("Karlskrona","schol","no","good",["se","dist"],"thesis","SEK 900"),
 "se-ltu-ai":m("Luleå","schol","no","good",["ai"],"thesis","SEK 900"),
 "se-ltu-ds":m("Luleå","schol","no","good",["ds"],"thesis","SEK 900"),
 "se-mdu-se":m("Västerås","schol","no","good",["se"],"thesis","SEK 900"),
 "se-mdu-ies":m("Västerås","schol","no","good",["ai","dist"],"thesis","SEK 900"),
 "se-su-css":m("Stockholm","schol","no","good",["ds","sec","se"],"thesis","SEK 900"),
 "se-su-dads":m("Stockholm","schol","no","good",["ds","ai"],"thesis","SEK 900"),
 "hu-elte-ai":m("Budapest","schol","no","good",["ai","genai"],"thesis","None via Stipendium"),
 "hu-elte-auto":m("Budapest","schol","no","good",["ai","dist"],"thesis","None via Stipendium"),
 "hu-pecs-cse":m("Pécs","schol","no","good",["se","ai"],"thesis","None via Stipendium"),
 "hu-sze-cse":m("Győr","schol","no","good",["se","dist"],"thesis","None via Stipendium"),
 "hu-obuda-cse":m("Budapest","schol","no","good",["se","sec"],"thesis","None via Stipendium"),
 "hu-miskolc-cse":m("Miskolc","schol","no","moderate",["se"],"thesis","None via Stipendium"),
 "hu-debrecen-ds":m("Debrecen","schol","no","good",["ds","ai"],"thesis","None via Stipendium"),
 "hu-debrecen-cse":m("Debrecen","schol","no","good",["se","dist"],"thesis","None via Stipendium")
});
TASKS["2026-12"]=["Submit the December applications: George Mason and Memorial (1 Dec), Iowa State, UT Dallas and Victoria (15 Dec), Buffalo (31 Dec)","Rank your Swedish programmes on universityadmissions.se","Start document legalisation for Austria and Hungary"];
TASKS["2027-01"]=["Sweden closes 15 Jan; TU Delft 15 Jan; Houston and Stony Brook 15 Jan; Simon Fraser 19 Jan","FIU: apply by 15 Jan for fellowships","Klagenfurt non-EU window opens 11 Jan; TU Wien's around 16 Jan","Stipendium Hungaricum closed 15 Jan last year"];
TASKS["2027-02"]=["Pay the Swedish fee and upload documents by 1 Feb","Swedish Institute scholarship application, 8-24 Feb","Regina 15 Feb; Klagenfurt closes 28 Feb","Follow up politely with professors who have not replied"];
TASKS["2027-03"]=["Guelph 1 Mar","University of Vienna registration, 2 Mar - 7 Apr","JKU Linz applications: start early, non-EU processing can take six months"];
GUIDE.forEach(g=>{
 if(g.country==="USA")g.points=["Iowa State funds every admitted PhD student (2-year TA, full tuition, health insurance), with a free application due 15 Dec.","IELTS 6.5 is accepted at Stony Brook, Buffalo, Texas Tech, Houston and UT Dallas; GRE is not required or is optional at all of them.","Excluded: ASU and Georgia Tech (IELTS 7.0), NJIT and North Texas (3.5 GPA), UNC Charlotte and UCF (GRE required).","Funding arrives as a TA/RA or fellowship offer; compare offers before accepting. A master's here is self-funded."];
 if(g.country==="Canada"){g.headline="Funded thesis master's; a supervisor is the key";g.points=["Guelph guarantees CAD 20,000 a year for two years once you have an advisor and admission; Memorial lists CAD 20,000.","IELTS 6.5 is accepted at Simon Fraser, Regina, Windsor and Concordia. Saskatchewan, Alberta and Waterloo need 7.0 and are removed.","Regina, Guelph, Carleton, Ottawa and Manitoba all need a supervisor before or at admission: start emailing now.","Deadlines: Memorial 1 Dec, Victoria 15 Dec, Simon Fraser 19 Jan, Regina 15 Feb, Guelph 1 Mar, Windsor 15 Apr."];}
 if(g.country==="Australia"){g.headline="No funded route you qualify for yet";g.points=["PhD entry expects an honours degree with research or a Master's, so the PhD options are removed.","Coursework master's accept IELTS 6.5 but cost AUD 46,000-50,000 a year; Deakin offers 20-25% merit reductions.","Macquarie's Master of Research is the path into a funded PhD, but its entry scholarship requires being in Australia already."];}
 if(g.country==="Austria")g.points=["Bangladesh is on the tuition-exemption list (TU Wien fee page): only the ~€26 student-union fee per semester.","TU Wien needs IELTS 6.5 overall; TU Graz needs 7.0 and is removed. Klagenfurt and Innsbruck ask for B2.","Windows: Klagenfurt non-EU 11 Jan - 28 Feb 2027; TU Wien 16 Jan - 15 Jul (pattern); University of Vienna 2 Mar - 7 Apr plus an exam in Vienna; JKU Linz by 5 Sep.","Living costs are yours to fund; I found no general full scholarship for an Austrian master's."];
 if(g.country==="Hungary")g.points=["Stipendium Hungaricum covers tuition, a monthly stipend, an accommodation contribution and medical insurance.","Eight universities list English-taught computing master's on the scholarship's course finder; most ask for B2 (Szeged and Miskolc IELTS 5.5, Győr 6.5).","The course pages showed 'not available for applying at the moment' on 11 Nov 2026: the 2027/28 call had not opened. Last year it ran 14 Nov - 15 Jan, so check daily.","You need nomination from the sending partner in Bangladesh as well as the university's own selection."];
});
NOT_DONE.splice(0,NOT_DONE.length,"English minimums for programmes showing 'IELTS —' (the department page did not state them)","Visa fees, proof-of-funds amounts and living-cost estimates per country","Course-specific prerequisites for most Swedish programmes","Your individual IELTS band scores, which several programmes check (for example no band below 6.0)","The 2027/28 Stipendium Hungaricum call, which had not opened when checked");

window.PD={RETIRE,SCH_RETIRE,PATCH,EXTRA,META,PROFS,SCH_PATCH,SCH_EXTRA,SCH_META,GUIDE,NOT_DONE,TASKS};
})();
