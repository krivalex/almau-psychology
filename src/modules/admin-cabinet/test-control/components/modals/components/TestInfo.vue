<template>
  <p-panel header="Вопросы и ответы" toggleable>
    <template v-for="condition in changeTestConditions" as="div">
      <template v-if="condition.position === 'test'">
        <template v-for="(question, Qindex) in test.questions">
          <p-panel :header="`${Qindex + 1}. ${test['questions'][Qindex].text}`" toggleable collapsed>
            <div class="contain">
              <div class="condition">
                <span class="label small">Текст вопроса:</span>
                <div class="condition-body">
                  <p-text-area
                    v-model="test['questions'][Qindex].text"
                    class="input"
                    rows="3"
                    cols="30"
                    type="text"
                    :class="{ 'p-invalid': !isValidData(test['questions'][Qindex].text) }"
                  />
                  <template v-if="!isValidData(test['questions'][Qindex].text)">
                    <small class="error-message">{{ condition.validate }}</small>
                  </template>
                </div>
              </div>
            </div>

            <AnswersInfo :answers="question.answers" :condition="condition" :Qindex="Qindex" />

            <div class="create-block-button beetween">
              <span class="type"
                >Тип вопроса: <strong>{{ getAnswerType(test['questions'][Qindex].answerType) }}</strong></span
              >
              <div class="buttons">
                <p-button
                  label="Добавить ответ"
                  severity="normal"
                  icon="pi pi-plus"
                  @click="addAnswer(Qindex)"
                  :disabled="isShowAddAnswerButton(test['questions'][Qindex])"
                  class="p-button-text"
                />
                <p-button
                  label="Удалить вопрос"
                  severity="danger"
                  icon="pi pi-trash"
                  @click="deleteQuestion(Qindex)"
                  class="p-button-text"
                />
              </div>
            </div>
          </p-panel>
        </template>
      </template>
    </template>
    <div class="create-block-button">
      <p-button
        label="Добавить вопрос"
        icon="pi pi-plus"
        :disabled="!newAnswerType"
        @click="addQuestion"
        class="p-button-text"
      />
      <p-dropdown
        class="select-answer-type"
        v-model="newAnswerType"
        :options="answersTypes"
        optionLabel="label"
        optionValue="value"
        :showClear="true"
      />
    </div>
  </p-panel>
</template>

<script setup lang="ts">
import PPanel from 'primevue/panel'
import PTextArea from 'primevue/textarea'
import PButton from 'primevue/button'
import PDropdown from 'primevue/dropdown'

import AnswersInfo from '@admin/test-control/components/modals/components/AnswersInfo.vue'
import { answersTypes, getAnswerType } from '@/utils'
import { useChangeTest } from '@admin/test-control/composables/useChangeTest'

const {
  changeTestConditions,
  test,
  isValidData,
  addAnswer,
  deleteQuestion,
  addQuestion,
  newAnswerType,
  isShowAddAnswerButton,
} = useChangeTest()
</script>

<style lang="scss" src="@admin/test-control/styles/test-control.scss" scoped />
