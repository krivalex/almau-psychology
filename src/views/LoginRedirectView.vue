<template>
  <section class="login-redirect">
    <span class="text"> Вход должен был запустится автоматически - если это не произошло, пожалуйста нажмите на кнопку </span>
    <p-button class="nav-buttons" label="Вход" @click="googleRegister" />
  </section>
</template>

<script setup lang="ts">
import PButton from 'primevue/button'
import { useUser } from '../composables/useUser'
import { onMounted } from 'vue'

const { googleRegister } = useUser()

onMounted(() => {
  setTimeout(() => {
    googleRegister()
  }, 500)
})
</script>

<style scoped lang="scss">
.login-redirect {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  background-color: #f5f5f5;
  color: black;
  width: 100vw;
  padding: 3rem;
  gap: 3rem;

  .text {
    font-size: 1.2rem;
    text-align: center;
  }
}
</style>
