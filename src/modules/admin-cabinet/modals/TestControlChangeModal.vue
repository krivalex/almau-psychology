<template>
  <section class="test-change-modal">
    <p-panel header="Базовая информация" toggleable>
      <div class="contain">
        <template v-for="condition in changeTestConditions" as="div">
          <v-field v-slot="{ handleChange, errorMessage }" :name="condition.field">
            <div class="condition">
              <span class="label">{{ condition.localization }}:</span>
              <p-input-text
                :value="values[condition.field]"
                type="text"
                :class="{ 'p-invalid': errorMessage }"
                @update:model-value="handleChange"
                class="input"
              />
            </div>
          </v-field>
        </template>
      </div>
    </p-panel>
    <p-button
      label="Сохранить"
      icon="pi pi-save"
      class="save-button"
      @click="handleValidation"
      :disabled="isDisabled"
    />
  </section>
</template>

<script setup lang="ts">
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import type { Ref } from 'vue'
import { inject, ref } from 'vue'

import { Field as VField, useForm } from 'vee-validate'
import PInputText from 'primevue/inputtext'
import PButton from 'primevue/button'
import PPanel from 'primevue/panel'

import { useChangeTest } from '@/composables/useChangeTest'

const { schema, changeTestConditions } = useChangeTest()

const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')
const test = ref(dialogRef?.value?.data?.test)

const isDisabled = ref(true)

const { validate, values } = useForm({
  initialValues: test,
  validationSchema: schema,
})

const handleValidation = async () => {
  const valid = await validate()
  isDisabled.value = !valid.valid
  return isDisabled.value
}
</script>

<style lang="scss" scoped>
.test-change-modal {
  min-width: 90vw;
  max-width: 90vw;

  .contain {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 0.7rem;
    justify-content: space-between;
    align-items: center;

    .condition {
      display: flex;
      align-items: center;
      width: 45%;
      gap: 1rem;

      .label {
        font-weight: bold;
        min-width: 200px;
      }

      .input {
        width: 100%;
      }
    }
  }

  .save-button {
    margin-top: 20px;
  }
}

:deep(.p-panel-header) {
  background-color: white;
  color: black;
  font-size: 1.5rem;
}
</style>
