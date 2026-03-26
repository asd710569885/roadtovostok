<script setup>
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <div class="app-layout">
    <a href="#main-content" class="skip-link visually-hidden">Skip to main content</a>
    <AppHeader />
    <main id="main-content" class="app-main" role="main">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped></style>
