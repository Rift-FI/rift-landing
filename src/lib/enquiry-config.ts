// Public Tally form IDs, using the same form service as Jahazi.
// Keep these separate from Jahazi's residency application.
export const ENQUIRY_FORMS = {
  investor: import.meta.env.VITE_TALLY_INVESTOR_FORM_ID || "LZlXQv",
  financing: import.meta.env.VITE_TALLY_FINANCING_FORM_ID || "Ek9L44",
};
export const CONTACT_EMAIL = "amschel@riftfi.com";
export const ENQUIRY_LINKS = {
  investor: `https://tally.so/r/${encodeURIComponent(ENQUIRY_FORMS.investor)}`,
  financing: `https://tally.so/r/${encodeURIComponent(ENQUIRY_FORMS.financing)}`,
};
