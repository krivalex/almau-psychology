<template>
  <template v-if="loading.test">
    <LoadSpinner />
  </template>
  <template v-else>
    <section class="result-page">
      <img class="result" :src="currentResult?.image" @error="onImageError" />
      <h1 class="title">{{ currentResult?.name }}</h1>
      <p class="description">{{ currentResult?.description }}</p>
      <!-- <p-button label="Записаться на консультацию" class="control-button" @click="goToWhatsapp" /> -->
      <p-button class="another-test-button" label="Пройти еще один тест" icon="pi pi-arrow-top" @click="goToMain" />
    </section>
  </template>
</template>

<script setup lang="ts">
import PButton from 'primevue/button'
import LoadSpinner from '@/components/ui/LoadSpinner.vue'
import { onMounted } from 'vue'
import { onImageError } from '@/utils'

import { useCurrentTest } from '@test/composables/useCurrentTest'
import { useTest } from '@test/composables/useTest'
import { useRedirect } from '@/composables/useRedirect'
import { Test } from '@/interfaces'

const { selectedTest, getContentById, loading } = useTest()
const { currentResult, calculateResult } = useCurrentTest()
const { currentParamsID, goToMain } = useRedirect()

const props = defineProps<{
  previewTest?: Test
}>()

onMounted(async () => {
  if (props.previewTest) {
    selectedTest.value = props.previewTest
    calculateResult()
    return
  }

  if (!selectedTest.value?.id) {
    await getContentById(currentParamsID.value)
    calculateResult()
  }
})
</script>

<style lang="scss" scoped>
.result-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  color: black;

  .result {
    height: 120vh;
    width: 100%;
    object-fit: cover;
  }

  .title {
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 1rem;
    position: absolute;
    top: 0;
    padding: 20px;
    text-align: center;
    text-shadow: 0 0 10px black;
    color: white;
  }

  .description {
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 1rem;
    text-align: center;
    position: absolute;
    top: 40%;
    padding: 20px;
    text-align: center;
    color: black;
    background-color: white;
    margin: 0 20px;
    box-shadow: 0 0 5px black;
  }

  .control-button {
    position: absolute;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    width: 220px;
    font-size: 0.8rem;
    font-weight: 500;
    background-color: #ffc107;
    color: #000;
  }

  .another-test-button {
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    width: 220px;
    font-size: 0.8rem;
    font-weight: 500;
    background-color: #fff;
    color: #000;
  }
}
</style>
@/modules/tests/composables/useTest @/modules/tests/composables/useCurrentTest
