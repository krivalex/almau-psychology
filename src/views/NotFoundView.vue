<template>
  <section class="not-found">
    <h1>404</h1>
    <p>Страница не найдена</p>
  </section>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 85vh;
  color: black;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  background-color: #fff;
  padding: 20px;

  h1 {
    font-size: 100px;
    margin: 0;
    color: #059669;
  }

  p {
    margin-block-start: 0em;
    margin-block-end: 0em;
  }
}
</style>
