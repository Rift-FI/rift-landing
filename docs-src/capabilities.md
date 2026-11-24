---
title: Capabilities
description: Every capability group in the Rift API, what it does, the main endpoints and where to read more.
---

Rift Wallets gives each customer a smart account owned only by their passkeys, with gas handled for them, and payment rails built in. Rift holds no key that can move a customer's funds. This page maps each capability group to the endpoints you call with your project API key, your platform key or your project id. Flows that belong to the signed-in end user (passkeys, device binding, approvals, balances, sending, payouts, onramp, KYC pages) are run by the Rift widget, the React components and the SDK on the customer's behalf; they are listed separately at the end. Every endpoint can be tried in the [API playground](/docs/playground/).

Beta features may change before general availability.

## Per-project endpoints (your API key or project id)

| Group | What you can do | Main endpoints | Read |
|---|---|---|---|
| **Sign-in and sign-up** | Create and sign in your project's customers with email or phone one-time codes, external id and password, Google or Apple. The project key selects the project | `POST /v1/auth/sign-up`, `/sign-in`, `/sign-in/google`, `/sign-in/apple`; `POST /v1/one-time-codes`, `/verify` | [Authentication](/docs/authentication/) |
| **Customer administration** | List your project's customers, look up, suspend and unsuspend them | `GET /v1/users`, `/v1/users/lookup`, `/v1/users/suspended`, `POST /v1/users/{id}/suspend`, `/unsuspend` | [API](/docs/api/rift-wallet/) |
| **Account recovery** | Masked recovery options, password reset and account recovery for external-id accounts, for your own sign-in screens | `GET /v1/identifier-recovery/options`, `POST /v1/identifier-recovery/password-reset`, `/account-recovery` | [Passkeys and recovery](/docs/guides/passkeys-and-recovery/) |
| **Payment links and invoices** | Create invoices, list and cancel them, record payments, send the link by email or SMS | `POST /v1/invoices`, `GET /v1/invoices`, `DELETE /v1/invoices/{id}`, `POST /v1/invoices/{id}/payments`, `/notifications` | [API](/docs/api/rift-wallet/) |
| **Merchant approval** | Mark your customers as approved merchants. Only enforced when merchant approval is switched on for your project | `GET /v1/merchants`, `POST /v1/merchants/{id}/approval`, `DELETE` same path | [API](/docs/api/rift-wallet/) |
| **Widget configuration** | Branding and settings the widget loads for your project key | `GET /v1/widget-config` | [Widget](/docs/sdk/widget/) |
| **Your project** | Read and update your project, rotate the key, add allowed origins, set fee markup, read usage and API logs | `GET/PATCH /v1/projects/{id}`, `POST /v1/projects/{id}/api-keys/rotate`, `POST /v1/projects/{id}/origins`, `PATCH /v1/projects/{id}/markup`, `GET /v1/projects/{id}/stats`, `/api-logs` | [Going live](/docs/guides/going-live/) |
| **Billing** | Plans, payment details, your subscription state and payments | `GET /v1/billing/plans`, `/v1/billing/payment-info`, `GET /v1/projects/{id}/billing/subscription`, `GET/POST /v1/projects/{id}/billing/payments` | [Pricing](/docs/pricing/) |
| **Reference data (no key needed)** | Chains, tokens, assets, FX rates and fees, payout countries, institutions and payment methods per currency | `GET /v1/chains`, `/v1/tokens`, `/v1/assets`, `/v1/rates`, `/v1/payouts/countries`, `/v1/rails/{currency}/institutions` | [Chains and tokens](/docs/overview/chains-and-tokens/), [Corridors](/docs/guides/payment-corridors/) |

## Platform tier (platform key `psk_`, server only)

| Group | What you can do | Main endpoints | Read |
|---|---|---|---|
| **Platform API (Beta)** | Customers, per-customer ledgers and statements, consent-based history for lenders, usage, platform keys | `/v1/platform/customers...`, `/v1/platform/ledger`, `/v1/platform/usage`, `/v1/platform/keys` | [Platform quickstart](/docs/quickstarts/platform/), [Customer history](/docs/guides/customer-history-credit/) |
| **Webhooks (Beta)** | Signed events for transactions, customers, approvals, accounts and ramps | `/v1/platform/webhooks...` | [Webhooks](/docs/guides/webhooks/) |
| **Gas sponsorship (Beta)** | Sponsor gas for customers or let them pay in USDC or USDT; per-project policy | `/v1/platform/gas-policy` | [Gas sponsorship](/docs/guides/gas-sponsorship/) |
| **Rift Accounts (Beta)** | Local-currency accounts (KES, TZS, GHS, UGX, MWK): collect from mobile money, pay out to mobile money, banks, tills and paybills, statements | `/v1/accounts...` | [Accounts](/docs/guides/accounts/) |
| **Own-wallet ramps (Beta)** | Cash out stablecoins from your own wallet, or buy USDC with mobile money to any address, with no Rift wallet | `/v1/ramps/...`, `POST /v1/payouts/validate` | [Own-wallet ramps](/docs/guides/own-wallet-ramps/) |

## Run by the widget, React components and SDK

These are the end user's own flows. They are authenticated with the customer's access token rather than your project key, and several need a passkey signature that only the customer's device can produce, so the Rift widget or SDK calls them for you. They are documented in full under [Rift wallets](/docs/api/rift-wallet/), the section for partners whose wallets Rift issues and secures.

- Customer profile, balances, history, deposits, sending and signing (two-phase preview then submit), approvals, trusted devices, passkey registration.
- Payouts (offramp), onramp, beneficiaries, bridges, WalletConnect, ledger and statements, identity verification pages.

## Supported money rails

Payouts and onramp cover Kenya (KES), Nigeria (NGN), Tanzania (TZS), Uganda (UGX), Ghana (GHS) and Malawi (MWK), with mobile money, bank, till and paybill depending on the country. Availability changes during the day: always read `GET /v1/payouts/countries` (public, no authentication) rather than hard-coding a list. Details and per-transaction limits: [Corridors and limits](/docs/guides/payment-corridors/).

## Chains

Wallets have the same address on every supported chain. Read `GET /v1/chains` and `GET /v1/chains/{chainId}/tokens` for the live list.

## Platform conventions

- Errors: `{ "error": "CODE", "message": "..." }`. See [errors](/docs/guides/errors/).
- Fund-moving one-phase calls return `202 APPROVAL_REQUIRED` unless the request already carries a passkey proof.
- Money statuses use one vocabulary: `awaiting_payment`, `processing`, `completed`, `refunding`, `refunded`, `expired`, `cancelled`, `failed`.
- Lists page with `cursor` and `nextCursor`; date filters are inclusive ISO 8601.
- Limits: see [rate limits](/docs/rate-limits/).
