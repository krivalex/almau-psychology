<template>
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
          <p-textarea v-model="answer.text" :id="answer.id" :autoResize="true" :rows="5" />
        </template>
        <template v-else-if="currentAnswerType === 'multi-buttons'">
          <p-button :label="answer.text" class="control-button" @click="nextQuestion(answer)" :id="answer.id" />
        </template>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import PButton from 'primevue/button'
import PTextarea from 'primevue/textarea'
import { computed } from 'vue'

import { useTest } from '@test/composables/useTest'
import { useCurrentTest } from '@test/composables/useCurrentTest'

const { selectedTest } = useTest()
const { currentIndex, nextQuestion } = useCurrentTest()

function getAnswerType() {
  return selectedTest.value?.questions[currentIndex.value]?.answerType
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
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
  padding: 0 20px;
}

.control-button {
  width: 100%;
  height: 100%;
  font-size: 1.2rem;
  text-align: center;
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
</style>
