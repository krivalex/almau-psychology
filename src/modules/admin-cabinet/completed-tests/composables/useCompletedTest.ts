import { useCurrentTest } from '@test/composables/useCurrentTest'
import { computed, ref } from 'vue'

const mode = ref<'all' | 'not_started' | 'attention' | null>('not_started')
const testOptions = ref<{ label: string; value: string }[]>([])

export function useCompletedTest() {
  const { allCompletedTests } = useCurrentTest()

  const filteredData = computed(() => {
    if (mode.value) {
      return allCompletedTests.value?.filter(test => {
        if (mode.value === 'all') return true
        if (mode.value === 'not_started') return test.status === 'not_started'
        if (mode.value === 'attention') return test.status === 'attention'
        return false
      })
    }
    return allCompletedTests.value
  })

  function changeMode(value: 'all' | 'not_started' | 'attention') {
    mode.value = value
  }

  function getTestOptions() {
    const testSet = new Set(allCompletedTests.value.map(test => test.testName))
    testOptions.value = Array.from(testSet).map(testName => ({ label: testName, value: testName }))
    console.log(testOptions.value)
  }

  return {
    filteredData,
    mode,
    changeMode,
    getTestOptions,
    testOptions,
  }
}
