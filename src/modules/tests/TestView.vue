<template>
  <template v-if="testLoading.test">
    <LoadSpinner />
  </template>

  <template v-else>
    <section class="test">
      <!-- just an info -->
      <img :src="selectedTest?.image" class="test-image" @error="onImageError" />
      <div class="info">
        <span class="about-test"> Психологический тест: </span>
        <span class="naming">
          <strong>"{{ selectedTest?.name }}"</strong>
        </span>
      </div>

      <!-- question block -->
      <div class="test-request">
        <div class="queston" v-if="selectedTest?.questions[currentIndex]">
          <question-block :question="selectedTest?.questions[currentIndex]" />
        </div>

        <!-- control block -->
        <template v-if="!isTestCompleted">
          <div class="control">
            <answers-block />
            <div class="actions">
              <p-button icon="pi pi-arrow-left" class="action-button" @click="prevQuestion" />
              <div class="counter">{{ currentIndex + 1 }} / {{ selectedTest?.questions.length }}</div>
              <p-button icon="pi pi-refresh" class="action-button" @click="clearTestAnswers" />
            </div>
          </div>
        </template>

        <!-- result block -->
        <template v-else>
          <div>
            <p-button
              label="Посмотреть результаты"
              class="control-button"
              @click="completeTest(!!props?.previewTest)"
            />
          </div>
        </template>
      </div>
    </section>
  </template>
</template>

<script setup lang="ts">
import PButton from 'primevue/button'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import QuestionBlock from '@test/components/QuestionBlock.vue'
import AnswersBlock from '@test/components/AnswersBlock.vue'
import LoadSpinner from '@/components/ui/LoadSpinner.vue'

import { onImageError } from '@/utils'
import { Test } from '@/interfaces'
import { useCurrentTest } from '@test/composables/useCurrentTest'
import { useTest } from '@test/composables/useTest'

const { selectedTest, getContentById, loading: testLoading } = useTest()
const { currentIndex, clearTestAnswers, prevQuestion, isTestCompleted, completeTest } = useCurrentTest()
const router = useRouter()

const props = defineProps<{
  previewTest?: Test
}>()

onMounted(async () => {
  if (props.previewTest) {
    selectedTest.value = props.previewTest
    return
  }

  if (!selectedTest.value) {
    await getContentById(router.currentRoute.value.params.id as string)
    if (!selectedTest.value) {
      router.push('/')
    }
  }
})
</script>

<style lang="scss" scoped>
.test {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: black;
  position: relative;

  .test-request {
    height: 67vh;
    width: 95%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
  }

  .test-image {
    width: 100%;
    height: 18vh;
    object-fit: cover;
    position: relative;
  }

  .info {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    position: absolute;
    top: 0;
    transform: translateY(60%);
    background-color: rgba(255, 255, 255, 0.75);
    left: 0;
    right: 0;
    padding: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    text-shadow: 0 0 5px rgba(255, 255, 255, 1);

    .about-test {
      font-size: 0.8rem;
      font-weight: bold;
      text-align: center;
    }
    .naming {
      font-size: 1.1rem;
    }
  }

  .queston {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0;
    padding: 10px;
    height: 30vh;
  }

  .control {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;

    .control-button {
      width: 100%;
      height: 100%;
      font-size: 1.2rem;
      text-align: center;
    }

    .actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 50%;

      .counter {
        font-size: 1.4rem;
        font-weight: 500;
      }
    }
  }
}

.clicked {
  opacity: 0.5;
  animation: clicked 0.5s;
}

.animation-question-text {
  color: #10b981;
  animation: clicked 0.5s;
}

@keyframes clicked {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
