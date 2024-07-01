<template>
  {{ currentTest.scoreValue }}
  <div class="answers">
    <template v-for="answer in selectedTest?.questions[currentIndex]?.answers" :key="answer.id">
      <template v-if="isNoAnswers">
        <p-button label="Пропустить" class="control-button p-button-text skip" @click="nextQuestion(answer)" />
      </template>
      <template v-else-if="answer.text || currentAnswerType === 'open'">
        <template v-if="currentAnswerType === 'buttons'">
          <p-button :label="answer.text" class="control-button" @click="nextQuestion(answer)" :id="answer.id" />
        </template>
        <template v-else-if="currentAnswerType === 'open'">
          <p-textarea rows="6" cols="30" v-model="answer.text" :id="answer.id" autoResize />
          <p-button
            class="control-button p-text-button send-button"
            label="Ответить"
            @click="nextQuestion(answer)"
            :disabled="isOpenQuestionEmpthy(answer)"
          />
        </template>
        <template v-else-if="currentAnswerType === 'multi-buttons'">
          <div class="checkbox-label">
            <p-checkbox v-model="answer.isChoose" :id="answer.id" :binary="true" />
            <span class="label" :id="answer.id">{{ answer.text }}</span>
          </div>
        </template>
      </template>
    </template>
    <p-button
      v-if="isMultiQuestionEmpthy()"
      class="control-button p-text-button"
      label="Ответить"
      @click="nextQuestion(null, 'multi-buttons')"
    />
  </div>
</template>

<script setup lang="ts">
import PButton from 'primevue/button'
import PTextarea from 'primevue/textarea'
import PCheckbox from 'primevue/checkbox'

import { computed } from 'vue'

import { useTest } from '@test/composables/useTest'
import { useCurrentTest } from '@test/composables/useCurrentTest'

const { selectedTest } = useTest()
const { currentIndex, nextQuestion, currentTest } = useCurrentTest()

function getAnswerType() {
  return selectedTest.value?.questions[currentIndex.value]?.answerType
}

function isOpenQuestionEmpthy(answer: { text: string }) {
  return !answer.text && getAnswerType() === 'open'
}

function isMultiQuestionEmpthy() {
  const isMultiEmpty = selectedTest.value?.questions[currentIndex.value]?.answers.every(a => !a.isChoose)
  return !isMultiEmpty && getAnswerType() === 'multi-buttons'
}

const currentAnswerType = computed(() => getAnswerType() || 'buttons')

const isNoAnswers = computed(
  () =>
    !selectedTest.value?.questions[currentIndex.value]?.answers.map(a => a.text).join('') &&
    currentAnswerType.value !== 'open',
)
</script>

<style lang="scss" scoped>
.answers {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  width: 100%;
  gap: 10px;
  padding: 0 20px;
  padding-bottom: 10px;
  position: relative;

  :deep(.p-inputtextarea) {
    width: 100%;
  }

  .send-button {
    position: relative;
    top: -20px;
    background-color: transparent;
    color: #059669;
    border-color: transparent;
    width: 100%;
    min-width: 150px;

    :deep(.p-button-label) {
      font-size: 1.3rem;
      width: 100%;
    }
  }

  .control-button {
    min-width: 48%;
    width: min-content;
    font-size: 1.5rem;
    text-align: center;
    padding: 0.5rem;
    max-width: 48%;
    max-height: 80px;
    min-height: 30px;
  }
}

.clicked {
  opacity: 0.5;
  animation: clicked 0.5s;
}

@keyframes clicked {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.checkbox-label {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-width: 100%;
  gap: 10px;
  padding: 0 0.3rem;

  .label {
    font-size: 1rem;
    width: 100%;
    text-align: start;
    max-height: 60px;
    word-wrap: break-word;
  }

  :deep(.p-checkbox-box) {
    width: 30px;
    height: 22px;
  }
}
</style>
