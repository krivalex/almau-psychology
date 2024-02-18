<template>
  <p-button class="nav-buttons" label="Попап" @click="googleRegister" />
</template>

<script setup lang="ts">
import PButton from 'primevue/button'
import { useUser } from '../composables/useUser'

const { googleRegister } = useUser()
</script>
