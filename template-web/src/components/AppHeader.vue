<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const menuOpen = ref(false)

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

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  },
)

watch(menuOpen, (open) => {
  if (typeof document === 'undefined') return
  const html = document.documentElement
  if (open) {
    document.body.style.overflow = 'hidden'
    html.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
    html.style.overflow = ''
  }
})

function onKeydown(e) {
  if (e.key === 'Escape') {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <header class="app-header" role="banner">
    <div class="app-header__accent" aria-hidden="true" />
    <div
      class="app-header__backdrop"
      :class="{ 'app-header__backdrop--open': menuOpen }"
      aria-hidden="true"
      @click="closeMenu"
    />
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
        <button
          type="button"
          class="app-header__menu-toggle"
          :aria-expanded="menuOpen"
          aria-controls="app-header-menu"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          @click="toggleMenu"
        >
          <span class="app-header__menu-bars" aria-hidden="true">
            <span class="app-header__menu-bar" :class="{ 'app-header__menu-bar--1': menuOpen }" />
            <span class="app-header__menu-bar" :class="{ 'app-header__menu-bar--2': menuOpen }" />
            <span class="app-header__menu-bar" :class="{ 'app-header__menu-bar--3': menuOpen }" />
          </span>
        </button>

        <div
          id="app-header-menu"
          class="app-header__sheet"
          :class="{ 'app-header__sheet--open': menuOpen }"
        >
          <nav class="app-header__nav" aria-label="Primary">
            <RouterLink
              v-for="item in nav"
              :key="item.to"
              :to="item.to"
              class="app-header__link"
              :class="{ 'app-header__link--active': isActive(item.to) }"
              @click="closeMenu"
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
              @click="closeMenu"
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

.app-header__menu-toggle {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 2.65rem;
  height: 2.65rem;
  margin: 0;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: color-mix(in srgb, var(--color-bg-panel) 85%, transparent);
  color: var(--color-text);
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    color 0.2s ease;
}

.app-header__menu-toggle:hover {
  border-color: color-mix(in srgb, var(--color-frost) 45%, var(--color-border));
  color: var(--color-frost);
}

.app-header__menu-toggle:focus-visible {
  outline: 2px solid var(--color-frost);
  outline-offset: 2px;
}

.app-header__menu-bars {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 1.15rem;
}

.app-header__menu-bar {
  display: block;
  height: 2px;
  border-radius: 1px;
  background: currentColor;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
  transform-origin: center;
}

.app-header__menu-bar--1 {
  transform: translateY(7px) rotate(45deg);
}

.app-header__menu-bar--2 {
  opacity: 0;
  transform: scaleX(0);
}

.app-header__menu-bar--3 {
  transform: translateY(-7px) rotate(-45deg);
}

.app-header__sheet {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1.25rem;
}

.app-header__backdrop {
  display: none;
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

@media (max-width: 1023px) {
  .app-header__externals {
    border-left: none;
    padding-left: 0;
    width: 100%;
    justify-content: flex-start;
  }

  .app-header__inner {
    min-height: 3.65rem;
    gap: 0.85rem 1.15rem;
  }

  .app-header__link {
    font-size: 0.88rem;
    letter-spacing: 0.08em;
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

@media (max-width: 767px) {
  /* backdrop-filter creates a fixed-position containing block; drawer would clip inside the short header bar */
  .app-header {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    background: color-mix(in srgb, var(--color-bg-deep) 92%, transparent);
  }

  .app-header__title-sub {
    display: none;
  }

  .app-header__title-main {
    font-size: 1.05rem;
    letter-spacing: 0.06em;
  }

  .app-header__logo {
    height: 2rem;
    max-width: min(8.5rem, 52vw);
  }

  .app-header__pill {
    padding: 0.3rem 0.55rem;
    font-size: 0.6rem;
  }

  .app-header__inner {
    position: relative;
    z-index: 2;
    flex-wrap: nowrap;
    gap: 0.65rem 0.85rem;
  }

  .app-header__brand {
    min-width: 0;
    flex: 1;
  }

  .app-header__right {
    flex-wrap: nowrap;
    gap: 0;
    flex-shrink: 0;
  }

  .app-header__menu-toggle {
    display: inline-flex;
  }

  .app-header__sheet {
    position: fixed;
    top: calc(3px + 3.65rem);
    right: 0;
    bottom: 0;
    left: auto;
    width: min(19.5rem, 100%);
    max-width: min(19.5rem, 100%);
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: stretch;
    gap: 0;
    padding: 0.85rem calc(1rem + env(safe-area-inset-right, 0px)) calc(1.25rem + env(safe-area-inset-bottom, 0px))
      calc(1rem + env(safe-area-inset-left, 0px));
    margin: 0;
    background: color-mix(in srgb, var(--color-bg-deep) 94%, transparent);
    backdrop-filter: blur(18px) saturate(1.1);
    border-left: 1px solid var(--color-border);
    box-shadow: -12px 0 40px color-mix(in srgb, #000 55%, transparent);
    transform: translateX(100%);
    visibility: hidden;
    pointer-events: none;
    transition:
      transform 0.28s ease,
      visibility 0.28s ease;
    z-index: 100;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .app-header__sheet--open {
    transform: translateX(0);
    visibility: visible;
    pointer-events: auto;
  }

  .app-header__nav {
    flex-direction: column;
    align-items: stretch;
    flex-wrap: nowrap;
    gap: 0;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--color-border);
    margin-bottom: 0.85rem;
  }

  .app-header__link {
    padding: 0.85rem 0.35rem;
    font-size: 0.95rem;
    letter-spacing: 0.1em;
    border-bottom: 1px solid color-mix(in srgb, var(--color-border) 70%, transparent);
    border-left: 3px solid transparent;
  }

  .app-header__link:last-child {
    border-bottom: none;
  }

  .app-header__link--active {
    border-bottom-color: color-mix(in srgb, var(--color-border) 70%, transparent);
    border-left-color: var(--color-accent);
    color: var(--color-frost);
  }

  .app-header__externals {
    width: auto;
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
    padding-left: 0;
    border-left: none;
  }

  .app-header__pill {
    justify-content: center;
    width: 100%;
  }

  .app-header__backdrop {
    display: block;
    position: fixed;
    top: calc(3px + 3.65rem);
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    margin: 0;
    padding: 0;
    border: none;
    background: color-mix(in srgb, #000 58%, transparent);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.28s ease;
  }

  .app-header__backdrop--open {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
