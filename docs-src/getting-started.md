---
title: Getting started
description: Make your first Rift API call in the free sandbox in under five minutes, then move to production.
---

Rift gives your product wallets, payments and payouts through one REST API, an embeddable widget and TypeScript SDKs. This page takes you from nothing to a working call.

## 1. Pick an environment

| | Sandbox | Production |
|---|---|---|
| API base URL | `https://sandbox.riftfi.com` | `https://api.riftfi.com` |
| Cost | **Free. No payment needed.** | Flat **$88 per month** subscription |
| Widget script | `https://widget.sandbox.riftfi.com/embed.js` | `https://widget.riftfi.xyz/embed.js` |
| Funds | Test payment routes and sandbox wallets | Real customer funds |
| Keys and customers | Separate from production | Separate from sandbox |

Always build against sandbox first. A sandbox key does not work on production and the other way round. You can also send the header `X-Rift-Mode: sandbox` or `X-Rift-Mode: production` to say which environment's data a request is for; the base URLs above already imply it.

## 2. Get an API key

1. Open the Rift dashboard at [portal.riftfi.com](https://portal.riftfi.com) and create a project.
2. Copy the project's API key. Keys currently start with `sk_` (project secret key). Keys that start with `pk_` (public keys for frontend code) are being introduced; **existing keys keep working**. A `psk_` key is a separate server-only platform key for the Platform API.
3. Add every web origin that will load the widget or call the API from a browser (including `http://localhost:5173` while developing) to the project's allowed origins.

Store keys in environment variables or a secret manager. Never commit them. See [authentication](/docs/authentication/).

## 3. Make your first call

Reference data endpoints are public, so this works with no key at all:

```bash
curl https://sandbox.riftfi.com/v1/chains
```

Now an authenticated call with your sandbox project key:

```bash
export RIFT_API_KEY=sk_your_sandbox_key   # from the dashboard

curl https://sandbox.riftfi.com/v1/payouts/countries \
  -H "X-API-Key: $RIFT_API_KEY"
```

Prefer clicking? Open the [API playground](/docs/playground/), leave **Sandbox** selected, paste your key (it is kept in memory only) and send the same request from your browser.

## 4. Sign a customer in

Customer calls (balances, sending money, payouts) need a customer access token in addition to the project key. Three ways to get one:

- **Widget** (no build step): add `embed.js` and a button with `data-rift-trigger`. The widget signs the customer in, sets up a passkey wallet and hands your page an access token. See [integrate](/docs/integrate/).
- **React**: `<RiftProvider>` and `<RiftAuth>` from `@rift-finance/react`.
- **API**: `POST /v1/one-time-codes` then `POST /v1/auth/sign-in` (email or phone one-time code), or `/v1/auth/sign-in/google` and `/v1/auth/sign-in/apple`. Refresh with `POST /v1/auth/sessions/refresh`.

Then call as the customer:

```bash
curl https://sandbox.riftfi.com/v1/balances \
  -H "X-API-Key: $RIFT_API_KEY" \
  -H "Authorization: Bearer $CUSTOMER_TOKEN"
```

## 5. Move money

Money never moves on a server call alone. A transfer or payout your server starts returns `202 APPROVAL_REQUIRED` with an `approvalId`. The customer approves it with their passkey (inside your app via the widget or React component, or on a Rift approval page). Poll `GET /v1/approvals/{id}` or receive a webhook until the status is `approved`. See [approvals](/docs/guides/approvals/) and the [server quickstart](/docs/quickstarts/server/).

## 6. Go to production

1. Subscribe to production access: **$88 per month, flat**, no usage tiers. New projects get a short trial; after a paid period lapses there is a short grace period during which requests still work. When access is lapsed, write requests return `402`. Billing details are returned by `GET /v1/billing/plans` and `GET /v1/billing/payment-info`.
2. Create a production project and key. Change your base URL to `https://api.riftfi.com` (or the SDK environment to production).
3. Work through the [going-live checklist](/docs/guides/going-live/) with one small real transaction.

## Where next

| I want to | Read |
|---|---|
| Understand every key and header | [Authentication](/docs/authentication/) |
| Choose widget, React, SDK or raw REST | [Integrate](/docs/integrate/) |
| See everything the API can do | [Capabilities](/docs/capabilities/) |
| Handle failures and limits | [Errors](/docs/guides/errors/), [Rate limits](/docs/rate-limits/) |
| Get events pushed to me | [Webhooks](/docs/guides/webhooks/) |
| Try requests live | [API playground](/docs/playground/) |
| Feed this to an AI coding agent | [llms.txt](/llms.txt) and [llms-full.txt](/llms-full.txt) |
