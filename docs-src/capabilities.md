---
title: Capabilities
description: Every capability group in the Rift API, what it does, the main endpoints and where to read more.
---

Rift Wallets gives each customer a smart account owned only by their passkeys, with gas handled for them, and payment rails built in. Rift holds no key that can move a customer's funds. This page maps each capability group to its endpoints. Every endpoint can be tried in the [API playground](/docs/playground/).

Beta features may change before general availability.

| Group | What you can do | Main endpoints | Read |
|---|---|---|---|
| **Sign-in and session** | Email or phone one-time codes, Google, Apple, external-id sign-in, refresh, sign-out | `POST /v1/auth/sign-up`, `/sign-in`, `/sign-in/google`, `/sign-in/apple`, `/sessions/refresh`, `/sign-out`; `POST /v1/one-time-codes`, `/verify` | [Authentication](/docs/authentication/) |
| **Customer profile** | Read, update, delete the signed-in customer | `GET/PATCH/PUT/DELETE /v1/me`, `GET /v1/me/tokens` | [API](/docs/api/core/) |
| **Passkey wallets and recovery** | Register, list and remove passkeys; wallet status | `GET /v1/wallet/status`, `POST /v1/wallet/passkeys/options`, `/v1/wallet/passkeys` | [Passkeys](/docs/guides/passkeys-and-recovery/) |
| **Devices** | Bind trusted devices; recover a device | `/v1/devices...` | [Device binding](/docs/guides/device-binding/) |
| **Balances and history** | Balances per chain and token, transaction history, deposits | `GET /v1/balances`, `/v1/transactions`, `/v1/deposits` | [API](/docs/api/core/) |
| **Transfers and signing** | Send tokens, call contracts, sign messages; two-phase preview then submit | `POST /v1/transactions`, `/v1/transactions/preview`, `/v1/wallet/user-operations...`, `/v1/wallet/signatures/message...` | [Two-phase signing](/docs/guides/two-phase-signing/) |
| **Approvals** | Server starts a payment; the customer approves it with a passkey | `GET /v1/approvals`, `GET /v1/approvals/{id}`, `POST .../approve`, `/reject` | [Approvals](/docs/guides/approvals/) |
| **Payouts (offramp)** | Pay local money to mobile money, bank, till or paybill; refunds | `GET /v1/payouts/countries`, `POST /v1/payouts/validate`, `POST /v1/offramps`, `/init`, `/finalize`, `GET /v1/offramps`, `POST /v1/offramps/{id}/refund` | [Offramp](/docs/guides/offramp/), [Corridors and limits](/docs/guides/payment-corridors/) |
| **Onramp (Beta)** | Buy stablecoins with local money into the customer's wallet | `GET /v1/onramps/quote`, `/v1/onramps/kyc`, `POST /v1/onramps`, `GET /v1/onramps` | [Onramp](/docs/guides/onramp/) |
| **Rates and rails** | FX rates, quotes, fees, institutions and payment methods per currency | `GET /v1/rates`, `POST /v1/rates/quote`, `GET /v1/rates/withdrawal-fee`, `GET /v1/rails/{currency}/institutions` | [Corridors](/docs/guides/payment-corridors/) |
| **Beneficiaries (Beta)** | Saved recipients | `/v1/beneficiaries` | [API](/docs/api/core/) |
| **Rift Accounts (Beta)** | Local-currency accounts (KES, TZS, GHS, UGX, MWK): collect from mobile money, pay out to mobile money, banks, tills and paybills, download statements | `/v1/accounts...` | [Accounts](/docs/guides/accounts/) |
| **Own-wallet ramps (Beta)** | Cash out stablecoins from your own wallet, or buy USDC with mobile money to any address, with no Rift wallet | see the guide and API reference | [Own-wallet ramps](/docs/guides/own-wallet-ramps/) |
| **Liquidity providers (Beta)** | Provide stablecoin liquidity to the payout pool from your own wallet and earn a share of fees | `/v1/lp...` | [Liquidity providers](/docs/guides/liquidity-providers/) |
| **Swaps and bridges** | Cross-chain transfers, quotes, routes | `GET /v1/bridge/routes`, `POST /v1/bridge/quotes`, `/v1/bridge/transfers...` | [Swaps and bridges](/docs/guides/swaps-and-bridges/) |
| **WalletConnect** | Pair the customer's wallet with any dApp and approve its requests | `/v1/wallet-connect/...` | [WalletConnect](/docs/guides/walletconnect/) |
| **Gas sponsorship (Beta)** | Sponsor gas for customers or let them pay in USDC or USDT; per-project policy | `/v1/platform/gas-policy` | [Gas sponsorship](/docs/guides/gas-sponsorship/) |
| **Ledger and statements (Beta)** | One ledger of every customer transaction; signed statements | `GET /v1/ledger`, `POST /v1/statements` | [Ledger](/docs/guides/ledger-and-statements/) |
| **Customer history for credit (Beta)** | Consent-based transaction history for lenders | `/v1/platform/...` | [Customer history](/docs/guides/customer-history-credit/) |
| **KYC** | Identity verification sessions, status and jobs | `POST /v1/kyc/sessions`, `GET /v1/kyc/status`, `GET /v1/kyc/jobs/{jobId}` | [Onramp](/docs/guides/onramp/) |
| **Invoices and merchants** | Create invoices, take payments, merchant onboarding | `/v1/invoices`, `/v1/merchants` | [API](/docs/api/core/) |
| **Reference data** | Chains, tokens, assets | `GET /v1/chains`, `/v1/tokens`, `/v1/assets` | [Chains and tokens](/docs/overview/chains-and-tokens/) |
| **Platform API (Beta)** | Server-only institution endpoints: customers, ledgers, webhooks, gas policy, usage, keys | `/v1/platform/...` | [Platform quickstart](/docs/quickstarts/platform/) |
| **Webhooks (Beta)** | Signed events for transactions, customers, approvals, accounts and ramps | `POST /v1/platform/webhooks` | [Webhooks](/docs/guides/webhooks/) |
| **Project administration** | Projects, keys, origins, billing, branding | `/v1/projects...`, `/v1/billing/...` | [Going live](/docs/guides/going-live/) |

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
