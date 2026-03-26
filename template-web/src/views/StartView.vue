<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="page-start">
    <section class="page-head-section section section--tight" aria-labelledby="start-heading">
      <div class="container">
        <div class="wrap wrap--wide">
          <p class="page-kicker">Onboarding · Versions</p>
          <h1 id="start-heading" class="page-title">Start here: demo, Early Access, and PC specs</h1>
          <p class="page-dek">
            This page bundles the queries players hammer into search—<strong>Steam downloads</strong>, <strong>release timing</strong>,
            <strong>multiplayer rumors</strong>, and <strong>hardware floors</strong>—then gives a practical boot order for your first
            sessions. Dates and feature lists remain authoritative on the
            <a
              class="text-link"
              href="https://store.steampowered.com/app/1963610/Road_to_Vostok/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Steam store page
            </a>
            and the
            <a class="text-link" href="https://www.roadtovostok.com/" target="_blank" rel="noopener noreferrer">
              official site
            </a>
            ; we revise summaries after major beats. For mechanics and loot, pair this with the
            <RouterLink class="text-link" to="/guides">guides hub</RouterLink>
            and the
            <RouterLink class="text-link" to="/map">world map</RouterLink>
            when you’re planning routes.
          </p>
        </div>
      </div>
    </section>

    <section class="start-section section" aria-labelledby="checklist-heading">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="checklist-heading" class="section-heading">First thirty minutes — recommended flow</h2>
          <ol class="checklist">
            <li>
              <strong>Confirm the build:</strong> Demo and EA diverge in loot, tasks, and tuning. When reporting bugs or following
              guides, always cite the version string.
            </li>
            <li>
              <strong>Tune controls early:</strong> Realistic FPS muscle memory matters—set inspect, hold breath, and reload keys
              before you leave the safe loop.
            </li>
            <li>
              <strong>Respect shelter saves:</strong> Shelters anchor your run. Plan routes home before you chase rare spawns.
            </li>
            <li>
              <strong>Sort the stash mentally:</strong> Split meds, barter trash, tools, and combat kits so decisions stay fast under
              stress.
            </li>
            <li>
              <strong>Re-read risk labels:</strong> Before eastward pushes, decide what loss you can stomach—especially around
              Vostok-scale stakes.
            </li>
          </ol>
        </div>
      </div>
    </section>

    <section class="start-section section" aria-labelledby="compare-heading">
      <div class="container">
        <div class="wrap wrap--full">
          <h2 id="compare-heading" class="section-heading">Demo vs Early Access (expectations)</h2>
          <p class="section-lead">
            Use this matrix for <strong>mental models</strong>, not promises from us or anyone else. When Steam patch notes move loot,
            tasks, or zones, assume this table is stale until someone updates it against the new build.
          </p>
          <div class="table-scroll">
            <table class="data-table">
              <caption class="visually-hidden">
                Summary comparison of Demo versus Early Access expectations
              </caption>
              <thead>
                <tr>
                  <th scope="col">Dimension</th>
                  <th scope="col">Public demo</th>
                  <th scope="col">Early Access (directional)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Purpose</th>
                  <td>Teach controls, surface systems, harvest structured feedback</td>
                  <td>Ship a buyable, evolving slice with longer-horizon content cadence</td>
                </tr>
                <tr>
                  <th scope="row">Progression</th>
                  <td>Experience-first; economies may not match final tuning</td>
                  <td>Closer to commercial skeletons, still subject to rebalance passes</td>
                </tr>
                <tr>
                  <th scope="row">Guides</th>
                  <td>Great for keybind walkthroughs and mechanic primers</td>
                  <td>Requires explicit build stamps; loot/tasks drift patch to patch</td>
                </tr>
                <tr>
                  <th scope="row">Risk profile</th>
                  <td>Still punishing combat; losses teach, but stakes differ by zone</td>
                  <td>Vostok-tier rules demand louder warnings in every relevant article</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="notice notice--muted table-note" role="note">
            <span class="notice__label">Rev</span>
            <div class="notice__body">
              If Steam or the official site contradicts a row here, trust the store page first—then check patch notes and your own
              client. We adjust this block after big public beats.
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="start-section section" aria-labelledby="spec-heading">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="spec-heading" class="section-heading">PC requirements (Steam minimum / recommended)</h2>
          <p class="section-lead">
            Real-world FPS swings with resolution, weather VFX, and how much physics loot is on screen. Treat these Steam lines as a
            floor—thermal headroom and background apps matter too.
          </p>
          <div class="spec-grid">
            <div class="spec-card">
              <h3 class="spec-card__title">Minimum</h3>
              <ul class="spec-card__list">
                <li>Windows 10 64-bit</li>
                <li>Intel Core i5 · 8 GB RAM</li>
                <li>NVIDIA GTX 1060 · DirectX 12</li>
                <li>~10 GB storage (verify on Steam)</li>
              </ul>
            </div>
            <div class="spec-card spec-card--accent">
              <h3 class="spec-card__title">Recommended</h3>
              <ul class="spec-card__list">
                <li>Windows 10 64-bit</li>
                <li>Intel Core i7 · 8 GB RAM</li>
                <li>NVIDIA GTX 1080 Ti · DirectX 12</li>
                <li>SSD strongly recommended for streaming maps</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="start-section section" aria-labelledby="mp-heading">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="mp-heading" class="section-heading">Solo play, multiplayer questions, and mods</h2>
          <div class="two-col">
            <div>
              <h3 class="subheading">Is it multiplayer?</h3>
              <p>
                Store copy emphasizes a <strong>solo</strong> sandbox. If the devs ever ship co-op or other networking, read their
                posts first—this paragraph should carry a visible “last checked” date after that kind of shift.
              </p>
            </div>
            <div>
              <h3 class="subheading">Mods & tooling</h3>
              <p>
                Official messaging still treats deep mod tooling as a later milestone. If you use third-party tools, get them from
                places the community trusts, scan anything executable, and credit asset authors when you share loadouts or maps.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="start-section section" aria-labelledby="timeline-heading">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="timeline-heading" class="section-heading">Player-facing timeline (context only)</h2>
          <p class="section-lead">
            Narrative shorthand for why certain searches spike. Milestones themselves always defer to developer posts and Steam news.
          </p>
          <ol class="timeline">
            <li class="timeline__item">
              <span class="timeline__badge">Demo</span>
              <div class="timeline__body">
                <p class="timeline__title">Public demos</p>
                <p class="timeline__text">
                  Free slices validate gunfeel, survival cadence, and UI clarity. Expect concentrated “how do I…” traffic.
                </p>
              </div>
            </li>
            <li class="timeline__item">
              <span class="timeline__badge">EA</span>
              <div class="timeline__body">
                <p class="timeline__title">Early Access launch</p>
                <p class="timeline__text">
                  Paid, evolving builds: more maps, items, and tasks—guides must obsess over version tags and patch diffs.
                </p>
              </div>
            </li>
            <li class="timeline__item">
              <span class="timeline__badge">1.0</span>
              <div class="timeline__body">
                <p class="timeline__title">Full release target</p>
                <p class="timeline__text">
                  Wider content footprint and polish. Older explainers on this site stay up with clear version labels when builds move
                  on—you’re never punished for an outdated bookmark if the header says which era it’s from.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <section class="start-section section section--tight" aria-labelledby="related-heading">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="related-heading" class="section-heading">Also on this site</h2>
          <p class="section-lead">
            <RouterLink class="text-link" to="/guides">Guides hub</RouterLink>
            for gunplay, survival, traders, and the quick finder;
            <RouterLink class="text-link" to="/map">world map</RouterLink>
            when you’re sketching a route;
            <RouterLink class="text-link" to="/">home</RouterLink>
            for zones, FAQs, and what’s in the queue.
          </p>
        </div>
      </div>
    </section>

    <section class="notice-section section--tight section" aria-label="Version stamp">
      <div class="container">
        <div class="wrap wrap--wide">
          <div class="notice" role="note">
            <span class="notice__label">Ver</span>
            <div class="notice__body">
              Your game build string (Steam → Library → Road to Vostok → Properties) beats anything you read here. When a guide page
              lists a “last checked” build, match or beat that before you flame us on Reddit.
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.page-kicker {
  margin: 0 0 0.5rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent);
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

