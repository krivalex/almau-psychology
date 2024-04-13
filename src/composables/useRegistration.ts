import { reactive, ref } from 'vue'
import { initNewUser } from '../utils/business.init'
import { User } from '../interfaces'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase-config'
import { useUser } from './useUser'
import { useRouter } from 'vue-router'

const newStudent = ref<User>(initNewUser)
const studentList = ref<User[]>([])

export const useRegistration = () => {
  const { userToObject } = useUser()
  const router = useRouter()
  const database = 'users'

  const loading = reactive({
    studentList: false,
  })

  async function completeRegister() {
    newStudent.value = {
      ...newStudent.value,
      ...userToObject.value,
    }
    await addDoc(collection(db, database), newStudent.value)
    router.push('/')
  }

  return {
    newStudent,
    studentList,
    loading,
    completeRegister,
  }
}
