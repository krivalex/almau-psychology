<template>
  <section class="login-view">
    <div class="input-container">
      <span class="p-float-label">
        <p-input-text id="username" v-model="newStudent.studentBiletNumber" />
        <label for="username">Номер студентческого билета</label>
      </span>
      <span class="p-float-label">
        <p-input-text id="username" v-model="newStudent.phone" />
        <label for="username">Номер телефона</label>
      </span>
      <!-- <PInputText v-model="value" />
      <PInputMask v-model="value" /> -->
    </div>
  </section>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import PInputText from 'primevue/inputtext'
import PInputMask from 'primevue/inputmask'
import { useUser } from '../composables/useUser'
import { useRegistration } from '../composables/useRegistration'

const { googleUser } = useUser()
const { newStudent } = useRegistration()
</script>

<style scoped lang="scss">
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
