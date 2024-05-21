export function useChangeTest() {
  const changeTestConditions = [
    {
      field: 'name',
      type: 'input',
      validate: 'required',
      localization: 'Название теста',
    },
    {
      field: 'description',
      type: 'input',
      validate: 'required',
      localization: 'Описание теста',
    },
    {
      field: 'timeToComplete',
      type: 'number',
      validate: 'required',
      localization: 'Время на прохождение',
    },
    {
      field: 'image',
      type: 'file',
      validate: '',
      localization: 'Загрузите изображение',
    },
    {
      field: 'author',
      type: 'input',
      readonly: true,
      validate: 'required',
      localization: 'Автор теста',
    },
  ]

  const schema = changeTestConditions.reduce((acc, { field, validate }) => {
    acc[field] = validate
    return acc
  }, {} as Record<string, string>)

  const fields = changeTestConditions.map(({ field }) => field)

  return {
    changeTestConditions,
    schema,
    fields,
  }
}
