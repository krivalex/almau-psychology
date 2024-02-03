<template>
  <template v-if="isAdmin">
    <section class="completed-tests">
      <p-datatable :value="allCompletedTests" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 20]">
        <p-column v-for="col in columns" :field="col.field" :header="col.header" />
      </p-datatable>
    </section>
  </template>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import {useCurrentTest} from '../composables/useCurrentTest'
import { useUser } from '../composables/useUser';
import PDatatable from 'primevue/datatable';
import PColumn from 'primevue/column';


const { isAdmin} = useUser()
const {getAllContent, allCompletedTests} = useCurrentTest()

const columns = [
  { field: 'student.name', header: 'Имя' },
  { field: 'student.surname', header: 'Фамилия' },
  { field: 'scoreValue', header: 'Очки' },
  { field: 'scoreName', header: 'Результат' },
  // { field: 'answers', header: 'Тест' },
]

onMounted(() => {
  getAllContent()
})

</script>

<style lang="scss" scoped>

.completed-tests {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 7px;
  padding: 10px;
  background-color: white;
  color: black;
  font-size: 1rem;
  font-weight: 600;
  width: 100vw;
  z-index: 100;
  position: relative;
  padding-top: 15px;
}

</style
