<template>
  <template v-if="redirectToBrowser">
    <div class="warning-message-absolute">
      <span class="description">
        Для успешной регистрации нажмите
        <!-- <a target="_blank" @click="redirectToBrowserHandler"></a> -->
      </span>
      <p-button label="Продолжить" @click="reloadPage" />
    </div>
  </template>
</template>

<script setup lang="ts">
import PButton from 'primevue/button'
import { useTelegram } from '@auth/composables/useTelegram'
import { useUserDevice } from '@/composables/useUserDevice'

const { redirectToBrowser } = useUserDevice()
const { reloadPage } = useTelegram()

// function redirectToBrowserHandler() {
//   window.open(getRedirectRoute(), '_blank')
// }
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
    padding: 0.75rem;

    a {
      color: blue;
      text-decoration: underline;
      font-weight: 600;
    }
  }
}
</style>
@/modules/auth/composables/useTelegram
