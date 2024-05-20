<template>
  <div class="navbar-panel">
    <div class="standart-navbar">
      <div class="naming" @click="goToMain">
        <img class="logo" src="@/assets/logo.png" alt="logo" />
        <h1 class="name">AlmaU Psychology</h1>
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

  .admin-panel {
    width: 100%;
    height: 40px;
  }

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

  .navbar-actions {
    margin-left: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100vw;
    margin: 0 auto;

    .nav-buttons {
      width: 100%;
      font-size: 0.8rem;
      background-color: #fff;
      border-radius: 0;
      color: black;
    }
  }
}
</style>
