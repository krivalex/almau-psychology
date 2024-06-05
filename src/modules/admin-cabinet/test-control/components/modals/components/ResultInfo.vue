<template>
  <p-panel header="Результаты" toggleable>
    <template v-for="condition in changeTestConditions" as="div">
      <template v-if="condition.position === 'result'">
        <template v-for="(_, RRindex) in test.results">
          <p-panel :header="`${RRindex + 1}. ${test['results'][RRindex].name}`" toggleable collapsed>
            <img :src="test['results'][RRindex]['image']" @error="onImageError" class="preview-image" />
            <template v-for="resultCondition in condition.fields">
              <div class="contain">
                <div class="condition">
                  <span class="label">{{ resultCondition.localization }}:</span>
                  <div class="condition-body">
                    <template v-if="resultCondition.type === 'input'">
                      <p-input-text
                        v-model="test['results'][RRindex][resultCondition.field]"
                        type="text"
                        :class="{ 'p-invalid': !isValidData(test['results'][RRindex][resultCondition.field]) }"
                        class="input"
                      />
                    </template>
                    <template v-else-if="resultCondition.type === 'number'">
                      <p-input-number
                        v-model="test['results'][RRindex][resultCondition.field]"
                        :class="{ 'p-invalid': !isValidData(test['results'][RRindex][resultCondition.field]) }"
                        class="input"
                      />
                    </template>
                    <template v-else-if="resultCondition.type === 'textarea'">
                      <p-text-area
                        v-model="test['results'][RRindex][resultCondition.field]"
                        type="text"
                        :class="{ 'p-invalid': !isValidData(test['results'][RRindex][resultCondition.field]) }"
                        class="input"
                        rows="7"
                        cols="30"
                        autoResize
                      />
                    </template>
                    <template v-else-if="resultCondition.type === 'file'">
                      <div class="input-file">
                        <p-input-text
                          v-model="test['results'][RRindex][resultCondition.field]"
                          type="text"
                          :class="{ 'p-invalid': !isValidData(test['results'][RRindex][resultCondition.field]) }"
                          class="input"
                        />
                      </div>
                    </template>
                    <template v-if="!isValidData(test['results'][RRindex][resultCondition.field])">
                      <small class="error-message">{{ resultCondition.validate }}</small>
                    </template>
                  </div>
                </div>
              </div>
            </template>
            <div class="create-block-button">
              <p-button
                label="Удалить результат"
                severity="danger"
                icon="pi pi-trash"
                @click="deleteResult(RRindex)"
                class="p-button-text"
              />
            </div>
          </p-panel>
        </template>
      </template>
    </template>
    <div class="create-block-button">
      <p-button label="Добавить результат" icon="pi pi-plus" @click="addResult" class="p-button-text" />
    </div>
  </p-panel>
</template>

<script setup lang="ts">
import PInputText from 'primevue/inputtext'
import PPanel from 'primevue/panel'
import PInputNumber from 'primevue/inputnumber'
import PTextArea from 'primevue/textarea'
import PButton from 'primevue/button'
import { onImageError } from '@/utils'

import { useChangeTest } from '@admin/test-control/composables/useChangeTest'

const { changeTestConditions, test, isValidData, addResult, deleteResult } = useChangeTest()
</script>

<style lang="scss" src="@admin/test-control/styles/test-control.scss" scoped />
