<template>
  <section class="completed-tests">
    <p-datatable
      v-model:filters="filters"
      :value="filteredData"
      ref="DT"
      :paginator="true"
      :rows="8"
      :rowsPerPageOptions="[5, 10, 20]"
      filter
      sort
      :sort-order="-1"
      :sort-field="'created' || filters['global'].value"
      :loading="loading.allCompletedTests"
      style="width: 100%; height: 100%; min-height: 100vh"
      :globalFilterFields="[
        'student.name',
        'student.surname',
        'student.specialty',
        'student.yearAdmission',
        'student.courseRegister',
        'student.email',
        'student.phone',
        'testName',
        'scoreValue',
        'scoreName',
        'created',
        'status',
        'answers',
      ]"
      :exportFilename="`Пройденные тесты за ${new Date().toLocaleDateString()}`"
      :export-function="exportPretify"
      :csv-separator="';'"
    >
      <template #header>
        <search-panel />
      </template>
      <p-column
        v-for="col in columns"
        :field="col.field"
        :header="col.header"
        sortable
        :style="col.style"
        :key="col.field"
      >
        <template #body="{ data, field }">
          <span v-if="col.field === 'name'">
            {{ data.student.name }}
          </span>
          <span v-else-if="col.field === 'surname'">
            {{ data.student.surname }}
          </span>
          <span v-else-if="col.field === 'student'">
            <div class="info-student-container">
              <template v-if="data.student.courseRegister !== 'not_a_student'">
                <span class="specialty"
                  >{{ isHasData(data.student.specialty) }}({{ isHasData(data.student.yearAdmission) }})</span
                >
              </template>
              <template v-else>
                <span class="specialty">Не студент</span>
              </template>
              <span class="email">{{ isHasData(data.student.email) }}</span>
              <span class="phone">{{ isHasData(data.student.phone) }}</span>
            </div>
          </span>
          <span v-else-if="col.field === 'created'">
            {{ transformDate(data.created) }}
          </span>
          <span v-else-if="col.field === 'answers'">
            <p-button label="Ответы" @click="openAnswersModal(data)"></p-button>
          </span>
          <span v-else-if="col.field === 'messages'">
            <p-button icon="pi pi-telegram" @click="writeToTelegram(data?.student)" class="p-button-text"></p-button>
            <p-button icon="pi pi-whatsapp" @click="writeToWhatsapp(data?.student)" class="p-button-text"></p-button>
          </span>
          <template v-else-if="col.field === 'status'">
            <div class="status">
              <p-dropdown
                v-model="data.status"
                :options="statusLabels"
                optionLabel="label"
                optionValue="value"
                @change="toogleUpdateStatus(data)"
              />
            </div>
          </template>
          <template v-else-if="col.field === 'firebaseId'">
            <p-button
              icon="pi pi-trash"
              @click="openConfirmToDeleteCompletedTest(data.firebaseId)"
              class="p-button-text"
              severity="danger"
            ></p-button>
          </template>
          <span v-else>{{ data[field] }}</span>
        </template>
      </p-column>
    </p-datatable>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCurrentTest } from '@test/composables/useCurrentTest'
import PDatatable from 'primevue/datatable'
import PColumn from 'primevue/column'
import PButton from 'primevue/button'
import { useDialog } from 'primevue/usedialog'
import AnswersModal from './modals/AnswersModal.vue'
import type { CompletedTest } from '@/interfaces'
import { writeToTelegram, writeToWhatsapp, transformDate } from '@/utils'
import PDropdown from 'primevue/dropdown'
import { statusLabels } from '@/utils'
import SearchPanel from '@admin/completed-tests/components/SearchPanel.vue'
import { useCompletedTest } from '@admin/completed-tests/composables/useCompletedTest'
import { useConfirm } from 'primevue/useconfirm'

const { getAllContent, allCompletedTests, loading, updateStatus, filters, deleteCompletedTest } = useCurrentTest()
const { getTestOptions, DT, filteredData, exportPretify } = useCompletedTest()

const dialog = useDialog()
const confirm = useConfirm()

async function toogleUpdateStatus(data: CompletedTest) {
  await updateStatus(data)
}

function openAnswersModal(answers: CompletedTest): void {
  dialog.open(AnswersModal, {
    props: {
      header: `Карта ответов ${answers?.student?.name} ${answers?.student?.surname}`,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      modal: true,
    },
    data: {
      answers,
    },
  })
}

const columns = [
  { field: 'name', header: 'Имя' },
  { field: 'surname', header: 'Фамилия' },
  { field: 'student', header: 'Инфо' },
  { field: 'testName', header: 'Тест' },
  { field: 'scoreValue', header: 'Баллы' },
  { field: 'scoreName', header: 'Результат' },
  { field: 'created', header: 'Дата прохождения' },
  { field: 'answers', header: 'Карта ответов' },
  { field: 'status', header: 'Статус', style: 'max-width: 220px; min-width: 220px;' },
  { field: 'messages', header: 'Связаться' },
  { field: 'firebaseId', header: '🗑️' },
]

function isHasData(data: string | number) {
  return data || 'Нет данных'
}

function openConfirmToDeleteCompletedTest(id: string) {
  confirm.require({
    message: `Тест будет удален безвозвратно`,
    header: `Вы уверены, что хотите удалить тест?`,
    icon: 'pi pi-exclamation-triangle',
    accept: async () => await deleteCompletedTest(id),
    reject: () => {},
    acceptLabel: 'Да, удалить тест',
    rejectLabel: 'Отмена',
    acceptClass: 'p-button-danger',
    rejectClass: 'p-button-secondary',
  })
}

onMounted(async () => {
  if (!allCompletedTests.value.length) await getAllContent()
  getTestOptions()
})
</script>

<style lang="scss" scoped>
.completed-tests {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 7px;
  background-color: white;
  color: black;
  font-size: 1rem;
  font-weight: 600;
  width: 98vw;
  margin: 0 auto;
  z-index: 100;
  position: relative;
}

.info-student-container {
  display: flex;
  flex-direction: column;
  text-align: center;

  .specialty {
    font-weight: 600;
    font-size: 0.9rem;
  }

  .email {
    font-size: 0.7rem;
  }

  .phone {
    font-size: 0.9rem;
  }
}

.status {
  :deep(.p-dropdown) {
    width: 100%;
  }
}
</style>
