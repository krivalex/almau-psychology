<template>
  <section class="test-control">
    <template v-if="!loading.testList">
      <div class="tests">
        <TestControlCreateCard />
        <template v-for="test in testList" :key="test.id">
          <TestControlCard :test="test" />
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
import TestControlCard from '@admin/test-control/components/TestControlCard.vue'
import TestControlCreateCard from '@admin/test-control/components/TestControlCreateCard.vue'
import LoadSpinner from '@/components/ui/LoadSpinner.vue'

const { testList, getAllContent, loading } = useTest()

onMounted(async () => {
  if (!testList.value.length) await getAllContent()
})
</script>

<style lang="scss" scoped>
.test-control {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  color: black;
  margin-top: 10px;
  padding: 1rem 2rem;
  overflow-x: hidden;

  .tests {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 2rem;
  }
}
</style>
@/modules/tests/composables/useTest
