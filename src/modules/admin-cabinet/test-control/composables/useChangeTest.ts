import { ConrolTestCondition } from '@/interfaces'
import { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import { inject, Ref, ref } from 'vue'
import { firstLayerFields, secondLayerFields, thirdLayerFields, isNotValidMessage, secondLayerResults } from '@/utils'

export function useChangeTest() {
  const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')
  const test = ref(dialogRef?.value?.data?.test)

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

  function deleteAnswer(Qindex: number, Rindex: number) {
    test.value.questions[Qindex].answers.splice(Rindex, 1)
  }

  function addAnswer(Qindex: number) {
    test.value.questions[Qindex].answers.push({ text: '' })
  }

  function deleteQuestion(Qindex: number) {
    test.value.questions.splice(Qindex, 1)
  }

  function addQuestion() {
    test.value.questions.push({ text: '', answers: [{ text: '' }] })
  }

  function addResult() {
    test.value.results.push({
      name: '',
      description: '',
      image: '',
    })
  }

  function deleteResult(index: number) {
    test.value.results.splice(index, 1)
  }

  function getConditions() {
    const isTwoResult = test.value.results.length >= 2
    const isFiveQuestion = test.value.questions.length >= 5
    const isAllQuestionsHasTwoMoreAnswers = test.value.questions.every((question: any) => question.answers.length >= 2)

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
      return question.answers.every((answer: any) => {
        return thirdLayerFields.every(field => {
          return isValidData(answer[field])
        })
      })
    })

    const isValid = !(firstLayer && secondLayer && thirdLayer && secondLayerResult)

    console.log('isVALID', {
      firstLayer,
      secondLayer,
      secondLayerResult,
      secondLayerAdditional,
      thirdLayer,
      isTwoResult,
      isFiveQuestion,
      isAllQuestionsHasTwoMoreAnswers,
    })

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
  }
}
