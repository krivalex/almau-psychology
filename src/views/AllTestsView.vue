<template>
  <section class="all-tests" v-if="testList">
    <span class="about-all-tests"> Список тестов </span>
    <template v-for="test in testList" :key="test.id">
      <TestCard :test="test" />
    </template>
  </section>
  <i v-else class="pi pi-spin pi-spinner" style="font-size: 5rem; margin-top: 100px" />
</template>

<script setup lang="ts">
import { useTest } from '../composables/useTest'
import { onMounted } from 'vue'
import TestCard from '../components/TestCard.vue'

const { testList, getAllContent } = useTest()

onMounted(() => {
  getAllContent()
})
</script>

<style lang="scss">
.all-tests {
  height: 100vh;
  margin-top: 60px;
  margin-bottom: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  .about-all-tests {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
  }
}
</style>
