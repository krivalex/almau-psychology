import { collection, getDocs, type DocumentData } from 'firebase/firestore'
import { db } from '../firebase-config'
import { ref, computed, reactive } from 'vue'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

// import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, onAuthStateChanged } from 'firebase/auth'
import type { GoogleUser, User } from '../interfaces'
import { useRouter } from 'vue-router'

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
    }
  }

  async function googleRegister() {
    console.log('googleRegister')

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
      // isSuccessAuth.value = true
    } catch (error) {
      console.error(error)
      // Handle error
    }
  }

  // onMounted(async () => {
  //   const redirectResult = await getRedirectResult(auth)

  //   localStorage.setItem('redirectResult', JSON.stringify(redirectResult))
  //   console.log(redirectResult)

  //   if (redirectResult) {
  //     googleUser.value = {
  //       uid: redirectResult.user.uid,
  //       email: redirectResult.user.email,
  //       displayName: redirectResult.user.displayName,
  //       photoURL: redirectResult.user.photoURL,
  //     }
  //     await userChecker()
  //     return
  //   }
  // })

  // function googleRegister() {
  // googUser = gapi.auth2.getAuthInstance().currentUser.get()
  // const auth = getAuth()
  // const provider = new GoogleAuthProvider()

  // setTimeout(() => {
  //   signInWithRedirect(auth, provider)

  //   setTimeout(() => {
  //     router.push('/')
  //   }, 3000)
  // }, 1000)

  // onAuthStateChanged(auth, async (user) => {
  //   if (user) {
  //     googleUser.value = {
  //       uid: user.uid,
  //       email: user.email,
  //       displayName: user.displayName,
  //       photoURL: user.photoURL,
  //     }
  //     await userChecker()
  //     isSuccessAuth.value = true
  //     return
  //   }
  // })

  // if (isSuccessAuth.value) {
  //   return
  // }

  // const redirectResult = await getRedirectResult(auth)
  // console.log(redirectResult)
  // localStorage.setItem('redirectResult', JSON.stringify(redirectResult))

  // if (redirectResult) {
  //   const credential = GoogleAuthProvider.credentialFromResult(redirectResult)
  //   console.log(credential)

  //   localStorage.setItem('credential', JSON.stringify(credential))

  //   googleUser.value = {
  //     uid: redirectResult.user.uid,
  //     email: redirectResult.user.email,
  //     displayName: redirectResult.user.displayName,
  //     photoURL: redirectResult.user.photoURL,
  //   }
  //   await userChecker()
  //   return
  // }

  // const credential = await signInWithRedirect(auth, provider)
  // console.log(credential)
  // const result = await signInWithCredential(auth, credential)
  // console.log(result)

  //   signInWithPopup(auth, provider)
  //     .then(async (userCredential) => {
  //       googleUser.value = userCredential.user

  //       // проверка первый ли раз он зашел
  //       const result = await calculateLoginRegister()

  //       if (result === 'new user') {
  //         router.push('/login')
  //       } else {
  //         // достаем данные если не первый раз
  //         await getFromMainDatabase()
  //         // добавляем в локал сторадж
  //         addToLocalStorage()
  //       }

  //       // пуш на страницу логина
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //     })
  // }

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
  }
}
