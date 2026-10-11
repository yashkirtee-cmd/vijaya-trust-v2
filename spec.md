# Vijaya Trust v2 — Specification

> **Status:** Living spec, reverse-engineered from the codebase at commit `a70b083` (2026-10-11).
> **How to use this doc:** This is the source of truth for the site. Any change should start by editing this spec (add or modify a requirement ID), then implement, then verify against the acceptance criteria. Requirements marked **⚠ Gap** describe intended behaviour the current code does not yet meet.

---

## 1. Overview

### 1.1 Purpose
A static marketing website for **Vijaya Trust**, a Bengaluru-based charity (est. 2026) that empowers underprivileged women and children through education, skill training, health, nutrition, and legal awareness programs.

### 1.2 Goals
| ID | Goal |
|----|------|
| G-1 | Explain who the Trust is (mission, vision, values, story). |
| G-2 | Present the programs offered, grouped by audience (women / children). |
| G-3 | Convert visitors into **donors** (bank transfer details) and **volunteers** (sign-up form). |
| G-4 | Provide a way to **contact** the Trust. |
| G-5 | Load fast, work on mobile, and be deployable with zero build step. |

### 1.3 Non-goals
- No CMS, backend, database, or user accounts.
- No online payment gateway (donations are by bank transfer only).
- No build tooling, framework, or package manager.

### 1.4 Audience
- **Prospective donors** (individuals, CSR teams) — need trust signals and payment details.
- **Prospective volunteers** — need program info and a sign-up path.
- **Beneficiaries / community members** — need to know what help is available and how to reach the Trust.

---

## 2. Architecture

### 2.1 Stack
| Layer | Choice |
|-------|--------|
| Markup | Plain HTML5, one file per page |
| Styling | Single global stylesheet `style.css`, BEM-style class names, CSS custom properties |
| Behaviour | Single vanilla JS file `script.js` (no dependencies) |
| Fonts | Google Fonts: Poppins (400/600/700/800), Open Sans (400/500/600) |
| Images | Inline-authored SVG illustrations in `illustrations/`; emoji used as icons |
| Hosting | Vercel (static), project `vijaya-trust-v2` |

### 2.2 File layout
```
/
├── index.html            Home (single long page with anchored sections)
├── about.html            About Us
├── projects.html         Programs (URL is "projects", label is "Programs")
├── logo.svg              Brand mark (also the favicon)
├── style.css             All styles
├── script.js             All behaviour
├── illustrations/        8 SVGs (300×240 viewBox, #FFF6EE background)
│   ├── community.svg  education.svg  empowerment.svg  health.svg
│   └── legal.svg  nutrition.svg  scholarship.svg  skill-training.svg
├── .claude/agents/       Scoped Claude Code subagents (see §8)
└── spec.md               This document
```

### 2.3 Constraints
- **C-1** Every page must work when opened directly from disk (`file://`) — relative links only, no absolute root paths.
- **C-2** No third-party scripts other than Google Fonts CSS.
- **C-3** All pages share one `style.css` and one `script.js`; scripts must null-check elements because not every element exists on every page.

---

## 3. Site map & navigation

```
index.html ─┬─ #home  #about  #programs  #impact  #donate  #contact
            ├─ about.html
            └─ projects.html
```

### 3.1 Global navigation (NAV)
| ID | Requirement | Acceptance criteria |
|----|-------------|---------------------|
| NAV-1 | Every page has an identical fixed top nav: logo + links About, Programs, Impact, Contact, and a **Donate** pill button. | Links resolve to `about.html`, `projects.html`, `index.html#impact`, `index.html#contact`, `index.html#donate` on all 3 pages. |
| NAV-2 | Logo = `logo.svg` mark (36×36) + wordmark "**Vijaya** Trust" ("Trust" in weight 400), linking to `index.html`. Same lockup in nav and footer. | Mark has `alt=""` (decorative — the wordmark text is the accessible name). |
| NAV-3 | On the home page the nav starts transparent over the hero and becomes solid white with shadow after scrolling > 60px. | Class `scrolled` toggles at `scrollY > 60`. |
| NAV-4 | On inner pages the nav is always solid (`scrolled` class hard-coded in HTML; scroll listener not attached). | — |
| NAV-5 | The current page's link has class `active` (orange). | About link active on `about.html`; Programs link active on `projects.html`. |
| NAV-6 | At ≤ 640px the links collapse behind a hamburger (`#navToggle`); tapping toggles `.open`; tapping any link closes the menu. | — |
| NAV-7 ⚠ Gap | Hamburger must expose state to assistive tech. | `aria-expanded` and `aria-controls="navLinks"` set and updated on toggle. |

