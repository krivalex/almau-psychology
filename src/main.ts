import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from 'firebase/app'

import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/lara-dark-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import App from './App.vue'
import router from './router'

const firebaseConfig = {}

initializeApp(firebaseConfig)
const app = createApp(App)

app.use(PrimeVue)
app.use(createPinia())
app.use(router)

app.mount('#app')
