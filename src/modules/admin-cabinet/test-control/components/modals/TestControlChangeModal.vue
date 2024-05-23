<template>
  <section class="test-change-modal">
    <div class="test-block">
      <div class="control-test">
        <base-info />
        <test-info />
        <result-info />
      </div>

      <div class="preview-test">
        <control-test-preview-test />
      </div>
    </div>

    <div class="actions">
      <div class="adds">
        <p-button
          label="Опубликовать"
          icon="pi pi-eye"
          class="save-button"
          @click="handleValidation"
          :disabled="isDisabled"
        />
        <p-button
          severity="secondary"
          label="Сохранить"
          icon="pi pi-save"
          class="save-button"
          @click="handleValidation"
          :disabled="isDisabled"
        />
      </div>
      <div class="dels">
        <p-button
          severity="danger"
          label="Удалить"
          icon="pi pi-trash"
          class="save-button"
          @click="handleValidation"
          :disabled="isDisabled"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseInfo from './components/BaseInfo.vue'
import ResultInfo from './components/ResultInfo.vue'
import TestInfo from './components/TestInfo.vue'
import ControlTestPreviewTest from '@/modules/admin-cabinet/test-control/components/modals/ControlTestPreviewTest.vue'

import PButton from 'primevue/button'

import { useChangeTest } from '@/modules/admin-cabinet/test-control/composables/useChangeTest'
const { handleValidation, isDisabled } = useChangeTest()
</script>

<style lang="scss" src="@/modules/admin-cabinet/test-control/styles/test-control.scss" scoped />

<style lang="scss" scoped></style>
