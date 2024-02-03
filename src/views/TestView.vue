<template>
  <template v-if="testLoading.test">
    <LoadSpinner />
  </template>

  <template v-else>
    <section class="test">
      <!-- just an info -->
      <img :src="selectedTest?.image" class="test-image" />
      <div class="info">
        <span class="about-test"> Психологический тест: </span>
        <span class="naming">
          <strong>"{{ selectedTest?.name }}"</strong>
        </span>
      </div>

      <!-- question block -->
      <div class="test-request">
        <div class="queston" v-if="selectedTest?.questions[currentIndex]">
          <QuestionCard :question="selectedTest?.questions[currentIndex]" />
        </div>

        <!-- control block -->
        <template v-if="!isTestCompleted">
          <div class="control">
            <div class="answers">
              <template v-if="selectedTest?.questions[currentIndex]?.answers">
                <template v-for="answer in selectedTest?.questions[currentIndex]?.answers" :key="answer.id">
                  <p-button :label="answer.text" class="control-button" @click="nextQuestion(answer)" />
                </template>
              </template>
            </div>
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
            <p-button label="Посмотреть результаты" class="control-button" @click="completeTest" />
          </div>
        </template>
      </div>
    </section>
  </template>
</template>

<script setup lang="ts">
import { useTest } from '../composables/useTest'
import QuestionCard from '../components/QuestionCard.vue'
import { onMounted } from 'vue'
import PButton from 'primevue/button'
import { useRouter } from 'vue-router'
import { useCurrentTest } from '../composables/useCurrentTest'
import LoadSpinner from '../components/LoadSpinner.vue'

const { selectedTest, getContentById, loading: testLoading } = useTest()
const { currentIndex, clearTestAnswers, nextQuestion, prevQuestion, isTestCompleted, completeTest } = useCurrentTest()
const router = useRouter()

onMounted(async () => {
  if (!selectedTest.value) {
    await getContentById(router.currentRoute.value.params.id as string)
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
    width: 100%;
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

    .answers {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      gap: 10px;
      padding: 0 20px;
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
</style>
