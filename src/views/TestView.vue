<template>
  <template v-if="loading.currentTest">
    <LoadSpinner />
  </template>

  <template v-else>
    <section class="test">
      <!-- just an info -->
      <div class="info">
        <span class="about-test"> Психологический тест: </span>
        <span class="naming">
          <strong>"{{ selectedTest?.name }}"</strong>
        </span>
      </div>

      <!-- question block -->
      <div class="queston">
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

const { selectedTest, getContentById } = useTest()
const { currentIndex, clearTestAnswers, nextQuestion, prevQuestion, isTestCompleted, loading, completeTest } = useCurrentTest()
const router = useRouter()

onMounted(async () => {
  if (!selectedTest.value) {
    await getContentById(router.currentRoute.value.params.id as string)
  }
})
</script>

<style lang="scss" scoped>
.test {
  height: 100vh;
  margin-top: 100px;
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  color: black;

  .info {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    height: 10vh;
    flex-direction: column;
    text-align: center;
    .about-test {
      font-size: 1rem;
      font-weight: bold;
      text-align: center;
    }
    .naming {
      font-size: 1.2rem;
      color: #ffc107;
    }
  }

  .queston {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 45vh;
  }

  .control {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    flex-direction: column;
    gap: 10px;
    height: 30vh;

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
      .yes {
        background-color: #4caf50;
      }

      .sometimes {
        background-color: #ffc107;
      }

      .no {
        background-color: #f44336;
      }
    }

    .actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 50%;

      .counter {
        font-size: 1.2rem;
      }
    }
  }
}
</style>
