import { getDocs, addDoc, doc, collection, type DocumentData, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase-config'
import { ref, reactive } from 'vue'
import * as firebase from 'firebase/storage'
import { getStorage, uploadBytes } from 'firebase/storage'
import type { Test } from '@/interfaces'
import { initNewTest } from '@/utils/business.init'

const test = ref<Test | DocumentData>()
const selectedTest = ref<Test>()
const testList = ref<Test[]>([])
const visibleAddModal = ref(false)

const newTest = ref<Test>(initNewTest)

const loading = reactive({
  test: false,
  testList: false,
  newTest: false,
})

export const useTest = () => {
  const yourDatabase = 'tests'

  async function getAllContent() {
    loading.testList = true
    testList.value = []
    try {
      const querySnapshot = await getDocs(collection(db, yourDatabase))
      querySnapshot.forEach(doc => {
        const compressive = {
          firebaseId: doc.id,
          ...doc.data(),
        }
        testList.value.push(compressive as Test)
      })

      loading.testList = false
    } catch (error) {
      console.error(error)
    }
  }

  async function getContentById(id: string) {
    loading.test = true
    try {
      const querySnapshot = await getDocs(collection(db, yourDatabase))
      test.value = querySnapshot.docs.map(doc => {
        if (doc.id === id) {
          return doc.data()
        }
      })

      selectedTest.value = test.value[0] as Test
      loading.test = false
    } catch (error) {
      console.error(error)
    }
  }

  async function addContent() {
    loading.newTest = true
    try {
      if (newTest.value) {
        newTest.value.id = Date.now().toString()
        await addDoc(collection(db, yourDatabase), newTest.value)
        loading.newTest = false
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function uploadImage(file: any) {
    const storage = getStorage()
    const storageRef = firebase.ref(storage, 'courses/' + file.name)

    uploadBytes(storageRef, file)
      .then(() => {
        console.log('Файл успешно загружен!')

        firebase
          .getDownloadURL(storageRef)
          .then(downloadURL => {
            newTest.value.image = downloadURL
          })
          .catch(error => {
            console.error('Ошибка получения ссылки на загруженный файл:', error)
          })
      })
      .catch(error => {
        console.error('Ошибка загрузки файла:', error)
      })
  }

  async function deleteTest(test: Test) {
    loading.testList = true
    try {
      if (test.firebaseId) await deleteDoc(doc(db, yourDatabase, test.firebaseId))
      loading.testList = false
    } catch (error) {
      console.error(error)
    }
  }

  async function updateTest(test: Test) {
    loading.testList = true
    try {
      if (test.firebaseId) await deleteDoc(doc(db, yourDatabase, test.firebaseId))
      await addDoc(collection(db, yourDatabase), test)
      loading.testList = false
    } catch (error) {
      console.error(error)
    }
  }

  async function load() {
    await getAllContent()
  }

  function clearContent() {
    newTest.value = initNewTest
    visibleAddModal.value = false
  }

  const toggleVisibleAddCourse = () => {
    visibleAddModal.value = !visibleAddModal.value
  }

  return {
    test,
    testList,
    loading,
    newTest,
    visibleAddModal,
    toggleVisibleAddCourse,
    getAllContent,
    getContentById,
    addContent,
    updateTest,
    load,
    uploadImage,
    clearContent,
    deleteTest,
    selectedTest,
  }
}
