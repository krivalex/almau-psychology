<template>
  <div class="test-card" @click="openCreateTestModal">
    <span class="text">Создать тест</span>
    <i class="pi pi-plus" />
  </div>
</template>

<script setup lang="ts">
import { useDialog } from 'primevue/usedialog'
import TestControlChangeModal from '@/modules/admin-cabinet/test-control/components/modals/TestControlChangeModal.vue'
import { useTest } from '@/composables/useTest'

const { newTest } = useTest()
const dialog = useDialog()

function openCreateTestModal() {
  dialog.open(TestControlChangeModal, {
    props: {
      header: 'Создание нового теста',
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      modal: true,
    },
    data: {
      test: newTest.value,
    },
  })
}
</script>

<style lang="scss" scoped>
.test-card {
  position: relative;
  max-width: 90vw;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border-top-left-radius: 30px !important;
  border-top-right-radius: 30px !important;
  min-width: 505px;
  min-height: 298px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  .text {
    font-size: 3rem;
    color: #10b981;
  }

  .pi-plus {
    font-size: 5rem;
    color: #10b981;
  }
}
</style>
