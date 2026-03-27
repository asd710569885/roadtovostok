<script setup>
import { RouterLink } from 'vue-router'

const email = 'whuan@roadtovostok.net'
const mailto = `mailto:${email}`
</script>

<template>
  <div class="page-legal">
    <section class="page-head-section section section--tight" aria-labelledby="privacy-heading">
      <div class="container">
        <div class="wrap wrap--wide">
          <p class="page-kicker">Site · Privacy</p>
          <nav class="legal-crumb" aria-label="Breadcrumb">
            <RouterLink to="/" class="legal-crumb__link">Road to Vostok Field Manual</RouterLink>
            <span class="legal-crumb__sep" aria-hidden="true">/</span>
            <span class="legal-crumb__here">Privacy policy</span>
          </nav>
          <h1 id="privacy-heading" class="page-title">Privacy policy</h1>
          <p class="page-dek">
            This policy describes how <strong>roadtovostok.net</strong> (the Road to Vostok Field Manual) handles information when you
            browse or email us. The site is mostly static articles and tools—no accounts, no comment login, and no marketing mailing
            list signup on these pages today.
          </p>
          <p class="page-dek page-dek--meta">Last updated: March 25, 2026</p>
        </div>
      </div>
    </section>

    <section class="legal-section section" aria-labelledby="privacy-controller">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="privacy-controller" class="section-heading">Who this policy covers</h2>
          <p class="legal-prose">
            The operator of this fan site is reachable at
            <a class="text-link" :href="mailto">{{ email }}</a>
            for privacy questions. We are <strong>not</strong> Road to Vostok Ltd.; privacy practices for the game client, Steam, or
            third-party platforms follow those companies’ policies, not this document.
          </p>
        </div>
      </div>
    </section>

    <section class="legal-section section" aria-labelledby="privacy-collect">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="privacy-collect" class="section-heading">What we collect automatically</h2>
          <p class="legal-prose">
            When you load a page, standard web hosting infrastructure may log technical data such as your IP address, approximate
            region, browser type, referring URL, time of request, and HTTP status. Providers use that for security (abuse detection,
            rate limits), capacity planning, and aggregate traffic statistics. We do not sell those logs and we do not use them to
            build individual “profiles” for advertising on this project.
          </p>
          <p class="legal-prose">
            Because deployment stacks differ (shared hosting, CDN, serverless, etc.), the exact fields and retention periods depend on
            the host you see in DNS for roadtovostok.net. If you need vendor names for a corporate questionnaire, ask via
            <a class="text-link" :href="mailto">{{ email }}</a>
            and we’ll answer with what we know at the time.
          </p>
        </div>
      </div>
    </section>

    <section class="legal-section section" aria-labelledby="privacy-voluntary">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="privacy-voluntary" class="section-heading">What you send us on purpose</h2>
          <p class="legal-prose">
            There is <strong>no contact form</strong> on roadtovostok.net—only a mailto link on the
            <RouterLink class="text-link" to="/contact">contact page</RouterLink>. If you email
            <a class="text-link" :href="mailto">{{ email }}</a>, we receive whatever you type: address, subject, body, attachments,
            and metadata your mail provider adds. Do not send passwords, payment card numbers, or government ID unless we explicitly
            asked for them (we almost never will).
          </p>
        </div>
      </div>
    </section>

    <section class="legal-section section" aria-labelledby="privacy-cookies">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="privacy-cookies" class="section-heading">Cookies, fonts &amp; third-party requests</h2>
          <p class="legal-prose">
            The HTML includes <code class="inline-code">preconnect</code> hints for Google Fonts. Loading those fonts can cause your
            browser to contact Google’s servers; Google’s privacy policy applies to that transaction. If you block third-party
            requests or use strict privacy tools, the site should still render with sensible system fonts.
          </p>
          <p class="legal-prose">
            We do not intentionally embed social “like” buttons, remarketing pixels, or comment widgets that fingerprint readers.
            If you still see cookies from a content delivery network, analytics bundle, or host dashboard, that usually reflects the
            infrastructure serving the files—not a deliberate tracker we added to monetize a shotgun guide.
          </p>
        </div>
      </div>
    </section>

    <section class="legal-section section" aria-labelledby="privacy-children">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="privacy-children" class="section-heading">Children</h2>
          <p class="legal-prose">
            Road to Vostok is a mature-themed game; this manual discusses violence and survival mechanics. The site is aimed at
            players and readers who can handle that context. We do not knowingly collect personal information from children under the
            age where parental consent is required in your jurisdiction. If you believe we received such data by mistake, email
            <a class="text-link" :href="mailto">{{ email }}</a>
            and we will delete what we can reasonably identify.
          </p>
        </div>
      </div>
    </section>

    <section class="legal-section section" aria-labelledby="privacy-retention">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="privacy-retention" class="section-heading">Retention</h2>
          <p class="legal-prose">
            Server logs rotate on a schedule set by the hosting provider (often weeks to months). Email you send may be kept long
            enough to respond, fix a reported issue, or meet a legal obligation, then archived or deleted according to mailbox hygiene.
            We do not maintain a separate customer database for visitors who only read the site.
          </p>
        </div>
      </div>
    </section>

    <section class="legal-section section" aria-labelledby="privacy-security">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="privacy-security" class="section-heading">Security</h2>
          <p class="legal-prose">
            We serve the site over HTTPS where configured by the host. No security practice is perfect—phishing and misconfigured
            DNS happen—so verify the domain in your address bar (roadtovostok.net) before trusting sensitive instructions, even from
            us.
          </p>
        </div>
      </div>
    </section>

    <section class="legal-section section" aria-labelledby="privacy-rights">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="privacy-rights" class="section-heading">Your rights &amp; international visitors</h2>
          <p class="legal-prose">
            Depending on where you live (for example the EEA, UK, or California), you may have rights to access, correct, delete, or
            restrict certain processing of personal data, and in some cases to lodge a complaint with a supervisory authority. This
            site processes minimal data; often the only “record” is an email thread you started or an IP address in a rotating log.
          </p>
          <ul class="legal-list">
            <li>
              To exercise a right, email
              <a class="text-link" :href="mailto">{{ email }}</a>
              from the address involved (or describe the message date if you used another mailbox).
            </li>
            <li>
              We rely on <strong>legitimate interests</strong> (running a secure static site, answering reader mail) and
              <strong>contractual necessity</strong> where applicable—not on selling personal data as a business model.
            </li>
            <li>
              If data passes through providers in other countries, those transfers follow the mechanisms your host or email provider
              offers (standard contractual clauses, adequacy decisions, etc.).
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="legal-section section section--tight" aria-labelledby="privacy-changes">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="privacy-changes" class="section-heading">Changes to this policy</h2>
          <p class="legal-prose">
            When we add features that materially change how data is collected—comment systems with accounts, newsletters, analytics
            dashboards—we will update this text and bump the “Last updated” date. Continued use of the site after a change means you
            accept the revised policy; if you disagree, stop visiting and clear locally cached copies.
          </p>
          <p class="legal-prose">
            <RouterLink class="text-link" to="/about">About</RouterLink>
            ·
            <RouterLink class="text-link" to="/contact">Contact</RouterLink>
            ·
            <RouterLink class="text-link" to="/wiki">Wiki hub</RouterLink>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-kicker {
  margin: 0 0 0.5rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.legal-crumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
  margin: 0 0 0.85rem;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

.legal-crumb__link {
  color: var(--color-frost);
  text-decoration: none;
  font-weight: 600;
}

.legal-crumb__link:hover {
  color: var(--color-text);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.legal-crumb__sep {
  opacity: 0.55;
  user-select: none;
}

.legal-crumb__here {
  color: color-mix(in srgb, var(--color-text) 75%, var(--color-text-muted));
  font-weight: 600;
}

.page-title {
  margin: 0 0 0.75rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 700;
  font-size: clamp(1.85rem, 4vw, 2.45rem);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-text);
}

.page-dek {
  margin: 0 0 0.75rem;
  color: var(--color-text-muted);
  font-size: 0.9375rem;
  line-height: 1.65;
  max-width: 46rem;
}

.page-dek--meta {
  margin-bottom: 0;
  font-size: 0.8125rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  letter-spacing: 0.04em;
  color: var(--color-text-muted);
}

.section-heading {
  margin: 0 0 0.75rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 700;
  font-size: clamp(1.15rem, 2.4vw, 1.35rem);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text);
}

