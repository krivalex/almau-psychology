<template>
  <div class="preview-test-content">Превью теста</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" src="@admin/test-control/styles/test-control.scss" scoped />

<style lang="scss" scoped>
.preview-test-content {
  width: calc(390px * 0.85);
  height: calc(844px * 0.75);
  border: 3px solid gray;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  position: fixed;
  text-align: center;
}
</style>
