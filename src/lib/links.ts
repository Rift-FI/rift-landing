/**
 * Every outbound link the landing page uses, in one place.
 * DOCS_URL is a placeholder until the docs are hosted: change it here only.
 */
export const APP_URL = "https://wallet.riftfi.com";
export const DOCS_URL = "/docs";
export const CONTACT_EMAIL = "amschel@riftfi.com";
export const CONTACT_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Rift Wallets")}`;
export const WAITLIST_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Yield waitlist")}`;

/**
 * Partner logos for the strip under the hero. Empty on purpose: add only
 * partners who have agreed to be named. The strip hides itself when empty.
 * Example: { name: "Circle", src: "/partners/circle.png", width: 96 }
 */
export const PARTNERS: { name: string; src: string; width: number }[] = [];
