import { ref } from 'vue'

export function useTelegram() {
  const telegramWindow = ref<Record<string, unknown> | null>(null)

  return {
    telegramWindow,
  }
}
