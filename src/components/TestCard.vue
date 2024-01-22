<template>
  <div class="test-card">
    <p-card>
      <template #header>
        <img class="preview-image" :src="test.image" alt="test image" />
        <div class="preview-content">
          <h3>{{ test.name }}</h3>
          <p-divider />
        </div>
      </template>
      <template #content>
        <p class="desc">{{ test.description }}</p>
      </template>
      <template #footer>
        <div class="start-test-contol">
          <template v-if="user">
            <p-button label="Начать тест" class="contol-button" @click="enjoyTest" />
          </template>
          <template v-else>
            <p-button label="Войти" class="contol-button" @click="googleRegister" />
          </template>
        </div>
        <span class="author">{{ test.author }}</span>
        <span class="time">
          <i class="pi pi-clock" />
          {{ test.timeToComplete }}
        </span>
      </template>
    </p-card>
  </div>
</template>

<script setup lang="ts">
import PCard from 'primevue/card'
import PButton from 'primevue/button'
import PDivider from 'primevue/divider'
import { defineProps } from 'vue'
import { Test } from '../interfaces'
import { useUser } from '../composables/useUser'
import { useTest } from '../composables/useTest'
import { useRouter } from 'vue-router'

const router = useRouter()

const { user, googleRegister } = useUser()
const { selectedTest } = useTest()

function enjoyTest() {
  selectedTest.value = props.test
  router.push(`/test/${props.test.id}`)
}

const props = defineProps<{
  test: Test
}>()
</script>

<style lang="scss" scoped>
.test-card {
  position: relative;
  max-width: 90vw;
  border-radius: 30px;

  .desc {
    padding: 0;
    margin-block-start: 0em;
    margin-block-end: 0em;
    text-align: center;
  }

  .author {
    position: absolute;
    bottom: 5px;
    right: 7px;
    font-size: 0.8rem;
    color: #ccc;
  }

  .preview-image {
    width: 100%;
    max-width: inherit;
    height: 150px;
    object-fit: cover;
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
  }

  .preview-content {
    text-align: center;

    h3 {
      padding: 5px 15px;
      margin-block-start: 0em;
      margin-block-end: 0em;
      font-size: 1.8rem;
    }
  }

  .start-test-contol {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    width: inherit;
    .contol-button {
      width: 180px;
    }
  }

  .time {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 7px;
    position: absolute;
    bottom: 5px;
    left: 7px;
    font-size: 0.8rem;
    color: #ccc;
  }
}

:deep(.p-card .p-card-content) {
  padding: 0 10px;
}
</style>
