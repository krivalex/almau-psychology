<template>
  <template v-if="isAdmin">
    <section class="completed-tests">
      <p-datatable :value="allCompletedTests" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 20]" filter sort>
        <p-column v-for="col in columns" :field="col.field" :header="col.header" sortable >
          <template #body="{data, field}">
            <span v-if="col.field === 'name'">
              {{data.student.name}}
            </span>
            <span v-else-if="col.field === 'surname'">
              {{data.student.surname}}
            </span>
            <span v-else-if="col.field === 'student'">
              <div class="info-student-container">
                <template v-if="data.student.courseRegister !== 'not_a_student'">
                  <span class="specialty">{{isHasData(data.student.specialty)}}({{isHasData(data.student.yearAdmission)}})</span>
                </template>
                <template v-else>
                  <span class="specialty">Не студент</span>
                </template>
                <span class="email">{{isHasData(data.student.email)}}</span>
                <span class="phone">{{isHasData(data.student.phone)}}</span>
              </div>
            </span>
            <span v-else-if="col.field === 'created'">
              {{transformDate(data.created)}}
            </span>
            <span v-else-if="col.field === 'answers'">
                <p-button label="Ответы" @click="openAnswersModal(data)"></p-button>
            </span>
            <span v-else-if="col.field === 'messages'">
              <p-button icon="pi pi-telegram" @click="writeToTelegram(data)" class="p-button-text"></p-button>
              <p-button icon="pi pi-whatsapp" @click="writeToWhatsapp(data)" class="p-button-text"></p-button>
            </span>
            <span v-else>{{data[field]}}</span>
          </template>
        </p-column>
      </p-datatable>
    </section>
  </template>
  <template v-else>
    <your-have-no-permission />
  </template>
</template>

<script setup lang="ts">
import {onMounted} from 'vue';
import {useCurrentTest} from '@/composables/useCurrentTest'
import { useUser } from '@/composables/useUser';
import PDatatable from 'primevue/datatable';
import PColumn from 'primevue/column';
import PButton from 'primevue/button';
import { useDialog } from 'primevue/usedialog'
import AnswersModal from '@/components/modals/AnswersModal.vue'
import YourHaveNoPermission from '@/components/YourHaveNoPermission.vue'
import type {CompletedTest} from '@/interfaces'
import {pretifierPhone, transformDate} from '@/utils'

const { isAdmin} = useUser()
const {getAllContent, allCompletedTests} = useCurrentTest()

const dialog = useDialog()



function writeToTelegram(completedTest: CompletedTest) {
  const phone = pretifierPhone(completedTest.student?.phone)
  window.open(`https://t.me/${phone}`, '_blank')
}

function writeToWhatsapp(completedTest: CompletedTest) {
  const phone = pretifierPhone(completedTest.student?.phone)
  window.open(`https://wa.me/${phone}`, '_blank')
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
  {field: 'student', header: 'Инфо'},
  {field: 'testName', header: 'Тест'},
  { field: 'scoreValue', header: 'Очки' },
  { field: 'scoreName', header: 'Результат' },
  { field: 'created', header: 'Дата прохождения' },
  { field: 'answers', header: 'Карта ответов' },
  {field: 'messages', header: 'Связаться'}
]

function isHasData(data: string | number) {
  return data || "Нет данных"
}

onMounted(async () => {
  await getAllContent()
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
  width: 96vw;
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

</style
../utils/date.logic../utils/phone.logic
