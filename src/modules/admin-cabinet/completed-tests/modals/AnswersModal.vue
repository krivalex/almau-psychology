<template>
  <template v-for="(answer, index) in answers" :key="index">
    <div class="content">
      <div class="index-question">
        <span class="index"> {{ index + 1 }}. </span>
        <span class="question">{{ answer.question }}</span>
      </div>
      <span class="answer">{{ answer.answer }}</span>
    </div>
  </template>
</template>

<script setup lang="ts">
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import type { Ref } from 'vue'
import { inject, ref } from 'vue'

const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')
const answers = ref(dialogRef?.value?.data?.answers.answers)
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  max-width: 90vw;
  min-width: 90vw;

  .index-question {
    display: flex;
    align-items: center;
    max-width: inherit;

    .index {
      font-weight: bold;
      margin-right: 5px;
    }

    .question {
      font-size: 1rem;
    }
  }
  .answer {
    margin-left: 20px;
    color: #10b981;
    font-size: 1rem;
    font-weight: bold;
    max-width: inherit;
  }
}
</style>
