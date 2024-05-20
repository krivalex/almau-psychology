import { User } from '@/interfaces'

function pretifierPhone(phone: string | undefined) {
  if (!phone) return
  let _phone = phone?.replace('(', '').replace(')', '')
  _phone = _phone?.replace(/-/g, '').replace(/ /g, '')
  if (_phone?.[0] !== '+') {
    _phone = `+${_phone}`
  }
  if (_phone?.[1] !== '7') {
    _phone = _phone.replace(_phone[1], '7')
  }

  return _phone
}

export function writeToTelegram(student: User) {
  const phone = pretifierPhone(student?.phone)
  window.open(`https://t.me/${phone}`, '_blank')
}

export function writeToWhatsapp(student: User) {
  const phone = pretifierPhone(student?.phone)
  window.open(`https://wa.me/${phone}`, '_blank')
}
