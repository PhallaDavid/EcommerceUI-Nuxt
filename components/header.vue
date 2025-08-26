<template>
  <header class="sticky top-0 z-50 bg-gray-100">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
      
      <!-- Logo -->
      <nuxt-link to="/" class="-m-1.5 p-1.5 flex items-center gap-2">
        <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Logo" class="h-8 w-auto" />
        <span class="text-xl font-bold text-green-700">E-Shop</span>
      </nuxt-link>

      <!-- Search -->
      <form @submit.prevent="onSearch" class="hidden lg:flex items-center ml-6">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search products..."
          class="px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button type="submit" class="ml-2 px-3 py-2 bg-green-700 text-white rounded-full hover:bg-green-600">
          Search
        </button>
      </form>

      <!-- Desktop Menu -->
      <div class="hidden lg:flex lg:flex-1 gap-4 lg:justify-end items-center">

        <!-- Logged in / logged out -->
        <template v-if="user">
          <span class="text-gray-800 font-semibold">Hello, {{ user.name }}</span>
          <button @click="logout" class="text-sm font-semibold text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600">
            Logout
          </button>
        </template>
        <template v-else>
          <nuxt-link to="/login" class="text-sm hover:text-green-300 font-semibold text-gray-800">SignIn</nuxt-link>
          <nuxt-link to="/register" class="text-sm hover:text-green-300 font-semibold text-gray-800">SignUp</nuxt-link>
        </template>

        <!-- Cart icon -->
        <nuxt-link to="/cart" class="relative">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-800 hover:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.3 5.4a1 1 0 001 1.6h11.6a1 1 0 001-1.6L17 13M7 13H3m14 0a2 2 0 100 4 2 2 0 000-4zM7 17a2 2 0 100 4 2 2 0 000-4z"/>
          </svg>
          <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">{{ cartCount }}</span>
        </nuxt-link>
      </div>

      <!-- Mobile Menu Button -->
      <div class="flex lg:hidden">
        <button type="button" @click="toggleMobileMenu" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400">
          <span class="sr-only">Open menu</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="h-6 w-6">
            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu Drawer -->
    <transition name="fade">
      <div v-if="mobileMenuOpen" class="lg:hidden fixed inset-0 z-50 bg-black/30" @click="toggleMobileMenu"></div>
    </transition>
    <transition name="slide">
      <div v-if="mobileMenuOpen" class="lg:hidden fixed top-0 right-0 z-50 w-64 h-full bg-gray-900 p-6 overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <nuxt-link to="/" class="text-white font-bold text-xl">E-Shop</nuxt-link>
          <button @click="toggleMobileMenu" class="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>
        <nav class="flex flex-col gap-4">
          <nuxt-link to="/" class="text-white font-semibold">Home</nuxt-link>
          <nuxt-link to="/products" class="text-white font-semibold">Products</nuxt-link>
          <nuxt-link to="/about" class="text-white font-semibold">About Us</nuxt-link>
          <nuxt-link to="/contact" class="text-white font-semibold">Contact</nuxt-link>

          <!-- User actions -->
          <div class="mt-6">
            <template v-if="user">
              <span class="text-white block mb-2">Hello, {{ user.name }}</span>
              <button @click="logout" class="w-full text-white bg-red-500 py-2 rounded hover:bg-red-600">Logout</button>
            </template>
            <template v-else>
              <nuxt-link to="/login" class="block text-white py-2 font-semibold">SignIn</nuxt-link>
              <nuxt-link to="/register" class="block text-white py-2 font-semibold">SignUp</nuxt-link>
            </template>
          </div>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const email = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()

async function login() {
  loading.value = true
  try {
    const { data } = await axios.post('http://127.0.0.1:8000/api/login', {
      email: email.value,
      password: password.value,
    })

    // Store token in localStorage or use your auth strategy
    localStorage.setItem('token', data.token)

    // Redirect based on verify_status
    if (data.user.verify_status === 'pending') {
      router.push('/otp') // Redirect to OTP verification page
    } else {
      router.push('/') // Redirect to home if already verified
    }
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>




<style scoped>
/* Simple transitions */
.fade-enter-active, .fade-leave-active { transition: opacity .3s }
.fade-enter-from, .fade-leave-to { opacity: 0 }
.slide-enter-active { transition: transform .3s ease-out }
.slide-enter-from { transform: translateX(100%) }
.slide-leave-active { transition: transform .3s ease-in }
.slide-leave-to { transform: translateX(100%) }
</style>
