<template>
  <p-panel header="Базовая информация" toggleable>
    <img :src="values['image']" @error="onImageError" class="preview-image" />
    <template v-for="condition in changeTestConditions" as="div">
      <template v-if="condition.position === 'base'">
        <div class="contain">
          <v-field v-slot="{ handleChange, errorMessage }" :name="condition.field">
            <div class="condition">
              <span class="label">{{ condition.localization }}:</span>
              <div class="condition-body">
                <template v-if="condition.type === 'input'">
                  <p-input-text
                    :model-value="values[condition.field]"
                    type="text"
                    :class="{ 'p-invalid': errorMessage }"
                    @update:model-value="handleChange"
                    class="input"
                  />
                </template>
                <template v-else-if="condition.type === 'number'">
                  <p-input-number
                    :model-value="values[condition.field]"
                    :class="{ 'p-invalid': errorMessage }"
                    @update:model-value="handleChange"
                    class="input"
                  />
                </template>
                <template v-else-if="condition.type === 'textarea'">
                  <p-text-area
                    :model-value="values[condition.field]"
                    type="text"
                    :class="{ 'p-invalid': errorMessage }"
                    @update:model-value="handleChange"
                    class="input"
                    rows="2"
                    cols="30"
                    autoResize
                  />
                </template>
                <template v-else-if="condition.type === 'file'">
                  <p-file-upload
                    mode="basic"
                    :model-value="values[condition.field]"
                    :class="{ 'p-invalid': errorMessage }"
                    @update:model-value="handleChange"
                    class="input"
                  />
                </template>
                <small class="error-message">{{ errorMessage }}</small>
              </div>
            </div>
          </v-field>
        </div>
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

const { changeTestConditions, values } = useChangeTest()
</script>

<style lang="scss" src="@/modules/admin-cabinet/test-control/styles/test-control.scss" scoped />
