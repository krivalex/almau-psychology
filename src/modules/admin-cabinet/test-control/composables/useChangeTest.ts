import { ConrolTestCondition } from '@/interfaces'
import { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import { useForm } from 'vee-validate'
import { inject, Ref, ref } from 'vue'

const isNotValidMessage = 'Обязательно для заполнения'

export function useChangeTest() {
  const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')
  const test = ref(dialogRef?.value?.data?.test)

  const isDisabled = ref(true)

  const changeTestConditions: ConrolTestCondition[] = [
    {
      field: 'image',
      position: 'base',
      type: 'file',
      validate: isNotValidMessage,
      localization: 'Загрузите изображение',
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
          localization: 'Загрузите изображение',
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

  function isValidData(value: unknown) {
    return value !== null && value !== undefined && value !== ''
  }

  return {
    changeTestConditions,
    isDisabled,
    test,
    isValidData,
  }
}
