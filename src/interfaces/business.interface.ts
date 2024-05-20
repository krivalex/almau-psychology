export interface User extends GoogleUser {
  phone: string
  yearAdmission: number
  courseRegister: number | 'not_a_student'
  name: string
  surname: string
  patronymic: string
  specialty: string
  status: 'student' | 'psychologist'
  completedTests: [] | CompletedTest[]
  telegramLogin: string
  telegramID: string
  enableTelegramEnter: boolean
  registerDate: Date
  lastLogin: Date
  firebaseId?: string
}

export interface GoogleUser {
  uid: string
  email: string
  displayName: string
  photoURL: string
}

export interface CompletedTest {
  firebaseId?: string
  id: string
  student: User | null
  scoreValue: number
  scoreName: string
  created: Date | null
  answers: AnswersMap[]
  testName: string
}

export interface AnswersMap {
  question: string
  answer: string
  value: number
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
  image: string
  min: number
  max: number
}
