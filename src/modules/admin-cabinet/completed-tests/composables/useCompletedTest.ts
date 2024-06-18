import { transformDate } from '@/utils'
import { useCurrentTest } from '@test/composables/useCurrentTest'
import { computed, ref } from 'vue'

const mode = ref<'all' | 'not_started' | 'attention' | null>('not_started')
const testOptions = ref<{ label: string; value: string }[]>([])
const DT = ref()

export function useCompletedTest() {
  const { allCompletedTests } = useCurrentTest()

  const filteredData = computed(() => {
    if (mode.value) {
      return allCompletedTests.value?.filter(test => {
        if (mode.value === 'all') return true
        if (mode.value === 'not_started') return test.status === 'not_started' || test.status === 'in_progress'
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
  }

  function exportExcel() {
    DT.value.exportCSV()
  }

  function exportPretify(event: { data: any; field: string }) {
    if (event.field === 'student') {
      event.data.name = `${event?.data?.student?.firstName}`
      event.data.surname = `${event?.data?.student?.lastName}`
    }
    if (event.field === 'status') {
      event.data =
        event.data.status === 'not_started'
          ? 'Не начат'
          : event.data.status === 'in_progress'
          ? 'В процессе'
          : 'Завершен'
    }
    if (event.field === 'created') {
      event.data = transformDate(event.data.created)
    }
    event.data = JSON.stringify(event.data)
    return event.data
  }

  return {
    filteredData,
    mode,
    changeMode,
    getTestOptions,
    testOptions,
    DT,
    exportPretify,
    exportExcel,
  }
}
