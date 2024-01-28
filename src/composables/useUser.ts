import { collection, getDocs, addDoc, type DocumentData /* getDoc, doc, setDoc */ } from 'firebase/firestore'
import { db } from '../firebase-config'
import { ref, computed, reactive } from 'vue'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import type { GoogleUser } from '../interfaces'
import { useRouter } from 'vue-router'

const googleUser = ref<GoogleUser | DocumentData | null>()
const googleUserList = ref([] as DocumentData)

const loading = reactive({
  googleUser: false,
  googleUserList: false,
})

const userToObject = computed((): GoogleUser | null => {
  if (googleUser.value) {
    return {
      uid: googleUser.value.uid,
      email: googleUser.value.email,
      displayName: googleUser.value.displayName,
      photoURL: googleUser.value.photoURL,
    }
  }
  return null
})

export const useUser = () => {
  const router = useRouter()
  const auth = getAuth()
  const yourDatabase = 'users'

  // войти с помощью окна гугл
  function googleRegister() {
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
      .then(async (userCredential) => {
        googleUser.value = userCredential.user

        // проверка первый ли раз он зашел
        const result = await addUserToMainDatabase()

        // достаем данные если не первый раз
        await getFromMainDatabase()

        // добавляем в локал сторадж
        addToLocalStorage()

        if (result === 'already exist') {
          router.push('/login')
        } else {
          router.push('/')
        }

        // пуш на страницу логина
      })
      .catch((error) => {
        console.error(error)
      })
  }

  async function addUserToMainDatabase() {
    loading.googleUser = true
    try {
      if (userToObject.value) {
        await getAllUsers()
        if (!checkUserInDatabase()) {
          await addDoc(collection(db, yourDatabase), userToObject.value)
        } else {
          return 'already exist'
        }
      }
      loading.googleUser = false
    } catch (error) {
      console.error(error)
    }
  }

  // получить всех юзеров
  async function getAllUsers() {
    loading.googleUserList = true
    try {
      const querySnapshot = await getDocs(collection(db, yourDatabase))
      querySnapshot.forEach((doc) => {
        googleUserList.value.push(doc.data())
      })
      loading.googleUserList = false
    } catch (error) {
      console.error(error)
    }
  }

  // проверка есть ли юзер в базе данных
  function checkUserInDatabase() {
    return googleUserList.value.some((item: any) => item.uid === userToObject.value?.uid)
  }

  // получить данные из базы данных
  async function getFromMainDatabase() {
    await getAllUsers()
    googleUser.value = googleUserList.value.find((item: any) => item.uid === googleUser.value?.uid)
  }

  function addToLocalStorage() {
    if (googleUser.value) {
      localStorage.setItem('user', JSON.stringify(googleUser.value))
    }
  }

  function getUserFromLocalStorage() {
    const userFromLocalStorage = localStorage.getItem('user')
    if (userFromLocalStorage) {
      googleUser.value = JSON.parse(userFromLocalStorage)
    }
  }

  function removeFromLocalStorage() {
    localStorage.removeItem('user')
  }

  // выйти из гугла
  function googleLogout() {
    auth.signOut()
    googleUser.value = null

    // удаляем из локал сторадж
    removeFromLocalStorage()
  }

  return {
    googleUser,
    googleUserList,
    loading,
    googleRegister,
    googleLogout,
    getAllUsers,
    userToObject,
    addToLocalStorage,
    getUserFromLocalStorage,
    removeFromLocalStorage,
  }
}
