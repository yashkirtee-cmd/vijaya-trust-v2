# Backend Spec — Vijaya Trust Website

> The site has **no backend by design** (`goal-spec.md` §6). This spec records that decision, the third-party services that stand in for one, and how the site is hosted and deployed.

## Delivery Status

| Item | Status |
|------|--------|
| Static hosting on Vercel | Done |
| Form email via Web3Forms (instead of a server) | Done |
| Git-push deploys (Vercel ↔ GitHub) | Outstanding. Blocked on adding a GitHub Login Connection in Vercel account settings |
| CI checks (HTML validation, link check) | Future |

## 1. Tech Stack
None. No server code, runtime, database or ORM. Vercel serves the repository's static files directly.

## 2. Architecture Overview
```
Browser ──GET──▶ Vercel CDN (index.html, about.html, projects.html, style.css, script.js, logo.svg, illustrations/)
Browser ──GET──▶ Google Fonts (Poppins, Open Sans)
Browser ──POST─▶ api.web3forms.com/submit ──email──▶ Trust inbox
```
All logic runs in the browser (`script.js`). See `api-contract-spec.md` for the Web3Forms call.

## 3. Data Model
No stored data. Content (programs, values, contact details) lives in the HTML files (`frontend-spec.md` §3). Form submissions are not stored by the site. They exist only as emails in the Trust inbox (and in Web3Forms' delivery logs).

## 4. Business Logic & Rules
- Required-field and email-format validation is done by the browser (HTML `required`, `type="email"`).
- Spam protection: Web3Forms' `botcheck` honeypot (`api-contract-spec.md` §5).

## 5. Authentication & Authorization
None. All pages are public. The Web3Forms access key is public by design (`api-contract-spec.md` §2).

## 6. Third-Party Integrations
| Service | Used for | Plan / limits |
|---------|----------|---------------|
| **Vercel** | Static hosting, HTTPS, CDN | Hobby (free). Project `vijaya-trust-v2`, account `yashkirtee-1698` |
| **Web3Forms** | Emailing Contact and Volunteer submissions | Free: 250 submissions/month, browser-only calls |
| **Google Fonts** | Poppins and Open Sans web fonts | Free |
| **GitHub** | Source repository | https://github.com/yashkirtee-cmd/vijaya-trust-v2 |

## 7. Non-Functional Requirements
- Availability depends on Vercel and Web3Forms. If Web3Forms is down, forms show an error with a `mailto:` fallback (FORM-4).
- No logging, monitoring or analytics (NFR-5).

## 8. Error Handling
Handled entirely client-side: see `api-contract-spec.md` §3 and FORM-1…4 in `frontend-spec.md`.

## 9. Environment & Deployment
| Item | Value |
|------|-------|
| Environments | Production only: https://vijaya-trust-v2.vercel.app |
| Env vars / build | None. No build step |
| Deploy command | `vercel --prod --yes` (run by `deploy-agent`) |
| Pre-check | `git status` clean, changes pushed to `main` |
| Post-check | `/`, `/about.html`, `/projects.html`, `/logo.svg`, `/script.js` return 200 |
| Git-push deploys | ⚠ Outstanding: add GitHub under Vercel → Account Settings → Authentication, then run `vercel git connect` |

## 10. Open Questions
- Add a CI workflow (GitHub Actions) for HTML validation and link checking once git-push deploys are connected?
- If form volume outgrows Web3Forms, replace it with a Vercel serverless function plus an email provider. That would turn this into a real backend spec.