### 3.2 Global footer (FTR)
| ID | Requirement | Acceptance criteria |
|----|-------------|---------------------|
| FTR-1 | Every page has a three-column footer: brand (logo, tagline, ©), Quick Links, Contact (city, email, hours). | — |
| FTR-2 | Quick Links must be identical across pages. | All 3 pages list: About Us, Programs, Impact, Donate, Contact (same hrefs as NAV-1). |

---

## 4. Page specifications

### 4.1 Home — `index.html`
Title: *Vijaya Trust — Empowering Women & Children, Bengaluru*; has a meta description.

| ID | Section (`id`) | Content requirements |
|----|----------------|----------------------|
| HOME-1 | Hero (`#home`) | Full-viewport dark gradient (navy → purple → green) with dot pattern + radial glows. Badge "Est. 2026 · Bengaluru". H1 three lines: "Empowering Women. / Nurturing Children. / *Building Futures.*" (last line orange). Subtext. CTAs: **Donate Now** → `#donate`, **Our Programs** → `projects.html`. |
| HOME-2 | About snapshot (`#about`) | Two-column grid: `empowerment.svg` left; right has label "Who We Are", H2 "A Trust Built on Belief", 2 paragraphs (incl. *Vijaya* = **victory**), button → `about.html`, and three cards: Mission (orange border), Vision (green border), Values (purple border). |
| HOME-3 | Programs snapshot (`#programs`) | Header "What We Do / Our Programs". 3×2 grid of 6 cards, each with SVG illustration + title + one line: Skill Training, Education Support, Health Awareness, Nutrition Program, Legal Rights, Scholarships. CTA **View All Programs** → `projects.html`. |
| HOME-4 | Impact (`#impact`) | Dark gradient. Header "Our Impact / What We Stand For". 4 cards (emoji + title + line): Women Empowered, Children Supported, Community Driven, Lasting Change. Qualitative only — no numbers. |
| HOME-5 | Donate & Volunteer (`#donate`) | Two columns. **Left:** "Support Us / Make a Difference", copy, bank-details table (Account Name, Bank, Account No., IFSC, Branch) + 80G note. **Right:** Volunteer form (see FORM-1). |
| HOME-6 | Contact (`#contact`) | Two columns. **Left:** Address, Email (mailto), Office Hours (Mon–Sat 9–6 IST). **Right:** Contact form (see FORM-2). |

### 4.2 About — `about.html`
Title: *About Us — Vijaya Trust*.

| ID | Section | Content requirements |
|----|---------|----------------------|
| ABOUT-1 | Page hero | Shared `.page-hero` gradient; label "Est. 2026 · Bengaluru", H1 "About Vijaya Trust", one-line summary. |
| ABOUT-2 | Mission & Vision | Two cards side-by-side: Mission (orange accent, warm bg), Vision (green accent, mint bg). |
| ABOUT-3 | Core Values | 4 cards: Compassion 💛, Dignity 🛡️, Transparency 📊, Community 🌍 — each with one-sentence description. |
| ABOUT-4 | Our Story | 3 paragraphs (origin, growth, meaning of *Vijaya*) + 2×2 highlight grid: Founded 2026 · Focus Women & Children · Driven by Volunteers & Community · Tax Benefit 80G. |
| ABOUT-5 | Our Team | Description, `community.svg` illustration, CTA **Get In Touch** (mailto). No individual team members listed. |
| ABOUT-6 ⚠ Gap | `<head>` | Add a `<meta name="description">`. |

