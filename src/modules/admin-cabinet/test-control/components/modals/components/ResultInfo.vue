<template>
  <p-panel header="Результаты" toggleable>
    <template v-for="condition in changeTestConditions" as="div">
      <template v-if="condition.position === 'result'">
        <template v-for="(_, RRindex) in values.results">
          <p-panel :header="`${RRindex + 1}. ${values['results'][RRindex].name}`" toggleable collapsed>
            <template v-for="resultCondition in condition.fields">
              <div class="contain">
                <v-field v-slot="{ handleChange, errorMessage }" :name="resultCondition.field">
                  <div class="condition">
                    <span class="label">{{ resultCondition.localization }}:</span>
                    <p-input-text
                      :value="values['results'][RRindex][resultCondition.field]"
                      type="text"
                      :class="{ 'p-invalid': errorMessage }"
                      @update:model-value="handleChange"
                      class="input"
                    />
                  </div>
                </v-field>
              </div>
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
