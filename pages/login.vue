<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="w-full max-w-md">
      <div class="flex flex-col gap-4 rounded-lg bg-gray-200 p-8">
        <span class="text-center text-lg font-bold text-gray-800">
          Welcome Back...!
        </span>

        <!-- Email Field -->
        <label for="email" class="text-sm text-gray-800">Email</label>
        <div class="relative w-full">
          <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <!-- User Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75H4.5v-.75z"/>
            </svg>
          </span>
          <input v-model="email" type="text" id="email" placeholder="Enter Your Email"
                 class="w-full rounded-full bg-gray-100 py-2 pr-4 pl-10 text-gray-800 focus:ring-1 focus:ring-green-300 focus:outline-none"/>
        </div>

        <!-- Password Field -->
        <label for="password" class="text-sm text-gray-800">Password</label>
        <div class="relative w-full">
          <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <!-- Lock Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M16.5 10.5V7.5a4.5 4.5 0 10-9 0v3m1.5 0h6M6.75 10.5h10.5a2.25 2.25 0 012.25 2.25v6.75a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5v-6.75a2.25 2.25 0 012.25-2.25z"/>
            </svg>
          </span>
          <input v-model="password" :type="showPassword ? 'text' : 'password'" id="password"
                 placeholder="Enter Your Password"
                 class="w-full rounded-full bg-gray-100 py-2 pr-10 pl-10 text-gray-800 focus:ring-1 focus:ring-green-300 focus:outline-none"/>
          <span @click="togglePassword"
                class="absolute inset-y-0 right-3 flex cursor-pointer items-center text-gray-400">
            <!-- Eye Icon -->
            <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M2.25 12C3.75 7.5 7.5 4.5 12 4.5s8.25 3 9.75 7.5c-1.5 4.5-5.25 7.5-9.75 7.5S3.75 16.5 2.25 12z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M3 3l18 18M10.477 10.477A3 3 0 0112 9a3 3 0 013 3c0 .795-.309 1.515-.81 2.045M9.879 9.88A3 3 0 009 12c0 .795.309 1.515.81 2.045m2.045 2.045A8.25 8.25 0 012.25 12a8.25 8.25 0 0111.877-7.207"/>
            </svg>
          </span>
        </div>

        <span class="cursor-pointer self-end text-green-300 hover:underline">
          Forget password?
        </span>
        <button @click="login" :disabled="loading"
                class="w-full rounded-full bg-green-400 px-4 py-2 font-semibold text-gray-900 hover:bg-green-500 flex justify-center items-center gap-2">
          <span v-if="!loading">Login</span>
          <span v-else>  <Spinner v-if="loading" /></span>
        </button>

        <div class="text-center mt-2">
          <span class="text-gray-800">Don't have an account?</span>
          <button @click="$router.push('/register')" class="text-green-400 hover:underline ml-1">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Spinner from "~/components/Spinner.vue"; // Make sure you have the Spinner component

export default {
  components: { Spinner },
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      loading: false, // <--- add loading
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    async login() {
      this.loading = true; // start spinner
      try {
        const response = await axios.post("http://localhost:8000/api/login", {
          email: this.email,
          password: this.password,
        });

        this.$emit("show-global-message", {
          type: "success",
          text: "Login successful!",
        });

        localStorage.setItem("token", response.data.token);
        // redirect or do something
      } catch (error) {
        let errorMessage = "Login failed. Please try again.";
        if (error.response && error.response.status === 422) {
          errorMessage =
            error.response.data.errors.email?.[0] || "Invalid data.";
        }

        this.$emit("show-global-message", {
          type: "error",
          text: errorMessage,
        });
      } finally {
        this.loading = false; // stop spinner
      }
    },
  },
};
</script>
