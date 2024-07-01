import { reactive, ref } from 'vue'
import { initNewUser } from '@/utils/business.init'
import { User } from '@/interfaces'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/firebase-config'
import { useUser } from '@/composables/useUser'
import { useRouter } from 'vue-router'
import { useTelegram } from '@auth/composables/useTelegram'
import { useUserDevice } from '@/composables/useUserDevice'

const newStudent = ref<User>(initNewUser())
const studentList = ref<User[]>([])

export const useRegistration = () => {
  const { userToObject, googleUser, addToLocalStorage } = useUser()
  const { getTelegramID, getTelegramNickname } = useTelegram()
  const { isWebViewMounted } = useUserDevice()

  const router = useRouter()
  const database = 'users'

  const loading = reactive({
    studentList: false,
  })

  async function completeRegister() {
    newStudent.value.telegramID = getTelegramID()
    newStudent.value.telegramLogin = getTelegramNickname()
    if (newStudent.value.telegramID) newStudent.value.enableTelegramEnter = true

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
