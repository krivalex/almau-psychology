<template>
  <template v-if="isAdmin">
    <section class="admin">
      <div class="admin-panel">
        <p-button class="admin-button p-button-sm" label="Результаты" icon="pi pi-book" @click="redirectToResults" />
        <p-button class="admin-button p-button-sm" label="Создать тест" icon="pi pi-plus" />
      </div>
    </section>
  </template>
  <section class="all-tests">
    <template v-if="!loading.testList">
      <pre>
        {{ getTelegramID() }}
      </pre>
      <span class="about-all-tests"> Список тестов </span>
      <template v-for="test in testList" :key="test.id">
        <TestCard :test="test" />
      </template>
    </template>
    <template v-else>
      <LoadSpinner />
    </template>
  </section>
</template>

<script setup lang="ts">
import { useTest } from '../composables/useTest'
import { useUser } from '../composables/useUser'
import { onMounted } from 'vue'
import TestCard from '../components/TestCard.vue'
import LoadSpinner from '../components/ui/LoadSpinner.vue'
import PButton from 'primevue/button'
import { useRouter } from 'vue-router'
import { useTelegram } from '../composables/useTelegram'

const router = useRouter()
const { testList, getAllContent, loading } = useTest()
const { isAdmin } = useUser()
const { getTelegramID } = useTelegram()

onMounted(() => {
  getAllContent()
})

function redirectToResults() {
  router.push('/admin/completed-tests')
}
</script>

<style lang="scss">
.admin {
  color: black;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 1rem;
  font-weight: 600;
  width: 100vw;
  z-index: 100;
  padding-top: 15px;
  position: relative;

  .admin-panel {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 100%;
    gap: 7px;

    .admin-button {
      background-color: white;
      color: black;
      padding: 10px;
      width: 100%;
    }
  }
}

.all-tests {
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  color: black;
  margin-top: 10px;
  .about-all-tests {
    font-size: 1.5rem;
    font-weight: bold;
    color: black;
  }
}
</style>
