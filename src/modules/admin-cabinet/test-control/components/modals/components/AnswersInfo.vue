<template>
  <template v-for="(_, Rindex) in answers">
    <template v-if="isOpenQuestion">
      <span class="number">Ответ: <strong>Студенты увидят свободное поле для заполнения ответа</strong></span>
    </template>
    <template v-else>
      <span class="number">Ответ №{{ Rindex + 1 }}</span>
    </template>

    <div class="contain-horizontal">
      <template v-for="questionCondition in condition.fields">
        <template v-for="answerCondition in questionCondition.fields">
          <div class="condition-body">
            <template v-if="!isOpenQuestion">
              <span class="label">{{ answerCondition.localization }}:</span>
              <div class="condition-content">
                <template v-if="answerCondition.type === 'textarea'">
                  <p-text-area
                    v-model="test['questions'][Qindex]['answers'][Rindex][answerCondition.field]"
                    type="text"
                    :class="{
                      'p-invalid': !isValidData(
                        test['questions'][Qindex]['answers']?.[Rindex]?.[answerCondition.field],
                      ),
                    }"
                    class="input"
                    rows="1"
                    cols="30"
                    autoResize
                  />
                </template>
                <template v-else-if="answerCondition.type === 'number'">
                  <p-input-number
                    v-model="test['questions'][Qindex]['answers'][Rindex][answerCondition.field]"
                    :class="{
                      'p-invalid': !isValidData(test['questions'][Qindex]['answers'][Rindex][answerCondition.field]),
                    }"
                    class="input"
                  />
                </template>

                <!-- error-handle -->
                <template v-if="!isValidData(test['questions'][Qindex]['answers']?.[Rindex]?.[answerCondition.field])">
                  <small class="error-message">{{ answerCondition.validate }}</small>
                </template>
              </div>
            </template>
          </div>
        </template>
      </template>
      <template v-if="!isOpenQuestion">
        <div class="delete-block">
          <p-button icon="pi pi-trash" @click="deleteAnswer(Qindex, Rindex)" class="p-button-text delete-icon" />
        </div>
      </template>
    </div>
  </template>
</template>

<script setup lang="ts">
import PButton from 'primevue/button'
import PTextArea from 'primevue/textarea'
import PInputNumber from 'primevue/inputnumber'
import { ref, defineProps } from 'vue'

import { Answer, ConrolTestCondition } from '@/interfaces'
import { useChangeTest } from '@admin/test-control/composables/useChangeTest'

const props = defineProps<{
  answers: Answer[]
  condition: ConrolTestCondition
  Qindex: number
}>()

const { test, isValidData, deleteAnswer } = useChangeTest()

const isOpenQuestion = ref(test.value['questions'][props.Qindex].answerType === 'open')
</script>

<style lang="scss" src="@admin/test-control/styles/test-control.scss" scoped />
