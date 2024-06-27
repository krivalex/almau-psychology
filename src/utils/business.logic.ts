import { AnswerType } from '@/interfaces'
import { answersTypes } from '@/utils'

export function getAnswerType(type: AnswerType) {
  if (!type) type = 'buttons'
  return answersTypes.find(answerType => answerType.value === type)?.label
}
