<template>
  <warning-window />
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
import { useTelegram } from './composables/useTelegram'
import WarningWindow from './components/WarningWindow.vue'

import DynamicDialog from 'primevue/dynamicdialog'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'

const { getAllUsers, getUserFromLocalStorage, checkUserTelegram } = useUser()
const { initTelegram } = useTelegram()

onMounted(async () => {
  initTelegram()
  await getAllUsers()
  setTimeout(() => {
    checkUserTelegram()
    getUserFromLocalStorage()
  }, 100)
})
</script>

<style scoped lang="scss">
main {
  margin-top: 60px;
  position: relative;
}

.warning-message-absolute {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #06c78a;
  font-weight: 600;
  z-index: 100;
  text-align: center;
  padding: 1.5rem;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #06c78a;
  border-top: 1px solid #06c78a;
  border-radius: 0.5rem;
  flex-direction: column;
  gap: 2rem;

  .description {
    a {
      color: blue;
      text-decoration: underline;
      font-weight: 600;
    }
  }
}
</style>