### 4.3 Programs — `projects.html`
Title: *Programs — Vijaya Trust*.

| ID | Section | Content requirements |
|----|---------|----------------------|
| PROG-1 | Page hero | Label "What We Do", H1 "Our Programs", tagline about two pillars. |
| PROG-2 | Women Empowerment | 2-column grid of 4 program cards. |
| PROG-3 | Child Welfare | 2-column grid of 4 program cards (warm background). |
| PROG-4 | CTA band | Dark band "Want to Support a Program?" with **Donate Now** → `index.html#donate`, **Contact Us** → `index.html#contact`. |
| PROG-5 ⚠ Gap | `<head>` | Add a `<meta name="description">`. |

**Program card data model** (each `.project-card`):
```
icon    : emoji
tag     : "Category · Category"
title   : string (h3)
summary : 1–2 sentences
status  : "Active"   (class .project-card__status.active; only status defined today)
```

**Program catalogue**
| Pillar | Title | Icon | Tag |
|--------|-------|------|-----|
| Women | Skill Training Workshop | ✂️ | Skills · Livelihood |
| Women | Health Awareness Camp | 💊 | Health · Nutrition |
| Women | Legal Rights Awareness | ⚖️ | Legal · Rights |
| Women | Self-Defence Classes | 🛡️ | Safety · Confidence |
| Children | Education Support Program | 📚 | Education · Scholarships |
| Children | Nutrition Program | 🍱 | Nutrition · Health |
| Children | After-School Activities | 🎨 | Arts · Sports |
| Children | Annual Scholarship | 🏅 | Scholarship · Education |

> Rule: the home-page snapshot (HOME-3) shows 6 of these 8; Self-Defence and After-School are programs-page only. Any program added or renamed must be updated in both places if it appears in the snapshot.

---

## 5. Interactive behaviour (`script.js`)

### 5.1 Forms
| ID | Requirement | Acceptance criteria |
|----|-------------|---------------------|
| FORM-1 | **Volunteer form** `#volunteerForm`: Full Name (required), Email (required, type=email), Phone (optional, tel), Area of Interest (select: Teaching/Tutoring, Skill Training, Health & Nutrition, Fundraising, Tech/Web, Other). | Native HTML validation blocks empty required fields. On submit the data is emailed (FORM-3); on success `#formSuccess` is shown and the form reset; on failure `#formError` is shown. |
| FORM-2 | **Contact form** `#contactForm`: Name, Email, Message — all required. | Same flow as FORM-1 using `#contactSuccess` / `#contactError`. |
| FORM-3 | Submissions are emailed to the Trust inbox via **Web3Forms** (`POST https://api.web3forms.com/submit`, JSON). Access key is the `WEB3FORMS_KEY` constant in `script.js` (public by design; it is tied to the receiving inbox). Subjects: "New volunteer sign-up — Vijaya Trust" / "New contact message — Vijaya Trust". The visitor's `email` becomes Reply-To. | Submit button shows "Sending…" and is disabled while in flight. Success message only after the API returns `success: true`. Hidden `botcheck` checkbox acts as a spam honeypot. Web3Forms rejects server-side calls (curl etc.) on the free plan, so test from a browser only. |
| FORM-4 | Result messages are announced to screen readers. | Success has `role="status"`, error has `role="alert"` and includes a `mailto:` fallback. |

### 5.2 Scroll animation
| ID | Requirement |
|----|-------------|
| ANIM-1 | Cards (`.program-card, .snap-card, .impact__card, .value-card, .project-card, .highlight-card`) start at `opacity:0; translateY(20px)` and fade/slide in once when 10% visible (IntersectionObserver), 0.5s ease. |
| ANIM-2 ⚠ Gap | Respect `prefers-reduced-motion: reduce` — skip the animation and show cards immediately. |
| ANIM-3 ⚠ Gap | Content must remain visible if JS fails (hide-then-reveal is currently applied by JS, so this is satisfied; keep it that way — never set `opacity:0` in CSS). |

