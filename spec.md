# Vijaya Trust v2 — Specifications

The source of truth for the site. It is split into four specs, following the course's spec-driven development format (Musafir Travel Build):

| Spec | Defines |
|------|---------|
| [`specs/goal-spec.md`](specs/goal-spec.md) | **What and why**: problem, users, use cases, MVP scope, success metrics, glossary. Start here. |
| [`specs/frontend-spec.md`](specs/frontend-spec.md) | **The site**: pages, components, forms, design tokens, logo, NFRs, deployment and agent workflow. Holds all requirement IDs (NAV, FTR, HOME, ABOUT, PROG, FORM, ANIM, DS, LOGO, ILL, RESP, NFR, OQ). |
| [`specs/api-contract-spec.md`](specs/api-contract-spec.md) | **The Web3Forms contract**: exact request/response shapes for the Contact and Volunteer forms. |
| [`specs/backend-spec.md`](specs/backend-spec.md) | **No backend by design**: third-party services, hosting and deploy settings. |

Each spec starts with a **Delivery Status** table (Done / Outstanding / Future).

## Workflow
1. **Specify:** add or change a requirement (with an ID and acceptance criteria) in the right spec. Change `goal-spec.md` first if the scope changes.
2. **Implement:** use the scoped agent (`content-agent` for HTML, `style-agent` for CSS) or edit directly for `script.js`.
3. **Verify:** check the acceptance criteria at desktop, 900px and 375px widths.
4. **Deploy:** `deploy-agent` (`vercel --prod --yes`), then confirm the live URL.
5. **Update status:** clear the ⚠ Gap marker and update the Delivery Status tables.

Not applicable to this project: the course's AI, observability and evaluation specs (no AI features. See `goal-spec.md` §6).
