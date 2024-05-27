<template>
  <p-panel header="Вопросы и ответы" toggleable>
    <template v-for="condition in changeTestConditions" as="div">
      <template v-if="condition.position === 'test'">
        <template v-for="(question, Qindex) in values.questions">
          <p-panel :header="`${Qindex + 1}. ${values['questions'][Qindex].text}`" toggleable collapsed>
            <div class="question-change">
              <span class="label">Текст вопроса:</span>
              <p-text-area v-model="values['questions'][Qindex].text" type="text" text />
            </div>
            <template v-for="(_, Rindex) in question.answers">
              <span class="number">Ответ №{{ Rindex + 1 }}</span>
              <template v-for="questionCondition in condition.fields">
                <template v-for="resultCondition in questionCondition.fields">
                  <div class="contain">
                    <v-field v-slot="{ handleChange, errorMessage, value }" :name="questionCondition.field">
                      <div class="condition">
                        <span class="label">{{ resultCondition.localization }}:</span>
                        {{ value ?? '123s' }}
                        <template v-if="resultCondition.type === 'textarea'">
                          <p-text-area
                            :model-value="values['questions'][Qindex]['answers']?.[Rindex]?.[resultCondition.field]"
                            type="text"
                            :class="{ 'p-invalid': errorMessage }"
                            @update:model-value="
                              event => {
                                values['questions'][Qindex]['answers'][Rindex][resultCondition.field] = event
                              }
                            "
                            class="input"
                            rows="1"
                            cols="30"
                            autoResize
                          />
                        </template>
                        <template v-else-if="resultCondition.type === 'number'">
                          <p-input-number
                            :model-value="values['questions'][Qindex]['answers']?.[Rindex]?.[resultCondition.field]"
                            :class="{ 'p-invalid': errorMessage }"
                            class="input"
                            @update:model-value="
                              handleChange(values['questions'][Qindex]['answers']?.[Rindex]?.[resultCondition.field])
                            "
                          />
                        </template>
                      </div>
                    </v-field>
                  </div>
                </template>
              </template>
            </template>
          </p-panel>
        </template>
      </template>
    </template>
  </p-panel>
</template>

<script setup lang="ts">
import { Field as VField } from 'vee-validate'
import PInputNumber from 'primevue/inputnumber'
import PPanel from 'primevue/panel'
import PTextArea from 'primevue/textarea'

import { useChangeTest } from '@/modules/admin-cabinet/test-control/composables/useChangeTest'

const { changeTestConditions, values } = useChangeTest()

console.log(values)
</script>

<style lang="scss" src="@/modules/admin-cabinet/test-control/styles/test-control.scss" scoped />
