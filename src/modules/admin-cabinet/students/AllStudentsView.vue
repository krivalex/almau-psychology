<template>
  <section class="students">
    <template v-if="googleUserList?.length">
      <p-datatable
        :value="googleUserList"
        :paginator="true"
        :rows="10"
        :rowsPerPageOptions="[5, 10, 20]"
        filter
        sort
        :loading="loading.googleUserList"
        style="width: 100%; height: 100%; min-height: 100vh"
      >
        <p-column v-for="col in columns" v-bind="col" :field="col.field" :header="col.header" sortable :key="col.field">
          <template #body="{ data }">
            <span v-if="col.field === 'messages'">
              <p-button icon="pi pi-telegram" @click="writeToTelegram(data)" class="p-button-text"></p-button>
              <p-button icon="pi pi-whatsapp" @click="writeToWhatsapp(data)" class="p-button-text"></p-button>
            </span>
            <span v-else :class="[col?.stylish?.(data), 'normalize-wrap']">{{ col?.transform?.(data) }}</span>
          </template>
        </p-column>
      </p-datatable>
    </template>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUser } from '@/composables/useUser'

import PDatatable from 'primevue/datatable'
import PColumn from 'primevue/column'
import PButton from 'primevue/button'

import { writeToTelegram, writeToWhatsapp } from '@/utils'
import { AppColumn, User } from '@/interfaces'

const { googleUserList, loading, getAllUsers } = useUser()

const columns: AppColumn[] = [
  {
    field: 'name',
    header: 'ФИО',
    transform: function (v: User) {
      return getFullName(v)
    },
    stylish: function (v: User) {
      return commonStylish(v[this?.field as keyof User])
    },
  },
  {
    field: 'email',
    header: 'Email',
    transform: function (v: User) {
      return isHasData(v[this?.field as keyof User])
    },
    stylish: function (v: User) {
      return commonStylish(v[this?.field as keyof User])
    },
  },
  {
    field: 'phone',
    header: 'Телефон',
    transform: function (v: User) {
      return isHasData(v[this?.field as keyof User])
    },
    stylish: function (v: User) {
      return commonStylish(v[this?.field as keyof User])
    },
    style: 'width: 200px',
  },
  {
    field: 'courseRegister',
    header: 'Год поступления',
    transform: function (v: User) {
      if (v[this?.field as keyof User] === 'not_a_student') return 'Не студент'
      return isHasData(v['yearAdmission'])
    },
    stylish(v) {
      return v['courseRegister'] === 'not_a_student' ? 'error-data' : ''
    },
    style: 'width: 90px',
  },
  {
    field: 'specialty',
    header: 'Специальность',
    transform: function (v: User) {
      return isHasData(v[this?.field as keyof User])
    },
    stylish: function (v: User) {
      return commonStylish(v[this?.field as keyof User])
    },
  },
  {
    field: 'telegramID',
    header: 'Авто-вход',
    transform: function (v: User) {
      return !!v[this?.field as keyof User] ? 'Активно' : 'Неактивно'
    },
    stylish: function (v: User) {
      return !!v[this?.field as keyof User] ? 'success-data' : 'error-data'
    },
  },
  {
    field: 'completedTests',
    header: 'Пройденные тесты',

    transform: function (v: User) {
      return v['completedTests'].length
    },
    style: 'width: 100px',
  },
  { field: 'messages', header: 'Связаться' },
]

function isHasData(data: unknown) {
  return data || 'Нет данных'
}

function commonStylish(field: unknown) {
  return !!field ? '' : 'no-data'
}

function getFullName(user: User) {
  return [user.name, user.surname, user.patronymic].filter(Boolean).join(' ')
}

onMounted(async () => {
  if (!googleUserList.value.length) await getAllUsers()
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

.no-data {
  color: gray;
  font-style: oblique;
  font-weight: 600;
}

.success-data {
  color: green;
  font-weight: 600;
}

.error-data {
  color: red;
  font-weight: 600;
}
</style>
