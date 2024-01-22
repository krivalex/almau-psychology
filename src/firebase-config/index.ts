import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

import { initializeApp } from 'firebase/app'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC8oKlXm8viK4dVZt4xo4T0AWSnACVMM_M',
  authDomain: 'almau-psychologist.firebaseapp.com',
  projectId: 'almau-psychologist',
  storageBucket: 'almau-psychologist.appspot.com',
  messagingSenderId: '291718757462',
  appId: '1:291718757462:web:8c60f6b6efef12ef100ff7',
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }
