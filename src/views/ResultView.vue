<template>
  <section class="result-page">
    <h1 class="title">{{ selectedTest?.results[0].name }}</h1>
    <p class="description">{{ selectedTest?.results[0].description }}</p>
    <p-button label="Поговорить с психологом" class="control-button" @click="goToWhatsapp" />
    <p-button class="another-test-button" label="Пройти еще один тест" icon="pi pi-arrow-top" @click="goToMain" />
  </section>
</template>

<script setup lang="ts">
import { useTest } from '../composables/useTest'
import PButton from 'primevue/button'
import { useRouter } from 'vue-router'

const { selectedTest } = useTest()
const router = useRouter()

function goToWhatsapp() {
  window.open('https://wa.me/+77052020771')
}

function goToMain() {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.result-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 180px);
  padding: 15px 25px;
  position: relative;

  .title {
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  .description {
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 1rem;
    text-align: center;
  }

  .another-test-button {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 220px;
    font-size: 0.8rem;
    font-weight: 500;
    background-color: #fff;
  }
}
</style>
