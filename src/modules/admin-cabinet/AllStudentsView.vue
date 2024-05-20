<template>
  <section class="students">
    <template v-if="googleUserList?.length">
      <p-datatable :value="googleUserList" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 20]" filter sort :loading="loading.googleUserList" style="width: 100%; height: 100%; min-height: 100vh;">
        <p-column v-for="col in columns" :field="col.field" :header="col.header" sortable :key="col.field" >
          <template #body="{data, field}">
            <span v-if="col.field === 'created'">
              {{transformDate(data.created)}}
            </span>
            <span v-else-if="col.field === 'messages'">
              <p-button icon="pi pi-telegram" @click="writeToTelegram(data)" class="p-button-text"></p-button>
              <p-button icon="pi pi-whatsapp" @click="writeToWhatsapp(data)" class="p-button-text"></p-button>
            </span>
            <span >{{data[field]}}</span>
          </template>
        </p-column>
      </p-datatable>
    </template>
  </section>
</template>

<script setup lang="ts">
import {onMounted} from 'vue';
import {useUser} from '@/composables/useUser'

import PDatatable from 'primevue/datatable';
import PColumn from 'primevue/column';
import PButton from 'primevue/button';

import {transformDate, writeToTelegram, writeToWhatsapp} from '@/utils'

const {googleUserList, loading, getAllUsers} = useUser()


const columns = [
  { field: 'name', header: 'Имя' },
  { field: 'surname', header: 'Фамилия' },
  { field: 'student', header: 'Инфо' },
  { field: 'messages', header: 'Связаться' }
]

// function isHasData(data: string | number) {
//   return data || "Нет данных"
// }

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

</style

