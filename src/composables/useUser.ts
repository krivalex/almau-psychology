import { collection, getDocs, type DocumentData } from 'firebase/firestore'
import { db } from '../firebase-config'
import { ref, computed, reactive } from 'vue'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

// import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, onAuthStateChanged } from 'firebase/auth'
import type { GoogleUser, User } from '../interfaces'
import { useRouter } from 'vue-router'
import { useTelegram } from './useTelegram'

const googleUser = ref<User | DocumentData | null>()
const googleUserList = ref([] as DocumentData)

const loading = reactive({
  googleUser: false,
  googleUserList: false,
})

// const isSuccessAuth = ref(false)

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
  const { telegramUser } = useTelegram()

  const router = useRouter()
  const auth = getAuth()
  const yourDatabase = 'users'

  const isAdmin = computed(() => {
    return googleUser.value?.status === 'admin'
  })

  async function userChecker() {
    const result = await calculateLoginRegister()
    console.log(result)

    if (result === 'new user') {
      router.push('/login')
    } else {
      await getFromMainDatabase()
      addToLocalStorage()
      router.push('/')
    }
  }

  async function googleRegister() {
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      googleUser.value = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      }
      await userChecker()
    } catch (error) {
      console.error(error)
    }
  }

  async function calculateLoginRegister() {
    loading.googleUser = true
    try {
      if (userToObject.value) {
        if (!checkUserInDatabase()) {
          return 'new user'
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
    if (googleUserList.value.length === 0) return
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

  function checkUserTelegram() {
    const user = googleUserList.value.find((item: User) => {
      if (telegramUser.value?.user?.username === '') return false
      return item.telegramLogin === telegramUser.value?.user?.username
    })
    if (user) {
      googleUser.value = user
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
    isAdmin,
    checkUserTelegram,
  }
}
