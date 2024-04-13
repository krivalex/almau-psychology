import { ref } from 'vue'

const redirectToBrowser = ref(false)

export const useUserDevice = () => {
  const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent)
  const isAndroid = () => /Android/.test(navigator.userAgent)
  const isWindows = () => /Windows/.test(navigator.userAgent)

  const textForIOS = {
    title: 'Похоже у вас iOS устройство',
    description: 'IOS система установленая на вашем устройстве не поддерживает технологию WebViewApi, мы перебросили вас в ваш основной браузер, чтобы все функции работали корректно',
  }
  const textForAndroid = {
    title: 'Похоже у вас Android устройство',
    description: 'Ваше устройство не поддерживает технологию WebViewApi, мы перебросили вас в ваш основной браузер, чтобы все функции работали корректно',
  }

  const isBrowserMounted = () => isWindows()
  const isWebViewMounted = () => isIOS() || isAndroid()
  const toggleRedirectPosition = () => (redirectToBrowser.value = !redirectToBrowser.value)

  return {
    isIOS,
    isAndroid,
    isWindows,
    textForIOS,
    textForAndroid,
    isBrowserMounted,
    isWebViewMounted,
    redirectToBrowser,
    toggleRedirectPosition,
  }
}
