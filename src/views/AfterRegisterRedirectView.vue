<template>
  <section class="after-redirect">
    <span class="status"> Вы успешно зарегистрировались </span>
    <template v-if="getTelegramID()">
      <span class="text">
        Теперь вам доступен, авто-вход с телеграма <strong>@{{ getTelegramID() }}</strong>
      </span>
    </template>
    <template v-else>
      <span class="text"> У вас нет телеграм логина, авто-вход с телеграма не доступен, бот подскажет вам как его добавить </span>
    </template>
    <p-button class="nav-buttons" label="Вернуться" @click="goBackToTelegramBot" />
  </section>
</template>

<script setup lang="ts">
import PButton from 'primevue/button'
import { useTelegram } from '../composables/useTelegram'

const { goBackToTelegramBot, getTelegramID } = useTelegram()
</script>

<style scoped lang="scss">
.after-redirect {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  background-color: #f5f5f5;
  color: black;
  width: 100vw;
  padding: 2.5rem;
  gap: 3rem;

  .status {
    font-size: 1.6rem;
    text-align: center;
  }

  .text {
    font-size: 1rem;
    text-align: center;
  }
}
</style>
