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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            class="w-12 h-12 rounded-full"
          >
            <path
              d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99H8.08v-2.89h2.36V9.41c0-2.33 1.39-3.62 3.52-3.62 1.02 0 2.09.18 2.09.18v2.3h-1.18c-1.16 0-1.52.72-1.52 1.46v1.76h2.59l-.41 2.89h-2.18v6.99C18.34 21.13 22 17 22 12z"
            />
          </svg>
        </a>

        <!-- Telegram -->
        <a
          v-if="fabOpen"
          key="telegram"
          href="https://t.me"
          target="_blank"
          class="btn btn-lg btn-circle bg-sky-500 text-white shadow-lg rounded-full hover:bg-sky-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            class="w-12 h-12 rounded-full"
          >
            <path
              d="M9.04 15.63l-.39 4.55c.56 0 .81-.24 1.1-.53l2.64-2.53 5.47 3.96c1 .55 1.72.26 1.99-.92l3.61-16.88.01-.02c.32-1.49-.54-2.08-1.52-1.71L1.47 9.22c-1.45.58-1.42 1.4-.25 1.78l4.99 1.56 11.58-7.04c.54-.36 1.03-.16.63.22"
            />
          </svg>
        </a>

        <!-- Instagram -->
        <a
          v-if="fabOpen"
          key="instagram"
          href="https://instagram.com"
          target="_blank"
          class="btn btn-lg btn-circle bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white shadow-lg rounded-full hover:opacity-90"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            class="w-12 h-12 rounded-full"
          >
            <path
              d="M7.75 2C4.13 2 2 4.13 2 7.75v8.5C2 19.87 4.13 22 7.75 22h8.5C19.87 22 22 19.87 22 16.25v-8.5C22 4.13 19.87 2 16.25 2h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 .002 6.002A3 3 0 0 0 12 9Zm5.25-.75a1.25 1.25 0 1 1-.002-2.502A1.25 1.25 0 0 1 17.25 8.25Z"
            />
          </svg>
        </a>
      </transition-group>

      <!-- Main FAB -->
      <button
        @click="fabOpen = !fabOpen"
        class="btn btn-lg btn-circle bg-blue-500 text-white shadow-xl rounded-full hover:bg-blue-600 transition-transform duration-300"
      >
        <svg
          v-if="!fabOpen"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-12 h-12 rounded-full"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-12 h-12 rounded-full"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
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
  transform: translateY(12px) scale(0.9);
}
</style>
