# Rift, positioning

October 2026. Built on the research in `reports/East Africa cross border payments.md`.

---

## The elevator pitch

When a Kenyan trader pays a supplier in Kampala, the bank charges about twelve
dollars in fees. Then it takes one to three percent in exchange-rate spread,
twice, which never appears on the statement. The trader has no idea what the
payment cost.

Rift quotes one all-in price before you send, settles the same day, and the
supplier is paid in their own currency on the rails they already use. Same
account handles paying China, where you genuinely do need dollars.

We are not building a new payment rail. PAPSS and REPSS have offered exactly
that for fourteen years and moved almost nothing, because the problem was never
the rail. We sell the two things those systems do not have: the customer
relationship, and currency on the ground in each market.

*(Sixty seconds. If you only get one line: **the fee is not the cost, the spread
is the cost, and nobody will tell you what it is.**)*

---

## Executive summary

### The problem, stated accurately

A business moving money between East African countries is not primarily losing
money to fees. Kenyan banks cap an outward wire at roughly KES 5,000, about
thirty-five dollars, which is five hundredths of one percent of a fifty
thousand dollar invoice. The cost is the exchange rate, paid twice, because the
payment converts to dollars and back again. All in, a Kenya-to-Tanzania
commercial payment runs somewhere around 1.1 to 3.3 percent, and between 80 and
95 percent of that is spread rather than fees.

It is also slow, three to five days, and opaque. No independent dataset of
African B2B payment prices exists. The trader cannot find out what they paid.

**Do not quote the familiar 8 percent figure.** That is World Bank remittance
pricing measured on a two hundred dollar consumer transfer, where fixed fees
dominate. Putting it next to a fifty thousand dollar invoice is a category
error and a sophisticated reader will catch it.

### Why the obvious fix has already failed

COMESA's REPSS has offered local-currency settlement across nine central banks
since 2012, no letters of credit required. It moved about 388 million dollars
in six years, roughly 65 million a year across nine countries. COMESA was still
running awareness workshops in June 2026, and its own diagnosis is that
businesses hit "internal hurdles at their own banks."

EAPS, the East African Payment System, processed 11,924 transactions on
Tanzania's leg in all of 2025. About thirty-three a business day for a bloc of
331 million people. The Rwandan franc leg did thirty-seven transactions for the
year.

PAPSS has never published an absolute settlement value. Its best market,
Nigeria, settled 143.4 million dollars in 2025. Its volumes grew roughly ten
times while values grew only slightly more than double, which means average
ticket size fell about 80 percent: it is onboarding retail, not capturing
trade.

Fourteen years of working rails with no traction. The constraint is commercial
incentive at the distributing bank, then currency convertibility. Building
another rail does not address either.

### What has actually worked

Stablecoins. Sub-Saharan Africa moved roughly 205 billion dollars in stablecoin
value, Nigeria alone about 92 billion, with an average ticket near three
thousand dollars. That ticket size is the signature of supplier payments, not
speculation.

The market solved this itself, without permission, by dollarising. Rift's
customers are already doing this. They are doing it badly, through peer-to-peer
brokers and WhatsApp groups, with no price transparency and no recourse.

### The honest description of what Rift does

Rift does not remove the dollar. Nobody does.

Correspondent banking touches the dollar on every gross transaction. PAPSS nets
it down to a daily residual settled in hard currency at Afreximbank. Stablecoin
settlement touches it on the full notional, as a token rather than a nostro
balance, which is **more** dollarised, not less.

What Rift removes is the dollar *account*, the correspondent bank, the three
days and the hidden spread. The trader's experience is shillings in, shillings
out, one disclosed price, same day. That is a legitimate and valuable
abstraction. It is not "no dollars involved," and we should never say it is.

### Where the money actually is

Not the mineral corridors. East African Community trade grew 37 percent in Q2
2026 while the intra-regional share of exports **fell**, because exports to
China nearly doubled. Corridors built for minerals accelerate the extractive
leg faster than the regional one, and extractive exporters are the worst
possible customer: few counterparties, enormous tickets, already well served by
banks, settled offshore.

The real flow is underneath the corridors:

- **Corridor logistics services.** Freight forwarding, clearing, trucking,
  customs bonds, warehousing, fuel, insurance across roughly 30 million tonnes
  a year of Dar es Salaam and Mombasa transit, growing 17 to 20 percent
  annually. High frequency, mid ticket, multi currency. It scales with tonnage,
  not commodity prices.
