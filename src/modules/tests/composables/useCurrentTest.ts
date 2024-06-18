import { reactive, ref } from 'vue'
import { Answer, CompletedTest, Result, User } from '@/interfaces'
import { initNewCurrentTest } from '@/utils/business.init'
import { DocumentData, addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase-config'

import { useTest } from '@/modules/tests/composables/useTest'
import { useUser } from '@/composables/useUser'
import { useRedirect } from '@/composables/useRedirect'
import { FilterMatchMode } from 'primevue/api'

const currentIndex = ref(0)
const currentTest = ref<CompletedTest>(initNewCurrentTest)
const isTestCompleted = ref(false)
const allCompletedTests = ref<CompletedTest[]>([])
const completedTests = ref<CompletedTest | DocumentData>()
const currentResult = ref<Result>()

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  testName: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

const loading = reactive({
  allCompletedTests: false,
  completedTests: false,
  currentTest: false,
})

export const useCurrentTest = () => {
  const { goToResultPage } = useRedirect()
  const { selectedTest } = useTest()
  const { googleUser, updateUserInDatabase } = useUser()
  const yourDatabase = 'completedTests'

  async function getAllContent() {
    loading.allCompletedTests = true
    allCompletedTests.value = []
    try {
      const querySnapshot = await getDocs(collection(db, yourDatabase))
      querySnapshot.forEach(doc => {
        const compressive = {
          ...doc.data(),
          firebaseId: doc.id,
        }
        allCompletedTests.value.push(compressive as CompletedTest)
      })
      loading.allCompletedTests = false
    } catch (error) {
      console.error(error)
    }
  }

  async function getContentById(id: string) {
    loading.completedTests = true
    try {
      const querySnapshot = await getDocs(collection(db, yourDatabase))
      completedTests.value = querySnapshot.docs.map(doc => doc.data()).find((item: any) => item.id === id)
      loading.completedTests = false
    } catch (error) {
      console.error(error)
    }
  }

  async function addContent() {
    loading.currentTest = true
    try {
      if (currentTest.value) {
        currentTest.value.id = Date.now().toString()
        await addDoc(collection(db, yourDatabase), currentTest.value)
        loading.currentTest = false
      }
    } catch (error) {
      console.error(error)
    }
  }

  function clearTestAnswers() {
    currentIndex.value = 0
    currentTest.value = initNewCurrentTest
    clickAnswerAnimation()
  }

  function saveAnswer(answer: Answer) {
    if (selectedTest.value) {
      const _question = selectedTest.value?.questions[currentIndex.value].text

      currentTest.value?.answers.push({
        question: _question,
        answer: answer.text,
        value: answer.value,
      })

      currentTest.value.scoreValue += answer.value
    }
  }

  function nextQuestion(answer: Answer) {
    if (selectedTest.value) {
      if (currentIndex.value < selectedTest.value?.questions.length) {
        saveAnswer(answer)
        currentIndex.value++
      }
    }

    if (currentIndex.value === selectedTest.value?.questions.length) {
      isTestCompleted.value = true
    }
    clickAnswerAnimation()
  }

  function prevQuestion() {
    if (currentIndex.value > 0) {
      const previosValue = currentTest.value?.answers[currentIndex.value - 1].value
      currentTest.value.scoreValue -= previosValue
      currentTest.value?.answers.pop()
      currentIndex.value--
    }
    clickAnswerAnimation()
  }

  function getScoreName() {
    return selectedTest.value?.results.find(
      result => currentTest.value.scoreValue >= result.min && currentTest.value.scoreValue <= result.max,
    )?.name
  }

  function makeTestBody() {
    if (googleUser.value) currentTest.value.student = googleUser.value as User
    currentTest.value.created = new Date()
    currentTest.value.testName = selectedTest.value?.name as string
    currentTest.value.scoreName = getScoreName() || ''
  }

  function calculateResult() {
    currentResult.value = selectedTest.value?.results.find(
      result => currentTest.value.scoreValue >= result.min && currentTest.value.scoreValue <= result.max,
    )
  }

  function clickAnswerAnimation() {
    const buttons = document.querySelectorAll('.control-button')
    const text = document.querySelector('.queston')

    text?.classList.add('animation-question-text')
    setTimeout(() => {
      text?.classList.remove('animation-question-text')
    }, 500)

    buttons.forEach(button => {
      button.classList.add('clicked')
      setTimeout(() => {
        button.classList.remove('clicked')
      }, 500)
    })
  }

  async function completeTest(preview: boolean = false) {
    if (preview) {
      makeTestBody()
      calculateResult()
      isTestCompleted.value = false
      clearTestAnswers()
    }

    makeTestBody()
    calculateResult()
    await addContent()
    await updateUserInDatabase(selectedTest.value?.name || 'Неизвестный тест')
    isTestCompleted.value = false
    clearTestAnswers()
    goToResultPage(selectedTest.value?.id)
  }

  async function updateStatus(data: CompletedTest | DocumentData) {
    loading.completedTests = true
    try {
      if (data?.firebaseId) {
        await updateDoc(doc(db, yourDatabase, data.firebaseId), data)
      }
      loading.completedTests = false
    } catch (error) {
      console.error(error)
    }
  }

  return {
    currentTest,
    currentIndex,
    clearTestAnswers,
    nextQuestion,
    prevQuestion,
    isTestCompleted,
    completeTest,
    getContentById,
    addContent,
    allCompletedTests,
    loading,
    calculateResult,
    currentResult,
    getAllContent,
    updateStatus,
    filters,
  }
}
