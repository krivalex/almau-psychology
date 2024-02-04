import { CompletedTest, Test, User, Question, Answer } from '../interfaces'

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
}

export const initNewTest: Test = {
  id: '',
  name: '',
  description: '',
  author: '',
  timeToComplete: '',
  results: [],
  questions: [],
  firebaseId: '',
  image: '',
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

export const initNewQuestion: Question = {
  id: '',
  text: '',
  answers: [],
}

export const initNewAnswer: Answer = {
  id: '',
  text: '',
  value: 0,
}
