export interface User extends GoogleUser {
  id: string
  name: string
  phone: string
  studentBiletNumber: string
  status: 'student' | 'psychologist'
  completedTests: [] | CompletedTest[]
}

export interface GoogleUser {
  uid: string
  email: string
  displayName: string
  photoURL: string
}

export interface CompletedTest {
  id: string
  name: string
  scoreValue: number
  scoreName: string
  answers: AnswersMap[]
}

export interface AnswersMap {
  question: string
  answer: string
}

export interface Test {
  id: string
  name: string
  description: string
  author: string
  timeToComplete: string
  results: Result[]
  questions: Question[]
  firebaseId?: string
  image?: string
}

export interface Question {
  id: string
  text: string
  answers: Answer[]
}

export interface Answer {
  id: string
  text: string
  value: number
}

export interface Result {
  id: string
  name: string
  description: string
  min: number
  max: number
}
