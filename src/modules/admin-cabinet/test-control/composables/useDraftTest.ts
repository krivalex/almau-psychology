import { getDocs, addDoc, doc, collection, type DocumentData, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase-config'
import { ref, reactive } from 'vue'
import * as firebase from 'firebase/storage'
import { getStorage, uploadBytes } from 'firebase/storage'
import type { Test } from '@/interfaces'

const draftTest = ref<Test | DocumentData>()
const draftTestList = ref<Test[]>([])
const newDraftTest = ref<Test>()

const loading = reactive({
  draftTest: false,
  draftTestList: false,
  newDraftTest: false,
})

export const useDraftTest = () => {
  const yourDatabase = 'draft_tests'

  async function getAllDraftTests() {
    loading.draftTestList = true
    draftTestList.value = []
    try {
      const querySnapshot = await getDocs(collection(db, yourDatabase))
      querySnapshot.forEach(doc => {
        const compressive = {
          firebaseId: doc.id,
          ...doc.data(),
        }
        draftTestList.value.push(compressive as Test)
      })

      loading.draftTestList = false
    } catch (error) {
      console.error(error)
    }
  }

  async function getDraftTestById(id: string) {
    loading.draftTest = true
    try {
      const querySnapshot = await getDocs(collection(db, yourDatabase))
      draftTest.value = querySnapshot.docs.map(doc => {
        if (doc.id === id) {
          return doc.data()
        }
      })

      loading.draftTest = false
    } catch (error) {
      console.error(error)
    }
  }

  async function addDraftTest() {
    // const { userToObject } = useUser()
    loading.newDraftTest = true
    try {
      if (newDraftTest.value) {
        newDraftTest.value.id = Date.now().toString()
        await addDoc(collection(db, yourDatabase), newDraftTest.value)
        loading.newDraftTest = false
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function uploadImage(file: any) {
    const storage = getStorage()
    const storageRef = firebase.ref(storage, 'tests/' + file.name)

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

  async function deleteDraftTest(test: Test) {
    loading.draftTestList = true
    try {
      // if (test.firebaseId) await deleteDoc(doc(db, yourDatabase, test.firebaseId))
      loading.draftTestList = false
    } catch (error) {
      console.error(error)
    }
  }

  async function updateDraftTest(test: Test) {
    loading.draftTestList = true
    try {
      if (test.firebaseId) await deleteDoc(doc(db, yourDatabase, test.firebaseId))
      await addDoc(collection(db, yourDatabase), test)
      loading.draftTestList = false
    } catch (error) {
      console.error(error)
    }
  }

  return {
    loading,
    uploadImage,
    draftTest,
    draftTestList,
    newDraftTest,
    getAllDraftTests,
    getDraftTestById,
    addDraftTest,
    deleteDraftTest,
    updateDraftTest,
  }
}