.section-heading {
  margin: 0 0 0.65rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 700;
  font-size: clamp(1.2rem, 2.5vw, 1.45rem);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text);
}

.section-lead {
  margin: 0 0 1.25rem;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  line-height: 1.65;
  max-width: 44rem;
}

.section-lead strong {
  font-weight: 600;
  color: color-mix(in srgb, var(--color-text) 84%, var(--color-text-muted));
}

.checklist {
  margin: 0;
  padding-left: 1.25rem;
  color: var(--color-text-muted);
  font-size: 0.9375rem;
  line-height: 1.65;
  max-width: 48rem;
}

.checklist li + li {
  margin-top: 0.65rem;
}

.checklist strong {
  color: color-mix(in srgb, var(--color-text) 88%, var(--color-text-muted));
}

.text-link {
  color: var(--color-frost);
  text-decoration: underline;
  text-underline-offset: 0.2em;
  cursor: pointer;
}

.text-link:hover {
  color: var(--color-text);
}

.table-scroll {
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  margin-bottom: 1rem;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--color-border-bright) 20%, transparent);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  min-width: 560px;
}

.data-table th,
.data-table td {
  padding: 0.85rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
  vertical-align: top;
}

.data-table thead th {
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  background: color-mix(in srgb, var(--color-bg-deep) 55%, var(--color-bg-panel));
}

