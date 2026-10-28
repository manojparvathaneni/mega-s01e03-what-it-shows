import{a as u,f as h}from"./D8MaX8Q3.js";import{R as m}from"./DwrCouIR.js";import{y as e,g as f}from"./CGN5jdAV.js";import{l as g,s as b}from"./Dj88hTj6.js";import{C as k,i as y}from"./CeXhEeKc.js";import{Q as v}from"./DMOCSs7M.js";import{D as w}from"./DQUxgbKu.js";import{E as _}from"./6CafbX29.js";import{R as x}from"./B4gcYFh4.js";const t={layout:"runbook",title:"0002 · Split #4471 and deduplicate by cause",owner:"manojparvathaneni",status:"accepted",reviewed:"2026-10-28T00:00:00.000Z",signature:"manojparvathaneni / Copilot SDK"},{layout:M,title:O,owner:J,status:Y,reviewed:I,signature:T}=t;var j=h(`<h2>Context</h2> <p>This decision replaces <a href="/kb/decisions/0001-dedupe-by-subject">0001: duplicates share a subject line</a>.
That accepted record remains unchanged as history. Its subject-only rule and the old
incident prose conflict with the computed cause table and the dedupe explorer.
The <a href="/kb/triage/dedupe">current triage page</a> now uses the rule below.</p> <p>Scope: the support desk’s export dated 4 October 2026, reviewed on 28 October.
These are snapshot counts, not a claim about today’s queue. Tables and charts run the
exported logic against the data; they are not numbers copied from the old prose.</p> <h2>Split the merged ticket</h2> <!> <p><strong>Parser:</strong> the shared parser interprets input month first for day-first tenants.
For example, Harbour Dental’s app report R-41200 says 7 April became 4 July.
The fix must respect the established tenant date contract on the app, email, and booking-v2
form paths. <a href="https://github.com/manojparvathaneni/mega-s01e03-what-it-shows/issues/2" rel="nofollow">Parser ticket</a>.</p> <p><strong>Hint:</strong> booking-v3 prints <code>MM/DD/YYYY</code>, but its form reads input using the day-first
tenant convention. Following that hint changes the intended date.
For example, Copper Studio’s form report R-41230 describes 6 January becoming 1 June;
intake incorrectly tagged it <code>parser</code>.
Align the displayed hint and form input contract; a parser-only fix is not sufficient. <a href="https://github.com/manojparvathaneni/mega-s01e03-what-it-shows/issues/1" rel="nofollow">Hint ticket</a>.</p> <p>The export contains the cause model, not the production booking implementation.
These tickets identify separate fixes and acceptance checks; they do not claim either
production bug has been fixed. The source desk’s #4471 is not an issue number in this repo.</p> <h2>Count what the evidence supports</h2> <!> <!> <p>The reports begin in April. Do not date the incident from the July merge spike, or treat
the desk’s “known” status as proof that all incoming reports share one cause.</p> <h2>Decision: same cause, not same subject</h2> <ol><li>Deduplicate export rows by report ID. A new customer report is not an export duplicate.</li> <li>Read the report and resolve its tenant in the directory. Use the tenant’s locale and
booking-form version, not the reporter’s browser locale.</li> <li>Use <code>dayFirst</code> and <code>causeOf</code> from <code>src/lib/kb/causes.ts</code>. For a known day-first tenant,
booking-v3 <strong>form</strong> reports are <code>hint</code>; app/email and booking-v2 form reports are <code>parser</code>.</li> <li>Merge only after establishing the same cause. Subject equality is neither necessary nor
sufficient. <code>sameCause</code> is a guard for these known causes, not a universal classifier for
every product the support desk handles.</li> <li>Unknown tenant, unsupported locale, or unclear behavior: keep the report separate and
request evidence. Do not merge on a matching subject or silently call it <code>parser</code>.</li></ol> <h2>Check the rule while the desk keeps working</h2> <!> <p>Different subjects can share a cause: Kettle Books app and email reports belong together.
Identical subjects can hide different causes: Alder Physio form versus app, or Copper
Studio form versus Morrow Tax form, must stay apart.
Different subjects on Pale Harbour and Alder Physio forms share the hint cause.
An unknown sender must remain unresolved even when both subjects match.</p> <h2>Consequences and follow-up</h2> <ul><li>Engineering gets a separate ticket and report count for each cause, not one broad symptom.</li> <li>Triage must look up tenant and channel evidence; it cannot safely merge from subjects alone.</li> <li>The source export still records its old merges. These replacement GitHub tickets do not
rewrite the source ticket system.</li> <li>Rebuild and review when reports or tenant settings change. Do not silently mix new queue
totals with this dated snapshot; recheck classification and ticket counts.</li> <li>Read the rendered KB, including its stale banners, tables, explorer, and chart, before
relying on prose. The old policy was accepted but stale; acceptance is not freshness.</li></ul> <!>`,1);function D(i,c){const p=g(c,["children","$$slots","$$events","$$legacy"]);m(i,b(()=>p,()=>t,{children:(l,$)=>{var o=j(),r=e(f(o),8);k(r,{ticket:4471,get issues(){return y}});var s=e(r,10);_(s,{});var a=e(s,2);v(a,{ticket:4471});var n=e(a,10);w(n,{});var d=e(n,8);x(d,{get signature(){return T}}),u(l,o)},$$slots:{default:!0}}))}const K=Object.freeze(Object.defineProperty({__proto__:null,default:D,metadata:t},Symbol.toStringTag,{value:"Module"}));export{K as _,D as a};
