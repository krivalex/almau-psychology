import { computed, ref } from 'vue'

const telegramWindow = ref<typeof Telegram.WebApp>()
const isTelegramLoading = computed(() => telegramWindow.value?.ready())
const telegramUser = computed(() => telegramWindow.value?.initDataUnsafe)

export function useTelegram() {
  function initTelegram() {
    telegramWindow.value = (window as any)?.Telegram?.WebApp
  }

  function decodeTelegramUser() {
    return JSON.parse(atob(telegramUser.value?.user?.usernames || ''))
  }

  function encodeTelegramUser(user: any) {
    return btoa(JSON.stringify(user))
  }

  return {
    telegramWindow,
    telegramUser,
    initTelegram,
    isTelegramLoading,
    decodeTelegramUser,
    encodeTelegramUser,
  }
}
