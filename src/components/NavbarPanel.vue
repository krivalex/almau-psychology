<template>
  <div class="navbar-panel">
    <div class="naming" @click="goToMain">
      <img class="logo" src="@/assets/logo.png" alt="logo" />
      <h1 class="name">AlmaU Psychology</h1>
    </div>
    <div class="login-control">
      <p-button class="enter p-button-sm" v-if="!user" @click="googleRegister" label="Войти" icon="pi pi-sign"></p-button>
      <p-button class="enter p-button-sm" v-if="user" @click="googleLogout" label="Выйти" icon="pi pi-sign-out"></p-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import PButton from 'primevue/button'
import { useUser } from '../composables/useUser'
import { useRouter } from 'vue-router'

const router = useRouter()

function goToMain() {
  router.push('/')
}

const { user, googleRegister, googleLogout } = useUser()
</script>

<style scoped lang="scss">
.navbar-panel {
  background-color: #fff;
  border-bottom: 1px solid #eaeaea;
  height: 60px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px;

  .naming {
    height: inherit;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
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

    .enter {
      margin: 0 10px;
    }
  }
}
</style>
