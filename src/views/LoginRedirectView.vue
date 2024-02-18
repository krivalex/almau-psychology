<template>
  <p-button class="nav-buttons" label="Попап" @click="googleRegister" />
  <p-button class="nav-buttons" label="Бот" @click="telegramBackRedirect" />
</template>

<script setup lang="ts">
import PButton from 'primevue/button'
import { useUser } from '../composables/useUser'

const { googleRegister } = useUser()

function telegramBackRedirect() {
  // try to open telegram app
  window.location.href = 'https://t.me/AlmaU_Psychology_BOT'
}
</script>
