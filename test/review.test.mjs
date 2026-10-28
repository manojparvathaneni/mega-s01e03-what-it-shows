import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import test from 'node:test';
import { causeOf, dayFirst, groupByCause, sameCause, uniqueById } from '../src/lib/kb/causes.ts';
import { deskRef } from '../src/lib/kb/desk-ref.ts';
import { DEDUPE_CASES } from '../src/lib/kb/dedupe-cases.ts';
import { issueLinks } from '../src/lib/kb/ticket-links.ts';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const raw = JSON.parse(read('../src/lib/data/reports-4471.json'));
const reports = uniqueById(raw).filter((r) => r.mergedInto === 4471);
const tenants = readdirSync(new URL('../src/lib/data/tenants/', import.meta.url))
  .map((file) => JSON.parse(read(`../src/lib/data/tenants/${file}`)));
const tenantOf = (report) => tenants.find((tenant) => tenant.handle === report.tenant);
const groups = groupByCause(reports, tenantOf);
const decisionPath = '../src/routes/kb/decisions/0003-signed-4471-review/+page.svx';
const decision = read(decisionPath);
const html = read('../site/kb/decisions/0003-signed-4471-review/index.html');
const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');

test('overlapping export rows do not inflate unique report counts', () => {
  assert.equal(raw.length, 427);
  assert.equal(reports.length, 412);
  assert.equal(raw.length - reports.length, 15);
  const seen = new Map();
  for (const report of raw) {
    if (seen.has(report.id)) assert.deepEqual(report, seen.get(report.id));
    seen.set(report.id, report);
  }
});

test('tenant and channel classification partitions all reports into the two tickets', () => {
  assert.deepEqual(groups.map((g) => [g.cause, g.reports.length, g.tenants]), [
    ['parser', 379, 11],
    ['hint', 33, 3],
  ]);
  assert.equal(groups.reduce((sum, group) => sum + group.reports.length, 0), reports.length);
  assert.deepEqual(groups.map((g) => [g.firstSeen, g.lastSeen]), [
    ['2026-04-01', '2026-10-04'],
    ['2026-04-17', '2026-09-22'],
  ]);
});

test('intake guesses are not silently substituted for causes', () => {
  assert.deepEqual(groups[0].taggedAs, { parser: 356, hint: 23 });
  assert.deepEqual(groups[1].taggedAs, { parser: 15, hint: 18 });
  assert.equal(reports.filter((r) => r.meta.intakeTag !== causeOf(r, tenantOf(r))).length, 38);
  for (const report of reports) {
    assert.equal(
      causeOf({ ...report, meta: { browserLocale: 'en-US', intakeTag: 'untrusted' } }, tenantOf(report)),
      causeOf(report, tenantOf(report)),
    );
  }
});

test('locale, channel, and form distinguish the two causes and unresolved cases', () => {
  assert.equal(dayFirst('de-DE'), true);
  assert.equal(dayFirst('en-US'), false);
  const v3 = tenantOf({ tenant: 'alder.physio' });
  assert.equal(causeOf({ channel: 'form' }, v3), 'hint');
  assert.equal(causeOf({ channel: 'app' }, v3), 'parser');
  assert.equal(causeOf({ channel: 'email' }, v3), 'parser');
  assert.equal(causeOf({ channel: 'form' }, tenantOf({ tenant: 'kettle.books' })), 'parser');
  assert.equal(causeOf({ channel: 'email' }, undefined), null);
  assert.equal(causeOf({ channel: 'form' }, { ...v3, locale: 'en-US' }), null);
});

test('all supplied dedupe counterexamples follow cause rather than subject', () => {
  assert.deepEqual(DEDUPE_CASES.map(({ a, b }) => sameCause(a, tenantOf(a), b, tenantOf(b))), [
    true, false, false, true, false,
  ]);
});

test('the five one-day descriptions remain visible within the parser count', () => {
  const ids = JSON.parse(read('../src/lib/data/desk-notes.json')).oneDayMove;
  assert.equal(ids.length, 5);
  for (const id of ids) {
    const report = reports.find((r) => r.id === id);
    assert.ok(report, id);
    assert.equal(causeOf(report, tenantOf(report)), 'parser');
    assert.ok(text.includes(id), `rendered evidence includes ${id}`);
  }
});

test('the queue spike is a merge event, not an onset date', () => {
  const inWeek = (iso) => iso.slice(0, 10) >= '2026-06-29' && iso.slice(0, 10) < '2026-07-06';
  assert.equal(reports.filter((r) => inWeek(r.receivedAt)).length, 15);
  assert.equal(reports.filter((r) => inWeek(r.mergedAt)).length, 189);
  assert.equal(reports.filter((r) => r.mergedAt.startsWith('2026-07-02')).length, 184);
  assert.equal(reports.filter((r) => r.receivedAt < '2026-07-01').length, 179);
  assert.match(html, /<svg[^>]*aria-label="reports received and merged into #4471, per week"/);
  assert.match(text, /A merge spike measures desk activity, not the start of the bug/);
});

test('the new page is genuinely rendered, signed, and linked to both public tickets', () => {
  const signature = decision.match(/^signature: '([^']+)'$/m)?.[1];
  assert.ok(signature);
  assert.ok(decision.includes('<RenderStamp {signature} />'));
  assert.ok(text.includes(deskRef(signature)));
  assert.ok(!text.includes('no desk ref:'));
  assert.match(text, /parser\s+379/);
  assert.match(text, /hint\s+33/);
  assert.match(html, /<select[^>]*aria-label="tenant"/);
  for (const url of Object.values(issueLinks)) assert.ok(html.includes(url), url);
});

test('accepted decision 0001 stays byte-for-byte unchanged', () => {
  const original = read('../src/routes/kb/decisions/0001-dedupe-by-subject/+page.svx');
  assert.equal(
    createHash('sha256').update(original).digest('hex'),
    '41ac5460f198519b61b72c1a344a89fc3f9c26eda481ad85d710fa23f336a1c9',
  );
});

test('accepted decision 0002 stays unchanged when the signed replacement is issued', () => {
  const original = read('../src/routes/kb/decisions/0002-dedupe-by-cause/+page.svx');
  assert.equal(
    createHash('sha256').update(original).digest('hex'),
    'a029384c9624fccbec3712c81b6096b32a3f7654e4b6bf66a4f2b68c06b3a1bf',
  );
});

test('active KB routes and index point the working desk at the replacement decision', () => {
  const triage = read('../site/kb/triage/dedupe/index.html').replace(/<[^>]*>/g, ' ');
  assert.match(triage, /same cause/);
  assert.ok(!triage.includes('Merge. Splitting a ticket later'));
  const index = read('../site/kb/index.html');
  assert.ok(index.includes('/kb/decisions/0003-signed-4471-review'));
  const incident = read('../site/kb/incidents/4471/index.html');
  for (const url of Object.values(issueLinks)) assert.ok(incident.includes(url));
});
