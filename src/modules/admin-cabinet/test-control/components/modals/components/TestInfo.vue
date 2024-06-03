<template>
  <p-panel header="Вопросы и ответы" toggleable>
    <template v-for="condition in changeTestConditions" as="div">
      <template v-if="condition.position === 'test'">
        <template v-for="(question, Qindex) in test.questions">
          <p-panel :header="`${Qindex + 1}. ${test['questions'][Qindex].text}`" toggleable collapsed>
            <div class="contain">
              <div class="condition">
                <span class="label">Текст вопроса:</span>
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
            <template v-for="(_, Rindex) in question.answers">
              <span class="number">Ответ №{{ Rindex + 1 }}</span>
              <div class="contain-horizontal">
                <template v-for="questionCondition in condition.fields">
                  <template v-for="resultCondition in questionCondition.fields">
                    <div class="condition-body">
                      <span class="label">{{ resultCondition.localization }}:</span>
                      <div class="condition-content">
                        <template v-if="resultCondition.type === 'textarea'">
                          <p-text-area
                            v-model="test['questions'][Qindex]['answers'][Rindex][resultCondition.field]"
                            type="text"
                            :class="{
                              'p-invalid': !isValidData(
                                test['questions'][Qindex]['answers']?.[Rindex]?.[resultCondition.field],
                              ),
                            }"
                            class="input"
                            rows="1"
                            cols="30"
                            autoResize
                          />
                        </template>
                        <template v-else-if="resultCondition.type === 'number'">
                          <p-input-number
                            v-model="test['questions'][Qindex]['answers'][Rindex][resultCondition.field]"
                            :class="{
                              'p-invalid': !isValidData(
                                test['questions'][Qindex]['answers'][Rindex][resultCondition.field],
                              ),
                            }"
                            class="input"
                          />
                        </template>
                        <template
                          v-if="!isValidData(test['questions'][Qindex]['answers']?.[Rindex]?.[resultCondition.field])"
                        >
                          <small class="error-message">{{ resultCondition.validate }}</small>
                        </template>
                      </div>
                    </div>
                  </template>
                </template>
                <div class="delete-block">
                  <p-button
                    icon="pi pi-trash"
                    @click="deleteAnswer(Qindex, Rindex)"
                    class="p-button-text delete-icon"
                  />
                </div>
              </div>
            </template>
            <div class="create-block-button">
              <p-button
                label="Добавить ответ"
                severity="normal"
                icon="pi pi-plus"
                @click="addAnswer(Qindex)"
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
          </p-panel>
        </template>
      </template>
    </template>
    <div class="create-block-button">
      <p-button label="Добавить вопрос" icon="pi pi-plus" @click="addQuestion" class="p-button-text" />
    </div>
  </p-panel>
</template>

<script setup lang="ts">
import PInputNumber from 'primevue/inputnumber'
import PPanel from 'primevue/panel'
import PTextArea from 'primevue/textarea'
import PButton from 'primevue/button'

import { useChangeTest } from '@/modules/admin-cabinet/test-control/composables/useChangeTest'

const { changeTestConditions, test, isValidData, deleteAnswer, addAnswer, deleteQuestion, addQuestion } =
  useChangeTest()
</script>

<style lang="scss" src="@/modules/admin-cabinet/test-control/styles/test-control.scss" scoped />
