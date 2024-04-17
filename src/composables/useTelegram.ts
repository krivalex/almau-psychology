import { computed, ref } from 'vue'
import { decode, encode } from '../utils'
import { useRouter } from 'vue-router'

const telegramWindow = ref<typeof Telegram.WebApp>()
const telegramNickname = ref<string>('')
const isTelegramLoading = computed(() => telegramWindow.value?.ready())
const telegramUser = computed(() => {
  if (telegramWindow.value) return telegramWindow.value?.initDataUnsafe
})

export function useTelegram() {
  const router = useRouter()

  function initTelegram() {
    telegramWindow.value = (window as any)?.Telegram?.WebApp
  }

  function decodeTelegramUser() {
    return decode(telegramUser.value?.user?.username || telegramNickname.value)
  }

  function encodeTelegramUser(telegramLogin: string) {
    return encode(telegramLogin || '')
  }

  function saveTelegramLogin() {
    const telegramLogin = router.currentRoute.value.query.redirectLogin?.toLocaleString()
    if (!telegramLogin && telegramLogin === 'undefined') return
    telegramNickname.value = telegramLogin || ''
    localStorage.setItem('telegramUser', encodeTelegramUser(telegramLogin!) || '')
  }

  function getTelegramLogin() {
    return telegramNickname.value || localStorage.getItem('telegramUser')
  }

  function expandWindow() {
    telegramWindow.value?.expand()
  }

  return {
    telegramWindow,
    telegramUser,
    initTelegram,
    isTelegramLoading,
    decodeTelegramUser,
    encodeTelegramUser,
    saveTelegramLogin,
    getTelegramLogin,
    expandWindow,
  }
}
