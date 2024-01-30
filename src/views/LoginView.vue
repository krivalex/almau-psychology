<template>
  <section class="login-view">
    <div class="info-container">
      <span class="welcome">
        Добро пожаловать, <strong>{{ googleUser?.displayName }}</strong
        >! Вы здесь впервые, давайте закончим регистрацию
      </span>
    </div>
    <div class="input-container">
      <span class="p-float-label">
        <p-input-mask id="username" mask="№99999" placeholder="№99999" v-model="newStudent.studentBiletNumber" />
        <label for="username">Номер студентческого билета</label>
      </span>
      <span class="p-float-label">
        <p-input-mask id="phone" mask="+7(999)999-99-99" v-model="newStudent.phone" />
        <label for="phone">Номер телефона</label>
      </span>
    </div>
    <div class="contols">
      <button class="p-button" :disabled="!isValidate" @click="completeRegister">Зарегистрироваться</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import PInputMask from 'primevue/inputmask'
import { useUser } from '../composables/useUser'
import { useRegistration } from '../composables/useRegistration'
import { computed } from 'vue'

const { googleUser } = useUser()
const { newStudent, completeRegister } = useRegistration()

const isValidate = computed(() => {
  return newStudent.value.studentBiletNumber && newStudent.value.phone
})
</script>

<style scoped lang="scss">
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  flex-direction: column;
  gap: 50px;
  color: black;

  .info-container {
    margin: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px 0;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .p-float-label {
      width: 100%;
      font-size: 0.8rem;
    }
  }
}
</style>
