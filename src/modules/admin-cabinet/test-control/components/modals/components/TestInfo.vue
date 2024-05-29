<template>
  <p-panel header="Вопросы и ответы" toggleable>
    <template v-for="condition in changeTestConditions" as="div">
      <template v-if="condition.position === 'test'">
        <template v-for="(question, Qindex) in values.questions">
          <p-panel :header="`${Qindex + 1}. ${values['questions'][Qindex].text}`" toggleable collapsed>
            <div class="contain">
              <v-field v-slot="{ errorMessage }" :name="`text`">
                <div class="condition">
                  <span class="label">Текст вопроса:</span>
                  <div class="condition-body">
                    <p-text-area
                      :model-value="values['questions'][Qindex].text"
                      class="input"
                      rows="3"
                      cols="30"
                      type="text"
                      :class="{ 'p-invalid': errorMessage }"
                      @update:model-value="handleTextValue($event, { Qindex })"
                    />
                    <small class="error-message">{{ errorMessage }}</small>
                  </div>
                </div>
              </v-field>
            </div>
            <template v-for="(_, Rindex) in question.answers">
              <span class="number">Ответ №{{ Rindex + 1 }}</span>
              <template v-for="questionCondition in condition.fields">
                <template v-for="resultCondition in questionCondition.fields">
                  <div class="contain">
                    <v-field v-slot="{ errorMessage }" :name="resultCondition.field">
                      <div class="condition">
                        <div class="condition-body">
                          <span class="label">{{ resultCondition.localization }}:</span>
                          <template v-if="resultCondition.type === 'textarea'">
                            <p-text-area
                              :model-value="values['questions'][Qindex]['answers']?.[Rindex]?.[resultCondition.field]"
                              type="text"
                              :class="{ 'p-invalid': errorMessage }"
                              @update:model-value="
                                handleValue($event, { Qindex, Rindex, field: resultCondition.field })
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
                                handleValue($event, { Qindex, Rindex, field: resultCondition.field })
                              "
                            />
                          </template>
                          <small class="error-message">{{ errorMessage }}</small>
                        </div>
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

const { changeTestConditions, values, test, setValues } = useChangeTest()

function handleTextValue(event: unknown, origin: { Qindex: number }) {
  test.value['questions'][origin.Qindex].text = event
  setValues(test.value)
}

function handleValue(event: unknown, origin: { Qindex: number; Rindex: number; field: string }) {
  test.value['questions'][origin.Qindex]['answers'][origin.Rindex][origin.field] = event
  setValues(test.value)
}
</script>

<style lang="scss" src="@/modules/admin-cabinet/test-control/styles/test-control.scss" scoped />
