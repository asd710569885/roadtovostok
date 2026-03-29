<script setup>
import { RouterLink } from 'vue-router'

/** Snapshot sourced from https://www.roadtovostok.com/ + /game; verify before citing in disputes. */
const officialPages = [
  {
    label: 'Official site (home)',
    href: 'https://www.roadtovostok.com/',
    note: 'Release window, pricing, engine, platforms, contact. (Standalone /faq and /roadmap paths often 404—use /game for roadmap blocks.)',
  },
  {
    label: 'Game & roadmap',
    href: 'https://www.roadtovostok.com/game',
    note: 'Feature overview, three zones, factions, and public build roadmap on one page.',
  },
  {
    label: 'Steam store & news',
    href: 'https://store.steampowered.com/app/1963610/Road_to_Vostok/',
    note: 'Patch notes, events, and purchase flow—primary for build-specific changes.',
  },
  {
    label: 'YouTube (devlogs)',
    href: 'https://www.youtube.com/roadtovostok',
    note: 'Video updates and design intent.',
  },
]
</script>

<template>
  <div class="page-updates">
    <section class="page-head-section section section--tight" aria-labelledby="updates-heading">
      <div class="container">
        <div class="wrap wrap--wide">
          <p class="page-kicker">Official sources · Changelog hub</p>
          <h1 id="updates-heading" class="page-title">Road to Vostok Updates &amp; Official News</h1>
          <p class="page-dek">
            This page does <strong>not</strong> scrape the developer site in real time (browser CORS and maintenance). Instead it lists
            <strong>where to read first-hand news</strong> and keeps a short <strong>verbatim-style snapshot</strong> from the public
            homepage / game page as of our last manual review—always confirm on
            <a class="text-link" href="https://www.roadtovostok.com/" target="_blank" rel="noopener noreferrer">roadtovostok.com</a>
            before purchase or travel plans.
          </p>
        </div>
      </div>
    </section>

    <section class="updates-section section" aria-labelledby="snapshot-heading">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="snapshot-heading" class="section-heading">Homepage snapshot (verify live)</h2>
          <p class="legal-prose">
            The following bullets paraphrase or quote the structure of the official landing copy—used so newcomers see one screen of
            context before clicking out.
          </p>
          <ul class="legal-list">
            <li>
              <strong>Genre:</strong> Hardcore <strong>single-player</strong> survival set on a post-apocalyptic <strong>Finland–Russia</strong>
              border; loot, plan, and push toward <strong>Vostok</strong>, described as a high-stakes / permadeath-style zone.
            </li>
            <li>
              <strong>Steam Early Access:</strong> Announced for <strong>April 7, 2026</strong> at <strong>18:00 EEST / 08:00 PDT</strong>
              (per homepage + game page wording).
            </li>
            <li>
              <strong>Launch price:</strong> <strong>$14.99</strong> including a <strong>25% launch discount</strong> for about
              <strong>two weeks</strong>, then <strong>$19.99</strong> until full release; regional pricing via Steam.
            </li>
            <li>
              <strong>Platforms:</strong> PC-first; <strong>Windows</strong> at launch, <strong>native Linux</strong> a few months after;
              consoles considered after PC 1.0.
            </li>
            <li>
              <strong>Engine:</strong> <strong>Godot</strong> (open-source).
            </li>
          </ul>
          <div class="notice notice--muted updates-notice" role="note">
            <span class="notice__label">Fan site</span>
            <div class="notice__body">
              roadtovostok.net is unofficial. If this snapshot disagrees with the live site or Steam, trust
              <strong>Steam + roadtovostok.com</strong> and tell us via
              <RouterLink class="text-link" to="/contact">Contact</RouterLink>
              so we can refresh the copy.
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="updates-section section" aria-labelledby="roadmap-heading">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="roadmap-heading" class="section-heading">Game &amp; roadmap (official summary)</h2>
          <p class="legal-prose">
            The blocks below condense the public
            <a
              class="text-link"
              href="https://www.roadtovostok.com/game"
              target="_blank"
              rel="noopener noreferrer"
            >
              Game &amp; Roadmap
            </a>
            page on roadtovostok.com—verify wording and dates on the live site before you treat any line as a promise.
          </p>

          <h3 class="roadmap-sub">Progression layers</h3>
          <ul class="legal-list roadmap-zones">
            <li>
              <strong>Area 05:</strong> Evacuated southeastern Finland—shelters, traders, tasks, starter loot; hostile Bandits interrupt
              the loop.
            </li>
            <li>
              <strong>Border Zone:</strong> Guarded Finland–Russia line; crossings vary (mines, obstacles, boats). The Guards faction
              is armed, corrupt, and can call air support.
            </li>
            <li>
              <strong>Vostok:</strong> High-risk Russian interior with the best loot. Every Vostok map is permadeath—die elsewhere and you
              lose carried gear; die in Vostok and you lose everything. The Military faction fields heavy weapons and vehicles.
            </li>
            <li>
              <strong>Sandbox:</strong> Hardcore survival without forced playstyles—you can ignore permadeath zones, lore, or themed
              roles. Systems and events randomize runs; there is no formal win state.
            </li>
          </ul>

          <h3 class="roadmap-sub">Core features (marketing list)</h3>
          <ul class="roadmap-features">
            <li>Realistic FPS mechanics</li>
            <li>Physics-based loot</li>
            <li>Hostile AI &amp; factions</li>
            <li>Map-to-map travel</li>
            <li>Permadeath zone</li>
            <li>Shelter customization</li>
            <li>Trading &amp; tasks</li>
            <li>Day &amp; night cycle</li>
            <li>Dynamic weather</li>
            <li>Dynamic events</li>
            <li>Summer &amp; winter</li>
          </ul>

          <h3 class="roadmap-sub">Build roadmap</h3>
          <ol class="roadmap-builds">
            <li>
              <strong>Build 1 — Road</strong>
              <span class="roadmap-build__when">Target release Apr 7, 2026</span>
              <ul>
                <li>Early Access launch</li>
                <li>Gameplay loop</li>
                <li>Expanded maps</li>
                <li>Dynamic elements</li>
                <li>Multi-shelter support</li>
              </ul>
            </li>
            <li>
              <strong>Build 2 — Nomads</strong> <span class="roadmap-build__when">Q3 / 2026</span>
              <ul>
                <li>Friendly faction</li>
                <li>AI vs AI combat</li>
                <li>AI variants</li>
                <li>Driver (Trader)</li>
                <li>New map &amp; shelter</li>
              </ul>
            </li>
            <li>
              <strong>Build 3 — Signal</strong> <span class="roadmap-build__when">Q4 / 2026</span>
              <ul>
                <li>Quest system</li>
                <li>Lore elements</li>
                <li>Civil defence shelters</li>
                <li>Grandma (Trader)</li>
                <li>New map &amp; shelter</li>
              </ul>
            </li>
            <li>
              <strong>Build 4 — Gunslinger</strong> <span class="roadmap-build__when">TBA</span>
              <ul>
                <li>Weapon overhaul</li>
                <li>Bullet penetration</li>
                <li>Modding kits</li>
                <li>Trader services</li>
                <li>New map &amp; shelter</li>
              </ul>
            </li>
            <li>
              <strong>Build 5 — North</strong> <span class="roadmap-build__when">TBA</span>
              <ul>
                <li>Dynamic season</li>
                <li>Train system</li>
                <li>Hunting &amp; wildlife</li>
                <li>Shaman (Trader)</li>
                <li>New map &amp; shelter</li>
              </ul>
            </li>
            <li>
              <strong>Build 6 — Abyss</strong> <span class="roadmap-build__when">TBA</span>
              <ul>
                <li>Sea system</li>
                <li>Patrol boats</li>
                <li>Scuba gear</li>
                <li>Fisherman (Trader)</li>
                <li>New map &amp; shelter</li>
              </ul>
            </li>
            <li>
              <strong>Build 7 — Enigma</strong> <span class="roadmap-build__when">TBA</span>
              <ul>
                <li>Dialogue system</li>
                <li>SIGINT tools</li>
                <li>Transmissions</li>
                <li>Scientist (Trader)</li>
                <li>New map &amp; shelter</li>
              </ul>
            </li>
            <li>
              <strong>Build 8 — Silent Night</strong> <span class="roadmap-build__when">TBA</span>
              <ul>
                <li>Full questline</li>
                <li>World options</li>
                <li>Destruction system</li>
                <li>FINSOF faction</li>
                <li>New map &amp; shelter</li>
              </ul>
            </li>
          </ol>
          <div class="notice notice--muted updates-notice" role="note">
            <span class="notice__label">Source</span>
            <div class="notice__body">
              Paraphrased from
              <a class="text-link" href="https://www.roadtovostok.com/game" target="_blank" rel="noopener noreferrer">roadtovostok.com/game</a>
              (Game &amp; Roadmap). Builds and dates slip—treat this as orientation, not a contract.
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="updates-section section" aria-labelledby="sources-heading">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="sources-heading" class="section-heading">Where updates appear first</h2>
          <ul class="source-list">
            <li v-for="row in officialPages" :key="row.href" class="source-list__item">
              <a class="source-list__link" :href="row.href" target="_blank" rel="noopener noreferrer">{{ row.label }}</a>
              <span class="source-list__note">{{ row.note }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="updates-section section section--tight" aria-labelledby="more-heading">
      <div class="container">
        <div class="wrap wrap--wide">
          <h2 id="more-heading" class="section-heading">Inside this manual</h2>
          <p class="legal-prose">
            <RouterLink class="text-link" to="/start">Start</RouterLink>
            for onboarding, specs, and demo vs EA workflow,
            <RouterLink class="text-link" to="/wiki">Wiki index</RouterLink>
            for mechanics hubs, and
            <RouterLink class="text-link" to="/map">Map</RouterLink>
            for geography references.
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
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.page-title {
  margin: 0 0 0.75rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 700;
  font-size: clamp(1.65rem, 4vw, 2.35rem);
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

.legal-list {
  margin: 0 0 1rem;
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

.source-list {
  margin: 0;
  padding: 0;
  list-style: none;
  max-width: 48rem;
}

.source-list__item {
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--color-border);
}

.source-list__item:first-child {
  padding-top: 0;
}

.source-list__item:last-child {
  border-bottom: none;
}

.source-list__link {
  display: inline-block;
  font-weight: 700;
  color: var(--color-frost);
  text-decoration: none;
  margin-bottom: 0.25rem;
}

.source-list__link:hover {
  color: var(--color-text);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.source-list__note {
  display: block;
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.55;
}

.text-link {
  color: var(--color-frost);
  text-decoration: underline;
  text-underline-offset: 0.2em;
  font-weight: 600;
}

.text-link:hover {
  color: var(--color-text);
}

.updates-notice {
  max-width: 46rem;
}

.updates-section + .updates-section {
  border-top: 1px solid color-mix(in srgb, var(--color-border) 88%, transparent);
}

.roadmap-sub {
  margin: 1.25rem 0 0.5rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.roadmap-sub:first-of-type {
  margin-top: 0.5rem;
}

.roadmap-zones {
  margin-bottom: 0.5rem;
}

.roadmap-features {
  margin: 0 0 0.5rem;
  padding-left: 1.2rem;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  line-height: 1.55;
  columns: 1;
}

@media (min-width: 640px) {
  .roadmap-features {
    columns: 2;
    column-gap: 2rem;
  }
}

.roadmap-features li {
  break-inside: avoid;
  margin-bottom: 0.35rem;
}

.roadmap-builds {
  margin: 0;
  padding-left: 1.15rem;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  line-height: 1.55;
  max-width: 48rem;
}

.roadmap-builds > li + li {
  margin-top: 1rem;
}

.roadmap-builds strong {
  color: color-mix(in srgb, var(--color-text) 88%, var(--color-text-muted));
}

.roadmap-builds ul {
  margin: 0.35rem 0 0;
  padding-left: 1.1rem;
}

.roadmap-build__when {
  display: block;
  margin: 0.15rem 0 0.35rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-frost);
  letter-spacing: 0.04em;
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
    font-size: clamp(1.4rem, 5.5vw, 2rem);
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
