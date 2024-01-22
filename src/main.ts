import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from 'firebase/app'

import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/lara-dark-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

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

app.use(PrimeVue)
app.use(createPinia())
app.use(router)

app.mount('#app')