.data-table tbody th[scope='row'] {
  width: 8.5rem;
  font-weight: 700;
  color: var(--color-text);
  background: color-mix(in srgb, var(--color-bg-panel) 70%, transparent);
}

.data-table td {
  color: var(--color-text-muted);
  line-height: 1.55;
}

.data-table tbody tr:last-child th,
.data-table tbody tr:last-child td {
  border-bottom: none;
}

.table-note {
  margin-top: 0;
}

.spec-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .spec-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.spec-card {
  padding: 1.15rem 1.2rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: color-mix(in srgb, var(--color-bg-panel) 85%, transparent);
}

.spec-card--accent {
  border-color: color-mix(in srgb, var(--color-frost) 35%, var(--color-border));
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--color-frost) 12%, transparent),
    0 18px 50px color-mix(in srgb, #000 35%, transparent);
}

.spec-card__title {
  margin: 0 0 0.75rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.spec-card__list {
  margin: 0;
  padding-left: 1.05rem;
  color: var(--color-text-muted);
  font-size: 0.875rem;
  line-height: 1.55;
}

.spec-card__list li + li {
  margin-top: 0.35rem;
}

.two-col {
  display: grid;
  gap: 1.25rem;
}

@media (min-width: 720px) {
  .two-col {
    grid-template-columns: repeat(2, 1fr);
  }
}

.subheading {
  margin: 0 0 0.5rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-text);
}

.two-col p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  line-height: 1.65;
}

.two-col strong {
  font-weight: 600;
  color: color-mix(in srgb, var(--color-text) 86%, var(--color-text-muted));
}

.timeline {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
  max-width: 40rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 1.15rem;
  top: 0.5rem;
  bottom: 0.5rem;
  width: 1px;
  background: linear-gradient(180deg, var(--color-accent), var(--color-frost), var(--color-border));
  opacity: 0.55;
}

.timeline__item {
  position: relative;
  display: grid;
  grid-template-columns: 5.5rem 1fr;
  gap: 1rem;
  padding: 0.85rem 0 0.85rem 0;
}

.timeline__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2rem;
  padding: 0 0.5rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-bg-deep);
  background: var(--color-frost);
  border-radius: 2px;
  justify-self: start;
  align-self: start;
  margin-left: 0.15rem;
  z-index: 1;
}

.timeline__body {
  padding-bottom: 0.25rem;
}

.timeline__title {
  margin: 0 0 0.35rem;
  font-weight: 700;
  color: var(--color-text);
  font-size: 0.95rem;
}

.timeline__text {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.55;
}
</style>
