import{a as h,f as u}from"./CsNMRBdl.js";import{R as g}from"./CxltGZex.js";import{w as e,g as m}from"./CUxTeZu7.js";import{l as b,s as f}from"./C5-3rxqd.js";import{C as v,i as k,Q as y}from"./BOYEZbjh.js";import{D as w}from"./DixDie_W.js";import{E as _,R as T}from"./BfQBePuj.js";const t={layout:"runbook",title:"0003 · Signed #4471 review and cause-based triage",owner:"manojparvathaneni",status:"accepted",reviewed:"2026-10-28T00:00:00.000Z",signature:"v1.eyJzdWIiOiIzMzc3IiwiYXVkIjoiY2hhbGxlbmdlOndoYXQtaXQtc2hvd3MiLCJpYXQiOjE3OTMyMjQzOTgsImV4cCI6MTc5MzMxMDc5OH0.Smb7POdVwEMUGi65fawQ_QioOIOoxb49CIEZbWQ-Y4o"},{layout:Y,title:z,owner:A,status:E,reviewed:P,signature:j}=t;var x=u(`<h2>Context and authority</h2> <p>This record replaces <a href="/kb/decisions/0002-dedupe-by-cause">0002</a> with a review signed using
the course-issued page proof. The classification and triage decision are unchanged.
Accepted records 0001 and 0002 remain byte-for-byte unchanged as history.
The <a href="/kb/triage/dedupe">active triage page</a> points here.</p> <p>The original <a href="/kb/decisions/0001-dedupe-by-subject">subject-only decision</a> was accepted but
stale: its rendered page warns that nobody has reviewed it for more than half a year.
The incident’s “one issue, one fix” prose contradicted the computed cause table.
Read the rendered evidence, not just its Markdown or the word “known”.</p> <p>Scope: the support desk’s export dated 4 October 2026, reviewed on 28 October.
Counts below describe that snapshot, not today’s queue. Rebuild when data changes.</p> <h2>Separate problems and tickets</h2> <!> <p><strong>Parser:</strong> the shared parser reads month first for day-first tenants.
Harbour Dental’s app report R-41200 says 7 April became 4 July.
The app/email and booking-v2 form paths must honor the established tenant date contract. <a href="https://github.com/manojparvathaneni/mega-s01e03-what-it-shows/issues/2" rel="nofollow">Parser ticket</a>.</p> <p><strong>Hint:</strong> booking-v3 displays <code>MM/DD/YYYY</code>, but reads form input using the day-first
tenant convention. A person following the hint gets a different date.
Copper Studio’s form report R-41230 describes 6 January becoming 1 June;
intake tagged it <code>parser</code>, but it belongs to <code>hint</code>.
Align the hint and the form input contract independently of the shared-parser fix. <a href="https://github.com/manojparvathaneni/mega-s01e03-what-it-shows/issues/1" rel="nofollow">Hint ticket</a>.</p> <p>The exported cause model is not the production booking implementation.
These tickets specify separate fixes and acceptance checks; neither production fix has
been verified here. Source support ticket #4471 is not an issue number in this repo.</p> <h2>Count and chronology</h2> <!> <!> <p>Reports begin in April. The July merge spike is desk backlog activity, not the onset of a
new problem. Received dates and merged dates answer different questions.
The one-day descriptions remain visible in the computed evidence; they do not establish
an additional timezone cause.</p> <h2>Decision: merge only established matching causes</h2> <ol><li>Deduplicate overlapping export rows by report ID before counting reports.</li> <li>Read the report and resolve its tenant, locale, booking-form version, and channel.
Do not substitute <code>meta.intakeTag</code>, browser locale, or subject text for tenant evidence.</li> <li>Use <code>dayFirst</code> and <code>causeOf</code> from <code>src/lib/kb/causes.ts</code>. For known day-first tenants,
booking-v3 <strong>form</strong> reports are <code>hint</code>; app/email and booking-v2 form reports are <code>parser</code>.</li> <li>Merge only when the evidence establishes the same cause. A matching subject is neither
necessary nor sufficient. <code>sameCause</code> covers these known date causes, not every product
handled by the support desk.</li> <li>Unknown tenant, unsupported locale, or unclear behavior: keep the report separate and
request evidence. Do not silently classify it as <code>parser</code> or merge it on subject alone.</li></ol> <h2>Check the active rule</h2> <!> <ul><li>Kettle Books app and email reports: different subjects, same parser cause; merge.</li> <li>Alder Physio form versus app: same subject, different causes; keep apart.</li> <li>Copper Studio form versus Morrow Tax form: same subject, different causes; keep apart.</li> <li>Pale Harbour and Alder Physio forms: different subjects, same hint cause; merge.</li> <li>Unknown sender: matching subjects do not establish a cause; keep unresolved.</li></ul> <h2>Consequences</h2> <p>Engineering gets one ticket per cause with its own report count. Triage now requires a
tenant lookup and a reading of the report rather than a subject-only shortcut.
The working desk’s triage and incident pages point here, so the old merge rule is not left
as active guidance.</p> <p>The exported data still contains the original merges. Filing these GitHub tickets does
not rewrite the source ticket system. New reports or tenant changes require a fresh
classification and review; do not mix live queue totals into this dated snapshot.</p> <!>`,1);function M(i,d){const c=b(d,["children","$$slots","$$events","$$legacy"]);g(i,f(()=>c,()=>t,{children:(p,O)=>{var o=x(),s=e(m(o),10);v(s,{ticket:4471,get issues(){return k}});var a=e(s,10);_(a,{});var r=e(a,2);y(r,{ticket:4471});var n=e(r,10);w(n,{});var l=e(n,10);T(l,{get signature(){return j}}),h(p,o)},$$slots:{default:!0}}))}const q=Object.freeze(Object.defineProperty({__proto__:null,default:M,metadata:t},Symbol.toStringTag,{value:"Module"}));export{q as _,M as a};
