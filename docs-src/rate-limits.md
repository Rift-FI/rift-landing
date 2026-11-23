---
title: Rate limits
description: Request limits, the 429 response, and how to back off.
---

Rift limits request rates to protect customers and the platform. When you exceed a limit you receive `429 Too Many Requests`. Limits can change; design your client to react to `429` rather than to hard-code numbers.

## Current limits

| Scope | Limit |
|---|---|
| Platform API (`/v1/platform/*`) | 60 requests per minute per key |
| General traffic | 1,000 requests per 15 minutes per IP address |
| Sign-in and authentication | 100 requests per 15 minutes per IP address |
| Money-moving transactions | 30 requests per minute per IP address |
| One-time code (OTP) sends | 5 per 5 minutes per IP address; repeated wrong codes lock the code out (also `429`) |
| Statements | 5 per hour |
| Payout recipient lookups | 30 per 10 minutes |
| Burst protection | 200 requests per minute per IP address |

Public reference endpoints (chains, tokens, rates, payout countries) change rarely; cache them in your own app.

## Responses

```http
HTTP/1.1 429 Too Many Requests
RateLimit-Limit: 60
RateLimit-Remaining: 0
RateLimit-Reset: 41

{ "error": "RATE_LIMITED", "message": "60 requests per minute per key" }
```

Some older limiters return a plain `{ "error": "Too many requests..." }` sentence. Treat any `429` as rate limited. Standard `RateLimit-*` headers are sent where the limiter supports them.

## How to behave

- Back off exponentially with jitter on `429` and `503`. Start at one second.
- Do not retry fund-moving calls automatically, even on `429`. Check the operation's status first ([errors](/docs/guides/errors/#retries-and-idempotency)).
- Poll sparingly: prefer [webhooks](/docs/guides/webhooks/) to polling approvals or ledgers.
- Cache reference data and quotes briefly instead of calling per keystroke.
- Server-side traffic from a single IP (a NAT or a serverless platform) shares per-IP limits. If you need a higher ceiling for production traffic, contact Rift with your expected volume.

## Subscription limits are different

`402` is not a rate limit. It means the project's production subscription is not active (see [getting started](/docs/getting-started/#6-go-to-production)). Sandbox is free.
