<template>
  <section class="test">
    <div class="info">
      <span class="about-test"> Психологический тест: </span>
      <span class="naming">
        <strong>"{{ selectedTest?.name }}"</strong>
      </span>
    </div>
    <div class="queston">
      <QuestionCard :question="selectedTest?.questions[currentIndex]" :index="currentIndex" :count="selectedTest?.questions.length" />
    </div>
    <div class="control" v-if="currentIndex !== selectedTest?.questions.length">
      <div class="answers">
        <p-button label="Да" class="control-button yes" @click="nextQuestion" />
        <p-button label="Иногда" class="control-button sometimes" @click="nextQuestion" />
        <p-button label="Нет" class="control-button no" @click="nextQuestion" />
      </div>
      <div class="actions">
        <p-button icon="pi pi-arrow-left" class="action-button" @click="prevQuestion" />
        <div class="counter">{{ currentIndex + 1 }} / {{ selectedTest?.questions.length }}</div>
        <p-button icon="pi pi-refresh" class="action-button" @click="clearTestAnswers" />
      </div>
    </div>
    <div v-else>
      <p-button label="Посмотреть результаты" class="control-button" @click="goToResultPage" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useTest } from '../composables/useTest'
import QuestionCard from '../components/QuestionCard.vue'
import { ref, onMounted } from 'vue'
import PButton from 'primevue/button'
import { useRouter } from 'vue-router'

const { selectedTest, getContentById } = useTest()
const router = useRouter()

onMounted(async () => {
  if (!selectedTest.value) {
    await getContentById(router.currentRoute.value.params.id as string)
  }
})

function goToResultPage() {
  router.push(`/result/${selectedTest.value?.firebaseId}`)
}

function clearTestAnswers() {
  currentIndex.value = 0
}

function nextQuestion() {
  if (selectedTest.value) {
    if (currentIndex.value < selectedTest.value?.questions.length) {
      currentIndex.value++
    }
  }
}

function prevQuestion() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const currentIndex = ref(0)
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

  .info {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    height: 10vh;
    flex-direction: column;
    .about-test {
      font-size: 1rem;
      font-weight: bold;
      color: white;
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
    }
  }
}
</style>
