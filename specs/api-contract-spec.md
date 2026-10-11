# API Contract Spec — Vijaya Trust Website

> The binding contract between the site's forms (`frontend-spec.md` §4.3, FORM-1…4) and the one external API they call, **Web3Forms**. The site has no API of its own (`backend-spec.md`). `script.js` must send exactly these shapes.

## Delivery Status

| Item | Status |
|------|--------|
| `POST /submit` for the Contact and Volunteer forms | Done. Live on https://vijaya-trust-v2.vercel.app |
| End-to-end check from a browser (email received) | Outstanding |

## 1. Conventions
- **Base URL:** `https://api.web3forms.com` (hard-coded in `script.js`; there are no environments).
- **Versioning:** none. Web3Forms exposes a single unversioned endpoint.
- **Content-Type:** `application/json` request and response, plus `Accept: application/json`.
- **Naming case:** `snake_case` for Web3Forms' reserved fields (`access_key`, `from_name`); form fields use the HTML `name` attributes (`name`, `email`, `phone`, `interest`, `message`).
- **Caller:** browser only. The free plan rejects server-side requests (curl, serverless functions), returning `success: false`.

## 2. Authentication
A public **access key** in the request body (`access_key`), stored as the `WEB3FORMS_KEY` constant in `script.js`. The key is safe to publish: it can only send email to the inbox it was registered with (the Trust's inbox), for the domain `vijaya-trust-v2.vercel.app`. Domain restriction is off so that local `file://` testing works.

## 3. Common Response Envelope & Error Format
Every response is the same JSON shape, success or failure:
```json
// Success
{ "success": true, "message": "Email sent successfully!" }

// Failure (bad key, server-side call, quota exceeded, spam detected…)
{ "success": false, "message": "<reason>" }
```
The client must rely on `success`, never on the HTTP status alone. Any `success: false`, non-JSON body or network error is treated as a failure (FORM-1: show `#formError` / `#contactError`).

## 4. Endpoints

### `POST /submit` — Contact form
- **Description:** Email a visitor's message to the Trust inbox.
- **Auth required:** yes, `access_key` in body
- **Triggered by:** `#contactForm` submit (`index.html#contact`)
- **Request body:**
```json
{
  "access_key": "<WEB3FORMS_KEY>",
  "subject": "New contact message — Vijaya Trust",
  "from_name": "Vijaya Trust Website",
  "name": "Asha Rao",
  "email": "asha@example.com",
  "message": "How can I sponsor a child's education?"
}
```
- **Response `200`:** `{ "success": true, "message": "..." }`
- **Error responses:** `success: false` with a reason. See §6.

---

### `POST /submit` — Volunteer form
- **Description:** Email a volunteer sign-up to the Trust inbox.
- **Auth required:** yes, `access_key` in body
- **Triggered by:** `#volunteerForm` submit (`index.html#donate`)
- **Request body:**
```json
{
  "access_key": "<WEB3FORMS_KEY>",
  "subject": "New volunteer sign-up — Vijaya Trust",
  "from_name": "Vijaya Trust Website",
  "name": "Ravi Kumar",
  "email": "ravi@example.com",
  "phone": "+91 98765 43210",
  "interest": "Teaching / Tutoring"
}
```
- **Response `200`:** `{ "success": true, "message": "..." }`
- **Error responses:** `success: false` with a reason. See §6.

## 5. Data Schemas

### `ContactSubmission`
| Field | Type | Required | Source |
|-------|------|----------|--------|
| `name` | string | yes | `#cName` |
| `email` | string (email) | yes | `#cEmail`. Web3Forms uses it as Reply-To |
| `message` | string | yes | `#cMsg` |

### `VolunteerSubmission`
| Field | Type | Required | Source |
|-------|------|----------|--------|
| `name` | string | yes | `#vName` |
| `email` | string (email) | yes | `#vEmail`. Used as Reply-To |
| `phone` | string | no (sent as `""` if empty) | `#vPhone` |
| `interest` | enum: `""`, `Teaching / Tutoring`, `Skill Training`, `Health & Nutrition`, `Fundraising`, `Tech / Web`, `Other` | no | `#vArea` |

### Reserved fields (added by `script.js` to both)
| Field | Value |
|-------|-------|
| `access_key` | `WEB3FORMS_KEY` |
| `subject` | Per form, see §4 |
| `from_name` | `Vijaya Trust Website` |
| `botcheck` | Hidden honeypot checkbox. Only sent if ticked (by a bot), which makes Web3Forms reject the submission |

## 6. Status Code Reference
| Code | Meaning |
|------|---------|
| 200 | Request processed. Check `success` |
| Any non-200 | Rejected: invalid key, blocked server-side caller, spam, quota exceeded (free plan: 250/month) or validation failure. Body has `success: false` when it is JSON |
| Network error | Web3Forms unreachable. The client shows the error message with a `mailto:` fallback |

Exact non-200 codes are Web3Forms' choice and not relied on. The client branches only on `success`.

## 7. Open Questions
- Monthly volume: if submissions approach 250/month, upgrade the plan or move to a Vercel serverless function plus an email provider (would add a real `backend-spec.md`).
- Turn on domain restriction once local testing is no longer needed?
