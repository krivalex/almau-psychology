<template>
  <div class="preview-test-content">
    <template v-for="preview in previewMap" :key="preview.id">
      <template v-if="previewID === preview.id">
        <component :is="preview.view" :previewTest="test" :class="preview.class" />
        <h1 class="preview-header">{{ preview.id }}. {{ preview.header() }}</h1>
      </template>
    </template>
  </div>
  <div class="contols">
    <p-button icon="pi pi-arrow-left" class="control-button" @click="nextAction" />
    <p-button icon="pi pi-refresh" class="p-button-text control-button refresh" @click="updateAction" />
    <p-button icon="pi pi-arrow-right" class="control-button" @click="prevAction" />
  </div>
</template>

<script setup lang="ts">
import PButton from 'primevue/button'
import { useChangeTest } from '@admin/test-control/composables/useChangeTest'
import TestView from '@/modules/tests/TestView.vue'
import ResultView from '@/modules/tests/ResultView.vue'
import { ref, shallowRef } from 'vue'
import { useCurrentTest } from '@/modules/tests/composables/useCurrentTest'

const { clearTestAnswers, isTestCompleted } = useCurrentTest()
const { test } = useChangeTest()

const previewID = ref(1)

const previewMap = ref([
  { id: 1, name: 'questions', header: () => 'Вопросы', view: shallowRef(TestView), class: 'preview-test-view' },
  {
    id: 2,
    name: 'results',
    header: () => `Результаты(${test.value.results.length})`,
    view: shallowRef(ResultView),
    class: 'preview-result-view',
  },
])

function nextAction() {
  previewID.value = previewID.value === previewMap.value.length ? 1 : previewID.value + 1
}

function prevAction() {
  previewID.value = previewID.value === 1 ? previewMap.value.length : previewID.value - 1
}

function updateAction() {
  clearTestAnswers()
  isTestCompleted.value = !isTestCompleted.value
}
</script>

<style lang="scss" src="@admin/test-control/styles/test-control.scss" scoped />

<style lang="scss" scoped>
.preview-test-content {
  width: calc(390px * 0.75);
  height: calc(844px * 0.65);
  border: 3px solid gray;
  border-radius: 1rem;
  position: fixed;
  text-align: center;
}

.preview-header {
  font-size: 1.5rem;
  position: relative;
  bottom: -8%;
}

.contols {
  position: fixed;
  display: flex;
  justify-content: space-evenly;
  top: calc(844px * 0.75);
  padding: 5px 20px;
  gap: 20px;

  .control-button {
    width: 70px;
    height: 40px;
    font-size: 1.7rem;
  }
}

.preview-test-view {
  height: calc(844px * 0.64);
  justify-content: flex-start;

  :deep(.test-image) {
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
  }

  :deep(.question-text) {
    font-size: 1rem;
  }

  :deep(.test-request) {
    height: 360px;
  }

  :deep(.info) {
    transform: translateY(30%);
  }

  :deep(.control .answers .control-button) {
    font-size: 0.8rem;
    padding: 0.5rem 0.5rem;
  }

  :deep(.control .actions) {
    width: 60%;
  }

  :deep(.control .actions .counter) {
    font-size: 1rem;
  }

  :deep(.control .actions .action-button) {
    font-size: 1rem;
    padding: 0.5rem 0.5rem;
  }
}

.preview-result-view {
  :deep(.result) {
    height: calc(844px * 0.64);
    border-radius: 1rem;
  }

  :deep(.title) {
    font-size: 1.5rem;
    padding: 0.5rem 0.5rem;
  }

  :deep(.description) {
    top: 25%;
    font-size: 0.75rem;
  }
}
</style>
