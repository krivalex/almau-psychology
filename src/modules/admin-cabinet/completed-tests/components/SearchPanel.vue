<template>
  <section class="search-panel">
    <p-input-text v-model="globalFilter" placeholder="Поиск по тестам" class="search-input" />
  </section>
</template>

<script setup lang="ts">
import PInputText from 'primevue/inputtext'
</script>
