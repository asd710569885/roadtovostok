<script setup>
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const nav = [
  { to: '/', label: 'Home' },
  { to: '/guides', label: 'Guides' },
  { to: '/map', label: 'Map' },
  { to: '/start', label: 'Start' },
]

const externals = [
  { href: 'https://www.roadtovostok.com/', label: 'Official site' },
  { href: 'https://www.youtube.com/roadtovostok', label: 'Devlogs' },
]

function isActive(path) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <header class="app-header" role="banner">
    <div class="app-header__accent" aria-hidden="true" />
    <div class="app-header__inner container">
      <div class="app-header__corners" aria-hidden="true">
        <span class="app-header__corner app-header__corner--tl" />
        <span class="app-header__corner app-header__corner--tr" />
      </div>
      <RouterLink to="/" class="app-header__brand" aria-label="Road to Vostok Field Manual home">
        <span class="app-header__mark" aria-hidden="true">
          <img
            class="app-header__logo"
            src="/images/logo.png"
            alt=""
            width="40"
            height="40"
            decoding="async"
          >
        </span>
        <span class="app-header__title">
          <span class="app-header__title-main">Road to Vostok</span>
          <span class="app-header__title-sub">Field Manual · Player guide</span>
        </span>
      </RouterLink>

      <div class="app-header__right">
        <nav class="app-header__nav" aria-label="Primary">
          <RouterLink
            v-for="item in nav"
            :key="item.to"
            :to="item.to"
            class="app-header__link"
            :class="{ 'app-header__link--active': isActive(item.to) }"
          >
            {{ item.label }}
          </RouterLink>
        </nav>
        <div class="app-header__externals" aria-label="External references">
          <a
            v-for="link in externals"
            :key="link.href"
            :href="link.href"
            class="app-header__pill"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ link.label }}
            <svg class="app-header__pill-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M2 10L10 2M10 2H4M10 2v6"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid var(--color-border);
  background: color-mix(in srgb, var(--color-bg-deep) 78%, transparent);
  backdrop-filter: blur(16px) saturate(1.15);
  box-shadow: 0 1px 0 color-mix(in srgb, var(--color-border-bright) 22%, transparent);
}

.app-header__accent {
  height: 3px;
  background: linear-gradient(
    90deg,
    transparent,
    color-mix(in srgb, var(--color-frost) 55%, transparent) 15%,
    var(--color-accent) 45%,
    color-mix(in srgb, var(--color-hazard) 70%, var(--color-accent)) 70%,
    transparent
  );
  opacity: 0.95;
}

.app-header__inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem 1.5rem;
  flex-wrap: wrap;
  min-height: 4rem;
  padding-top: 0.45rem;
  padding-bottom: 0.45rem;
}

.app-header__corners {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.app-header__corner {
  position: absolute;
  width: 14px;
  height: 14px;
  border-color: color-mix(in srgb, var(--color-frost) 55%, transparent);
  opacity: 0.65;
}

.app-header__corner--tl {
  top: 6px;
  left: 4px;
  border-top: 2px solid;
  border-left: 2px solid;
}

.app-header__corner--tr {
  top: 6px;
  right: 4px;
  border-top: 2px solid;
  border-right: 2px solid;
}

.app-header__brand {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  text-decoration: none;
  color: var(--color-text);
  cursor: pointer;
  transition: color 0.2s ease;
}

.app-header__brand:hover {
  color: var(--color-frost);
}

.app-header__mark {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
}

.app-header__logo {
  display: block;
  height: 2.25rem;
  width: auto;
  max-width: min(10rem, 28vw);
  object-fit: contain;
  filter: drop-shadow(0 0 10px color-mix(in srgb, var(--color-accent) 35%, transparent));
}

.app-header__title {
  display: flex;
  flex-direction: column;
  line-height: 1.12;
}

.app-header__title-main {
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.app-header__title-sub {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.app-header__right {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1.25rem;
}

.app-header__nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem 1.1rem;
}

.app-header__link {
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--color-text-muted);
  padding: 0.4rem 0;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition:
    color 0.2s ease,
    border-color 0.2s ease;
}

.app-header__link:hover {
  color: var(--color-text);
}

.app-header__link--active {
  color: var(--color-frost);
  border-bottom-color: var(--color-accent);
}

.app-header__externals {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-left: 0.25rem;
  border-left: 1px solid var(--color-border);
}

@media (max-width: 900px) {
  .app-header__externals {
    border-left: none;
    padding-left: 0;
    width: 100%;
    justify-content: flex-start;
  }
}

.app-header__pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.65rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  color: color-mix(in srgb, var(--color-text) 88%, var(--color-frost));
  background: color-mix(in srgb, var(--color-bg-panel) 88%, transparent);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    color 0.2s ease,
    background 0.2s ease;
}

.app-header__pill:hover {
  border-color: color-mix(in srgb, var(--color-frost) 55%, var(--color-border));
  color: var(--color-frost);
  background: color-mix(in srgb, var(--color-bg-elevated) 90%, var(--color-frost) 10%);
}

.app-header__pill-icon {
  opacity: 0.75;
}

@media (max-width: 520px) {
  .app-header__title-sub {
    display: none;
  }
}
</style>
