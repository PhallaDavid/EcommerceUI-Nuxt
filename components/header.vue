<template>
  <header class="sticky top-0 z-50 bg-gray-100">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
      <!-- Logo -->
      <nuxt-link to="/" class="-m-1.5 p-1.5 flex items-center gap-2">
        <span class="text-xl font-bold text-green-700">R4kieStore2002</span>
      </nuxt-link>

      <!-- Search (simple) -->
      <form @submit.prevent="onSearch" class="hidden lg:flex items-center ml-6">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search products..."
          class="px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          class="ml-2 px-3 py-2 bg-green-700 text-white rounded-full hover:bg-green-600"
        >
          Search
        </button>
      </form>

      <!-- Desktop Menu -->
      <div class="hidden lg:flex lg:flex-1 gap-4 lg:justify-end items-center">
        <!-- User area -->
        <template v-if="user.user">
          <span class="text-gray-800 font-semibold">Hello, {{ user.user.name }}</span>
          <button
            @click="logout"
            class="text-sm font-semibold text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </template>
        <template v-else>
          <nuxt-link
            to="/login"
            class="text-sm hover:text-green-300 font-semibold text-gray-800"
          >SignIn</nuxt-link>
          <nuxt-link
            to="/register"
            class="text-sm hover:text-green-300 font-semibold text-gray-800"
          >SignUp</nuxt-link>
        </template>

        <!-- Cart icon button -->
        <button @click="toggleCartModal" class="relative focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-gray-800 hover:text-green-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.3 5.4a1 1 0 001 1.6h11.6a1 1 0 001-1.6L17 13M7 13H3m14 0a2 2 0 100 4 2 2 0 000-4zM7 17a2 2 0 100 4 2 2 0 000-4z"
            />
          </svg>
          <span
            v-if="cartCount > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5"
          >{{ cartCount }}</span>
        </button>
      </div>
    </nav>

    <ModalCart
      :visible="isCartModalOpen"
      :cartItems="cartItems"
      :totalAmount="totalAmount"
      @close="isCartModalOpen = false"
      @remove="handleRemove"
      @checkout="handleCheckout"
    />
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { userStore } from "~/stores/user"; // Adjust path if needed

const router = useRouter();
const user = userStore;

const cartItems = ref([]);
const isCartModalOpen = ref(false);
const searchQuery = ref("");

// Computed cart count
const cartCount = computed(() => cartItems.value.length);

// Compute total amount if needed (example)
const totalAmount = computed(() =>
  cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
);

onMounted(() => {
  userStore.init();

  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    try {
      cartItems.value = JSON.parse(savedCart);
    } catch {
      cartItems.value = [];
    }
  }
});

function logout() {
  userStore.clearUser();
  router.push("/login");
}

function toggleCartModal() {
  isCartModalOpen.value = !isCartModalOpen.value;
}

// Optional placeholder for search submit
function onSearch() {
  console.log("Search for:", searchQuery.value);
  // implement your search logic here
}

// Optional handlers for ModalCart component
function handleRemove(item) {
  // remove item from cartItems and update localStorage
  cartItems.value = cartItems.value.filter(i => i.id !== item.id);
  localStorage.setItem("cart", JSON.stringify(cartItems.value));
}

function handleCheckout() {
  // handle checkout logic
  alert("Checkout not implemented yet");
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.slide-enter-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-leave-to {
  transform: translateX(100%);
}
</style>
