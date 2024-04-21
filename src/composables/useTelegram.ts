import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const telegramWindow = ref<typeof Telegram.WebApp>()
const telegramID = ref<string>('')
const telegramNickname = ref<string>('')

const isTelegramLoading = computed(() => telegramWindow.value?.ready())

const telegramUser = computed(() => {
  if (telegramWindow.value) return telegramWindow.value?.initDataUnsafe
})

export function useTelegram() {
  const router = useRouter()

  const getTelegramID = () => telegramID.value
  const getTelegramNickname = () => telegramNickname.value
  const getRedirectRoute = () => `https://almau-psychology.netlify.app/login-options?redirect=true&redirectTeleramId=${decodeTelegramUser()}&redirectLogin=${telegramNickname.value}`

  function initTelegram() {
    telegramWindow.value = (window as any)?.Telegram?.WebApp
    telegramNickname.value = telegramWindow.value?.initDataUnsafe?.user?.username || ''
  }

  function decodeTelegramUser() {
    return telegramWindow.value?.initDataUnsafe?.user?.id || telegramID.value
  }

  function encodeTelegramUser(telegramLogin: string) {
    return telegramLogin
  }

  function saveTelegramLogin() {
    const ID = router.currentRoute.value.query.redirectTeleramId?.toLocaleString()
    const nickname = router.currentRoute.value.query.redirectLogin?.toLocaleString()
    if (!ID && ID === 'undefined') return

    const encodeValue = encodeTelegramUser(ID!)

    telegramID.value = encodeValue
    telegramNickname.value = nickname || ''
  }

  function expandWindow() {
    telegramWindow.value?.expand()
  }

  function goBackToTelegramBot() {
    window.location.href = 'https://t.me/AlmaU_Psychology_BOT'
  }

  function reloadPage() {
    window.location.reload()
  }

  return {
    telegramWindow,
    telegramUser,
    initTelegram,
    isTelegramLoading,
    decodeTelegramUser,
    encodeTelegramUser,
    saveTelegramLogin,
    getTelegramID,
    expandWindow,
    goBackToTelegramBot,
    telegramNickname,
    getTelegramNickname,
    reloadPage,
    getRedirectRoute,
  }
}
