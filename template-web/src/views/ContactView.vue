<script setup>
import { RouterLink } from 'vue-router'

const email = 'whuan@roadtovostok.net'
const mailto = `mailto:${email}`
</script>

<template>
  <div class="page-legal">
    <section class="page-head-section section section--tight" aria-labelledby="contact-heading">
      <div class="container">
        <div class="wrap wrap--wide">
          <p class="page-kicker">Site · Contact</p>
          <nav class="legal-crumb" aria-label="Breadcrumb">
            <RouterLink to="/" class="legal-crumb__link">Road to Vostok Field Manual</RouterLink>
            <span class="legal-crumb__sep" aria-hidden="true">/</span>
            <span class="legal-crumb__here">Contact</span>
          </nav>
          <h1 id="contact-heading" class="page-title">Contact</h1>
          <p class="page-dek">
            This site does not use a contact form. For anything specific to <strong>roadtovostok.net</strong>—guide corrections,
            licensing or takedown questions, or privacy requests—use the address below. You can write in English or Chinese; either is
            fine as long as the technical details are clear.
          </p>
        </div>
      </div>
    </section>

    <section class="legal-section section" aria-labelledby="contact-email">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="contact-email" class="section-heading">Email</h2>
          <p class="legal-prose">
            <a class="email-link" :href="mailto">{{ email }}</a>
          </p>
          <p class="legal-prose">
            Put something descriptive in the subject line (for example “Map pin correction” or “Privacy request”) so messages don’t
            drown in spam filters.
          </p>
        </div>
      </div>
    </section>

    <section class="legal-section section" aria-labelledby="contact-guides">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="contact-guides" class="section-heading">Reporting guide or map issues</h2>
          <p class="legal-prose">
            If a paragraph, pin description, or checklist disagrees with your game, include: the
            <strong>exact page URL</strong>, what you expected, what happened instead, and your
            <strong>Steam build or version string</strong> (Library → Road to Vostok → Properties). Screenshots help when the problem is
            UI placement or wording.
          </p>
          <p class="legal-prose">
            Many topics already have a natural home before you mail us: the
            <RouterLink class="text-link" to="/guides">guides hub</RouterLink>
            for weapons, survival, traders, and crossings; the
            <RouterLink class="text-link" to="/map">world map</RouterLink>
            for spatial references; the
            <RouterLink class="text-link" to="/start">Start</RouterLink>
            page for demo vs Early Access and PC specs.
          </p>
        </div>
      </div>
    </section>

    <section class="legal-section section" aria-labelledby="contact-response">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="contact-response" class="section-heading">Response time</h2>
          <p class="legal-prose">
            This manual is a side project. We read mail in batches; not every message gets a personal reply, especially if the fix is
            obvious (we may just update the page). Urgent game bugs, refund issues, or multiplayer rumours belong with the developer
            and Steam—not with a fan site.
          </p>
        </div>
      </div>
    </section>

    <section class="legal-section section section--tight" aria-labelledby="contact-more">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="contact-more" class="section-heading">Official channels for the game</h2>
          <p class="legal-prose">
            Road to Vostok Ltd. publishes through
            <a
              class="text-link"
              href="https://store.steampowered.com/app/1963610/Road_to_Vostok/"
              target="_blank"
              rel="noopener noreferrer"
              >Steam</a>,
            <a class="text-link" href="https://www.roadtovostok.com/" target="_blank" rel="noopener noreferrer">roadtovostok.com</a>,
            Discord, YouTube, and social links (see the footer on any page of this site). Use those when the issue is the product
            itself, not roadtovostok.net.
          </p>
          <p class="legal-prose">
            <RouterLink class="text-link" to="/about">About this manual</RouterLink>
            ·
            <RouterLink class="text-link" to="/privacy">Privacy policy</RouterLink>
            ·
            <RouterLink class="text-link" to="/">Home</RouterLink>
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
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.9375rem;
  line-height: 1.65;
  max-width: 46rem;
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

.email-link {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-frost);
  text-decoration: underline;
  text-underline-offset: 0.2em;
  word-break: break-all;
}

.email-link:hover {
  color: var(--color-text);
}

.text-link {
  color: var(--color-frost);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.text-link:hover {
  color: var(--color-text);
}

.legal-section + .legal-section {
  border-top: 1px solid color-mix(in srgb, var(--color-border) 88%, transparent);
}

@media (max-width: 1023px) {
  .page-title {
    letter-spacing: 0.045em;
  }

  .legal-prose {
    font-size: 0.9rem;
  }
}

@media (max-width: 767px) {
  .page-title {
    font-size: clamp(1.45rem, 5.5vw, 2.1rem);
    letter-spacing: 0.035em;
  }

  .page-dek,
  .legal-prose {
    font-size: 0.875rem;
  }

  .section-heading {
    font-size: clamp(1.05rem, 4vw, 1.25rem);
  }
}
</style>
