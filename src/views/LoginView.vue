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
        <p-input-text v-model="newStudent.specialty" id="specialty" />
        <label for="specialty">Специальность</label>
      </span>
      <span class="p-float-label">
        <p-dropdown v-model="newStudent.courseRegister" :options="courses" id="courseRegister" optionLabel="label" optionValue="value" @change="calculateYear" />
        <label for="courseRegister">Курс</label>
      </span>
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

const { googleUser } = useUser()
const { newStudent, completeRegister } = useRegistration()

onMounted(() => {
  newStudent.value.name = googleUser.value?.displayName.split(' ')[0]
  newStudent.value.surname = googleUser.value?.displayName.split(' ')[1]
})

const courses = [
  { label: '1 курс', value: 1 },
  { label: '2 курс', value: 2 },
  { label: '3 курс', value: 3 },
  { label: '4 курс', value: 4 },
  { label: 'Я не студент', value: 'not_a_student' },
]

function calculateYear() {
  if (newStudent.value.courseRegister == 'not_a_student') return (newStudent.value.yearAdmission = NaN)
  const currentYear = new Date().getFullYear()
  newStudent.value.yearAdmission = currentYear - newStudent.value.courseRegister
}

const isValidate = computed(() => {
  return !!newStudent.value.name && !!newStudent.value.surname && !!newStudent.value.specialty && !!newStudent.value.yearAdmission && newStudent.value.phone
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

      :deep(.p-dropdown) {
        width: 100%;
      }
    }
  }
}
</style>
