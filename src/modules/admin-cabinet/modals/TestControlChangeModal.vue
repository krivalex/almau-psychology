<template>
  {{ test }}
</template>

<script setup lang="ts">
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import type { Ref } from 'vue'
import { inject, ref } from 'vue'

const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')
const test = ref(dialogRef?.value?.data?.test)
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;

  .index-question {
    display: flex;
    align-items: center;

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
  }
}
</style>
