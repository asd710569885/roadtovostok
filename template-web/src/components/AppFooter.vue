<script setup>
import { RouterLink } from 'vue-router'

const year = new Date().getFullYear()

const tags = ['Survival', 'Realistic guns', 'Loot', 'Sandbox', 'Border fiction', 'Permadeath zone']

const external = [
  { href: 'https://www.roadtovostok.com/', label: 'Official website' },
  { href: 'https://store.steampowered.com/app/1963610/Road_to_Vostok/', label: 'Steam store' },
  { href: 'https://steamcommunity.com/app/1963610', label: 'Community hub' },
  { href: 'https://discord.com/invite/roadtovostok', label: 'Discord' },
  { href: 'https://www.youtube.com/roadtovostok', label: 'YouTube' },
  { href: 'https://x.com/roadtovostok', label: 'X / Twitter' },
]
</script>

<template>
  <footer class="app-footer" role="contentinfo">
    <div class="app-footer__glow" aria-hidden="true" />
    <div class="app-footer__scan" aria-hidden="true" />
    <div class="container">
      <div class="app-footer__grid">
        <div class="app-footer__block app-footer__block--brand">
          <div class="app-footer__brand">
            <RouterLink to="/" class="app-footer__brand-mark" aria-label="Road to Vostok Field Manual home">
              <img
                class="app-footer__logo"
                src="/images/logo.png"
                alt=""
                width="44"
                height="44"
                decoding="async"
              >
            </RouterLink>
            <p class="app-footer__name">Road to Vostok Field Manual</p>
          </div>
          <p class="app-footer__desc">
            Independent, <strong>systems-first</strong> guides: weapons and reloading, survival and medical, traders and tasks, map
            crossings, demo vs Early Access. Not affiliated with the developer; game content and marks belong to Road to Vostok Ltd.
            and respective rights holders. Core routes:
            <RouterLink to="/guides">Guides</RouterLink>
            ·
            <RouterLink to="/map">Map</RouterLink>
            ·
            <RouterLink to="/start">Start</RouterLink>
            ·
            <RouterLink to="/">Home</RouterLink>
          </p>
          <ul class="app-footer__tags" aria-label="Content themes">
            <li v-for="t in tags" :key="t" class="app-footer__tag">{{ t }}</li>
          </ul>
        </div>
        <div class="app-footer__block">
          <p class="app-footer__label">On this site</p>
          <ul class="app-footer__list">
            <li><RouterLink to="/">Home overview</RouterLink></li>
            <li><RouterLink to="/guides">Guides &amp; wiki index</RouterLink></li>
            <li><RouterLink to="/map">World map</RouterLink></li>
            <li><RouterLink to="/start">Demo, EA &amp; specs</RouterLink></li>
          </ul>
        </div>
        <div class="app-footer__block">
          <p class="app-footer__label">Official &amp; community</p>
          <ul class="app-footer__list">
            <li v-for="item in external" :key="item.href">
              <a :href="item.href" target="_blank" rel="noopener noreferrer">{{ item.label }}</a>
            </li>
          </ul>
        </div>
        <div class="app-footer__block">
          <p class="app-footer__label">How we write</p>
          <ul class="app-footer__standards">
            <li>Step-by-step where hands matter; screenshots when the UI is easy to mis-click.</li>
            <li>Call out Demo vs Early Access up front; volatile pages get a “last checked” build when we touch them.</li>
            <li>Quote Steam or official posts for dates and feature lists—no telephone game.</li>
            <li>Gameplay, map pins, and loot claims are either reproducible in your client or labeled as educated guesses.</li>
          </ul>
        </div>
      </div>
      <nav class="app-footer__legal" aria-label="About and legal (关于我们、联系我们、隐私政策)">
        <RouterLink class="app-footer__legal-link" to="/about" title="关于我们">About</RouterLink>
        <span class="app-footer__legal-sep" aria-hidden="true">·</span>
        <RouterLink class="app-footer__legal-link" to="/contact" title="联系我们">Contact</RouterLink>
        <span class="app-footer__legal-sep" aria-hidden="true">·</span>
        <RouterLink class="app-footer__legal-link" to="/privacy" title="隐私政策">Privacy Policy</RouterLink>
      </nav>
      <div class="app-footer__bottom">
        <span class="app-footer__mono">© {{ year }} · Unofficial fan guide</span>
        <span class="app-footer__hint">Finland–Russia border · Post-collapse · Solo sandbox</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  position: relative;
  z-index: 5;
  margin-top: auto;
  border-top: 1px solid var(--color-border);
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--color-bg-panel) 40%, var(--color-bg-deep)) 0%,
    var(--color-bg-deep) 100%
  );
  padding-block: 3rem 1.75rem;
  overflow: hidden;
}

