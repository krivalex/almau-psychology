<template>
  <section class="test-change-modal">
    <base-info />
    <test-info />
    <result-info />

    <p-button
      label="Сохранить"
      icon="pi pi-save"
      class="save-button"
      @click="handleValidation"
      :disabled="isDisabled"
    />
  </section>
</template>

<script setup lang="ts">
import BaseInfo from './components/BaseInfo.vue'
import ResultInfo from './components/ResultInfo.vue'
import TestInfo from './components/TestInfo.vue'
import PButton from 'primevue/button'

import { useChangeTest } from '@/modules/admin-cabinet/test-control/composables/useChangeTest'
const { handleValidation, isDisabled } = useChangeTest()
</script>

<style lang="scss" src="@/modules/admin-cabinet/test-control/styles/test-control.scss" scoped />

<style lang="scss" scoped></style>
