export function decode(decodeValue: string) {
  let returnValue: string = ''

  if (decodeValue) {
    for (let i = 0; i <= decodeValue.length; i++) {
      returnValue += String.fromCharCode(decodeValue.charCodeAt(i) - 1)
    }
  }
  return returnValue
}

export function encode(encodeValue: string) {
  let returnValue: string = ''

  if (encodeValue) {
    for (let i = 0; i <= encodeValue.length; i++) {
      returnValue += String.fromCharCode(encodeValue.charCodeAt(i) + 1)
    }
  }
  return returnValue
}
