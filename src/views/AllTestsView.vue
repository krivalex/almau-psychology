<template>
  <section class="all-tests">
    <template v-if="!loading.testList">
      <span class="about-all-tests"> Список тестов </span>
      <template v-for="test in testList" :key="test.id">
        <template v-if="test.visible">
          <TestCard :test="test" />
        </template>
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

<style lang="scss" scoped>
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
