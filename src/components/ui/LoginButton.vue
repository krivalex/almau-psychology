<template>
  <template v-if="!isBrowserMounted()">
    <a :href="redirectRoute" target="_blank" class="enter-link p-button-sm" v-if="!googleUser" @click="toggleRedirectPosition">Войти</a>
    <p-avatar v-if="googleUser" :image="googleUser.photoURL" shape="circle" size="normal" />
  </template>
  <template v-else>
    <p-button class="enter p-button-sm" v-if="!googleUser" @click="googleRegister" label="Войти" icon="pi pi-sign"></p-button>
    <p-avatar v-if="googleUser" :image="googleUser.photoURL" shape="circle" size="normal" />
  </template>
</template>

<script setup lang="ts">
import PButton from 'primevue/button'
import PAvatar from 'primevue/avatar'
import { useUser } from '../../composables/useUser'
import { useUserDevice } from '../../composables/useUserDevice'
import { useTelegram } from '../../composables/useTelegram'

const { googleRegister, googleUser } = useUser()
const { isBrowserMounted, toggleRedirectPosition } = useUserDevice()
const { decodeTelegramUser, telegramNickname } = useTelegram()

const redirectRoute = `https://almau-psychology.netlify.app/login-options?redirect=true&redirectTeleramId=${decodeTelegramUser()}&redirectLogin=${telegramNickname}`
// const redirectRoute = `http://localhost:5173/login-options?redirect=true&redirectLogin=${decodeTelegramUser()}`
</script>

<style scoped lang="scss">
.enter-link {
  background: #06c78a;
  text-decoration: none;
  color: white;
  font-family: var(--font-family);
  font-feature-settings: var(--font-feature-settings, normal);
  font-size: 1rem;
  font-weight: normal;
  padding: 0.5rem 1rem;
  border-radius: 0.45rem;
  font-weight: 600;
}
</style>
