<template>
  <template v-if="redirectToBrowser">
    <div class="warning-message-absolute">
      <span class="title">{{ isIOS() ? textForIOS.title : textForAndroid.title }}</span>
      <span class="description">
        У вас должен был открыться ваш основной браузер,
        <a target="_blank" @click="redirectToBrowserHandler">перейти в него</a>
        - для регистрации
      </span>
      <p-button label="Обновить" @click="reloadPage" />
    </div>
  </template>
</template>

<script setup lang="ts">
import PButton from 'primevue/button'
import { useTelegram } from '../composables/useTelegram'
import { useUserDevice } from '../composables/useUserDevice'

const { redirectToBrowser, isIOS, textForIOS, textForAndroid } = useUserDevice()
const { reloadPage, redirectRoute } = useTelegram()

function redirectToBrowserHandler() {
  window.open(redirectRoute, '_blank')
}
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
