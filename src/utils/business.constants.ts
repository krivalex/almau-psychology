export const courses = [
  { label: '1 курс', value: 1 },
  { label: '2 курс', value: 2 },
  { label: '3 курс', value: 3 },
  { label: '4 курс', value: 4 },
  { label: 'Я не студент', value: 'not_a_student' },
]

export const schools = [
  { label: 'School Of Digital Technologies', value: 'School Of Digital Technologies' },
  { label: 'Школа менеджмента', value: 'Школа менеджмента' },
  { label: 'Школа экономики и финасов', value: 'Школа экономики и финасов' },
  { label: 'Школа политики и права', value: 'Школа политики и права' },
  { label: 'Школа медицинских наук им. Шарманова', value: 'Школа медицинских наук им. Шарманова' },
  { label: 'Школа медиа и кино', value: 'Школа медиа и кино' },
  { label: 'Школа предпринимательства и инноваций', value: 'Школа предпринимательства и инноваций' },
  { label: 'Школа гостеприимства и туризма', value: 'Школа гостеприимства и туризма' },
  { label: 'School of Transformative Humanities', value: 'School of Transformative Humanities' },
]

export const loginFields: Record<string, string> = {
  name: 'Имя',
  surname: 'Фамилия',
  specialty: 'Специальность',
  yearAdmission: 'Год поступления',
  phone: 'Телефон',
  courseRegister: 'Курс',
  isTermAccepted: 'Согласие на обработку данных',
}

export const isNotValidMessage = 'Обязательно для заполнения'
export const firstLayerFields = ['image', 'name', 'description', 'timeToComplete', 'author']
export const secondLayerFields = ['text']
export const secondLayerResults = ['image', 'name', 'description', 'min', 'max']
export const thirdLayerFields = ['text', 'value']

export const validators = {
  requiredMsg: 'Проверьте заполненость полей',
  minFiveQuestions: 'Вопросы и ответы:  Добавьте минимум 5 вопросов',
  minTwoAnswers: 'Вопросы и ответы: Добавьте минимум 2 ответа к каждому вопросу',
  minTwoResults: 'Результаты: Добавьте минимум 2 результата',
  resultMsg: 'Результаты: где-то ошибка',
  resultMinMaxMag: 'Результаты: Минимальное значение должно быть меньше максимального',
}

export const statusLabels = [
  { label: 'В процессе', value: 'in_progress' },
  { label: 'Завершен', value: 'completed' },
  { label: 'Нужно внимание', value: 'attention' },
  { label: 'Не начат', value: 'not_started' },
]

export const answersTypes = [
  { value: 'open', label: 'Открытый' },
  { value: 'buttons', label: 'Закрытый (1 ответ)' },
  { value: 'multi-buttons', label: 'Закрытый (1+ ответ)' },
]

export const answersDesc = {
  open: `Ответ текстом \n
  Длина ответа: <= 300 символов`,
  buttons: `Выбор одного ответа \n
  Длина ответа: <= 100 символов`,
  'multi-buttons': ` Выбор одного или нескольких ответов \n
  Длина ответа: <= 40 символов`,
}
