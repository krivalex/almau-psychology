<template>
  <dynamic-dialog />
  <confirm-dialog />
  <toast position="bottom-left" />
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
import DynamicDialog from 'primevue/dynamicdialog'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'

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
