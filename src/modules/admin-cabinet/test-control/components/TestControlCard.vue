<template>
  <div class="test-card">
    <div class="absolute-icon">
      <i :class="['pi', test.visible ? 'pi-eye' : 'pi-eye-slash']" />
    </div>
    <p-card>
      <template #header>
        <div class="image-block">
          <img class="preview-image" :src="test.image" alt="test image" @error="onImageError" />
        </div>
        <div class="preview-content">
          <h3>{{ test.name }}</h3>
        </div>
      </template>
      <template #footer>
        <div class="start-test-contol">
          <p-button label="Редактировать" icon="pi pi-pencil" class="update-button" @click="openTestChangerModal" />
          <p-button label="Удалить" severity="danger" icon="pi pi-trash" class="delete-button" @click="onDeleteTest" />
        </div>
        <span class="author">{{ test.author }}</span>
        <span class="time">
          <i class="pi pi-clock" />
          {{ test.timeToComplete }}
        </span>
      </template>
    </p-card>
  </div>
</template>

<script setup lang="ts">
import PCard from 'primevue/card'
import PButton from 'primevue/button'
import { defineProps } from 'vue'
import { Test } from '@/interfaces'
import { useTest } from '@test/composables/useTest'
import { useConfirm } from 'primevue/useconfirm'
import { useDialog } from 'primevue/usedialog'
import { onImageError } from '@/utils'
import TestControlChangeModal from '@admin/test-control/components/modals/TestControlChangeModal.vue'

const props = defineProps<{
  test: Test
}>()

const confirm = useConfirm()
const dialog = useDialog()

const { deleteTest, getAllContent } = useTest()

function openTestChangerModal() {
  dialog.open(TestControlChangeModal, {
    props: {
      header: `Тест "${props?.test?.name}"`,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      modal: true,
    },
    data: {
      test: props.test,
    },
  })
}

async function onDeleteTest() {
  confirm.require({
    message: `Вы уверены, что хотите удалить тест "${props?.test?.name}"?`,
    header: 'Подтверждение',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      await deleteTest(props.test)
      await getAllContent()
    },
    reject: () => {},
    acceptLabel: 'Да, удалить тест',
    rejectLabel: 'Отмена',
    acceptClass: 'p-button-danger',
    rejectClass: 'p-button-secondary',
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

  .absolute-icon {
    position: absolute;
    top: 5px;
    left: 15px;
    z-index: 1;

    i {
      font-size: 2.5rem;
      cursor: pointer;
      filter: drop-shadow(0 0 2px rgba(255, 255, 255, 1));
    }
  }

  :deep(.p-card) {
    border-radius: 10px;
    border-top-left-radius: 30px !important;
    border-top-right-radius: 30px !important;
  }

  .desc {
    padding: 0;
    margin-block-start: 0em;
    margin-block-end: 0em;
    text-align: center;
  }

  .author {
    position: absolute;
    bottom: 5px;
    right: 7px;
    font-size: 0.8rem;
    color: #ccc;
  }

  .image-block {
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    width: 100%;
    max-width: inherit;
    height: 150px;

    .preview-image {
      width: 100%;
      max-width: inherit;
      height: 150px;
      object-fit: cover;
      border-top-right-radius: 30px;
      border-top-left-radius: 30px;
    }
  }

  .preview-content {
    text-align: center;

    h3 {
      padding: 5px 15px;
      margin-block-start: 0em;
      margin-block-end: 0em;
      font-size: 1.8rem;
    }
  }

  .start-test-contol {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    width: inherit;
    gap: 1rem;
  }

  .time {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 7px;
    position: absolute;
    bottom: 5px;
    left: 7px;
    font-size: 0.8rem;
    color: #ccc;
  }
}

:deep(.p-card .p-card-content) {
  padding: 0 10px;
}

:deep(.p-card .p-card-body) {
  padding: 0.25rem;
}
</style>
@/modules/tests/composables/useTest
