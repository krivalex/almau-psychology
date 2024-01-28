import { reactive, ref } from 'vue'
import { initNewUser } from '../utils/init'
import { User } from '../interfaces'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase-config'

const newStudent = ref<User>(initNewUser)
const studentList = ref<User[]>([])

export const useRegistration = () => {
  const database = 'users'

  const loading = reactive({
    studentList: false,
  })

  async function getAllStudents() {
    loading.studentList = true
    try {
      const querySnapshot = await getDocs(collection(db, database))
      querySnapshot.forEach((doc) => {
        studentList.value.push(doc.data())
      })
      loading.studentList = false
    } catch (error) {
      console.error(error)
    }
  }

  function isStudentExist(student: User) {
    return studentList.value.some((item) => item.id === student.id)
  }

  async function addNewStudent() {
    if (newStudent.value.id) {
      if (!isStudentExist(newStudent.value)) {
        await addDoc(collection(db, database), newStudent.value)
      }
    }
  }

  return {
    newStudent,
    studentList,
    addNewStudent,
    getAllStudents,
  }
}
