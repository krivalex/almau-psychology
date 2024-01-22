import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

import { initializeApp } from 'firebase/app'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAevhsUClJR9mSwS8usXVJYIiNeQ-iMkGY',
  authDomain: 'almau-psychology.firebaseapp.com',
  projectId: 'almau-psychology',
  storageBucket: 'almau-psychology.appspot.com',
  messagingSenderId: '381800203653',
  appId: '1:381800203653:web:4417ac03aee51c3c0df0ec',
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }
