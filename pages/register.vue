<template>
  <div class="flex justify-center items-center">
    <div class="w-full max-w-md">
      <div class="flex flex-col gap-4 rounded-lg p-24 border border-gray-200">
        <!-- Header -->
        <span class="text-center text-lg font-bold text-blue-500">
          {{ $t("auth.register") }}
        </span>
        <!-- <p class="text-xs text-gray-700 text-center">
          {{ $t("messages.registerSubtitle") }}
        </p> -->

        <!-- Email -->
        <div class="relative w-full">
          <span
            class="absolute inset-y-0 left-3 flex items-center text-blue-500"
          >
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
            :placeholder="$t('auth.email')"
            class="w-full rounded-full bg-indigo-50 py-4 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          />
        </div>

        <!-- Name -->
        <div class="relative w-full">
          <span
            class="absolute inset-y-0 left-3 flex items-center text-blue-500"
          >
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
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              />
            </svg>
          </span>
          <input
            v-model="name"
            type="text"
            :placeholder="$t('auth.firstName') + ' ' + $t('auth.lastName')"
            class="w-full rounded-full bg-indigo-50 py-4 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          />
        </div>

        <!-- Password -->
        <div class="relative w-full">
          <span
            class="absolute inset-y-0 left-3 flex items-center text-blue-500"
          >
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
            :placeholder="$t('auth.password')"
            class="w-full rounded-full bg-indigo-50 py-4 pl-10 pr-10 text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          />
          <span
            @click="togglePassword"
            class="absolute inset-y-0 right-3 flex items-center text-blue-500 cursor-pointer"
          >
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

        <!-- Confirm Password -->
        <div class="relative w-full">
          <span
            class="absolute inset-y-0 left-3 flex items-center text-blue-500"
          >
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
            v-model="password_confirmation"
            :type="showPassword ? 'text' : 'password'"
            :placeholder="$t('auth.confirmPassword')"
            class="w-full rounded-full bg-indigo-50 py-4 pl-10 pr-10 text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          />
          <span
            @click="togglePassword"
            class="absolute inset-y-0 right-3 flex items-center text-blue-500 cursor-pointer"
          >
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

        <!-- Sign Up Button -->
        <button
          @click="register"
          :disabled="loading"
          class="w-full rounded-full bg-blue-500 px-4 py-4 font-semibold text-white hover:bg-blue-500-dark flex justify-center items-center gap-2 transition-all duration-300"
        >
          <span v-if="!loading">{{ $t("auth.signUp") }}</span>
          <Spinner v-else />
        </button>

        <!-- Sign In Link -->
        <div class="text-center mt-2 text-gray-700">
          <span>{{ $t("auth.alreadyHaveAccount") }}</span>
          <button
            @click="$router.push('/login')"
            class="text-blue-500 hover:underline ml-1"
          >
            {{ $t("auth.signIn") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Spinner from "~/components/Spinner.vue";

export default {
  components: { Spinner },
  data() {
    return {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
      showPassword: false,
      loading: false,
      errorMessage: "",
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },

    async register() {
      this.errorMessage = "";
      this.loading = true;

      try {
        const response = await axios.post(
          "http://localhost:8000/api/register",
          {
            email: this.email,
            name: this.name,
            password: this.password,
            password_confirmation: this.password_confirmation,
          }
        );

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("email", this.email);

        this.$emit("show-global-message", {
          type: "success",
          text: this.$t("messages.registrationSuccess"),
        });

        this.$router.push("/otp");
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.errorMessage = error.response.data.errors.email
            ? error.response.data.errors.email[0]
            : this.$t("messages.invalidData");
        } else {
          this.errorMessage = this.$t("messages.registrationFailed");
        }
        this.$emit("show-global-message", {
          type: "error",
          text: this.errorMessage,
        });
        console.error("Registration failed:", error.response?.data);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
