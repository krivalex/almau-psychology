import { CompletedTest, Test, User, Question, Answer, Result } from '@/interfaces'

export const initNewUser: User = {
  phone: '',
  yearAdmission: 0,
  courseRegister: 0,
  name: '',
  surname: '',
  patronymic: '',
  specialty: '',
  status: 'student',
  completedTests: [],
  uid: '',
  email: '',
  displayName: '',
  photoURL: '',
  telegramID: '',
  telegramLogin: '',
  enableTelegramEnter: false,
  registerDate: new Date(),
  lastLogin: new Date(),
}

export const initNewCurrentTest: CompletedTest = {
  id: '',
  student: null,
  scoreValue: 0,
  scoreName: '',
  created: null,
  testName: '',
  answers: [],
}

export const initNewAnswer: Answer = {
  id: '',
  text: '',
  value: 0,
}

export const initNewQuestion: Question = {
  id: '',
  text: '',
  answers: [initNewAnswer],
}

export const initNewResult: Result = {
  id: '',
  image: '',
  name: '',
  description: '',
  min: 0,
  max: 0,
}

export const initNewTest: Test = {
  id: '',
  name: '',
  description: '',
  author: '',
  timeToComplete: '',
  results: [initNewResult],
  questions: [initNewQuestion],
  firebaseId: '',
  image: '',
  visible: false,
}
