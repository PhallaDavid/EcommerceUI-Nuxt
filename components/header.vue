<template>
  <header class="sticky top-0 z-50 bg-white shadow">
    <nav
      class="mx-auto max-w-7xl flex items-center justify-between lg:px-10 py-4"
    >
      <!-- Logo -->
      <nuxt-link to="/" class="flex items-center gap-2">
        <img
          src="/assets/logo.jpg"
          alt="Logo"
          class="h-12 rounded-full object-contain"
        />
        <span class="font-bold text-xl text-gray-800"></span>
      </nuxt-link>

      <!-- Navigation Links -->
      <ul
        class="hidden lg:flex gap-6 text-gray-700 font-medium items-center relative"
      >
        <li>
          <nuxt-link to="/" class="hover:text-blue-600 px-3 py-2 rounded-full"
            >Home</nuxt-link
          >
        </li>
        <!-- Dynamic Categories Mega Menu -->
        <li
          class="relative"
          @mouseenter="showCategoriesMenu = true"
          @mouseleave="showCategoriesMenu = false"
        >
          <button
            class="hover:text-blue-600 px-3 py-2 rounded-full flex items-center gap-1"
            type="button"
            tabindex="0"
            @click="showCategoriesMenu = !showCategoriesMenu"
          >
            Categories
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <!-- Mega Menu Dropdown -->
          <div
            v-show="showCategoriesMenu"
            class="absolute left-0 top-full mt-2 w-96 bg-white border border-gray-100 rounded-lg shadow-md grid grid-cols-3 gap-4 p-4 z-50 animate-fade-in"
            @mouseenter="showCategoriesMenu = true"
            @mouseleave="showCategoriesMenu = false"
          >
            <div v-for="(col, index) in categoryColumns" :key="index">
              <ul class="space-y-2">
                <li v-for="category in col" :key="category.id">
                  <nuxt-link
                    :to="`/categories/${category.slug}`"
                    class="text-gray-500 hover:text-blue-600 block"
                    @click="showCategoriesMenu = false"
                  >
                    {{ category.name }}
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <li>
          <nuxt-link
            to="/products"
            class="hover:text-blue-600 px-3 py-2 rounded-full"
            >Products</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            to="/contact"
            class="hover:text-blue-600 px-3 py-2 rounded-full"
            >Contact</nuxt-link
          >
        </li>
      </ul>

      <!-- Search -->
      <form
        @submit.prevent="onSearch"
        class="hidden lg:flex flex-1 max-w-md mx-6"
      >
        <div
          class="flex items-center w-full bg-gray-100 rounded-full px-3 py-2"
        >
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search products..."
            class="flex-1 bg-transparent text-gray-700 outline-none placeholder-gray-400"
          />
          <button
            type="submit"
            class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </form>

      <!-- User, Favorites, Cart -->
      <div class="flex items-center gap-4 relative">
        <!-- Favorites -->
        <nuxt-link
          to="/favourite"
          class="relative p-2 rounded-full hover:bg-blue-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-7 h-7"
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
          <span
            v-if="favoriteCount > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5"
          >
            {{ favoriteCount }}
          </span>
        </nuxt-link>

        <!-- Cart -->
        <button
          @click="toggleCartModal"
          class="relative p-2 rounded-full hover:bg-blue-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-7 h-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 4h1.5L8 16h8l3.5-8H6.5M11 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
            />
          </svg>
          <span
            v-if="cartItems.length > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5"
          >
            {{ cartItems.length }}
          </span>
        </button>

        <!-- Profile Dropdown -->
        <div class="relative">
          <button
            @click="showDropdown = !showDropdown"
            class="flex items-center gap-2 rounded-full hover:bg-blue-100 px-2 py-1"
          >
            <img
              :src="user?.avatar || '/assets/default-avatar.png'"
              class="w-9 h-9 rounded-full object-cover"
              alt="profile"
            />
            <span class="hidden lg:inline font-medium">{{
              user?.name || "Guest"
            }}</span>
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div
            v-show="showDropdown"
            class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50"
          >
            <nuxt-link
              to="/profile"
              class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >Profile</nuxt-link
            >
            <nuxt-link
              to="/orders"
              class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >Orders</nuxt-link
            >
            <button
              @click="logout"
              class="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
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
const showDropdown = ref(false);
const showCategoriesMenu = ref(false);
const cartItems = ref([]);
const favoriteCount = ref(0);
const searchQuery = ref("");
const categories = ref([]);
const categoryColumns = ref([]);

// Toggle cart modal
function toggleCartModal() {
  isCartModalOpen.value = !isCartModalOpen.value;
}

// Search function
function onSearch() {
  console.log("Search for:", searchQuery.value);
}

// Logout
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  user.value = null;
  window.location.href = "/login";
}

// Toggle categories menu
function toggleCategoriesMenu() {
  showCategoriesMenu.value = !showCategoriesMenu.value;
}

// Fetch cart
async function fetchCart() {
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
  } catch (err) {
    console.error(err);
  }
}

// Fetch categories
async function fetchCategories() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/categories");
    const data = await res.json();
    categories.value = data || [];

    // Split into 3 columns
    const cols = 3;
    const perCol = Math.ceil(categories.value.length / cols);
    categoryColumns.value = [];
    for (let i = 0; i < cols; i++) {
      categoryColumns.value.push(
        categories.value.slice(i * perCol, (i + 1) * perCol)
      );
    }
  } catch (err) {
    console.error(err);
  }
}

// Close dropdowns when clicking outside
function handleClickOutside(event) {
  const dropdowns = document.querySelectorAll(".relative");
  dropdowns.forEach((drop) => {
    if (!drop.contains(event.target)) {
      showDropdown.value = false;
      showCategoriesMenu.value = false;
    }
  });
}

onMounted(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) user.value = JSON.parse(storedUser);

  fetchCart();
  fetchCategories();

  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
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
  animation: fadeIn 0.3s ease-in-out;
}
</style>
