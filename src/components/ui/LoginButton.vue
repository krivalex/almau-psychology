<template>
  {{ isWebview }}
  <template v-if="isWebview">
    <a :href="redirectRoute" target="_blank" class="enter p-button-sm" v-if="!googleUser">Войти</a>
    <p-avatar v-if="googleUser" :image="googleUser.photoURL" shape="circle" size="normal" />
  </template>
  <template v-else>
    <p-button class="enter p-button-sm" v-if="!googleUser" @click="googleRegister" label="Войти" icon="pi pi-sign"></p-button>
    <p-avatar v-if="googleUser" :image="googleUser.photoURL" shape="circle" size="normal" />
  </template>
</template>

<script setup lang="ts">
import PButton from 'primevue/button'
import PAvatar from 'primevue/avatar'
import { useUser } from '../../composables/useUser'
import { ref } from 'vue'

const { googleRegister, googleUser } = useUser()

// is loading from webview
const isWebview = ref(navigator.userAgent)
console.log(navigator.userAgent)

const redirectRoute = 'https://almau-psychology.netlify.app/login-options'
</script>