.app-footer__glow {
  position: absolute;
  left: 50%;
  bottom: -40%;
  width: 120%;
  height: 70%;
  transform: translateX(-50%);
  background: radial-gradient(
    ellipse at center,
    color-mix(in srgb, var(--color-frost) 12%, transparent),
    transparent 65%
  );
  pointer-events: none;
}

.app-footer__scan {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.06;
  background: repeating-linear-gradient(
    -8deg,
    transparent,
    transparent 8px,
    color-mix(in srgb, var(--color-border-bright) 40%, transparent) 8px,
    color-mix(in srgb, var(--color-border-bright) 40%, transparent) 9px
  );
  mask-image: linear-gradient(90deg, transparent, #000 25%, #000 75%, transparent);
}

.app-footer__grid {
  position: relative;
  display: grid;
  gap: 2.25rem;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .app-footer__grid {
    grid-template-columns: 1.4fr 1fr;
  }
}

@media (min-width: 1024px) {
  .app-footer__grid {
    grid-template-columns: 1.5fr 0.9fr 0.9fr 1.1fr;
  }
}

.app-footer__brand {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 0.65rem;
}

.app-footer__brand-mark {
  flex-shrink: 0;
  line-height: 0;
  border-radius: 4px;
  transition: opacity 0.2s ease;
}

.app-footer__brand-mark:hover {
  opacity: 0.92;
}

.app-footer__logo {
  display: block;
  height: 2.75rem;
  width: auto;
  max-width: min(11rem, 40vw);
  object-fit: contain;
}

.app-footer__name {
  margin: 0;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text);
}

.app-footer__desc {
  margin: 0 0 1rem;
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  max-width: 32rem;
}

.app-footer__desc strong {
  color: color-mix(in srgb, var(--color-text) 88%, var(--color-text-muted));
  font-weight: 600;
}

.app-footer__desc a {
  color: var(--color-frost);
  font-weight: 600;
  text-decoration: none;
}

.app-footer__desc a:hover {
  color: var(--color-text);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.app-footer__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.app-footer__tag {
  padding: 0.2rem 0.55rem;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
  border-radius: 2px;
  background: color-mix(in srgb, var(--color-bg-panel) 80%, transparent);
}

.app-footer__label {
  margin: 0 0 0.75rem;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.app-footer__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.app-footer__list li + li {
  margin-top: 0.45rem;
}

.app-footer__list a {
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: 0.875rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.app-footer__list a:hover {
  color: var(--color-frost);
}

.app-footer__standards {
  margin: 0;
  padding-left: 1.1rem;
  color: var(--color-text-muted);
  font-size: 0.8125rem;
  line-height: 1.55;
}

.app-footer__standards li + li {
  margin-top: 0.35rem;
}

.app-footer__legal {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.35rem 0.65rem;
  margin-top: 2.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--color-border);
}

.app-footer__legal-link {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-decoration: none;
}

.app-footer__legal-link:hover {
  color: var(--color-frost);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.app-footer__legal-sep {
  color: var(--color-text-muted);
  opacity: 0.5;
  user-select: none;
}

.app-footer__bottom {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 1rem;
  padding-top: 1.15rem;
  border-top: 1px solid color-mix(in srgb, var(--color-border) 65%, transparent);
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.app-footer__mono {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.app-footer__hint {
  opacity: 0.85;
  letter-spacing: 0.04em;
}
</style>
