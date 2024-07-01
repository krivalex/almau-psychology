import { AnswerType, ConrolTestCondition, Question } from '@/interfaces'
import { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import { inject, Ref, ref } from 'vue'
import {
  firstLayerFields,
  secondLayerFields,
  thirdLayerFields,
  isNotValidMessage,
  secondLayerResults,
  initNewTest,
  answersDesc,
  genarateUniqueID,
} from '@/utils'
import { useTest } from '@/modules/tests/composables/useTest'

export function useChangeTest() {
  const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')
  const test = ref(dialogRef?.value?.data?.test)

  const { newTest } = useTest()
  const newAnswerType = ref<AnswerType>()

  const changeTestConditions: ConrolTestCondition[] = [
    {
      field: 'image',
      position: 'base',
      type: 'file',
      validate: isNotValidMessage,
      localization: 'Ccылка на изображение',
    },
    {
      field: 'name',
      position: 'base',
      type: 'input',
      validate: isNotValidMessage,
      localization: 'Название теста',
    },
    {
      field: 'description',
      position: 'base',
      type: 'textarea',
      validate: isNotValidMessage,
      localization: 'Описание теста',
    },
    {
      field: 'timeToComplete',
      position: 'base',
      type: 'input',
      validate: isNotValidMessage,
      localization: 'Время на прохождение',
    },
    {
      field: 'author',
      position: 'base',
      type: 'input',
      validate: isNotValidMessage,
      localization: 'Автор теста',
    },
    {
      field: 'questions',
      position: 'test',
      type: 'textarea',
      validate: isNotValidMessage,
      fields: [
        {
          field: 'text',
          type: 'input',
          validate: isNotValidMessage,
          localization: 'Текст вопроса',
        },
        {
          field: 'answers',
          position: 'test',
          type: 'textarea',
          validate: isNotValidMessage,
          fields: [
            {
              field: 'text',
              type: 'textarea',
              validate: isNotValidMessage,
              localization: 'Текст ответа',
            },
            {
              field: 'value',
              type: 'number',
              validate: isNotValidMessage,
              localization: 'Баллы за ответ',
            },
          ],
        },
      ],
    },
    {
      field: 'result',
      position: 'result',
      fields: [
        {
          field: 'image',
          type: 'file',
          validate: isNotValidMessage,
          localization: 'Ccылка на изображение',
        },
        {
          field: 'name',
          type: 'input',
          validate: isNotValidMessage,
          localization: 'Название результата',
        },
        {
          field: 'description',
          type: 'textarea',
          validate: isNotValidMessage,
          localization: 'Описание результата',
        },
        {
          field: 'min',
          type: 'number',
          validate: isNotValidMessage,
          localization: 'Минимальное значение',
        },
        {
          field: 'max',
          type: 'number',
          validate: isNotValidMessage,
          localization: 'Максимальное значение',
        },
      ],
    },
  ]

  function isValidData(value: unknown | any) {
    return value !== null && value !== undefined && value !== ''
  }

  function calculateMaxPosibleLength(question: Question) {
    if (question.answerType === 'multi-buttons') return 40
    if (question.answerType === 'buttons') return 100
    if (question.answerType === 'open') return 300
  }

  function getInfoTypeAnswer(question: Question) {
    return answersDesc[question.answerType as AnswerType] || answersDesc.buttons
  }

  function createNewAnswerBody() {
    const ID = test.value?.questions?.answers?.length + 1 || genarateUniqueID()
    const newAnswer = { text: '', value: 0, id: ID }
    return newAnswer
  }

  function createNewQuestionBody(answerType: AnswerType) {
    const newQuestion = { text: '', answers: [createNewAnswerBody()], answerType }
    return newQuestion
  }

  function createNewResultBody() {
    const newResult = {
      name: '',
      description: '',
      image: '',
    }
    return newResult
  }

  function deleteAnswer(Qindex: number, Rindex: number) {
    test.value.questions[Qindex].answers.splice(Rindex, 1)
  }

  function addAnswer(Qindex: number) {
    test.value.questions[Qindex].answers.push(createNewAnswerBody())
  }

  function deleteQuestion(Qindex: number) {
    test.value.questions.splice(Qindex, 1)
  }

  function addQuestion() {
    const answerType = newAnswerType.value
    test.value.questions.push(createNewQuestionBody(answerType || 'buttons'))
  }

  function addResult() {
    test.value.results.push(createNewResultBody())
  }

  function deleteResult(index: number) {
    test.value.results.splice(index, 1)
  }

  function isShowAddAnswerButton(question: Question) {
    const isOpenQuestion = question.answerType === 'open'
    const isFourAnswersCompletly = question.answers.length >= 4
    return isOpenQuestion || isFourAnswersCompletly
  }

  function getConditions() {
    const isTwoResult = test.value.results.length >= 2
    const isFiveQuestion = test.value.questions.length >= 5

    const isAllQuestionsHasTwoMoreAnswers = test.value.questions.every((question: any) => {
      const isTwoAnswers = question.answers.length >= 2
      const isOpenQuestion = question.answerType === 'open'
      return isTwoAnswers || isOpenQuestion
    })

    const firstLayer = firstLayerFields.every(field => {
      return isValidData(test.value[field])
    })

    const secondLayer = test.value.questions.every((question: any) => {
      return secondLayerFields.every(field => {
        return isValidData(question[field])
      })
    })

    const secondLayerResult = test.value.results.every((result: any) => {
      return secondLayerResults.every(field => {
        return isValidData(result[field])
      })
    })

    const secondLayerAdditional = test.value.results.every((result: any) => {
      return result.min < result.max
    })

    const thirdLayer = test.value.questions.every((question: any) => {
      if (question.answerType === 'open') return true
      return question.answers.every((answer: any) => {
        return thirdLayerFields.every(field => {
          return isValidData(answer[field])
        })
      })
    })

    const isValid = !(firstLayer && secondLayer && thirdLayer && secondLayerResult)

    // console.log('isVALID', {
    //   firstLayer,
    //   secondLayer,
    //   secondLayerResult,
    //   secondLayerAdditional,
    //   thirdLayer,
    //   isTwoResult,
    //   isFiveQuestion,
    //   isAllQuestionsHasTwoMoreAnswers,
    // })

    const valid = !(
      firstLayer &&
      secondLayer &&
      secondLayerResult &&
      secondLayerAdditional &&
      thirdLayer &&
      isTwoResult &&
      isFiveQuestion &&
      isAllQuestionsHasTwoMoreAnswers
    )

    return {
      valid,
      options: {
        isValid,
        firstLayer,
        secondLayer,
        secondLayerResult,
        secondLayerAdditional,
        thirdLayer,
        isTwoResult,
        isFiveQuestion,
        isAllQuestionsHasTwoMoreAnswers,
      },
    }
  }

  function clear() {
    test.value = {}
    newTest.value = initNewTest()
  }

  return {
    changeTestConditions,
    test,
    isValidData,
    deleteAnswer,
    addAnswer,
    deleteQuestion,
    addQuestion,
    addResult,
    deleteResult,
    getConditions,
    clear,
    newAnswerType,
    isShowAddAnswerButton,
    calculateMaxPosibleLength,
    getInfoTypeAnswer,
  }
}
