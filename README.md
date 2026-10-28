# kb — the support knowledge base

**kb** = knowledge base. What the support desk knows about how our products break, written
down where the code can keep it honest.

One desk takes reports for every product we run: `sched-prod` (calendar invites for about
300k people) and the rest. When something
goes wrong, the reports reach the desk first. This kb is how the desk triages them, what each
incident turned out to be, and why we decided what we decided.

## What's here

```
src/routes/kb/      the pages (.svx: Markdown with components)
  triage/           how the desk handles incoming reports
  incidents/        one page per big ticket
  decisions/        numbered decision records
src/lib/kb/         components and the logic they run
src/lib/layouts/    the frame every page shares
src/lib/data/       exports from the ticket system
```

## Conventions

- Words in the page, logic in `src/lib` (imported as `#lib/…`). A number that can be computed belongs in a component.
- Every page starts with frontmatter: `title`, `owner`, `status`, `reviewed`.
- A decision is never edited after it is accepted. A new record replaces it.
- A page you add is signed: its frontmatter carries your `signature` and it ends with `<RenderStamp {signature} />`, so the desk knows who wrote it.

## Owners

Support desk. Decision records: whoever signed them.

---

Exported 2026-10-04 from the `support` repo, `apps/kb/` → `src/`.

## S01E03 review

This public course workspace preserves the supplied report/tenant data and accepted
decisions 0001 and 0002. It adds a course-signed [replacement decision](src/routes/kb/decisions/0003-signed-4471-review/+page.svx),
updates active triage and incident guidance, and links the separate
[parser](https://github.com/manojparvathaneni/mega-s01e03-what-it-shows/issues/2) and
[hint](https://github.com/manojparvathaneni/mega-s01e03-what-it-shows/issues/1) tickets.
The counts are for the exported snapshot, not today's queue.

The subsequent [signed engineering resolution](src/routes/kb/incidents/4471-resolution/+page.svx)
and its [rendered page](site/kb/incidents/4471-resolution/index.html) record the live desk update:
parser fixed (completed), booking-v3 retired (hint not planned). The original counts and
accepted decisions are retained.

The desk-facing rendered page is committed at
[`site/kb/decisions/0003-signed-4471-review/index.html`](site/kb/decisions/0003-signed-4471-review/index.html),
alongside its CSS, JavaScript, and other rendered KB pages. This is actual Svelte/mdsvex
output, including computed tables, the timeline, the interactive explorer, and the desk
reference derived from the signature.

### Reproduce

With Node.js 24 and npm:

```sh
npm ci
npm run build
npm test
npm run preview -- --port 4173
```

Open `http://127.0.0.1:4173/kb/decisions/0003-signed-4471-review/`.
The generated site uses root-relative URLs, so serve it over HTTP rather than opening
the HTML through `file://`. No model calls, API keys, or production booking code are used.
