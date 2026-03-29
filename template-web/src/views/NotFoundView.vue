<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="page-not-found">
    <section class="not-found-section section section--loose" aria-labelledby="not-found-heading">
      <div class="container">
        <div class="wrap wrap--wide">
          <p class="not-found-kicker">HTTP 404</p>
          <h1 id="not-found-heading" class="not-found-title">Road to Vostok — Page not found</h1>
          <p class="not-found-text">
            The URL may be mistyped, or the page was moved. Use the navigation above or return to the field manual home.
          </p>
          <div class="not-found-actions">
            <RouterLink to="/" class="not-found-btn not-found-btn--primary">Back to home</RouterLink>
            <RouterLink to="/wiki" class="not-found-btn not-found-btn--ghost">Wiki hub</RouterLink>
            <RouterLink to="/map" class="not-found-btn not-found-btn--ghost">World map</RouterLink>
            <RouterLink to="/start" class="not-found-btn not-found-btn--ghost">Start &amp; specs</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.not-found-kicker {
  margin: 0 0 0.5rem;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.not-found-title {
  margin: 0 0 0.75rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 700;
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text);
}

.not-found-text {
  margin: 0 0 1.5rem;
  max-width: 36rem;
  color: var(--color-text-muted);
  font-size: 0.9375rem;
  line-height: 1.65;
}

.not-found-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.not-found-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1.25rem;
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 2px;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
}

.not-found-btn--primary {
  background: var(--color-accent);
  color: #0a0806;
  border: 1px solid var(--color-accent-dim);
}

.not-found-btn--primary:hover {
  filter: brightness(1.06);
}

.not-found-btn--ghost {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border-bright);
}

.not-found-btn--ghost:hover {
  border-color: var(--color-frost);
  color: var(--color-frost);
}

@media (max-width: 1023px) {
  .not-found-title {
    letter-spacing: 0.045em;
  }
}

@media (max-width: 767px) {
  .not-found-title {
    font-size: clamp(1.4rem, 5.5vw, 2rem);
  }

  .not-found-text {
    font-size: 0.9rem;
  }

  .not-found-btn {
    padding: 0.58rem 1.05rem;
    font-size: 0.82rem;
    letter-spacing: 0.08em;
  }

  .not-found-actions {
    gap: 0.55rem;
  }
}
</style>
