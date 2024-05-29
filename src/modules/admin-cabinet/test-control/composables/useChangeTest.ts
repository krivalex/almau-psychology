import { ConrolTestCondition } from '@/interfaces'
import { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import { useForm } from 'vee-validate'
import { inject, Ref, ref } from 'vue'

export function useChangeTest() {
  const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')
  const test = ref(dialogRef?.value?.data?.test)

  const isDisabled = ref(true)

  const changeTestConditions: ConrolTestCondition[] = [
    {
      field: 'image',
      position: 'base',
      type: 'file',
      validate: '',
      localization: 'Загрузите изображение',
    },
    {
      field: 'name',
      position: 'base',
      type: 'input',
      validate: 'required',
      localization: 'Название теста',
    },
    {
      field: 'description',
      position: 'base',
      type: 'textarea',
      validate: 'required',
      localization: 'Описание теста',
    },
    {
      field: 'timeToComplete',
      position: 'base',
      type: 'input',
      validate: 'required',
      localization: 'Время на прохождение',
    },
    {
      field: 'author',
      position: 'base',
      type: 'input',
      validate: 'required',
      localization: 'Автор теста',
    },
    {
      field: 'questions',
      position: 'test',
      type: 'textarea',
      validate: 'required',
      fields: [
        {
          field: 'text',
          type: 'input',
          validate: 'required',
          localization: 'Текст вопроса',
        },
        {
          field: 'answers',
          position: 'test',
          type: 'textarea',
          validate: 'required',
          fields: [
            {
              field: 'text',
              type: 'textarea',
              validate: 'required',
              localization: 'Текст ответа',
            },
            {
              field: 'value',
              type: 'number',
              validate: 'required',
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
          validate: '',
          localization: 'Загрузите изображение',
        },
        {
          field: 'name',
          type: 'input',
          validate: 'required',
          localization: 'Название результата',
        },
        {
          field: 'description',
          type: 'textarea',
          validate: 'required',
          localization: 'Описание результата',
        },
        {
          field: 'min',
          type: 'number',
          validate: 'required',
          localization: 'Минимальное значение',
        },
        {
          field: 'max',
          type: 'number',
          validate: 'required',
          localization: 'Максимальное значение',
        },
      ],
    },
  ]

  const schema = changeTestConditions.reduce((acc, { field, validate, fields }) => {
    if (fields) {
      fields.forEach(({ field, validate }) => {
        if (validate) {
          acc[field] = validate
        }
      })
    }
    if (validate) acc[field] = validate
    return acc
  }, {} as Record<string, string>)

  const { validate, values, setValues } = useForm({
    initialValues: test,
    validationSchema: schema,
  })

  const handleValidation = async () => {
    const valid = await validate()
    isDisabled.value = !valid.valid
    return isDisabled.value
  }

  return {
    changeTestConditions,
    schema,
    values,
    handleValidation,
    isDisabled,
    setValues,
    test,
  }
}
