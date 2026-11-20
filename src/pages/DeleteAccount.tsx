import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { InstitutionalFooter } from "../components/rift/institutional";

const LAST_UPDATED = "20 November 2026";

const MAILTO =
  "mailto:privacy@riftfi.com" +
  "?subject=" +
  encodeURIComponent("Account deletion request") +
  "&body=" +
  encodeURIComponent(
    "Please delete my Rift account.\n\n" +
      "Account email or phone number: \n" +
      "Any additional details: \n\n" +
      "I understand that identity-verification (KYC) and transaction records are kept for 7 years as required by Kenyan anti-money-laundering law, and that on-chain data cannot be deleted."
  );

export const DeleteAccount = () => (
  <Fragment>
    <Helmet>
      <html lang="en" />
      <title>Delete your Rift account. SPHERE-RAMP LTD.</title>
      <meta
        name="description"
        content="How to delete your Rift account and data. Rift is operated by SPHERE-RAMP LTD, Nairobi, Kenya."
      />
      <link rel="canonical" href="https://riftfi.com/delete-account" />
      <meta name="robots" content="index, follow" />
    </Helmet>

    <main className="legal">
      <div className="wrap legal-in">
        <header className="legal-head">
          <span className="kicker">Account</span>
          <h1>Delete your account</h1>
          <p className="legal-meta">
            Rift (riftfi.com) · SPHERE-RAMP LTD
            <br />
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        <article className="legal-body">
          <section className="legal-section">
            <p>
              This page explains how to delete your account and data for the{" "}
              <strong>Rift</strong> app, which is developed and operated by{" "}
              <strong>SPHERE-RAMP LTD</strong> (trading as Rift), 32 Enkang, D403,
              Ngong Road, Riruta, Nairobi 00505, Kenya. You can delete your account
              yourself in the app, or request deletion by email. No sign-in is
              required to read this page.
            </p>
          </section>

          <section className="legal-section">
            <h2>
              <span className="legal-section-n">1.</span> Delete in the app
            </h2>
            <ol>
              <li>Open the Rift app and sign in.</li>
              <li>
                Go to <strong>Settings</strong>.
              </li>
              <li>
                Tap <strong>Delete account</strong>.
              </li>
              <li>
                Move out any remaining wallet balance if prompted, then confirm.
              </li>
              <li>
                Enter the one-time code we send to your registered email or phone
                to verify it is you. Your account is then deleted.
              </li>
            </ol>
          </section>

          <section className="legal-section">
            <h2>
              <span className="legal-section-n">2.</span> Request deletion by email
            </h2>
            <p>
              If you cannot sign in, email us from the address on your account and
              we will verify your identity before deleting.
            </p>
            <p className="legal-actions no-print">
              <a className="btn btn-primary" href={MAILTO}>
                Email an account deletion request
              </a>
            </p>
            <p>
              Send the request to <strong>privacy@riftfi.com</strong> with the
              subject &ldquo;Account deletion request&rdquo; and include the email
              address or phone number on your account.
            </p>
          </section>

          <section className="legal-section">
            <h2>
              <span className="legal-section-n">3.</span> What is deleted, what is
              kept, and when
            </h2>
            <p>
              <strong>Deleted:</strong> your profile, authentication credentials
              and passkeys, device records, and app preferences. You are signed out
              on every device and cannot sign in to the account again. Deletion
              completes within 30 days.
            </p>
            <p>
              <strong>Kept:</strong> identity-verification (KYC) and transaction
              records are retained for seven (7) years as required by Kenya&rsquo;s
              Proceeds of Crime and Anti-Money Laundering Act, after which they are
              deleted or irreversibly anonymised. Data already written to public
              blockchains (such as wallet addresses and on-chain transactions)
              cannot be deleted, because those networks are public and immutable.
            </p>
            <p>
              <strong>Before you delete:</strong> move any remaining balance out of
              your wallet first — after deletion you will no longer be able to reach
              it through Rift.
            </p>
          </section>

          <section className="legal-section">
            <h2>
              <span className="legal-section-n">4.</span> More information
            </h2>
            <p>
              For full details of how we handle your data, see our{" "}
              <a href="/privacy">Privacy Policy</a> and{" "}
              <a href="/terms">Terms of Service</a>. Questions:{" "}
              <a href="mailto:privacy@riftfi.com">privacy@riftfi.com</a>.
            </p>
          </section>
        </article>
      </div>
    </main>
    <InstitutionalFooter />
  </Fragment>
);
