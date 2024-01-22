import { Test } from '@/interfaces'

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
