<template>
  <header class="sticky top-0 z-50 bg-gray-100">
    <nav
      aria-label="Global"
      class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
    >
      <div class="flex lg:flex-1 items-center gap-4">
        <nuxt-link to="/" class="-m-1.5 p-1.5 flex items-center gap-2">
          <img
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            alt="Ecommerce Logo"
            class="h-8 w-auto"
          />
          <span class="text-xl font-bold text-green-700"></span>
        </nuxt-link>
        <!-- Product Search Input -->
        <form
          @submit.prevent="onSearch"
          class="hidden lg:flex items-center ml-6"
        >
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
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          command="show-modal"
          commandfor="mobile-menu"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            data-slot="icon"
            aria-hidden="true"
            class="size-6"
          >
            <path
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <el-popover-group class="hidden lg:flex lg:gap-x-12">
        <div class="relative">
          <nuxt-link
            to="/"
            popovertarget="desktop-menu-product"
            class="flex items-center gap-x-1 text-sm font-semibold text-gray-800"
          >
            Home
          </nuxt-link>

          <el-popover
            id="desktop-menu-product"
            anchor="bottom"
            popover
            class="w-screen max-w-md overflow-hidden rounded-3xl bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition transition-discrete [--anchor-gap:--spacing(3)] backdrop:bg-transparent open:block data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
          >
          </el-popover>
        </div>

        <nuxt-link
          to="/"
          class="text-sm font-semibold text-gray-800 hover:text-green-700"
          >Products</nuxt-link
        >
        <nuxt-link
          to="/"
          class="text-sm font-semibold text-gray-800 hover:text-green-700"
          >About Us</nuxt-link
        >
        <nuxt-link
          to="/"
          class="text-sm font-semibold text-gray-800 hover:text-green-700"
          >Contact</nuxt-link
        >
      </el-popover-group>
      <div class="hidden lg:flex lg:flex-1 gap-8 lg:justify-end">
        <nuxt-link
          to="/login"
          class="text-sm hover:text-green-300 font-semibold text-gray-800"
          >SignIn
        </nuxt-link>
        <nuxt-link
          to="/register"
          class="text-sm hover:text-green-300 font-semibold text-gray-800"
          >SignUp
        </nuxt-link>
        <button
          @click="toggleFavorite"
          class="relative ml-4 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            :class="[
              'h-6 w-6',
              isFavorite ? 'text-red-500' : 'text-gray-800 hover:text-red-500',
            ]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 
         5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 
         4.5 2.09C13.09 3.81 14.76 3 
         16.5 3 19.58 3 22 5.42 22 
         8.5c0 3.78-3.4 6.86-8.55 
         11.54L12 21.35z"
              clip-rule="evenodd"
            />
          </svg>
          <span
            v-if="favoriteCount > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5"
          >
            {{ favoriteCount }}
          </span>
        </button>

        <nuxt-link to="/" class="relative">
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

          <!-- Cart Count Badge -->
          <span
            v-if="cartCount > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5"
          >
            {{ cartCount }}
          </span>
        </nuxt-link>
      </div>
    </nav>
    <el-dialog>
      <dialog id="mobile-menu" class="backdrop:bg-transparent lg:hidden">
        <div tabindex="0" class="fixed inset-0 focus:outline-none">
          <el-dialog-panel
            class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10"
          >
            <div class="flex items-center justify-between">
              <a href="#" class="-m-1.5 p-1.5">
                <span class="sr-only">Your Company</span>
                <img
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  alt=""
                  class="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                command="close"
                commandfor="mobile-menu"
                class="-m-2.5 rounded-md p-2.5 text-gray-400"
              >
                <span class="sr-only">Close menu</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  data-slot="icon"
                  aria-hidden="true"
                  class="size-6"
                >
                  <path
                    d="M6 18 18 6M6 6l12 12"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div class="mt-6 flow-root">
              <div class="-my-6 divide-y divide-white/10">
                <div class="space-y-2 py-6">
                  <div class="-mx-3">
                    <button
                      type="button"
                      command="--toggle"
                      commandfor="products"
                      class="flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-800 hover:bg-white/5"
                    >
                      Product
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        data-slot="icon"
                        aria-hidden="true"
                        class="size-5 flex-none in-aria-expanded:rotate-180"
                      >
                        <path
                          d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        />
                      </svg>
                    </button>
                    <el-disclosure
                      id="products"
                      hidden
                      class="mt-2 block space-y-2"
                    >
                      <a
                        href="#"
                        class="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-800 hover:bg-white/5"
                        >Analytics</a
                      >
                      <a
                        href="#"
                        class="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-800 hover:bg-white/5"
                        >Engagement</a
                      >
                      <a
                        href="#"
                        class="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-800 hover:bg-white/5"
                        >Security</a
                      >
                      <a
                        href="#"
                        class="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-800 hover:bg-white/5"
                        >Integrations</a
                      >
                      <a
                        href="#"
                        class="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-800 hover:bg-white/5"
                        >Automations</a
                      >
                      <a
                        href="#"
                        class="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-800 hover:bg-white/5"
                        >Watch demo</a
                      >
                      <a
                        href="#"
                        class="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-800 hover:bg-white/5"
                        >Contact sales</a
                      >
                    </el-disclosure>
                  </div>
                  <a
                    href="#"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-800 hover:bg-white/5"
                    >Features</a
                  >
                  <a
                    href="#"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-800 hover:bg-white/5"
                    >Marketplace</a
                  >
                  <a
                    href="#"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-800 hover:bg-white/5"
                    >Company</a
                  >
                </div>
                <div class="py-6">
                  <nuxt-link
                    class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-800 hover:bg-white/5"
                    to="/login"
                    >Log in</nuxt-link
                  >
                </div>
              </div>
            </div>
          </el-dialog-panel>
        </div>
      </dialog>
    </el-dialog>
  </header>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const cartCount = ref(0);
const favoriteCount = ref(0);
const searchQuery = ref("");
const isFavorite = ref(false);
const router = useRouter();

onMounted(() => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cartCount.value = cart.reduce((sum, item) => sum + item.quantity, 0);
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  favoriteCount.value = Array.isArray(favorites) ? favorites.length : 0;
});

function toggleFavorite() {
  isFavorite.value = !isFavorite.value;
}

function onSearch() {
  if (searchQuery.value.trim()) {
    router.push({
      path: "/products",
      query: { search: searchQuery.value.trim() },
    });
  }
}
</script>
