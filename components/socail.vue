<template>
  <div class="fixed bottom-6 right-6 z-50">
    <div class="fab flex flex-col items-center gap-3">
      <!-- Speed dial buttons -->
      <transition-group
        name="fade"
        tag="div"
        class="flex flex-col items-center gap-3"
      >
        <!-- Facebook -->
        <a
          v-if="fabOpen"
          key="facebook"
          href="https://facebook.com"
          target="_blank"
          class="btn btn-lg btn-circle bg-blue-600 text-white shadow-lg rounded-full hover:bg-blue-700"
        >
          <img src="/assets/facebook.png" class="w-8 h-8 rounded-full" alt="" />
        </a>

        <!-- Telegram -->
        <a
          v-if="fabOpen"
          key="telegram"
          href="https://t.me"
          target="_blank"
          class="btn btn-lg btn-circle bg-sky-500 text-white shadow-lg rounded-full hover:bg-sky-600"
        >
          <img src="/assets/telegram.png" class="w-8 h-8 rounded-full" alt="" />
        </a>

        <!-- Instagram -->
        <a
          v-if="fabOpen"
          key="instagram"
          href="https://instagram.com"
          target="_blank"
          class="btn btn-lg btn-circle bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white shadow-lg rounded-full hover:opacity-90"
        >
          <img src="/assets/social.png" class="w-8 h-8 rounded-full" alt="" />
        </a>
      </transition-group>

      <!-- Main FAB -->
      <button
        @click="fabOpen = !fabOpen"
        class="btn btn-lg btn-circle bg-blue-500 text-white shadow-xl rounded-full hover:bg-blue-600 transition-transform duration-300"
      >
        <img v-if="!fabOpen" src="/assets/add.png" class="w-8 h-8" alt="" />
        <img v-else src="/assets/add.png" class="w-8 h-8" alt="" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const fabOpen = ref(false);
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.9);
}
</style>
