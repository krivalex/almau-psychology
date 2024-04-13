export function pretifierPhone(phone: string | undefined) {
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
