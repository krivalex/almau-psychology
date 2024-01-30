<template>
  <div class="navbar-panel">
    <div class="standart-navbar">
      <div class="naming" @click="goToMain">
        <img class="logo" src="@/assets/logo.png" alt="logo" />
        <h1 class="name">AlmaU Psychology</h1>
      </div>
      <template v-if="!isLoginPage">
        <div class="login-control">
          <p-button class="enter p-button-sm" v-if="!googleUser" @click="googleRegister" label="Войти" icon="pi pi-sign"></p-button>
          <p-avatar v-if="googleUser" :image="googleUser.photoURL" shape="circle" size="normal" />
        </div>
      </template>
      <template v-else>
        <p-avatar v-if="googleUser" :image="googleUser.photoURL" shape="circle" size="normal" />
      </template>
    </div>
    <!-- <div class="navbar-actions">
      <p-button class="nav-buttons" label="Тесты" />
      <p-button class="nav-buttons" label="Психологи" />
      <p-button class="nav-buttons" label="О нас" />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import PButton from 'primevue/button'
import { useUser } from '../composables/useUser'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import PAvatar from 'primevue/avatar'

const router = useRouter()

function goToMain() {
  router.push('/')
}

const { googleRegister, googleUser } = useUser()

const isLoginPage = computed(() => {
  return router.currentRoute.value.name === 'login'
})
</script>

<style scoped lang="scss">
.navbar-panel {
  background-color: #fff;
  border-bottom: 2px solid #484848;
  height: 60px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

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
