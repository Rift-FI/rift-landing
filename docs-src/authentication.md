---
title: Authentication
description: API keys, customer access tokens, headers, environments and CORS for the Rift API.
---

Rift uses two kinds of credential and a few request headers.

## Credentials

| Credential | Looks like | Who holds it | What it does |
|---|---|---|---|
| **Project API key** | `sk_...` | Your server (and the widget embed) | Identifies your project and environment. Sent as `X-API-Key`. Required on project-scoped routes (recovery, invoices, merchants, widget config); optional on most customer routes because the customer token already binds the project. |
| **Public key** | `pk_...` | Frontend code | **Coming soon.** A key meant to be embedded in browser or mobile code. Existing keys keep working when `pk_` is introduced; you will not be forced to migrate on a deadline. |
| **Platform key** | `psk_...` | Your server only | For the Platform API (`/v1/platform/*`): customers, ledgers, webhooks, gas policy, usage. Created by the project owner in the dashboard and shown once. Never put it in any client. 60 requests per minute per key. |
| **Customer access token** | JWT | The customer's session | Proves who the customer is. Sent as `Authorization: Bearer <token>`. Returned by sign-in or by the widget's `signin-success` event. Bound to the project the customer signed in through. |

Treat `sk_` and `psk_` keys like passwords. If one leaks, rotate it in the dashboard (`POST /v1/projects/{id}/api-keys/rotate`).

## Headers

| Header | Value | Notes |
|---|---|---|
| `X-API-Key` | Project or platform key | Also accepted for platform keys as `Authorization: Bearer psk_...`. |
| `Authorization` | `Bearer <customer token>` | For everything done as a customer. |
| `X-Rift-Mode` | `sandbox` or `production` | Selects which environment's data a request addresses on a shared host. The sandbox host defaults to sandbox. |
| `X-Rift-Device` | `<deviceId>.<unixSeconds>.<signature>` | Device proof on money-moving and security-changing calls where device binding is enforced. See [device binding](/docs/guides/device-binding/). |
| `Idempotency-Key` | Any unique string | Accepted on Rift Accounts and own-wallet ramp money endpoints. Elsewhere, see [errors: retries](/docs/guides/errors/#retries-and-idempotency). |
| `X-Request-Id` | Returned on every response | Log it and quote it to support. |

## Examples

```bash
# Public reference data: no credential
curl https://sandbox.riftfi.com/v1/chains

# Project-scoped call
curl https://sandbox.riftfi.com/v1/widget-config -H "X-API-Key: $RIFT_API_KEY"

# Customer call
curl https://sandbox.riftfi.com/v1/balances \
  -H "X-API-Key: $RIFT_API_KEY" -H "Authorization: Bearer $CUSTOMER_TOKEN"

# Platform call (server only)
curl "https://sandbox.riftfi.com/v1/platform/customers?limit=50" -H "X-API-Key: $RIFT_PLATFORM_KEY"
```

```ts
import Rift, { Environment } from "@rift-finance/wallet";

const rift = new Rift({
  apiKey: process.env.RIFT_API_KEY,       // sk_..., server side
  environment: Environment.SANDBOX,       // or Environment.PRODUCTION
  retries: 0,                              // never retry money calls
});
rift.setBearerToken(customerAccessToken);  // per instance: one client per request
```

## Passkeys and signing are separate from API authentication

Calling the API with a valid key and token proves who is asking. It does not authorise moving funds. Every fund move needs a **passkey signature from the customer**; without one the API answers `202 APPROVAL_REQUIRED`. Google and Apple sign-in are for login only and are never accepted as a signing proof (`PASSKEY_REQUIRED`). See [approvals](/docs/guides/approvals/) and [two-phase signing](/docs/guides/two-phase-signing/).

## Browser calls and CORS

The API accepts browser calls that carry `X-API-Key` and `Authorization` headers from any origin, without cookies. Cookie-based refresh sessions are only allowed from first-party Rift origins and from the origins you list for your project, so add every origin that runs your app (and the widget host, if you self-host it). `X-Rift-Mode`, `X-Rift-Device`, `X-Project-Id`, `X-Request-Id` and `Idempotency-Key` are allowed request headers.

Do not ship an `sk_` or `psk_` key in a public web page or a mobile app. Use the widget (which carries the project key in a way the embed is designed for), a `pk_` key once available, or your own server as a proxy.

## Sandbox and production keys

Keys, projects, customers and wallets are separate in each environment. Using a sandbox key against production (or the reverse) is rejected. Allowed origins and passkey relying-party IDs are also configured per environment.

## The API playground and your key

The [API playground](/docs/playground/) lets you enter a key at runtime. It keeps it in memory only; see the page for the exact guarantees. You can use the same key from any HTTP client.
