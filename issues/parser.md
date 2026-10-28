## Problem

The shared date parser reads month first even for tenants whose locale is day first. A date such as 7 April can become 4 July.

**379 unique reports** in the export belong to this cause, across **11 tenants**, received from **2026-04-01 through 2026-10-04**. This is the majority cause of source support ticket #4471; it is not the booking-v3 hint bug.

## Evidence and counting

- Source: `src/lib/data/reports-4471.json`, deduplicated by report `id`, filtered to `mergedInto === 4471`.
- The export has 427 rows but only 412 unique reports. Export-page overlap is not an extra report.
- Run `causeOf(report, tenant)` from `src/lib/kb/causes.ts` using the tenant directory, not `meta.browserLocale`, `meta.intakeTag`, or the subject.
- A day-first tenant's app/email reports and booking-v2 form reports fall here. Booking-v3 form reports fall under the separate hint issue.
- Intake tagged 356 of these reports `parser` and 23 `hint`; those tags are guesses, not root-cause evidence.
- R-41200: Harbour Dental, en-GB, booking-v2, app: "Our 7 April reminder went out on 4 July."
- R-41205: Morrow Tax, app: intake says `hint`, but tenant-based classification is `parser`.
- Five reports described as a one-day move (R-41202, R-41209, R-41236, R-41344, R-41620) remain in these 379 under the supplied cause logic. The export does not establish a third timezone bug.

## Expected behavior and acceptance checks

- Parse an explicitly established date format consistently with the tenant's locale; reject ambiguous or invalid input rather than silently flipping dates.
- For a day-first tenant, 07/04/2026 means 7 April, not 4 July.
- Cover app, email, and booking-v2 form paths, browser/tenant locale disagreement, ambiguous dates, and round trips.
- Keep booking-v3 hint reports in their separate issue. Fixing this parser does not resolve that misleading hint.

Counts describe the 4 October export, not live queue totals. Recompute from the data when it changes.
