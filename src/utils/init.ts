import { Test, User } from '../interfaces'

export const initNewUser: User = {
  id: '',
  name: '',
  phone: '',
  studentBiletNumber: '',
  status: 'student',
  completedTests: [],
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

export const initNewQuestion = {
  id: '',
  text: '',
  answers: [],
}

export const initNewAnswer = {
  id: '',
  text: '',
  value: 0,
}
