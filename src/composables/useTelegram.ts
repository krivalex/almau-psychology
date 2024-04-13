import { ref } from 'vue'

const telegramWindow = ref<any>()
export function useTelegram() {
  return {
    telegramWindow,
  }
}
