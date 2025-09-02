<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { onMounted } from 'vue'
import { userStore } from '~/stores/user'

onMounted(() => {
  userStore.init()
})
</script>