.legal-prose {
  margin: 0 0 1rem;
  color: var(--color-text-muted);
  font-size: 0.9375rem;
  line-height: 1.65;
  max-width: 46rem;
}

.legal-prose:last-child {
  margin-bottom: 0;
}

.legal-prose strong {
  color: color-mix(in srgb, var(--color-text) 86%, var(--color-text-muted));
  font-weight: 600;
}

.inline-code {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.84em;
  padding: 0.15em 0.4em;
  border-radius: 2px;
  background: var(--color-bg-panel);
  border: 1px solid var(--color-border);
  color: var(--color-frost);
}

.text-link {
  color: var(--color-frost);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.text-link:hover {
  color: var(--color-text);
}

.legal-list {
  margin: 0 0 0.5rem;
  padding-left: 1.2rem;
  max-width: 46rem;
  color: var(--color-text-muted);
  font-size: 0.9375rem;
  line-height: 1.65;
}

.legal-list li + li {
  margin-top: 0.55rem;
}

.legal-list strong {
  color: color-mix(in srgb, var(--color-text) 86%, var(--color-text-muted));
}

.legal-section + .legal-section {
  border-top: 1px solid color-mix(in srgb, var(--color-border) 88%, transparent);
}

@media (max-width: 1023px) {
  .page-title {
    letter-spacing: 0.045em;
  }

  .legal-prose,
  .legal-list {
    font-size: 0.9rem;
  }
}

@media (max-width: 767px) {
  .page-title {
    font-size: clamp(1.45rem, 5.5vw, 2.1rem);
    letter-spacing: 0.035em;
  }

  .page-dek,
  .legal-prose,
  .legal-list {
    font-size: 0.875rem;
  }

  .section-heading {
    font-size: clamp(1.05rem, 4vw, 1.25rem);
  }
}
</style>
