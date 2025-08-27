<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="w-full max-w-md">
      <div class="flex flex-col gap-4 rounded-xl bg-gray-200 shadow-xl p-12">
        <span class="text-center text-lg font-bold text-blue-500">
          Welcome Back...!
        </span>

        <!-- Email Field -->
        <label for="email" class="text-sm text-gray-700">Email</label>
        <div class="relative w-full">
          <span
            class="absolute inset-y-0 left-3 flex items-center text-blue-500"
          >
            <!-- User Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75H4.5v-.75z"
              />
            </svg>
          </span>
          <input
            v-model="email"
            type="text"
            id="email"
            placeholder="Enter Your Email"
            class="w-full rounded-full bg-indigo-50 py-2 pr-4 pl-10 text-gray-800 focus:ring-2 focus:text-blue-500 focus:outline-none"
          />
        </div>

        <!-- Password Field -->
        <label for="password" class="text-sm text-gray-700">Password</label>
        <div class="relative w-full">
          <span
            class="absolute inset-y-0 left-3 flex items-center text-blue-500"
          >
            <!-- Lock Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M16.5 10.5V7.5a4.5 4.5 0 10-9 0v3m1.5 0h6M6.75 10.5h10.5a2.25 2.25 0 012.25 2.25v6.75a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5v-6.75a2.25 2.25 0 012.25-2.25z"
              />
            </svg>
          </span>
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            placeholder="Enter Your Password"
            class="w-full rounded-full bg-indigo-50 py-2 pr-10 pl-10 text-gray-800 focus:ring-2 focus:text-blue-500 focus:outline-none"
          />
          <span
            @click="togglePassword"
            class="absolute inset-y-0 right-3 flex cursor-pointer items-center text-blue-500"
          >
            <!-- Eye Icon -->
            <svg
              v-if="!showPassword"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M2.25 12C3.75 7.5 7.5 4.5 12 4.5s8.25 3 9.75 7.5c-1.5 4.5-5.25 7.5-9.75 7.5S3.75 16.5 2.25 12z"
              />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M3 3l18 18M10.477 10.477A3 3 0 0112 9a3 3 0 013 3c0 .795-.309 1.515-.81 2.045M9.879 9.88A3 3 0 009 12c0 .795.309 1.515.81 2.045m2.045 2.045A8.25 8.25 0 012.25 12a8.25 8.25 0 0111.877-7.207"
              />
            </svg>
          </span>
        </div>

        <span class="cursor-pointer self-end text-blue-500 hover:underline">
          Forget password?
        </span>

        <button
          @click="login"
          :disabled="loading"
          class="w-full rounded-full bg-blue-500 px-4 py-2 font-semibold text-white flex justify-center items-center gap-2"
        >
          <span v-if="!loading">Sign In</span>
          <Spinner v-else />
        </button>

        <div class="text-center mt-2 text-gray-700">
          <span>Don't have an account?</span>
          <button
            @click="$router.push('/register')"
            class="text-blue-500 hover:underline ml-1"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Spinner from "~/components/Spinner.vue";
import { triggerToast } from "~/stores/toastStore";

export default {
  components: { Spinner },
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      loading: false,
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    async login() {
      this.loading = true;
      try {
        const res = await axios.post("http://localhost:8000/api/login", {
          email: this.email,
          password: this.password,
        });

        triggerToast("Login successful! Redirecting...", "success");

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("email", this.email);

        this.$router.push("/otp");
      } catch (err) {
        let msg = "Login failed. Please try again.";
        if (err.response?.status === 422)
          msg = err.response.data.errors.email?.[0] || msg;
        triggerToast(msg, "error");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
