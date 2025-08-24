<template>
  <div class="min-h-screen bg-gray-950 flex flex-col">
    <Header></Header>

    <div class="flex flex-1">
      <!-- <sidebar
        class="hidden md:block w-64 bg-gray-50 border-r border-gray-300 p-4"
      ></sidebar> -->
      <transition name="slide">
        <sidebar
          v-if="sidebarOpen"
          class="fixed top-0 left-0 w-64 h-full bg-gray-50 border-r border-gray-300 p-4 z-50 md:hidden"
        />
      </transition>
      <main class="flex-1 max-w-7xl mx-auto justify-center items-center bg-gray-950 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Sidebar from "~/components/sidebar.vue";
import Header from "~/components/header.vue";

const sidebarOpen = ref(false);
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}
</style>
