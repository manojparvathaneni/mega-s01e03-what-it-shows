## Problem

booking-v3 displays `MM/DD/YYYY` to day-first tenants, but interprets form input using the tenant's day-first convention. People follow the month-first hint and get a different date. This is a form-label/input-contract bug, separate from the shared parser.

**33 unique reports** were incorrectly merged into source support ticket #4471, across **3 tenants**, received from **2026-04-17 through 2026-09-22**.

## Evidence and counting

- Deduplicate `src/lib/data/reports-4471.json` by `id`, filter `mergedInto === 4471`, then run `causeOf` with the tenant directory.
- The affected reports are `channel === 'form'`, the tenant runs `booking-v3`, and `dayFirst(tenant.locale)` is true.
- Alder Physio: 12 reports; Copper Studio: 11; Pale Harbour: 10.
- Intake tagged 18 `hint` and 15 `parser`. Do not substitute intake tags or browser locale for the tenant/form lookup.
- R-41230: Copper Studio, booking-v3 form, tagged `parser`: "My client came on 1 June instead of 6 January."
- R-41241: Alder Physio, booking-v3 form: "We had two people show up on 8 June. They were booked for 6 August."
- R-41251: Pale Harbour, booking-v3 form, tagged `parser`: "Wednesday 7 January showed as Wednesday 1 July."

## Reproduction

1. Use a booking-v3 form for a day-first tenant, for example Alder Physio (de-DE).
2. Observe the `MM/DD/YYYY` hint.
3. Enter 04/07/2026 to mean April 7, following that hint.
4. The tenant's day-first interpretation instead means July 4.

The input example follows the supplied cause model; the exported KB contains no production booking form executable to run directly.

## Expected behavior and acceptance checks

- Make the visible hint and form parser use the same tenant-specific date contract.
- Check all three affected tenants, browser/tenant locale disagreement, and ambiguous dates.
- Keep app/email reports from these tenants in the parser issue: the tenant alone is not enough to classify a report.
- A parser-only fix must not close this issue. Verify the form hint independently.

Counts describe the 4 October export. The 33 reports are distinct from the 379 parser reports; together they cover all 412 unique reports.
