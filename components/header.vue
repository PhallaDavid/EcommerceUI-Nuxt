<template>
  <header class="sticky top-0 z-50 bg-gray-100 transition-all duration-300">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10 py-4"
    >
      <!-- Logo -->
      <nuxt-link to="/" class="flex items-center gap-2">
        <img
          src="/assets/logo.jpg"
          alt="Logo"
          class="h-12 rounded-full w-auto object-contain"
        />
      </nuxt-link>

      <!-- Search -->
      <form
        @submit.prevent="onSearch"
        class="hidden lg:flex items-center ml-6 flex-1 max-w-md"
      >
        <div
          class="flex items-center w-full bg-gray-100 rounded-full shadow-inner px-3 py-2"
        >
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search products..."
            class="flex-1 bg-transparent text-gray-700 outline-none placeholder-gray-400"
          />
          <nuxt-link
            @click="Query"
            type="submit"
            class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            Search
          </nuxt-link>
        </div>
      </form>

      <!-- Desktop Menu -->
      <div
        class="hidden lg:flex lg:flex-1 gap-6 lg:justify-end items-center text-gray-700"
      >
        <!-- User -->
        <template v-if="user">
          <span class="font-medium animate-fade-in"
            >👋 Hello, {{ user.name }}</span
          >
          <button
            @click="logout"
            class="text-sm font-semibold text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </template>
        <template v-else>
          <nuxt-link
            to="/login"
            class="text-sm text-blue-500 bg-gray-200 font-semibold px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white"
          >
            Sign In
          </nuxt-link>
          <nuxt-link
            to="/register"
            class="text-sm font-semibold text-blue-500 bg-gray-200 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white"
          >
            Sign Up
          </nuxt-link>
        </template>

        <!-- Favorites -->
        <nuxt-link
          to="/favourite"
          class="p-2 rounded-full flex items-center gap-2"
        >
          <svg
            class="w-7 h-7 -ms-2 me-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
            />
          </svg>
        </nuxt-link>

        <!-- Cart -->
        <nuxt-link
          @click="toggleCartModal"
          class="relative p-2 rounded-full flex items-center gap-2"
        >
          <svg
            class="w-7 h-7 -ms-2 me-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
            />
          </svg>
          <span
            v-if="cartItems.length > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 shadow-md animate-bounce"
          >
            {{ cartItems.length }}
          </span>
        </nuxt-link>
      </div>
    </nav>

    <!-- Cart Modal -->
    <ModalCart :visible="isCartModalOpen" @close="isCartModalOpen = false" />
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import ModalCart from "./modalCart.vue";

const user = ref(null);
const isCartModalOpen = ref(false);
const cartItems = ref([]);
const searchQuery = ref("");

function toggleCartModal() {
  isCartModalOpen.value = !isCartModalOpen.value;
}

function onSearch() {
  console.log("Search for:", searchQuery.value);
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  user.value = null;
  window.location.href = "/login";
}

async function fetchCart() {
  if (!process.client) return;
  const token = localStorage.getItem("token");
  if (!token) {
    cartItems.value = [];
    return;
  }
  try {
    const res = await fetch("http://127.0.0.1:8000/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    cartItems.value = data || [];
    localStorage.setItem("cart", JSON.stringify(cartItems.value));
  } catch (err) {
    console.error(err);
  }
}

onMounted(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) user.value = JSON.parse(storedUser);

  fetchCart();
  window.addEventListener("cart-updated", fetchCart);
});

onBeforeUnmount(() => {
  window.removeEventListener("cart-updated", fetchCart);
});
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }

  to {
    opacity: 1; 
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-in-out;
}
</style>
