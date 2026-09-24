Rift landing page.

## Capital markets homepage (September 2026)

The homepage presents Rift as capital markets infrastructure for Africa's productive economy. Individual investors go to https://wallet.riftfi.com. Institutional investors and businesses use separate Tally forms, the same service used by Jahazi.

- Institutional interest: https://tally.so/r/LZlXQv
- Business financing: https://tally.so/r/Ek9L44

Forms are managed in the existing Tally workspace. Self-notifications are enabled for the Tally account email. Custom notification recipients require Tally Pro; no upgrade was purchased. Responses remain available in each form's Submissions tab. No test submissions were stored.

Public form IDs are centralized in `src/lib/enquiry-config.ts`. Deployments can override them using `VITE_TALLY_INVESTOR_FORM_ID` and `VITE_TALLY_FINANCING_FORM_ID`. The site links directly to the published forms, avoiding dependence on third-party iframe loading.

The homepage does not claim live investment listings, guaranteed returns or invented performance figures. The sectors describe the broader product direction. Existing business, journal and legal routes are preserved; shared navigation points to the new homepage sections.

Validation: production build, ESLint on changed files, desktop and 390px mobile browser review, mobile menu and sector navigation, Tally required-field validation in preview, and published form navigation. The website changes have not been deployed.

## Visual identity

The homepage and /brand use Circle-inspired navigation, generous typography, original Rift artwork and a custom SVG icon family. The downloadable kit at /brand/rift-brand-kit.zip includes the existing Rift symbol, palette, icon SVGs and usage guidance. The three generated images are illustrative and do not represent customers or portfolio companies. Desktop audience tabs support arrow-key navigation. Mobile navigation and content use responsive layouts.


Interior pages now share CapitalNav/CapitalFooter and capital-pages.scss. Journal search and topic filters, article content, legal contents and PDF/print actions are retained. Legal and business classes are isolated from legacy styling. Updated page ESLint and production build pass; desktop and mobile views reviewed.


## Legal and search metadata (24 September 2026)

`src/content/terms.json` and `src/content/privacy.json` are the single sources for both legal pages and their PDFs. `npm run build` regenerates the PDFs, builds the app, generates sitemap/RSS, and renders every public page to HTML using React server rendering. `src/components/SEO.tsx` owns route metadata and structured data. React 19 metadata is placed in the static document head; the client replaces it on load to prevent duplicate tags.

The canonical origin is https://riftfi.com, as confirmed by the owner. The Vercel configuration serves clean static URLs, redirects the old .xyz host (when attached to the same project), retains the renamed article redirect and redirects the removed Tally article to the journal. DNS/domain configuration has not been changed. Future blog posts are discovered at build time. No Search Console property or sitemap submission was performed.

Investment products are still being structured. The revised terms cover website/enquiry use and require separate product documents for actual investments, wallet services and financing. The old unsupported custody, regulatory, local-only hosting and fixed-retention claims were removed. The business page now describes financing enquiries. Legal content needs review by qualified Kenyan counsel before financial products are offered. Verify the existing company registration/address, operational retention policy, processor arrangements and cross-border transfer safeguards; this code change does not certify those matters.

References: ODPC https://www.odpc.go.ke/rights-of-a-data-subject/ ; CMA https://www.cma.or.ke/cma-grants-regulatory-approvals-for-fund-management-and-collective-investment-schemes/ ; Tally https://tally.so/help/gdpr ; Google https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics .
