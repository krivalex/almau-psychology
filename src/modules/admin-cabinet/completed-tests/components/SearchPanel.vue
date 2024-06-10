<template>
  <section class="search-panel">
    <div class="search">
      <i class="pi pi-search" />
      <p-input-text v-model.lazy="filters['global'].value" :placeholder="`Поиск по пройденным тестам`" />
    </div>
  </section>
</template>

<script setup lang="ts">
import PInputText from 'primevue/inputtext'
import { useCurrentTest } from '@test/composables/useCurrentTest'

const { filters } = useCurrentTest()
</script>

<style scoped lang="scss">
.search-panel {
  width: 100%;
  justify-content: flex-end;
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
}
</style>
