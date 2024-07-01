<template>
  <section class="all-tests">
    <span class="about-all-tests"> Список тестов </span>
    <template v-if="!loading.testList">
      <div class="all-tests-container">
        <template v-for="test in testList" :key="test.id">
          <template v-if="test.visible">
            <TestCard :test="test" />
          </template>
        </template>
      </div>
    </template>
    <template v-else>
      <LoadSpinner />
    </template>
  </section>
</template>

<script setup lang="ts">
import { useTest } from '@test/composables/useTest'
import { onMounted } from 'vue'
import TestCard from '@test/components/TestCard.vue'
import LoadSpinner from '@/components/ui/LoadSpinner.vue'

const { testList, getAllContent, loading } = useTest()

onMounted(async () => {
  await getAllContent()
})
</script>

<style lang="scss" scoped>
.all-tests {
  min-height: 110vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  color: black;
  margin-bottom: 3rem;
  height: 120%;

  .about-all-tests {
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    font-size: 2rem;
    font-weight: bold;
    color: black;
  }

  .all-tests-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 1.5rem;
    flex-wrap: wrap;
  }
}
</style>
