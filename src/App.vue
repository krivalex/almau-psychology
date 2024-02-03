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
import { onMounted } from 'vue'
import { useUser } from './composables/useUser'

const { getAllUsers, getUserFromLocalStorage } = useUser()

onMounted(async () => {
  await getAllUsers()
  getUserFromLocalStorage()
})
</script>

<style scoped>
main {
  margin-top: 60px;
  position: relative;
}
</style>
