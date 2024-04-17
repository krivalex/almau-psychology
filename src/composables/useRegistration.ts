import { reactive, ref } from 'vue'
import { initNewUser } from '../utils/business.init'
import { User } from '../interfaces'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase-config'
import { useUser } from './useUser'
import { useRouter } from 'vue-router'
import { useTelegram } from './useTelegram'
import { useUserDevice } from './useUserDevice'

const newStudent = ref<User>(initNewUser)
const studentList = ref<User[]>([])

export const useRegistration = () => {
  const { userToObject, googleUser, addToLocalStorage } = useUser()
  const { getTelegramID } = useTelegram()
  const { isWebViewMounted } = useUserDevice()

  const router = useRouter()
  const database = 'users'

  const loading = reactive({
    studentList: false,
  })

  async function completeRegister() {
    newStudent.value.telegramLogin = getTelegramID() || ''
    if (newStudent.value.telegramLogin) newStudent.value.enableTelegramEnter = true

    newStudent.value = {
      ...newStudent.value,
      ...userToObject.value,
    }
    await addDoc(collection(db, database), newStudent.value)
    googleUser.value = newStudent.value
    addToLocalStorage()
    if (isWebViewMounted()) router.push('/after-register')
    else router.push('/')
  }

  return {
    newStudent,
    studentList,
    loading,
    completeRegister,
  }
}
