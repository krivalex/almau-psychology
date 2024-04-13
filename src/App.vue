<template>
  <template v-if="redirectToBrowser">
    <div class="warning-message-absolute">
      <span class="title">{{ isIOS() ? textForIOS.title : textForAndroid.title }}</span>
      <span class="description">{{ isIOS() ? textForIOS.description : textForAndroid.description }}</span>
    </div>
  </template>
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
import { useUserDevice } from './composables/useUserDevice'
import { useTelegram } from './composables/useTelegram'

import DynamicDialog from 'primevue/dynamicdialog'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'

const { getAllUsers, getUserFromLocalStorage } = useUser()
const { redirectToBrowser, isIOS, textForIOS, textForAndroid } = useUserDevice()
const { telegramWindow } = useTelegram()

onMounted(async () => {
  await getAllUsers()
  getUserFromLocalStorage()
  telegramWindow.value = (window as any)?.Telegram?.WebApp
  console.log(telegramWindow.value)
})
</script>

<style scoped>
main {
  margin-top: 60px;
  position: relative;
}

.warning-message-absolute {
  position: absolute;
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
  animation: blink 4s infinite;
  flex-direction: column;
  gap: 2rem;
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.9;
  }
  100% {
    opacity: 1;
  }
}
</style>
