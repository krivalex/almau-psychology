import { reactive, ref } from 'vue'
import { Answer, CompletedTest, Result, User } from '../interfaces'
import { useTest } from './useTest'
import { useUser } from './useUser'
import { initNewCurrentTest } from '../utils/init'
import { useRouter } from 'vue-router'
import { DocumentData, addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase-config'

const currentIndex = ref(0)
const currentTest = ref<CompletedTest>(initNewCurrentTest)
const isTestCompleted = ref(false)
const allCompletedTests = ref<CompletedTest[]>([])
const completedTests = ref<CompletedTest | DocumentData>()
const currentResult = ref<Result>()

const loading = reactive({
  allCompletedTests: false,
  completedTests: false,
  currentTest: false,
})

export const useCurrentTest = () => {
  const router = useRouter()
  const { selectedTest } = useTest()
  const { googleUser } = useUser()
  const yourDatabase = 'completedTests'

  async function getAllContent() {
    loading.allCompletedTests = true
    allCompletedTests.value = []
    try {
      const querySnapshot = await getDocs(collection(db, yourDatabase))
      querySnapshot.forEach((doc) => {
        const compressive = {
          firebaseId: doc.id,
          ...doc.data(),
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
      completedTests.value = querySnapshot.docs.map((doc) => doc.data()).find((item: any) => item.id === id)
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
  }

  function prevQuestion() {
    if (currentIndex.value > 0) {
      const previosValue = currentTest.value?.answers[currentIndex.value - 1].value
      currentTest.value.scoreValue -= previosValue
      currentTest.value?.answers.pop()
      currentIndex.value--
    }
  }

  function goToResultPage() {
    router.push(`/result/${selectedTest.value?.firebaseId}`)
  }

  function makeTestBody() {
    if (googleUser.value) {
      currentTest.value.student = googleUser.value as User
    }
    currentTest.value.created = new Date()
    currentTest.value.testName = selectedTest.value?.name as string
    currentTest.value.scoreName =
      (selectedTest.value?.results.find((result) => currentTest.value.scoreValue >= result.min && currentTest.value.scoreValue <= result.max)?.name as string) ?? 'Ошибка при записи'
  }

  function calculateResult() {
    currentResult.value = selectedTest.value?.results.find((result) => currentTest.value.scoreValue >= result.min && currentTest.value.scoreValue <= result.max)
  }

  async function completeTest() {
    makeTestBody()
    calculateResult()
    await addContent()
    isTestCompleted.value = false
    clearTestAnswers()
    goToResultPage()
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
  }
}
