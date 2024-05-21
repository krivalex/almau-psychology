import { useTelegram } from '@/composables/useTelegram'
import { useUserDevice } from '@/composables/useUserDevice'
import { computed } from 'vue'

import { useRouter } from 'vue-router'

export function useRedirect() {
  const router = useRouter()
  const { redirectToBrowser } = useUserDevice()
  const { telegramNickname, decodeTelegramUser } = useTelegram()

  const noLoginButtonViews = ['login', 'login-options', 'after-register']
  const getRedirectRoute = () => `https://almau-psychology.netlify.app/login-options
  ?redirect=true&redirectTeleramId=${decodeTelegramUser()}&redirectLogin=${telegramNickname.value}`

  const isLoginPage = computed(() => {
    if (router.currentRoute?.value?.name) {
      return noLoginButtonViews.includes(String(router.currentRoute.value.name)) || redirectToBrowser.value
    }
    return false
  })

  const currentParamsID = computed(() => router.currentRoute.value.params.id as string)

  function goBackToTelegramBot() {
    window.location.href = 'https://t.me/AlmaU_Psychology_BOT'
  }

  function goToMain() {
    router.push('/')
  }

  function goToResultPage(id?: string) {
    router.push(`/result/${id}`)
  }

  function goToTest(id: string) {
    router.push(`/test/${id}`)
  }

  function goToAdminView() {
    router.push('/admin-cabinet')
  }

  return {
    isLoginPage,
    currentParamsID,
    getRedirectRoute,
    goBackToTelegramBot,
    goToMain,
    goToAdminView,
    goToResultPage,
    goToTest,
  }
}
