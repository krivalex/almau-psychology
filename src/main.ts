import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from 'firebase/app'

import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/lara-dark-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import ToastService from 'primevue/toastservice'
import DialogService from 'primevue/dialogservice'
import ConfirmationService from 'primevue/confirmationservice'
import Tooltip from 'primevue/tooltip'
import BadgeDirective from 'primevue/badgedirective'

import App from './App.vue'
import router from './router'

const firebaseConfig = {
  apiKey: 'AIzaSyAevhsUClJR9mSwS8usXVJYIiNeQ-iMkGY',
  authDomain: 'almau-psychology.firebaseapp.com',
  projectId: 'almau-psychology',
  storageBucket: 'almau-psychology.appspot.com',
  messagingSenderId: '381800203653',
  appId: '1:381800203653:web:4417ac03aee51c3c0df0ec',
}

initializeApp(firebaseConfig)
const app = createApp(App)

app.use(PrimeVue, {
  locale: {
    dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
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
