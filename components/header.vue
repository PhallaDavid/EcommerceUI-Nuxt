<template>
  <header class="sticky top-0 z-50 bg-white border-b border-gray-100">
    <!-- Discount Banner for Guests -->
    <div
      v-if="!user && showDiscountBanner"
      class="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 sm:py-3 px-4 relative overflow-hidden"
    >
      <div
        class="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4"
      >
        <span class="text-xs sm:text-sm font-medium">{{
          $t("messages.loginDiscount")
        }}</span>
        <nuxt-link
          :to="localePath('/login')"
          class="font-semibold text-xs sm:text-sm px-3 py-1 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200 whitespace-nowrap"
        >
          {{ $t("nav.login") }}
        </nuxt-link>
      </div>
      <button
        @click="showDiscountBanner = false"
        class="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-200 p-1"
        title="Close banner"
      >
        <svg
          class="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>

    <nav
      class="mx-auto max-w-7xl flex items-center justify-between py-4 sm:py-5 px-4 sm:px-6"
    >
      <!-- Logo -->
      <nuxt-link to="/" class="flex items-center">
        <img
          src="/assets/logo.jpg"
          alt="Logo"
          class="h-12 rounded-full object-contain"
        />
      </nuxt-link>

      <!-- Navigation Links -->
      <ul
        class="hidden lg:flex gap-2 text-gray-700 font-medium items-center relative"
      >
        <li>
          <nuxt-link
            :to="localePath('/')"
            class="hover:text-blue-600 px-4 py-2 rounded-lg"
          >
            {{ $t("nav.home") }}
            <span
              class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"
            ></span>
          </nuxt-link>
        </li>
        <!-- Categories Mega Menu -->
        <li
          class="relative"
          @mouseenter="showCategoriesMenu = true"
          @mouseleave="showCategoriesMenu = false"
        >
          <button
            class="hover:text-blue-600 px-4 py-2 rounded-lg flex items-center gap-2"
            type="button"
            @click.stop="showCategoriesMenu = !showCategoriesMenu"
          >
            {{ $t("nav.categories") }}
            <svg
              :class="[
                'w-4 h-4 transition-transform duration-200',
                showCategoriesMenu ? 'rotate-180' : '',
              ]"
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
            v-show="showCategoriesMenu"
            class="absolute left-0 top-full mt-3 w-96 bg-white border border-gray-200 rounded-xl grid grid-cols-3 gap-4 p-6 z-50 animate-fade-in"
            @mouseenter="showCategoriesMenu = true"
            @mouseleave="showCategoriesMenu = false"
          >
            <div v-for="(col, index) in categoryColumns" :key="index">
              <ul class="space-y-3">
                <li v-for="category in col" :key="category.id">
                  <nuxt-link
                    :to="localePath(`/categories/${category.slug}`)"
                    class="text-gray-600 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-lg transition-all duration-200"
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
            :to="localePath('/products')"
            class="hover:text-blue-600 px-4 py-2 rounded-lg"
          >
            {{ $t("nav.products") }}
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            :to="localePath('/contact')"
            class="hover:text-blue-600 px-4 py-2 rounded-lg"
          >
            {{ $t("nav.contact") }}
          </nuxt-link>
        </li>
      </ul>

      <!-- Search -->
      <form
        @submit.prevent="onSearch"
        class="hidden lg:flex flex-1 max-w-lg mx-8"
      >
        <div
          class="flex items-center w-full bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 transition-shadow duration-200"
        >
          <svg
            class="w-5 h-5 text-gray-400 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="$t('common.search')"
            class="flex-1 bg-transparent text-gray-700 outline-none placeholder-gray-400 text-sm"
          />
          <button
            type="submit"
            class="ml-3 px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 shadow-sm"
          >
            {{ $t("common.search") }}
          </button>
        </div>
      </form>

      <!-- User Section -->
      <div class="flex items-center gap-3 relative">
        <!-- Login button for guests -->
        <nuxt-link
          v-if="!user"
          :to="localePath('/login')"
          class="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
        >
          {{ $t("nav.login") }}
        </nuxt-link>

        <!-- Only show profile, favorites, cart if logged in -->
        <template v-else>
          <!-- Favorites -->
          <nuxt-link
            to="/favourite"
            class="relative p-3 rounded-full hover:bg-blue-50 transition-colors duration-200 group"
            title="Favorites"
          >
            <svg
              class="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-200"
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
              class="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-sm"
            >
              {{ favoriteCount }}
            </span>
          </nuxt-link>

          <!-- Cart -->
          <button
            @click="toggleCartModal"
            class="relative p-3 rounded-full hover:bg-blue-50 transition-colors duration-200 group"
            title="Shopping Cart"
          >
            <svg
              class="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-200"
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
              class="absolute -top-1 -right-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-sm"
            >
              {{ cartItems.length }}
            </span>
          </button>

          <!-- Profile Dropdown -->
          <div class="relative">
            <button
              @click.stop="showDropdown = !showDropdown"
              class="flex items-center gap-2 rounded-full hover:bg-blue-50 transition-colors duration-200 p-1"
              title="User Menu"
            >
              <img
                :src="
                  user?.avatar
                    ? `http://127.0.0.1:8000${user.avatar}`
                    : '/assets/placeholder.jpg'
                "
                class="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                alt="profile"
              />
              <svg
                :class="[
                  'w-4 h-4 text-gray-500 transition-transform duration-200',
                  showDropdown ? 'rotate-180' : '',
                ]"
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
              class="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50"
            >
              <div class="px-4 py-3 border-b border-gray-100">
                <p class="text-sm font-medium text-gray-900">
                  {{ user?.name }}
                </p>
                <p class="text-sm text-gray-500">{{ user?.email }}</p>
              </div>
              <nuxt-link
                to="/profile"
                class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                @click="showDropdown = false"
              >
                {{ $t("nav.profile") }}
              </nuxt-link>
              <nuxt-link
                to="/orders"
                class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                @click="showDropdown = false"
              >
                {{ $t("order.orders") }}
              </nuxt-link>
              <div class="border-t border-gray-100 mt-2">
                <button
                  @click="handleLogout"
                  class="flex items-center gap-3 w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
                >
                  {{ $t("nav.logout") }}
                </button>
              </div>
            </div>
          </div>
        </template>

        <!-- Language Switcher -->
        <LanguageSwitcher />
      </div>
    </nav>

    <!-- Cart Modal -->
    <ModalCart :visible="isCartModalOpen" @close="isCartModalOpen = false" />
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import ModalCart from "./modalCart.vue";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import { useI18n } from "vue-i18n";
const { locale, t } = useI18n();
import { useLocalePath } from "#imports";
const localePath = useLocalePath();

const user = ref(null);
const isCartModalOpen = ref(false);
const showDropdown = ref(false);
const showCategoriesMenu = ref(false);
const showDiscountBanner = ref(true);
const cartItems = ref([]);
const favoriteCount = ref(0);
const searchQuery = ref("");
const categories = ref([]);
const categoryColumns = ref([]);
function toggleCartModal() {
  isCartModalOpen.value = !isCartModalOpen.value;
}

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

// Handle logout with dropdown close
function handleLogout() {
  showDropdown.value = false;
  logout();
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
