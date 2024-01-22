<template>
  <navbar-panel />
  <main>
    <router-view />
  </main>
  <footer-panel />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarPanel from './components/NavbarPanel.vue'
import FooterPanel from './components/FooterPanel.vue'
</script>

<style scoped>
main {
  margin-top: 60px;
  margin-bottom: 60px;
  min-height: 100vh - 120px;
}
</style>
