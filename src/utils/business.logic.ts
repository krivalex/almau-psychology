import { AnswerType } from '@/interfaces'
import { answersTypes } from '@/utils'

export function getAnswerType(type: AnswerType) {
  return answersTypes.find(answerType => answerType.value === type)?.label
}
