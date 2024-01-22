export interface User {
  uid: string
  email: string
  displayName: string
  photoURL: string
  status: 'student' | 'psychologist'
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
