<template>
  <div class="footer-panel">
    <div class="author">
      <span class="copyright"> &copy; {{ currentYear }} <strong>AlmaU Psychology</strong> </span>
      <span class="author-name">developed by <strong @click="redirectToKrivalex">@krivalex</strong></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRedirect } from '@/composables/useRedirect'

const { redirectToKrivalex } = useRedirect()
const currentYear = new Date().getFullYear()
</script>

<style scoped lang="scss">
.footer-panel {
  background-color: #fff;
  border-top: 1px solid #484848;
  height: 60px;
  width: 100%;
  position: relative;
  bottom: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  color: black;
  flex-direction: column;

  .author {
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    flex-direction: column;

    .author-name {
      display: inline-block;
      margin: 0;
      font-size: 0.5rem;
      vertical-align: middle;
      color: black;
      font-style: italic;

      strong {
        cursor: pointer;
        color: #3f69ff;
        font-weight: 600;
      }
    }
  }
}
</style>
