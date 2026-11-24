---
title: Integrate: widget, SDK or REST
description: Choose between the embeddable widget, the React components, the TypeScript SDK and the raw REST API, with working code for each.
---

Pick the lightest path that covers what you need. All of them talk to the same API, in sandbox or production.

| Path | Best for | Where it runs |
|---|---|---|
| **Widget** (`embed.js`) | Adding sign-in, passkey wallet setup and payment approvals to any web page with no build step | Browser |
| **React** (`@rift-finance/react`) | React apps that want typed components and hooks around the same widget | Browser |
| **TypeScript SDK** (`@rift-finance/wallet`) | Your backend: payouts, balances, approvals, ledger | Server (Node 18+) |
| **REST** | Any other language | Anywhere |
| **MCP server** | AI agents that prepare payments the customer approves | Agent runtime |

## Widget

Register your page origin in the dashboard first (allowed origins), then:

```html
<!-- Sandbox. For production use https://widget.riftfi.com/embed.js and a production key -->
<script src="https://widget.sandbox.riftfi.com/embed.js"
        data-project-key="YOUR_SANDBOX_PROJECT_KEY" async></script>

<button data-rift-trigger>Sign in</button>
<button data-rift-trigger data-rift-mode="signup">Create account</button>

<script>
  let accessToken = null;
  window.Rift.on("signin-success", (s) => { accessToken = s.accessToken; console.log("wallet", s.address); });
  window.Rift.on("approval-result", (r) => console.log(r.approvalId, r.status, r.result?.transactionHash));
  window.Rift.on("signin-error", (e) => console.warn(e.message));
  // After your server returns 202 APPROVAL_REQUIRED with an approvalId:
  // window.Rift.open({ mode: "approve", approvalId });
</script>
```

`Rift.open({ mode })` takes `"signin"`, `"signup"` or `"approve"` (with `approvalId`); `theme` is `"light"` or `"dark"`. Events: `ready`, `open`, `close`, `signin-success`, `signin-error`, `approval-result`, `approval-error`. The widget origin decides the backend, so use the sandbox widget with a sandbox key. The iframe needs `publickey-credentials-create; publickey-credentials-get` permissions (set by `embed.js`). Full reference: [widget reference](/docs/sdk/widget/) and [widget quickstart](/docs/quickstarts/widget/).

## React

```bash
npm install @rift-finance/react@^0.4.0
```

```tsx
import { RiftProvider, RiftAuth, RiftApprove, useRift, useRiftApproval } from "@rift-finance/react";

export function App() {
  return (
    <RiftProvider apiKey={import.meta.env.VITE_RIFT_KEY} environment="sandbox">
      <RiftAuth onSuccess={(user) => console.log(user)} />
      <SignInButton />
    </RiftProvider>
  );
}
function SignInButton() {
  const { open, user } = useRift();
  return <button onClick={() => open()}>{user ? "Signed in" : "Sign in"}</button>;
}
```

`environment` defaults to production, so set `"sandbox"` while building. See the [React quickstart](/docs/quickstarts/react/) and [reference](/docs/sdk/react/).

## TypeScript SDK (server)

```bash
npm install @rift-finance/wallet@^4.0.0
```

```ts
import Rift, { Environment, isApprovalRequired } from "@rift-finance/wallet";

function riftFor(customerToken?: string) {
  const rift = new Rift({
    apiKey: process.env.RIFT_API_KEY!,            // sk_..., server only
    environment: process.env.RIFT_ENV === "production" ? Environment.PRODUCTION : Environment.SANDBOX,
    retries: 0,                                    // mandatory for money calls
  });
  if (customerToken) rift.setBearerToken(customerToken);  // one client per request
  return rift;
}

const res = await riftFor(token).transactions.send({
  to: "0x...", value: "5", token: "USDC", chain: "BASE", type: "gasless",
});
if (isApprovalRequired(res)) {
  // 202: store res.approvalId, show it to the customer (widget / React / res.approvalUrl)
}
```

Services: `auth`, `wallet`, `passkeys`, `approvals`, `transactions`, `signer`, `bridge`, `offramp`, `walletConnect`, `kyc`, `assets`, `merchant`, `notifications`, `deposits`. Money methods return a result **or** an approval request; check with `isApprovalRequired()`. Reference: [SDK reference](/docs/sdk/wallet/), [server quickstart](/docs/quickstarts/server/).

Set `retries: 0` on servers that proxy non-idempotent calls. A retry after a silently successful request can duplicate or conflict.

## REST from any language

```python
import os, requests
BASE = "https://sandbox.riftfi.com"          # production: https://api.riftfi.com
r = requests.get(f"{BASE}/v1/payouts/countries", headers={"X-API-Key": os.environ["RIFT_API_KEY"]}, timeout=30)
r.raise_for_status()
print(r.json())
```

Send money as the customer:

```bash
curl -i https://sandbox.riftfi.com/v1/transactions \
  -H "X-API-Key: $RIFT_API_KEY" -H "Authorization: Bearer $CUSTOMER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "to": "0x000000000000000000000000000000000000dEaD", "value": "5", "token": "USDC", "chain": "BASE", "type": "gasless" }'
# 202 { "status": "APPROVAL_REQUIRED", "approvalId": "...", "approvalUrl": "...", "expiresAt": "..." }
curl https://sandbox.riftfi.com/v1/approvals/$APPROVAL_ID -H "X-API-Key: $RIFT_API_KEY"
```

## Receive events

Register a webhook (Platform API, `psk_` key) and verify `Rift-Signature` (HMAC-SHA256 of `"<t>.<raw body>"`, five-minute tolerance). See [webhooks](/docs/guides/webhooks/).

## AI agents

Point your coding agent at [llms.txt](/llms.txt) (index) or [llms-full.txt](/llms-full.txt) (complete, self-contained). To let an agent operate Rift as tools, use the [MCP server](/docs/quickstarts/mcp/); fund-moving tools return approval links the customer approves with a passkey.
