<template>
  <div class="test-card">
    <p-card>
      <template #header>
        <div class="image-block">
          <img class="preview-image" :src="test.image" alt="test image" @error="onImageError" />
        </div>
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
          <template v-if="googleUser">
            <p-button label="Начать тест" class="contol-button" @click="enjoyTest" />
          </template>
          <template v-else>
            <login-button />
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
import LoginButton from '@/components/ui/LoginButton.vue'
import { defineProps } from 'vue'
import { Test } from '@/interfaces'
import { onImageError } from '@/utils'

import { useUser } from '@/composables/useUser'
import { useTest } from '@test/composables/useTest'
import { useRedirect } from '@/composables/useRedirect'

const { goToTest } = useRedirect()
const { googleUser } = useUser()
const { selectedTest } = useTest()

function enjoyTest() {
  selectedTest.value = props.test
  goToTest(props.test.id as string)
}

const props = defineProps<{
  test: Test
}>()
</script>

<style lang="scss" scoped>
.test-card {
  position: relative;
  width: 90vw;
  max-width: 400px;
  max-height: 440px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border-top-left-radius: 30px !important;
  border-top-right-radius: 30px !important;

  :deep(.p-card) {
    border-radius: 10px;
    border-top-left-radius: 30px !important;
    border-top-right-radius: 30px !important;
  }

  :deep(.p-card-footer) {
    padding: 0;
    position: relative;
  }

  :deep(.p-card-body) {
    padding-bottom: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.2rem;
  }

  .desc {
    padding: 0;
    margin-block-start: 0em;
    margin-block-end: 0em;
    text-align: start;
    word-wrap: break-word;
    hyphens: auto;
  }

  .author {
    position: absolute;
    bottom: -23px;
    right: 0px;
    font-size: 0.8rem;
    color: #ccc;
  }

  .time {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 7px;
    position: absolute;
    bottom: -23px;
    left: 10px;
    font-size: 0.8rem;
    color: #ccc;
  }

  .image-block {
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    width: 100%;
    max-width: inherit;
    height: 150px;

    .preview-image {
      width: 100%;
      max-width: inherit;
      height: 150px;
      object-fit: cover;
      border-top-right-radius: 30px;
      border-top-left-radius: 30px;
    }
  }

  .preview-content {
    text-align: center;
    overflow: hidden;
    max-height: 5.25em;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;

    h3 {
      padding: 5px 15px;
      margin-block-start: 0em;
      margin-block-end: 0em;
      font-size: 1.45rem;
    }
  }

  .start-test-contol {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    margin-top: 10px;
    width: inherit;
    .contol-button {
      width: 180px;
    }
  }
}

:deep(.p-card .p-card-content) {
  padding: 0 3px;
}
</style>
