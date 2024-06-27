import { AnswerType } from '@/interfaces'
import { answersTypes } from '@/utils'

export function getAnswerType(type: AnswerType) {
  if (!type) type = 'buttons'
  return answersTypes.find(answerType => answerType.value === type)?.label
}

export function genarateUniqueID() {
  return new Date().getTime().toString(36) + Math.random().toString(36).slice(2)
}
