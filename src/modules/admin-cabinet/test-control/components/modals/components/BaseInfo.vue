<template>
  <p-panel header="Базовая информация" toggleable>
    <template v-for="condition in changeTestConditions" as="div">
      <template v-if="condition.position === 'base'">
        <div class="contain">
          <v-field v-slot="{ handleChange, errorMessage }" :name="condition.field">
            <div class="condition">
              <span class="label">{{ condition.localization }}:</span>
              <div class="condition-body">
                <p-input-text
                  :value="values[condition.field]"
                  type="text"
                  :class="{ 'p-invalid': errorMessage }"
                  @update:model-value="handleChange"
                  class="input"
                />
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

import { useChangeTest } from '@/modules/admin-cabinet/test-control/composables/useChangeTest'

const { changeTestConditions, values } = useChangeTest()
</script>

<style lang="scss" src="@/modules/admin-cabinet/test-control/styles/test-control.scss" scoped />
