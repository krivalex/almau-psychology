import { ref } from 'vue'

const redirectToBrowser = ref(false)

export const useUserDevice = () => {
  const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent)
  const isAndroid = () => /Android/.test(navigator.userAgent)
  const isWindows = () => /Windows/.test(navigator.userAgent)

  const textForIOS = {
    title: 'Похоже у вас iOS устройство и вы здесь впервые',
  }
  const textForAndroid = {
    title: 'Похоже у вас Android устройство и вы здесь впервые',
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
