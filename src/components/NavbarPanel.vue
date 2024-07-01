<template>
  <div class="navbar-panel">
    <div class="standart-navbar">
      <div class="naming" @click="goToMain">
        <img class="logo" src="@/assets/logo.png" alt="logo" />
        <h1 class="name">
          AlmaU Psychology <span class="version">{{ version }}</span>
        </h1>
      </div>
      <div class="login-control">
        <admin-button />
        <login-button />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRedirect } from '@/composables/useRedirect'

import LoginButton from '@/components/ui/LoginButton.vue'
import AdminButton from '@/components/ui/AdminButton.vue'

const version = '0.3.6'

const { goToMain } = useRedirect()
</script>

<style scoped lang="scss">
.navbar-panel {
  background-color: #fff;
  border-bottom: 1px solid #484848;
  height: 60px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 400;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.6);

  .standart-navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 10px;

    .naming {
      height: inherit;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;
      flex-direction: row;

      .logo {
        height: 40px;
        margin: 10px;
      }

      .version {
        display: inline-block;
        margin: 0;
        font-size: 0.6rem;
        vertical-align: middle;
        color: #484848;
      }

      .name {
        display: inline-block;
        margin: 0;
        font-size: 1rem;
        vertical-align: middle;
        color: black;
      }
    }

    .login-control {
      margin-left: auto;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 10px;

      .enter {
        margin: 0 10px;
      }
    }
  }
}
</style>
