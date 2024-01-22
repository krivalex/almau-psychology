<template>
  <template v-if="question">
    <div class="question">
      <span class="text">
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
  margin-bottom: 1rem;
  text-align: center;

  .text {
    font-size: 1.5rem;
    font-weight: 500;
    padding: 0 5px;
  }
}
</style>
