import { computed, ref } from 'vue'

const telegramWindow = ref<typeof Telegram.WebApp>()
export function useTelegram() {
  const isTelegramLoading = computed(() => telegramWindow.value?.ready())

  function initTelegram() {
    telegramWindow.value = (window as any)?.Telegram?.WebApp
  }

  return {
    telegramWindow,
    initTelegram,
    isTelegramLoading,
  }
}
