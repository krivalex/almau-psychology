<template>
  <p-panel header="Результаты" toggleable>
    <template v-for="condition in changeTestConditions" as="div">
      <template v-if="condition.position === 'result'">
        <template v-for="(_, RRindex) in values.results">
          <p-panel :header="`${RRindex + 1}. ${values['results'][RRindex].name}`" toggleable collapsed>
            <img :src="values['results'][RRindex]['image']" @error="onImageError" class="preview-image" />
            <template v-for="resultCondition in condition.fields">
              <div class="contain">
                <v-field v-slot="{ errorMessage }" :name="resultCondition.field">
                  <div class="condition">
                    <span class="label">{{ resultCondition.localization }}:</span>
                    <div class="condition-body">
                      <template v-if="resultCondition.type === 'input'">
                        <p-input-text
                          :model-value="values['results'][RRindex][resultCondition.field]"
                          type="text"
                          :class="{ 'p-invalid': errorMessage }"
                          @update:model-value="handleValue($event, { RRindex, field: resultCondition.field })"
                          class="input"
                        />
                      </template>
                      <template v-else-if="resultCondition.type === 'number'">
                        <p-input-number
                          :model-value="values['results'][RRindex][resultCondition.field]"
                          :class="{ 'p-invalid': errorMessage }"
                          @update:model-value="handleValue($event, { RRindex, field: resultCondition.field })"
                          class="input"
                        />
                      </template>
                      <template v-else-if="resultCondition.type === 'textarea'">
                        <p-text-area
                          :model-value="values['results'][RRindex][resultCondition.field]"
                          type="text"
                          :class="{ 'p-invalid': errorMessage }"
                          @update:model-value="handleValue($event, { RRindex, field: resultCondition.field })"
                          class="input"
                          rows="7"
                          cols="30"
                          autoResize
                        />
                      </template>
                      <template v-else-if="resultCondition.type === 'file'">
                        <p-file-upload
                          mode="basic"
                          :model-value="values['results'][RRindex][resultCondition.field]"
                          :class="{ 'p-invalid': errorMessage }"
                          @update:model-value="handleValue($event, { RRindex, field: resultCondition.field })"
                          class="input"
                        />
                      </template>
                      <small class="error-message">{{ errorMessage }}</small>
                    </div>
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
import PInputNumber from 'primevue/inputnumber'
import PTextArea from 'primevue/textarea'
import PFileUpload from 'primevue/fileupload'
import { onImageError } from '@/utils'

import { useChangeTest } from '@/modules/admin-cabinet/test-control/composables/useChangeTest'

const { changeTestConditions, values, test, setValues } = useChangeTest()

function handleValue(event: unknown, origin: { RRindex: number; field: string }) {
  test.value['results'][origin.RRindex][origin.field] = event
  setValues(test.value)
}
</script>

<style lang="scss" src="@/modules/admin-cabinet/test-control/styles/test-control.scss" scoped />