---

## 6. Design system (`style.css`)

### 6.1 Tokens (`:root`)
| Token | Value | Use |
|-------|-------|-----|
| `--orange` | `#F4631E` | Primary brand, CTAs, labels, accents |
| `--orange-light` | `#FF8C42` | Hover, hero emphasis |
| `--green` | `#1B8A6B` | Secondary brand, success, status |
| `--green-light` | `#25B48A` | (reserved) |
| `--dark` | `#1C1C2E` | Text, dark sections, footer |
| `--mid` | `#4A4A6A` | Body copy |
| `--muted` | `#7A7A9A` | Notes, tags |
| `--bg` | `#FAFAF8` | Page / input background |
| `--white` | `#FFFFFF` | Cards |
| `--warm` | `#FFF6EE` | Alternate section / card background |
| `--purple` | `#9B59B6` | Values snap-card accent |
| `--purple-deep` | `#2D1B4E` | Hero gradient mid-stop |
| `--green-deep` | `#1B3A2D` | Hero / impact gradient end-stop |
| `--peach` | `#FFB38A` | Light labels and badge on dark backgrounds |
| `--mint` | `#F0FBF7` | Vision card background |
| `--mint-strong` | `#E8F8F2` | "Active" status pill background |
| `--border` | `#E8E4DF` | Form input borders |
| `--divider` | `#F0EDE8` | Table row dividers |
| `--gradient-hero` | `135deg, dark → purple-deep 40% → green-deep` | `.hero`, `.page-hero` |
| `--shadow` | `0 4px 24px rgba(0,0,0,.08)` | Cards |
| `--radius` | `14px` | Cards, images |
| `--font-head` | Poppins | Headings, buttons, labels |
| `--font-body` | Open Sans | Body |

Rule **DS-1:** New colours must be added as tokens, not hard-coded. Hex values may appear only inside `:root`. (Translucent `rgba()` overlays on dark sections are allowed inline in rules.)

### 6.2 Components
| Component | Classes |
|-----------|---------|
| Buttons | `.btn` + `--primary` (orange), `--outline` (white on dark), `--outline-dark`, `--nav`, `--full` |
| Section scaffold | `.section` (96px vertical padding), `.section__label`, `.section__title`, `.section__desc`, `.section__header[--light]` |
| Cards | `.snap-card[--orange|--green|--purple]`, `.program-card`, `.impact__card`, `.value-card`, `.highlight-card`, `.mv-card[--orange|--green]`, `.project-card` |
| Forms | `.form-group` (label + input/select/textarea), `.form-success` |
| Heroes | `.hero` (home, 100vh), `.page-hero` (inner pages) |

Section backgrounds alternate between `--white`, `--warm`, and dark gradients to create rhythm.

### 6.3 Responsive breakpoints
| Breakpoint | Behaviour |
|------------|-----------|
| > 900px | Desktop layouts as described above. |
| ≤ 900px | Two-column grids → one column; 4-col grids → 2 col; programs snapshot 3 → 2 col; footer 3 → 2 col. |
| ≤ 640px | Section padding 64px; hamburger nav; programs & project cards → 1 col; hero/CTA buttons stack; footer → 1 col. |

**RESP-1:** No horizontal scroll at 320px width on any page.

### 6.4 Logo
- **LOGO-1** Mark: *"The Embrace"*. An orange arm (`--orange`) and a green arm (`--green`) curve into a **V**, holding a child figure (`--orange-light`). They represent the two pillars (women and children) and *Vijaya* = victory.
- **LOGO-2** Source of truth is `logo.svg` (64×64 viewBox, transparent background). It must stay legible at 16px and on both the white nav and the dark hero/footer.
- **LOGO-3** Every page links it as the favicon: `<link rel="icon" type="image/svg+xml" href="logo.svg">`.

