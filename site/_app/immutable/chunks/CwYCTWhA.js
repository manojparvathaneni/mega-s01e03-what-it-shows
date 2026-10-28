import{a as h,f as c}from"./D8MaX8Q3.js";import{R as l}from"./DwrCouIR.js";import{y as o,g as p}from"./CGN5jdAV.js";import{l as u,s as f}from"./Dj88hTj6.js";import{C as g,i as m}from"./CeXhEeKc.js";import{R as b}from"./B4gcYFh4.js";const e={layout:"runbook",title:"#4471 · Engineering resolution: fixed versus retired",owner:"manojparvathaneni",status:"closed",reviewed:"2026-10-28T00:00:00.000Z",signature:"v1.eyJzdWIiOiIzMzc3IiwiYXVkIjoiY2hhbGxlbmdlOndoYXQtaXQtc2hvd3MiLCJpYXQiOjE3OTMyMjQzOTgsImV4cCI6MTc5MzMxMDc5OH0.Smb7POdVwEMUGi65fawQ_QioOIOoxb49CIEZbWQ-Y4o"},{layout:M,title:z,owner:j,status:C,reviewed:E,signature:v}=e;var w=c(`<h2>What changed after the first submission</h2> <p>The <a href="https://hq.mega.dev/challenges/what-it-shows" rel="nofollow">course’s engineering update</a> now says
source ticket #4471 closed on 5 October:</p> <table><thead><tr><th>Cause</th><th>Engineering outcome</th><th>Evidence</th><th>GitHub closure</th></tr></thead><tbody><tr><td>parser</td><td>FIXED</td><td><code>fix(dates): parse dd/mm for eu locales</code></td><td>completed</td></tr><tr><td>hint</td><td>WON’T FIX</td><td>booking-v3 form retired</td><td>not planned</td></tr></tbody></table> <p>These are different resolutions. A retired form is not a repaired hint.
The parser ticket closes as completed because engineering reports a fix; the hint ticket
closes as not planned because the affected form was retired. Neither is a duplicate of
the other.</p> <p>The first closure incorrectly marked both tickets completed. The hint ticket was reopened
and reclosed with the correct reason, with the original history retained.
The engineering update is the source of the outcome; this workspace did not execute or
independently verify the production fix.</p> <h2>Keep the original report counts</h2> <!> <p>The export is still the 4 October snapshot. Closing the tickets does not change those
counts, rewrite the source merges, or establish that a retired form was fixed.
The <a href="/kb/decisions/0003-signed-4471-review">signed cause review</a> contains the deduplication
method, tag disagreements, one-day-report caveat, timeline, and interactive counterexamples.
The accepted decisions remain unchanged.</p> <h2>Desk follow-up</h2> <p>The <a href="/kb/triage/dedupe">active triage rule</a> still requires matching causes rather than
matching subjects. For a new report, verify its actual form version and current engineering
status before routing it; the historical classifier is not proof that booking-v3 still runs.
Re-read the desk update before closing, because the export and an earlier submission do
not freeze the desk’s work.</p> <!>`,1);function k(s,i){const a=u(i,["children","$$slots","$$events","$$legacy"]);l(s,f(()=>a,()=>e,{children:(n,_)=>{var t=w(),r=o(p(t),12);g(r,{ticket:4471,get issues(){return m}});var d=o(r,8);b(d,{get signature(){return v}}),h(n,t)},$$slots:{default:!0}}))}const Q=Object.freeze(Object.defineProperty({__proto__:null,default:k,metadata:e},Symbol.toStringTag,{value:"Module"}));export{Q as _,k as a};
