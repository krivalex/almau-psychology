<template>
  <div class="navbar-panel">
    <div class="standart-navbar">
      <div class="naming" @click="goToMain">
        <img class="logo" src="@/assets/logo.png" alt="logo" />
        <h1 class="name">AlmaU Psychology</h1>
      </div>
      <template v-if="!isLoginPage">
        <div class="login-control">
          <login-button />
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
import { useUser } from '../composables/useUser'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import PAvatar from 'primevue/avatar'
import LoginButton from './ui/LoginButton.vue'

const router = useRouter()

// onMounted(() => {
//   console.log(window?.Telegram?.WebApp)
// })

function goToMain() {
  router.push('/')
}

// async function redirectToBrowserToReg() {
//   window.location.href = 'https://almau-psychology.netlify.app/login-options'
//   window.location.reload()
// }

const { googleUser } = useUser()

const isLoginPage = computed(() => {
  return router.currentRoute.value.name === 'login'
})
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
