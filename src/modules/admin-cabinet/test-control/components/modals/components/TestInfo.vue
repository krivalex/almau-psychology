<template>
  <p-panel header="Вопросы и ответы" toggleable>
    <template v-for="condition in changeTestConditions" as="div">
      <template v-if="condition.position === 'test'">
        <template v-for="(question, Qindex) in values.questions">
          <p-panel :header="`${Qindex + 1}. ${values['questions'][Qindex].text}`" toggleable collapsed>
            <template v-for="(_, Rindex) in question.answers">
              <span class="number">Ответ №{{ Rindex + 1 }}</span>
              <template v-for="questionCondition in condition.fields">
                <template v-for="resultCondition in questionCondition.fields">
                  <div class="contain">
                    <v-field v-slot="{ handleChange, errorMessage }" :name="questionCondition.field">
                      <div class="condition">
                        <span class="label">{{ resultCondition.localization }}:</span>
                        <p-input-text
                          :value="values['questions'][Qindex]['answers']?.[Rindex]?.[resultCondition.field]"
                          type="text"
                          :class="{ 'p-invalid': errorMessage }"
                          @update:model-value="handleChange"
                          class="input"
                        />
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
import PInputText from 'primevue/inputtext'
import PPanel from 'primevue/panel'

import { useChangeTest } from '@/modules/admin-cabinet/test-control/composables/useChangeTest'

const { changeTestConditions, values } = useChangeTest()
</script>

<style lang="scss" src="@/modules/admin-cabinet/test-control/styles/test-control.scss" scoped />
