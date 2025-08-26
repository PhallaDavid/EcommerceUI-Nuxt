<template>
  <div class="min-h-screen bg-white flex flex-col">
    <Header />

    <div class="flex flex-1">
      <!-- Sidebar controlled by sidebarOpen -->
      <transition name="slide">
        <Sidebar
          v-if="sidebarOpen"
          class="fixed top-0 left-0 w-64 h-full bg-gray-50 border-r border-gray-300 p-4 z-40 md:static md:block md:w-64"
        />
      </transition>

      <main class="flex-1 max-w-7xl mx-auto justify-center items-center bg-white p-6">
        <slot />
      </main>
    </div>

    <MessageBox />
    <Footer />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Sidebar from "~/components/sidebar.vue";
import Header from "~/components/header.vue";
import Footer from "~/components/footer.vue";
import MessageBox from "~/components/MessageBox.vue";

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
