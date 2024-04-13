import { computed, ref } from 'vue'
// import { Telegram } from '../interfaces'

const telegramWindow = ref<typeof Telegram.WebApp>()
export function useTelegram() {
  const isTelegramLoading = computed(() => telegramWindow.value?.ready())

  return {
    telegramWindow,
    isTelegramLoading,
  }
}
