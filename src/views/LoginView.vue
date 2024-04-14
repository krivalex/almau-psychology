<template>
  <section class="login-view">
    <div class="info-container">
      <span class="welcome">
        Добро пожаловать, <strong>{{ googleUser?.displayName || 'Неизвестный пользователь' }}</strong
        >! Вы здесь впервые, давайте закончим регистрацию
      </span>
    </div>
    <div class="input-container">
      <span class="p-float-label">
        <p-input-text v-model="newStudent.name" id="name" />
        <label for="name">Имя</label>
      </span>
      <span class="p-float-label">
        <p-input-text v-model="newStudent.surname" id="surname" />
        <label for="surname">Фамилия</label>
      </span>
      <span class="p-float-label">
        <p-input-text v-model="newStudent.patronymic" id="patronymic" />
        <label for="patronymic">Отчество</label>
      </span>
      <span class="p-float-label">
        <p-input-mask id="phone" mask="+7(999)999-99-99" v-model="newStudent.phone" />
        <label for="phone">Телефон</label>
      </span>
      <span class="p-float-label">
        <p-dropdown v-model="newStudent.courseRegister" :options="courses" id="courseRegister" optionLabel="label" optionValue="value" @change="calculateYear" :showClear="true" />
        <label for="courseRegister">Курс</label>
      </span>
      <template v-if="!isNotAStudent">
        <span class="p-float-label">
          <p-dropdown v-model="newStudent.specialty" :options="schools" id="specialty" optionLabel="label" optionValue="value" :showClear="true" />
          <label for="specialty">Специальность</label>
        </span>
      </template>
      <template v-if="getTelegramLogin()">
        <span class="telegram-info">
          После регистрации вход будет выполнятся автоматически, через ваш телеграм <strong>@{{ getTelegramLogin() || 'Который не найден' }}</strong>
        </span>
      </template>
      <template v-else>
        <span class="telegram-info"> Чтобы подключить автоматический вход через телеграм, добавьте себе логин в телеграме - @example </span>
      </template>
    </div>
    <div class="contols">
      <button class="p-button" :disabled="!isValidate" @click="completeRegister">Зарегистрироваться</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import PInputMask from 'primevue/inputmask'
import PDropdown from 'primevue/dropdown'
import PInputText from 'primevue/inputtext'
import { useUser } from '../composables/useUser'
import { useRegistration } from '../composables/useRegistration'
import { computed, onMounted } from 'vue'
import { useTelegram } from '../composables/useTelegram'
import { courses, schools } from '../utils'

const { googleUser } = useUser()
const { newStudent, completeRegister } = useRegistration()
const { getTelegramLogin } = useTelegram()

onMounted(() => {
  newStudent.value.name = googleUser.value?.displayName.split(' ')[0]
  newStudent.value.surname = googleUser.value?.displayName.split(' ')[1]
})

const isNotAStudent = computed(() => newStudent.value.courseRegister == 'not_a_student')

const isValidate = computed(() => {
  const name = !!newStudent.value.name
  const surname = !!newStudent.value.surname
  const specialty = isNotAStudent.value || !!newStudent.value.specialty
  const yearAdmission = isNotAStudent.value || !!newStudent.value.yearAdmission
  const phone = !!newStudent.value.phone

  return name && surname && specialty && yearAdmission && phone
})

function calculateYear() {
  if (isNotAStudent.value) return (newStudent.value.yearAdmission = NaN)
  const currentYear = new Date().getFullYear()
  newStudent.value.yearAdmission = currentYear - Number(newStudent.value.courseRegister)
}
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
    width: 85%;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 85%;
    align-items: center;
    justify-content: center;
    margin: 0 auto;

    .p-float-label {
      width: 100%;
      font-size: 0.8rem;

      :deep(.p-dropdown) {
        width: 100%;
      }

      :deep(.p-inputmask) {
        width: 100%;
      }

      :deep(.p-inputtext) {
        width: 100%;
      }
    }
  }
}

.telegram-info {
  text-align: center;
  font-size: 0.8rem;
  color: #000000;
  max-width: 80%;
}
</style>