### 6.5 Illustrations
- **ILL-1** All SVGs use `viewBox="0 0 300 240"`, a rounded `#FFF6EE` background rect, and only brand palette colours.
- **ILL-2** Every `<img>` has meaningful `alt` text.

---

## 7. Non-functional requirements

| ID | Category | Requirement |
|----|----------|-------------|
| NFR-1 | Performance | No JS frameworks; total page weight (excluding fonts) < 150 KB. Fonts loaded with `preconnect` + `display=swap`. |
| NFR-2 | Accessibility | WCAG 2.1 AA target: semantic landmarks, labelled form fields, visible focus, sufficient contrast. ⚠ Gap: inputs use `outline: none` — focus relies on border colour only; NAV-7, FORM-4, ANIM-2. |
| NFR-3 | SEO | Unique `<title>` per page; meta description on every page (⚠ ABOUT-6, PROG-5). |
| NFR-4 | Browser support | Latest 2 versions of Chrome, Safari, Firefox, Edge; iOS Safari and Android Chrome. |
| NFR-5 | Privacy | No analytics or tracking cookies. Contact email is public by design. Form data is processed by Web3Forms (third party) only to deliver the email. |
| NFR-6 | Maintainability | Content in HTML, presentation in CSS, behaviour in JS — no inline `style=""` attributes in HTML. (Runtime styles set by `script.js` for ANIM-1 are exempt.) |

---

## 8. Development workflow

### 8.1 Spec-driven loop
1. **Specify** — add/modify a requirement in this file with an ID and acceptance criteria.
2. **Implement** — delegate to the appropriate scoped agent.
3. **Verify** — open the page(s) at desktop, 900px, and 375px widths; check every acceptance criterion touched.
4. **Deploy** — via the deploy agent.
5. Clear the ⚠ Gap marker once a requirement is met.

### 8.2 Agents (`.claude/agents/`)
| Agent | May edit | Must not edit |
|-------|----------|---------------|
| `content-agent` | `index.html`, `about.html`, `projects.html` (text, links, structure) | `style.css`, `script.js`, `.claude/` |
| `style-agent` | `style.css` | HTML pages, `script.js`, `.claude/` |
| `deploy-agent` | nothing — runs `vercel --prod --yes` | all site files |

`script.js` and `illustrations/` currently have no owning agent; changes there are made directly.

### 8.3 Deployment
| Item | Value |
|------|-------|
| Command | `vercel --prod --yes` |
| Pre-check | `git status` must be clean |
| Post-check | https://vijaya-trust-v2.vercel.app returns 200 |
| Repo | https://github.com/yashkirtee-cmd/vijaya-trust-v2 |

---

## 9. Open questions & placeholders

| ID | Item | Owner |
|----|------|-------|
| OQ-1 | Bank **Account No.** (`XXXX XXXX XXXX`) and **IFSC** (`SBIN0XXXXXX`) are placeholders — must be replaced before promoting donations. | Trust |
| OQ-2 | ~~Form backend~~ → Web3Forms chosen. Free tier: 250 submissions/month. Key registered to the Trust inbox for `vijaya-trust-v2.vercel.app`. | Trust |
| OQ-3 | Full postal address and phone number for the Contact section. | Trust |
| OQ-4 | Should Impact show real numbers (beneficiaries, workshops held) once data exists? | Trust |
| OQ-5 | 80G registration number to display alongside the tax-exemption claim. | Trust |
| OQ-6 | Add Open Graph tags, a PNG/apple-touch-icon fallback, and a 404 page? (SVG favicon done — LOGO-3) | Dev |

---

## 10. Requirement index (gaps to close)

| ID | Summary |
|----|---------|
| NAV-7 | `aria-expanded` on hamburger |
| ABOUT-6, PROG-5 | Meta descriptions on inner pages |
| ANIM-2 | Reduced-motion support |
| NFR-2 | Visible focus outlines |
| OQ-1 … OQ-6 | Content/ops placeholders |
