<template>
  <section class="search-panel">
    <div class="contols">
      <p-button
        label="Новые"
        @click="changeMode('not_started')"
        outlined
        :class="[mode === 'not_started' ? 'active' : '']"
      />
      <p-button
        label="Требуют внимания"
        @click="changeMode('attention')"
        outlined
        :class="[mode === 'attention' ? 'active' : '']"
      />
      <p-button label="Все" @click="changeMode('all')" outlined :class="[mode === 'all' ? 'active' : '']" />
      <p-dropdown
        v-model="filters['testName'].value"
        :options="testOptions"
        optionLabel="label"
        optionValue="value"
        showClear
        placeholder="Название теста"
      />
      <p-button icon="pi pi-download" @click="exportExcel" outlined class="p-button-text" />
    </div>
    <div class="search">
      <i class="pi pi-search" />
      <p-input-text v-model.lazy="filters['global'].value" :placeholder="`Поиск по пройденным тестам`" />
    </div>
  </section>
</template>

<script setup lang="ts">
import PInputText from 'primevue/inputtext'
import PButton from 'primevue/button'
import PDropdown from 'primevue/dropdown'
import { useCurrentTest } from '@test/composables/useCurrentTest'
import { useCompletedTest } from '@admin/completed-tests/composables/useCompletedTest'

const { filters } = useCurrentTest()
const { changeMode, mode, testOptions, exportExcel } = useCompletedTest()
</script>

<style scoped lang="scss">
.search-panel {
  width: 100%;
  justify-content: space-between;
  display: flex;
  align-items: center;

  .search {
    width: 400px;
    position: relative;

    .pi-search {
      position: absolute;
      top: 30%;
      right: 0.8rem;
    }

    :deep(.p-inputtext) {
      width: 100%;
    }
  }

  .contols {
    display: flex;
    justify-content: space-evenly;
    gap: 1rem;

    .active {
      background-color: #10b981;
      color: white;
    }
  }
}
</style>
