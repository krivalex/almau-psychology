<template>
  <p-panel header="Базовая информация" toggleable>
    <img :src="test['image']" @error="onImageError" class="preview-image" />
    <template v-for="condition in changeTestConditions" as="div">
      <template v-if="condition.position === 'base'">
        <div class="contain">
          <div class="condition">
            <span class="label">{{ condition.localization }}:</span>
            <div class="condition-body">
              <template v-if="condition.type === 'input'">
                <p-input-text
                  v-model="test[condition.field]"
                  type="text"
                  :class="{ 'p-invalid': !isValidData(test[condition.field]) }"
                  class="input"
                />
              </template>
              <template v-else-if="condition.type === 'number'">
                <p-input-number
                  v-model="test[condition.field]"
                  :class="{ 'p-invalid': !isValidData(test[condition.field]) }"
                  class="input"
                />
              </template>
              <template v-else-if="condition.type === 'textarea'">
                <p-text-area
                  v-model="test[condition.field]"
                  type="text"
                  :class="{ 'p-invalid': !isValidData(test[condition.field]) }"
                  class="input"
                  rows="2"
                  cols="30"
                  autoResize
                />
              </template>
              <template v-else-if="condition.type === 'file'">
                <div class="input-file">
                  <p-input-text
                    v-model="test[condition.field]"
                    type="text"
                    :class="{ 'p-invalid': !isValidData(test[condition.field]) }"
                    class="input"
                  />
                </div>
              </template>
              <template v-if="!isValidData(test[condition.field])">
                <small class="error-message">{{ condition.validate }}</small>
              </template>
            </div>
          </div>
        </div>
      </template>
    </template>
  </p-panel>
</template>

<script setup lang="ts">
import PInputText from 'primevue/inputtext'
import PPanel from 'primevue/panel'
import PInputNumber from 'primevue/inputnumber'
import PTextArea from 'primevue/textarea'
import { onImageError } from '@/utils'

import { useChangeTest } from '@admin/test-control/composables/useChangeTest'

const { changeTestConditions, test, isValidData } = useChangeTest()
</script>

<style lang="scss" src="@admin/test-control/styles/test-control.scss" scoped />
