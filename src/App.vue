<template>
  <navbar-panel />
  <router-view />
  <footer-panel />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarPanel from './components/NavbarPanel.vue'
import FooterPanel from './components/FooterPanel.vue'
</script>

<style scoped></style>
