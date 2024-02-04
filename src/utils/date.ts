import { Timestamp } from 'firebase/firestore'

export function transformDate(date: Timestamp) {
  if (!date) return ''
  const seconds = date.seconds
  const milliseconds = seconds * 1000
  const dateObject = new Date(milliseconds)
  const humanDateFormat = dateObject.toLocaleString()
  return humanDateFormat
}
