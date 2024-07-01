<template>
  <div class="preview-test-content">
    <template v-for="preview in previewMap" :key="preview.id">
      <template v-if="previewID === preview.id">
        <h1 class="preview-header">{{ preview.id }}. {{ preview.header() }}</h1>
        <component :is="preview.view" :previewTest="test" :previewID="previewID - 2" :class="preview.class" />
      </template>
    </template>
  </div>
  <div class="contols">
    <p-button icon="pi pi-arrow-left" class="control-button" @click="prevAction" />
    <p-button icon="pi pi-refresh" class="p-button-text control-button refresh" @click="updateAction" />
    <p-button icon="pi pi-arrow-right" class="control-button" @click="nextAction" />
  </div>
</template>

<script setup lang="ts">
import PButton from 'primevue/button'
import { useChangeTest } from '@admin/test-control/composables/useChangeTest'
import TestView from '@/modules/tests/TestView.vue'
import ResultView from '@/modules/tests/ResultView.vue'
import { ref, shallowRef } from 'vue'
import { useCurrentTest } from '@/modules/tests/composables/useCurrentTest'
import { Result } from '@/interfaces'

const { clearTestAnswers, isTestCompleted } = useCurrentTest()
const { test } = useChangeTest()

const previewID = ref(1)

const previewMap = ref([
  { id: 1, name: 'questions', header: () => 'Вопросы', view: shallowRef(TestView), class: 'preview-test-view' },
  ...test.value.results.map((_result: Result, index: number) => ({
    id: index + 2,
    name: 'results',
    header: () => `Результаты(${index + 1}/${test.value.results.length})`,
    view: shallowRef(ResultView),
    class: 'preview-result-view',
  })),
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
  width: calc(390px * 0.8);
  height: calc(844px * 0.7);
  border: 3px solid gray;
  border-radius: 1rem;
  position: fixed;
  text-align: center;
  overflow: scroll;
}

.preview-header {
  font-size: 0.75rem;
  position: absolute;
  z-index: 100000;
  color: white;
  background-color: black;
  width: 100%;
  top: -12px;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

.contols {
  position: fixed;
  display: flex;
  justify-content: space-evenly;
  top: calc(844px * 0.8);
  padding: 5px 17px;
  gap: 22px;

  .control-button {
    width: 80px;
    height: 40px;
    font-size: 1.7rem;
  }
}

.preview-test-view {
  height: calc(844px * 0.64);
  justify-content: flex-start;
  min-height: 60vh;

  :deep(.test-image) {
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
  }

  :deep(.test-request .queston) {
    height: 20vh;
  }

  :deep(.question-text) {
    font-size: 1rem;
  }

  :deep(.test-request) {
    height: 410px;
  }

  :deep(.info) {
    transform: translateY(50%);
  }

  :deep(.control .answers .control-button) {
    font-size: 0.8rem;
    padding: 0.5rem 0.5rem;
  }

  :deep(.control .answers) {
    width: 100%;

    .checkbox-label .label {
      font-size: 0.8rem;
    }

    .send-button {
      font-size: 1rem;
      padding: 0.5rem 0.5rem;
    }
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
    min-height: 60vh;
  }

  :deep(.title) {
    font-size: 1.4rem;
    padding: 0.5rem 0.5rem;
  }

  :deep(.description) {
    top: 25%;
    font-size: 0.75rem;
  }
}
</style>
