<template>
  <section class="test-change-modal">
    <div class="test-block">
      <div class="control-test">
        <base-info />
        <test-info />
        <result-info />
      </div>

      <div class="preview-test">
        <control-test-preview-test />
      </div>
    </div>

    <div class="actions">
      <div class="adds">
        <p-button
          label="Опубликовать"
          icon="pi pi-eye"
          class="save-button"
          @click="onPublishTest"
          :disabled="isDisabled"
        />

        <p-button
          severity="secondary"
          label="Сохранить"
          icon="pi pi-save"
          class="save-button"
          @click="onSaveTestToDraft"
        />
      </div>
      <div class="dels">
        <p-button
          severity="danger"
          label="Удалить"
          icon="pi pi-trash"
          class="save-button"
          @click="onDeleteTestFromDraft"
        />
      </div>
    </div>
    <small v-if="isDisabled" style="padding-bottom: 1rem" class="error-message">{{ validateMessage }}</small>
  </section>
</template>

<script setup lang="ts">
import BaseInfo from './components/BaseInfo.vue'
import ResultInfo from './components/ResultInfo.vue'
import TestInfo from './components/TestInfo.vue'
import ControlTestPreviewTest from '@admin/test-control/components/modals/ControlTestPreviewTest.vue'
import PButton from 'primevue/button'

import { useChangeTest } from '@admin/test-control/composables/useChangeTest'
import { useTest } from '@test/composables/useTest'
import { success } from '@/utils/toast'
import { useConfirm } from 'primevue/useconfirm'
import { ref, watch } from 'vue'
import { validators } from '@/utils'

const { getConditions, test } = useChangeTest()
const { addContent, newTest, deleteTest, updateTest, getAllContent } = useTest()
const confirm = useConfirm()

const isDisabled = ref(true)
const validateMessage = ref('Сделайте любое действие, чтобы запустить валидацию')

watch(
  () => test.value,
  () => {
    const { valid, options } = getConditions()

    if (options.isValid) validateMessage.value = validators.requiredMsg
    if (!options.isTwoResult) validateMessage.value = validators.minTwoResults
    if (!options.isFiveQuestion) validateMessage.value = validators.minFiveQuestions
    if (!options.isAllQuestionsHasTwoMoreAnswers) validateMessage.value = validators.minTwoAnswers
    if (!options.secondLayerResult) validateMessage.value = validators.resultMsg
    if (!options.secondLayerAdditional) validateMessage.value = validators.resultMinMaxMag

    isDisabled.value = valid
  },
  { deep: true },
)

async function onPublishTest() {
  confirm.require({
    message: `Все студенты смогут начать проходить этот тест`,
    header: `Вы уверены, что хотите опубликовать тест "${test.value.name}" для всех студентов?`,
    icon: 'pi pi-exclamation-triangle',
    accept: async () => await publishTest(),
    reject: () => {},
    acceptLabel: 'Да, опубликовать тест',
    rejectLabel: 'Отмена',
    acceptClass: 'p-button-danger',
    rejectClass: 'p-button-secondary',
  })
}

async function onDeleteTestFromDraft() {
  confirm.require({
    message: `Если тест уже существует, то он исчезнет у студентов`,
    header: `Вы уверены, что хотите удалить тест "${test.value.name}"?`,
    icon: 'pi pi-exclamation-triangle',
    accept: async () => await deleteTestFromDraft(),
    reject: () => {},
    acceptLabel: 'Да, удалить тест',
    rejectLabel: 'Отмена',
    acceptClass: 'p-button-danger',
    rejectClass: 'p-button-secondary',
  })
}

async function onSaveTestToDraft() {
  confirm.require({
    message: `Если тест уже существует, то он исчезнет у студентов, и сохранится у вас в черновиках`,
    header: `Вы уверены, что хотите сохранить тест "${test.value.name}" как черновик?`,
    icon: 'pi pi-exclamation-triangle',
    accept: async () => await saveTestToDraft(),
    reject: () => {},
    acceptLabel: 'Да, сохранить тест',
    rejectLabel: 'Отмена',
    acceptClass: 'p-button-danger',
    rejectClass: 'p-button-secondary',
  })
}

async function publishTest() {
  test.value.visible = true
  await updateTest(test.value)
  await getAllContent()
  success('Управление тестами', 'Тест успешно опубликован')
}

async function deleteTestFromDraft() {
  await deleteTest(test.value)
  await getAllContent()
  success('Управление тестами', 'Тест успешно удален из ЧЕРНОВИКОВ')
}

async function saveTestToDraft() {
  newTest.value = {
    ...newTest.value,
    ...test.value,
  }
  await addContent()
  await getAllContent()
  success('Управление тестами', 'Тест успешно сохранен как ЧЕРНОВИК')
}
</script>

<style lang="scss" src="@admin/test-control/styles/test-control.scss" scoped />
@/modules/tests/composables/useTest
