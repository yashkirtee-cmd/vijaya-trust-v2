# Goal Spec — Vijaya Trust Website

> Defines *what* we're building and *why*. The other specs (`frontend-spec.md`, `api-contract-spec.md`, `backend-spec.md`) derive from this one.

## Delivery Status

"Done" means implemented in the repository and deployed to https://vijaya-trust-v2.vercel.app. "Outstanding" means agreed but not yet implemented. "Future" means deferred.

| Stage | Status | Scope |
|-------|--------|-------|
| Static website (3 pages) | Done | Home, About and Programs pages; nav, footer, responsive layout, design tokens, "Embrace" logo and favicon. |
| Email-backed forms | Done — browser test pending | Volunteer and Contact forms email the Trust inbox via Web3Forms (`api-contract-spec.md`). |
| Accessibility & SEO polish | Outstanding | NAV-7, ABOUT-6, PROG-5, ANIM-2, NFR-2 (`frontend-spec.md` §11). |
| Real organisation details | Outstanding | Bank account/IFSC, postal address, phone, 80G number (OQ-1, OQ-3, OQ-5). |
| Git-push deploys | Outstanding | Connect the Vercel project to GitHub so every push to `main` deploys (`backend-spec.md` §9). |
| Automated checks | Future | HTML validation and link checking in CI. |
| Social sharing extras | Future | Open Graph tags, PNG/apple-touch icon, 404 page (OQ-6). |

## 1. Problem Statement
Vijaya Trust is a new (est. 2026) Bengaluru charity helping underprivileged women and children. Without a website, potential donors, volunteers and beneficiaries can only hear about it by word of mouth. They have no way to check that it's legitimate, see what it does, or get in touch. This site gives the Trust a credible public presence and turns visitors into donors, volunteers and contacts.

## 2. Target Users
| Persona | Need |
|---------|------|
| **Donor** (individuals, CSR teams) | Trust signals (mission, values, 80G status) and bank-transfer details. |
| **Volunteer** | Understand the programs and sign up with an area of interest. |
| **Beneficiary / community member** | Know what help is available and how to reach the Trust. |
| **Trust staff** (site owner) | Receive form submissions by email without running a server. |

## 3. Core Use Cases
- As a **donor**, I want to see bank-transfer details and 80G information so that I can donate and claim tax exemption.
- As a **volunteer**, I want to submit my name, contact details and area of interest so that the Trust can reach out to me.
- As a **visitor**, I want to send a message through a contact form so that I can ask a question without opening my email app.
- As a **visitor**, I want to read the mission, values, story and programs so that I can decide whether to support the Trust.
- As a **beneficiary**, I want to see the programs for women and for children so that I know what help I can ask for.
- As the **Trust**, I want every form submission to arrive in my inbox so that no enquiry is lost.

## 4. Core Features (MVP)
- Responsive static website (desktop and mobile browsers), three pages: Home, About, Programs.
- Home: hero, about snapshot, programs snapshot, impact, donate (bank details) + volunteer form, contact info + contact form.
- About: mission, vision, core values, story, team call-to-action.
- Programs: 4 women's programs and 4 children's programs, each with tag and status.
- Volunteer and Contact forms delivered by email (Web3Forms).
- Brand identity: "Embrace" logo, favicon, orange/green palette, Poppins + Open Sans.
- Hosted on Vercel.

## 5. Nice-to-Have Features (Post-MVP)
- Real impact numbers (beneficiaries, workshops held) once data exists (OQ-4).
- Open Graph tags, PNG/apple-touch icon, custom 404 page (OQ-6).
- Automatic deploy on every git push.
- Automated HTML validation and link checking.

## 6. Out of Scope
- Backend server, database, CMS or user accounts.
- Online payment gateway (donations are by bank transfer only).
- Build tooling, JS framework or package manager.
- AI features, and therefore AI and observability specs.
- Analytics and tracking cookies.

## 7. Success Metrics
- A Contact or Volunteer form submission arrives in the Trust inbox within a minute.
- Bank-transfer details and the 80G note are visible on the Home page (with real values once OQ-1 is resolved).
- Every page is usable at 320px width with no horizontal scroll (RESP-1).
- All pages, `logo.svg` and `script.js` return HTTP 200 on the live URL after each deploy.
- Lighthouse Accessibility score ≥ 90 on all three pages (once the NFR-2 gaps are closed).

## 8. Constraints & Assumptions
- Team: 1 person, assisted by Claude Code subagents (`.claude/agents/`).
- Budget: free tiers only (Vercel Hobby, Web3Forms free: 250 submissions/month).
- Platform: web only, responsive. No native app.
- Every page must also work when opened from disk (`file://`), so links stay relative (C-1).
- Form submissions only work from a browser; Web3Forms' free plan rejects server-side calls.

## 9. Glossary
| Term | Definition |
|------|------------|
| Trust | Vijaya Trust, the Bengaluru charity this site represents. *Vijaya* means "victory". |
| Pillar | One of the two audiences the Trust serves: **Women** or **Children**. |
| Program | A specific ongoing activity under a pillar (e.g. Skill Training Workshop), shown as a card on the Programs page. |
| Snapshot | A shortened preview section on the Home page that links to a full page (About snapshot, Programs snapshot). |
| Donor | A person or organisation giving money by bank transfer. |
| Volunteer | A person offering time, captured by the Volunteer form with an area of interest. |
| 80G | Section 80G of the Indian Income Tax Act. Donations to registered trusts are partly tax-deductible. |
| Submission | One Volunteer or Contact form entry, delivered to the Trust inbox by Web3Forms. |
