<template>
  <template v-if="question">
    <div class="question">
      <span class="question-text">
        {{ question.text }}
      </span>
    </div>
  </template>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { Question } from '../interfaces'

defineProps<{
  question: Question | undefined
}>()
</script>

<style lang="scss" scoped>
.question {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;

  .question-text {
    font-size: 1.3rem;
    font-weight: 500;
    padding: 0 5px;
  }
}
</style>
