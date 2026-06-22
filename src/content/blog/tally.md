---
title: Tally
description: A netting and settlement standard for moving money across Africa in local currency, without routing every payment through the US dollar.
date: 2026-06-22
author: Amschel
cover: /tally.jpg
tags: [Standard, Settlement, Stablecoins, Africa]
---

A netting and settlement standard for moving money across Africa in local currency.

**Abstract.** Tally is a settlement standard that lets regulated local-currency stablecoins move value across African borders without routing every transaction through the US dollar. When value moves from one country to another, Tally burns the source stablecoin and mints the destination stablecoin at the prevailing rate. Issuers net their positions across a settlement window and settle only the residual imbalance in a common settlement asset. For the person sending money it is instant and entirely in local currency. Underneath, it replaces the correspondent-banking detour with direct, netted, local-currency settlement.

## The problem: African money takes the long way around

A trader in Eldoret pays a supplier in Dar es Salaam, and the money travels to New York first. It is converted to dollars, settled through American correspondent banks, then converted again on the other side. Two towns a few hundred kilometres apart, and the payment routes through Manhattan, collecting fees, FX spread, and days of delay along the way.

This is not an accident. Most African currencies do not trade directly against one another in any liquid market. There is no deep Kenyan shilling to Nigerian naira market, so the dollar becomes the bridge by default. Every cross-border payment pays for that bridge twice, once on each conversion, and waits on a settlement system that was never built for intra-African trade.

The cost is structural, and it falls hardest on the people moving the smallest amounts: cross-border traders, importers, and the everyday businesses that make up most of African commerce.

## What Tally is

Tally is a standard, not a coin. It does not issue money. It defines how regulated local-currency stablecoins, a Kenyan shilling coin, a Nigerian naira coin, a Tanzanian shilling coin, interoperate so that value moves between them directly, in local currency, with the dollar reduced to a quiet role in the background.

It rests on three mechanics: mint and burn, netting, and periodic settlement.

## How it works

### Mint and burn move the tokens, not the money

When value moves from Kenya to Nigeria, Tally burns the Kenyan stablecoin on the sending side and mints the Nigerian stablecoin on the receiving side at the prevailing rate. The recipient receives naira. The sender's shillings are gone.

The key thing to see is that minting and burning move the tokens, not the real money behind them. The Kenyan issuer still holds the shillings that backed the burned coin. The Nigerian issuer has minted naira it has not yet been paid for. Token supply stays perfectly matched to demand on both sides, but a debt has opened between the two issuers. The sending side owes the receiving side. That debt, not the tokens, is the thing Tally manages.

### Netting: settle the difference, not the total

If money only ever flowed one way, that debt would simply pile up. But trade flows in both directions, and Tally uses that. When value also moves from Nigeria to Kenya, it creates the opposite debt, and the two cancel.

So Tally never settles the gross flow. It settles the net. If 50 units flow from Kenya to Nigeria and 30 units flow back, only the 20-unit difference ever needs to be settled. The offsetting flows cancel each other out completely. The more balanced a corridor, the smaller the amount that ever has to move.

### Settlement: periodic, in a common asset

Issuers agree up front on a settlement asset, usually USDC or USDT, and hold their reserves in it on-chain. Anyone can check how much each issuer holds against what it has minted, so backing is a matter of public record rather than a quarterly attestation.

The exchange rate is dealt with the moment a payment happens. As each transaction clears, the contract snapshots it: the amount, the time, and the rate at that instant, written into a ledger. Nothing is re-priced after the fact. When the window closes, by default every 24 hours, the contract reads those recorded obligations back, adds up each direction, and the two issuers settle the difference. Each side pays or receives exactly what it was owed, at the rates that applied when the money actually moved.

This is what removes the exchange-rate problem that usually bites cross-border systems. No issuer is left sitting on a floating position, waiting to see where the rate lands, because the rate was fixed and saved at the point of sale. The only conversion left is turning the small net residual into the settlement asset.

### Pricing: each issuer prices its own coin

Tally does not require a separate exchange rate for every pair of currencies. Each issuer prices only its own coin against the common settlement asset. Every cross-rate is then derived by triangulation: Kenya to Nigeria is simply the Kenyan rate against USDC divided by the Nigerian rate against USDC.

This is both simpler and more honest. The local issuer holds the local reserves and runs the local liquidity, so it is best placed to price its own currency, and it bears the cost of getting it wrong. An issuer that prices away from the market is immediately arbitraged, and the loss lands on its own reserves. Pricing is kept disciplined by three forces working together: on-chain transparency, so every rate is public; a reference oracle that anchors rates to the real market; and open redemption, which gives arbitrage the teeth to correct any drift.

### Dynamic rebalancing: price steers flow

Tally goes one step further and uses price to keep corridors balanced. When flow runs heavily in one direction, the system prices the reverse direction slightly more attractively. That incentive pulls flow back toward balance, which shrinks the net residual before it ever reaches settlement. The crowd does the rebalancing, and the amount that must settle in a common asset stays small. It works the way an automated market maker does: the imbalance itself moves the price, and the price pulls the system back toward equilibrium.

## Shrinking the dollar to the residual

Tally does not pretend the dollar can be removed today. Its role as a settlement asset is a function of liquidity, not law, and no African currency pair yet trades deeply enough to replace it outright. What Tally does is shrink the dollar from the bridge for every transaction to the settlement of a small leftover. Netting and dynamic pricing drive the residual toward zero, and as direct local-currency liquidity deepens across the continent, even that residual shrinks. The dollar moves from the centre of every payment to the edge of a few.

## Design properties

Tally is fully backed by construction. Because every transaction burns exactly as much as it mints, token supply always matches the value behind it. Solvency is a matter of arithmetic, not confidence.

Exchange-rate risk is dealt with at the point of sale. Because every transaction settles at the rate recorded when it happened, no issuer is exposed to the rate drifting between a payment and its settlement. What is left is ordinary credit exposure on the unsettled net, and that is bounded by how often the window closes. Pricing stays honest because every rate is public, anchored to a reference oracle, and open to redemption, so anyone can arbitrage a rate that wanders. Imbalance corrects itself the same way, pulled back toward zero by dynamic pricing.

Structurally one-directional corridors, such as pure remittance flows, are handled honestly. Where there is no return flow to net against, the residual is larger and settles in the common asset, exactly as it should. Tally does not hide this case, it prices it.

And Tally is complementary, not competitive, with the institutional work already under way. It operates as the stablecoin-native settlement layer alongside systems such as PAPSS, reaching the programmable, retail, and cross-border edges that central-bank rails are not built to serve.

## Why it matters

For the person sending money, Tally is local currency in and local currency out, settled in seconds, at a fraction of the cost of the correspondent-banking route. For the issuer, it is a way to make a local stablecoin useful far beyond its own borders. For the continent, it is settlement infrastructure that keeps value in local currency and pushes the dollar to the margin, without waiting for a political consensus that may never arrive.

The money no longer has to take the long way around.
