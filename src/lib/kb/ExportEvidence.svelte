<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import { causeOf, groupByCause, uniqueById, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';

  const all = uniqueById(reports as Report[]);
  const merged = all.filter((r) => r.mergedInto === 4471);
  const groups = groupByCause(merged, tenantOf);
  const wrongTags = merged.filter((r) => causeOf(r, tenantOf(r)) !== r.meta.intakeTag);
  const oneDay = merged.filter((r) => notes.oneDayMove.includes(r.id));
  const unplaced = groups.find((g) => g.cause === 'unplaced');
  const mergeDays = new Map<string, number>();
  const months = new Map<string, number>();
  for (const r of merged) {
    const month = r.receivedAt.slice(0, 7);
    months.set(month, (months.get(month) ?? 0) + 1);
    if (r.mergedAt) {
      const day = r.mergedAt.slice(0, 10);
      mergeDays.set(day, (mergeDays.get(day) ?? 0) + 1);
    }
  }
  const peak = [...mergeDays.entries()].sort((a, b) => b[1] - a[1])[0];
  const receivedOnPeak = peak ? merged.filter((r) => r.receivedAt.slice(0, 10) === peak[0]).length : 0;
  const oneDayCauses = [...new Set(oneDay.map((r) => causeOf(r, tenantOf(r)) ?? 'unplaced'))];
</script>

<p>
  The export contains <strong>{reports.length}</strong> rows, but
  <strong>{all.length}</strong> unique report IDs:
  <strong>{reports.length - all.length}</strong> repeated rows are overlapping export pages.
  Of these, <strong>{merged.length}</strong> reports belong to source ticket #4471.
  The tenant-based rule finds <strong>{groups.filter((g) => g.cause !== 'unplaced').length}</strong>
  causes and <strong>{unplaced?.reports.length ?? 0}</strong> unplaced reports.
</p>

<p>
  Intake tags disagree with the tenant-based classification on <strong>{wrongTags.length}</strong>
  reports. Browser locale and intake tags describe intake guesses, not the tenant's date contract.
</p>

<p>
  <strong>{oneDay.length}</strong> reports in the desk notes describe a one-day move:
  {#each oneDay as r, i}
    {i ? ', ' : ''}<code>{r.id}</code>
  {/each}.
  The supplied classifier places them under <code>{oneDayCauses.join(', ')}</code>.
  Keep that evidence visible, but do not invent a timezone cause from the wording alone.
</p>

{#if peak}
  <p>
    The largest merge day was <strong>{peak[0]}</strong>, with
    <strong>{peak[1]}</strong> reports merged, while only
    <strong>{receivedOnPeak}</strong> reports were received that day.
    A merge spike measures desk activity, not the start of the bug.
  </p>
{/if}

<table>
  <caption>Unique reports by received month, not merge month</caption>
  <thead><tr><th>Month</th><th>Reports received</th></tr></thead>
  <tbody>
    {#each [...months.entries()].sort(([a], [b]) => a.localeCompare(b)) as [month, count]}
      <tr><td>{month}</td><td>{count}</td></tr>
    {/each}
  </tbody>
</table>
