<template>
  <template v-if="isAdmin">
    <p-button class="admin-link p-button-sm" label="Кабинет психолога" icon="pi pi-sign" @click="goToAdminView" />
  </template>
</template>

<script setup lang="ts">
import PButton from 'primevue/button'
import { useUser } from '@/composables/useUser'
import { useRedirect } from '@/composables/useRedirect'

const { goToAdminView } = useRedirect()
const { isAdmin } = useUser()
</script>

<style scoped lang="scss">
.admin-link {
  background: #06c78a;
  text-decoration: none;
  color: white;
  font-family: var(--font-family);
  font-feature-settings: var(--font-feature-settings, normal);
  font-size: 1rem;
  font-weight: normal;
  padding: 0.5rem 1rem;
  border-radius: 0.45rem;
  font-weight: 600;
}
</style>
