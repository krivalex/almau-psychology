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
        <p-dropdown
          v-model="newStudent.courseRegister"
          :options="courses"
          id="courseRegister"
          optionLabel="label"
          optionValue="value"
          @change="calculateYear"
          :showClear="true"
        />
        <label for="courseRegister">Курс</label>
      </span>
      <template v-if="!isNotAStudent">
        <span class="p-float-label">
          <p-dropdown
            v-model="newStudent.specialty"
            :options="schools"
            id="specialty"
            optionLabel="label"
            optionValue="value"
            :showClear="true"
          />
          <label for="specialty">Специальность</label>
        </span>
      </template>
      <template v-if="getTelegramNickname() && getTelegramID()">
        <span class="status good"><strong>Авто-вход:</strong> доступен через телеграм</span>
        <span class="telegram-info">
          После регистрации вход в бота будет выполнятся автоматически, через ваш телеграм
          <strong>@{{ getTelegramNickname() }}</strong>
        </span>
      </template>
      <template v-else-if="getTelegramID() || getTelegramNickname()">
        <span class="status good"><strong>Авто-вход:</strong> доступен через телеграм</span>
        <span class="telegram-info"> После регистрации вход в бота будет выполнятся автоматически </span>
      </template>
      <template v-else-if="isBrowserMounted()">
        <span class="status good"><strong>Авто-вход:</strong> доступен через браузер</span>
        <span class="telegram-info"> При запуске сайта на вашем компьютере, вы будете заходить автоматически </span>
      </template>
      <template v-else-if="isWebViewMounted()">
        <span class="status good"><strong>Авто-вход:</strong> доступен через браузер</span>
        <span class="telegram-info"> При запуске сайта на вашем телефоне, вы будете заходить автоматически </span>
      </template>
      <template v-else>
        <span class="status bad"><strong>Авто-вход:</strong> не доступен</span>
        <span class="telegram-info">
          Автоматический вход в бота не доступен. Чтобы подключить автоматический вход через телеграм, добавьте себе
          логин в телеграме - <strong>@example</strong>
        </span>
      </template>
    </div>
    <div class="contols">
      <template v-if="validationMesage">
        <span class="contols-message">Вы не заполнили обязательные поля:</span>
        <span class="valid-fields">{{ validationMesage }}</span>
      </template>
      <button class="p-button" @click="checkValidateToRegister">Зарегистрироваться</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import PInputMask from 'primevue/inputmask'
import PDropdown from 'primevue/dropdown'
import PInputText from 'primevue/inputtext'
import { useUser } from '@/composables/useUser'
import { useRegistration } from '@auth/composables/useRegistration'
import { computed, onMounted, ref } from 'vue'
import { useTelegram } from '@auth/composables/useTelegram'
import { courses, loginFields, schools } from '@/utils'
import { useUserDevice } from '@/composables/useUserDevice'
import { User } from '@/interfaces'

const { googleUser } = useUser()
const { newStudent, completeRegister } = useRegistration()
const { getTelegramNickname, getTelegramID } = useTelegram()
const { isBrowserMounted, isWebViewMounted } = useUserDevice()

const validationMesage = ref<string>('')

onMounted(() => {
  newStudent.value.name = googleUser.value?.displayName.split(' ')[0]
  newStudent.value.surname = googleUser.value?.displayName.split(' ')[1]
})

function validate() {
  const name = !!newStudent.value.name
  const surname = !!newStudent.value.surname
  const specialty = isNotAStudent.value || !!newStudent.value.specialty
  const yearAdmission = isNotAStudent.value || !!newStudent.value.yearAdmission
  const phone = !!newStudent.value.phone

  const noValidFields = Object.entries(loginFields)
    .filter(([field]: [string, string]) => !newStudent.value[field as keyof User])
    .map(([, label]) => label)

  if (noValidFields) {
    validationMesage.value = `${noValidFields.join(', ')}`
  }

  return {
    valid: name && surname && specialty && yearAdmission && phone,
    noValidFields,
  }
}

async function checkValidateToRegister() {
  const { valid } = validate()
  if (valid) {
    validationMesage.value = ''
    await completeRegister()
  }
}

const isNotAStudent = computed(() => newStudent.value.courseRegister == 'not_a_student')

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
  flex-direction: column;
  gap: 50px;
  height: 100%;
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

.status {
  text-align: center;
  font-size: 0.8rem;
  color: #000000;
  max-width: 80%;

  strong {
    color: black;
  }
}

.good {
  color: #06c78a;
  font-weight: 600;
}

.bad {
  color: #ff4d4f;
  font-weight: 600;
}

.telegram-info {
  text-align: center;
  font-size: 0.8rem;
  color: #000000;
  max-width: 80%;
}

.contols {
  margin-bottom: 30px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  .contols-message {
    text-align: center;
    font-size: 0.8rem;
  }
  .valid-fields {
    text-align: center;
    font-size: 1rem;
    color: #ff4d4f;
    font-weight: 600;
    margin-bottom: 10px;
  }
}
</style>
@/modules/auth/composables/useRegistration @/modules/auth/composables/useTelegram
