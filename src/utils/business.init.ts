import { CompletedTest, Test, User, Question, Answer, Result } from '@/interfaces'

export function initNewUser(): User {
  return {
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
    isTermAccepted: false,
  }
}

export function initNewCurrentTest(): CompletedTest {
  return {
    id: '',
    student: null,
    scoreValue: 0,
    scoreName: '',
    created: null,
    testName: '',
    answers: [],
    status: 'not_started',
  }
}

export function initNewAnswer(): Answer {
  return {
    id: '',
    text: '',
    value: 0,
  }
}

export function initNewQuestion(): Question {
  return {
    id: '',
    text: '',
    answers: [initNewAnswer()],
    answerType: 'buttons',
  }
}

export function initNewResult(): Result {
  return {
    id: '',
    image: '',
    name: '',
    description: '',
    min: 0,
    max: 0,
  }
}

export function initNewTest(): Test {
  return {
    id: '',
    name: '',
    description: '',
    author: '',
    timeToComplete: '',
    results: [initNewResult()],
    questions: [initNewQuestion()],
    firebaseId: '',
    image: '',
    visible: false,
  }
}