- **Manufactured and agricultural trade**, which is 48 to 50 percent of
  intra-African trade. Many counterparties, small tickets, frequent payments.
- **Mining inputs moving inward.** Zambia exported 58 million dollars of
  sulphuric acid to the DRC in 2024, which the DRC cannot substitute.
- **Solar equipment redistribution.** Africa is installing around 17 GW in
  2026, up 45 percent, roughly a hundred thousand panels a day. Chinese panel
  exports to Africa rose 83 percent year on year.

### The second product, and why it is separate

Paying Asia is a different problem with a different cause. Africa runs a 102
billion dollar trade deficit with China, so there is nothing to net against:
the dollars genuinely have to be found. Renminbi settlement is under 3 percent
of the corridor and Nigeria's swap line ran at 11.6 percent utilisation,
because the constraint is access, not denomination.

Letters of credit cost 2 to 5 percent of transaction value, only about a
quarter of West African merchandise trade is bank-intermediated against 60
percent or more in advanced economies, and 17 percent of Kenyan and Tanzanian
SMEs with genuine need never even apply.

Same customer, same account, different mechanism.

### Where dollar scarcity is real, and where it is not

Severe in **Malawi**: a parallel premium around 130 to 150 percent, higher than
anywhere outside Iran, with the Foreign Exchange Act 2025 carrying seven-year
sentences for dealing outside authorised dealers. There is a documented case of
a Malawian agro-chemical firm sitting on billions of kwacha being sued by its
South African supplier because it could not buy foreign exchange, and losing
suppliers as a result. That is the clearest illustration of the thesis anywhere
in the research. Also severe in Zimbabwe's cash market.

**Not** a current constraint in Kenya, which had 6.1 months of import cover in
October 2026, nor Egypt, nor Nigeria, and only mildly in Ethiopia. Tanzania has
restriction rather than rationing: GN 198 of March 2025 makes it an offence to
quote or accept foreign currency for domestic transactions.

So the scarcity story is deep, not broad. Pitch it in Malawi. Do not pitch it
in Nairobi, where it is simply not true today and the buyer knows it.

### The defensible position

The two scarce assets in this business are the **customer relationship** and
**local currency on the ground in each market**. Permission is the abundant
input, and the official rails have only that.

Bridge, owned by Stripe and the best-capitalised stablecoin payments company in
the world, has no local rail access in Africa at all. The moat is the
local-currency last mile under local licence. It is not the stablecoin.

### The objections, and the honest answers

**"PAPSS already does this."** It does not. It nets the dollar rather than
removing it, it has never published a settlement value, and its best market did
143 million dollars last year. Also: a Kenyan importer banking at Equity,
Co-op, NCBA or Absa cannot send on PAPSS today, and Tanzania has exactly one
send-capable bank.

**"REPSS proves nobody wants this."** REPSS proves that a rail without a
customer relationship does not get used. We are not selling a rail.

**"Your margin is thin."** Correct, and this is the real risk. If the incumbent
all-in cost is 1 to 3 percent rather than 8, the room is narrower than the
remittance comparison suggests. The answer has to be volume and a second
product, not a fat spread.

**"Dash raised 86 million dollars doing roughly this and died with no
revenue."** It did. Zazuu died on per-corridor compliance cost with three
thousand pounds left. Every fintech retreat in 2026 has moved *into* B2B cross
border. This is a crowded convergence, not an empty field.

**"You are carrying currency risk."** Yes. Holding local-currency inventory in
depreciating currencies is the hardest operational problem in the business, and
Onafriq closed Baxi in October 2026 citing exactly that.

---

## What the landing page should and should not say

**Say:** one price, disclosed before you send. Settled the same day. Your
supplier is paid in their own currency on rails they already use. We also
handle paying suppliers outside Africa.

**Do not say:** stablecoin, crypto, blockchain, wallet, non-custodial. The
customer does not care and the words cost trust.

**Do not say:** "no dollars needed." It is not true and it is checkable.

**Do not say:** 8 percent, or any remittance-derived figure, next to a
commercial invoice.

**Do not name a corridor that is not live.**

**Do not claim** a licensing status we do not hold.
