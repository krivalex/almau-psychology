<template>
  <section class="all-tests">
    <template v-if="!loading.testList">
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
import { useTest } from '@/composables/useTest'
import { onMounted } from 'vue'
import TestCard from '@/components/TestCard.vue'
import LoadSpinner from '@/components/ui/LoadSpinner.vue'

const { testList, getAllContent, loading } = useTest()

onMounted(async () => {
  await getAllContent()
})
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
