<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="page-legal">
    <section class="page-head-section section section--tight" aria-labelledby="about-heading">
      <div class="container">
        <div class="wrap wrap--wide">
          <p class="page-kicker">Site · About</p>
          <nav class="legal-crumb" aria-label="Breadcrumb">
            <RouterLink to="/" class="legal-crumb__link">Road to Vostok Field Manual</RouterLink>
            <span class="legal-crumb__sep" aria-hidden="true">/</span>
            <span class="legal-crumb__here">About</span>
          </nav>
          <h1 id="about-heading" class="page-title">About this manual</h1>
          <p class="page-dek">
            <strong>Road to Vostok Field Manual</strong> (roadtovostok.net) is an independent player-run reference for
            <strong>Road to Vostok</strong>—the hardcore single-player survival FPS set on a post-collapse Finland–Russia border. We
            write for people who care about version strings, patch diffs, and not dying to their own inventory screen.
          </p>
          <p class="page-dek page-dek--follow">
            This page explains what the site is, how it relates to the developer, and where to go for gameplay help versus site
            issues.
          </p>
        </div>
      </div>
    </section>

    <section class="legal-section section" aria-labelledby="about-scope">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="about-scope" class="section-heading">What we publish</h2>
          <p class="legal-prose">
            The manual is structured around the problems players actually search for: realistic <strong>weapons and reloading</strong>,
            <strong>survival and medical</strong>, <strong>traders and tasks</strong>, <strong>map crossings and mine risk</strong>, and
            the difference between the <strong>Steam demo</strong> and <strong>Early Access</strong> builds. The
            <RouterLink class="text-link" to="/wiki">wiki index</RouterLink>
            combines a keyword “quick finder” with deeper pillar notes; the
            <RouterLink class="text-link" to="/map">interactive world map</RouterLink>
            overlays pins on the developer’s published world artwork (with accuracy caveats on-page); the
            <RouterLink class="text-link" to="/start">Start</RouterLink>
            page collects onboarding, PC requirements, and version expectations.
          </p>
          <p class="legal-prose">
            We aim for <strong>systems-first</strong> explanations: what to check in the UI, how Demo vs EA might diverge, and when a
            claim needs an in-game screenshot or a link to Steam patch notes—not speculation dressed up as fact.
          </p>
        </div>
      </div>
    </section>

    <section class="legal-section section" aria-labelledby="about-who">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="about-who" class="section-heading">What we are (and aren’t)</h2>
          <p class="legal-prose">
            We are <strong>not</strong> Road to Vostok Ltd., not employees of the developer, and not a licensed partner. Game names,
            logos, and artwork belong to their respective owners. We reproduce small amounts of official material (for example the
            public world-map image) only where needed for commentary and navigation—the same way a serious fan wiki or video essay
            would.
          </p>
          <ul class="legal-list">
            <li>
              <strong>Official sources</strong> for purchase, dates, and feature lists remain
              <a
                class="text-link"
                href="https://store.steampowered.com/app/1963610/Road_to_Vostok/"
                target="_blank"
                rel="noopener noreferrer"
                >Steam</a>
              and
              <a class="text-link" href="https://www.roadtovostok.com/" target="_blank" rel="noopener noreferrer">roadtovostok.com</a>—we
              link them in the footer on every page.
            </li>
            <li>
              <strong>Community wikis</strong> (for example Fandom) can be useful but may lag behind your build; we link one from the
              <RouterLink class="text-link" :to="{ path: '/wiki', query: { section: 'community-wiki' } }">wiki hub</RouterLink>
              for exploration, not as a copy source.
            </li>
            <li>
              <strong>If your installed build disagrees</strong> with a guide, trust the client first, then compare with the
              <RouterLink class="text-link" to="/start">Start</RouterLink>
              page and the relevant pillar in the
              <RouterLink class="text-link" to="/wiki">wiki hub</RouterLink>.
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="legal-section section" aria-labelledby="about-quality">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="about-quality" class="section-heading">Accuracy &amp; corrections</h2>
          <p class="legal-prose">
            Survival sandboxes change with every balance pass. When we state mechanics, loot, or map details, we try to label the
            context (demo vs EA, approximate build, or “verify in-client”). Pages that age badly should either get updated or carry a
            clear “last checked” note once we touch them again.
          </p>
          <p class="legal-prose">
            Found a factual mistake, broken link, or unclear step? Use the
            <RouterLink class="text-link" to="/contact">contact page</RouterLink>
            and include the URL, what you expected, and your game build string from Steam. That combination is the fastest way to get
            a useful fix into the manual.
          </p>
        </div>
      </div>
    </section>

    <section class="legal-section section section--tight" aria-labelledby="about-contact">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="about-contact" class="section-heading">Who to talk to</h2>
          <p class="legal-prose">
            Site questions, corrections, permission issues, and privacy requests all route through
            <RouterLink class="text-link" to="/contact">contact</RouterLink>. We read mail when we can; we’re players with day jobs,
            not a 24/7 help desk. For how we handle data, read the
            <RouterLink class="text-link" to="/privacy">privacy policy</RouterLink>.
          </p>
          <p class="legal-prose">
            Back to gameplay:
            <RouterLink class="text-link" to="/">Home overview</RouterLink>
            ·
            <RouterLink class="text-link" to="/wiki">Wiki hub</RouterLink>
            ·
            <RouterLink class="text-link" to="/map">World map</RouterLink>
            ·
            <RouterLink class="text-link" to="/start">Start &amp; specs</RouterLink>
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

.page-dek strong {
  color: color-mix(in srgb, var(--color-text) 86%, var(--color-text-muted));
  font-weight: 600;
}

.page-dek--follow {
  margin-top: 0.75rem;
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
