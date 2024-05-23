import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from 'firebase/app'

import {
  required,
  min,
  max,
  email,
  url,
  numeric,
  length,
  digits,
  between,
  integer,
  is,
  is_not as isNot,
} from '@vee-validate/rules'
import { defineRule, configure } from 'vee-validate'
import { localize } from '@vee-validate/i18n'

import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/lara-light-green/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import ToastService from 'primevue/toastservice'
import DialogService from 'primevue/dialogservice'
import ConfirmationService from 'primevue/confirmationservice'
import Tooltip from 'primevue/tooltip'
import BadgeDirective from 'primevue/badgedirective'

import App from './App.vue'
import router from './router'

defineRule('required', required)
defineRule('min', min)
defineRule('max', max)
defineRule('numeric', numeric)
defineRule('email', email)
defineRule('url', url)
defineRule('length', length)
defineRule('digits', digits)
defineRule('between', between)
defineRule('integer', integer)
defineRule('is', is)
defineRule('is_not', isNot)
defineRule('digitsBetween', digits)

configure({
  generateMessage: localize('ru', {
    messages: {
      required: 'Поле обязательно для заполнения',
      min: 'Минимальное значение {length}',
      max: 'Максимальное значение {length}',
      numeric: 'Должно быть числом',
      email: 'Некорректный email',
      url: 'Некорректный URL',
      length: 'Длина должна быть {length} символов',
      digits: 'Длина должна быть {length} символов и содержать только цифры',
      between: 'Должно быть между {min} и {max}',
      integer: 'Должно быть целым числом',
      is: 'Должно быть {value}',
      is_not: 'Не должно быть {value}',
      digitsBetween: 'Должно быть {params} цифр или пустое',
    },
  }),
})

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

initializeApp(firebaseConfig)
const app = createApp(App)

app.use(PrimeVue, {
  locale: {
    dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    monthNames: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
    monthNamesShort: ['Янв', 'Февр', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'],
    today: 'Сегодня',
    firstDayOfWeek: 1,
    dateFormat: 'dd.mm.yy',
  },
})

app.use(ToastService)
app.use(DialogService)
app.use(ConfirmationService)
app.directive('badge', BadgeDirective)
app.directive('tooltip', Tooltip)

app.use(createPinia())
app.use(router)

app.mount('#app')
