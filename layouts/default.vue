<template>
  <div class="min-h-screen bg-white flex flex-col">
    <Header />

    <div class="flex flex-1">
      <!-- <Sidebar
        class="hidden md:block w-64 bg-gray-50 border-r border-gray-300 p-4"
      /> -->
      <transition name="slide">
        <Sidebar
          v-if="sidebarOpen"
          class="fixed top-0 left-0 w-64 h-full bg-gray-50 border-r border-gray-300 p-4 z-50 md:hidden"
        />
      </transition>
      <main
        class="flex-1 max-w-7xl mx-auto justify-center items-center bg-white p-6"
      >
        <slot />
      </main>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Sidebar from "~/components/sidebar.vue";
import Header from "~/components/header.vue";
import Footer from "~/components/footer.vue";

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
