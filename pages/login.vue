<template>
  <div class="flex justify-center items-center">
    <div class="w-full max-w-md">
      <div class="flex flex-col gap-4 rounded-lg p-24 border border-gray-200">
        <!-- Welcome -->
        <span class="text-center text-lg font-bold text-blue-500">
          {{ $t("common.welcome") }}
        </span>

        <!-- Email Field -->
        <label for="email" class="text-sm text-gray-700">
          {{ $t("auth.email") }}
        </label>
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
            :placeholder="$t('auth.email')"
            class="w-full rounded-full bg-indigo-50 py-4 pr-4 pl-10 text-gray-800 focus:ring-2 focus:text-blue-500 focus:outline-none"
          />
        </div>

        <!-- Password Field -->
        <label for="password" class="text-sm text-gray-700">
          {{ $t("auth.password") }}
        </label>
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
            :placeholder="$t('auth.password')"
            class="w-full rounded-full bg-indigo-50 py-4 pr-10 pl-10 text-gray-800 focus:ring-2 focus:text-blue-500 focus:outline-none"
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
          {{ $t("auth.forgotPassword") }}
        </span>

        <button
          @click="login"
          :disabled="loading"
          class="w-full rounded-full bg-blue-500 px-4 py-4 font-semibold text-white flex justify-center items-center gap-2"
        >
          <span v-if="!loading">{{ $t("auth.signIn") }}</span>
          <Spinner v-else />
        </button>
        <button
          class="w-full rounded-full bg-green-500 px-4 py-4 font-semibold text-white flex justify-center items-center gap-2"
        >
          Login with google
        </button>

        <div class="text-center mt-2 text-gray-700">
          <span>{{ $t("auth.dontHaveAccount") }}</span>
          <button
            @click="$router.push('/register')"
            class="text-blue-500 hover:underline ml-1"
          >
            {{ $t("auth.signUp") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import Spinner from "~/components/Spinner.vue";
import { triggerToast } from "~/stores/toastStore";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const router = useRouter();
const { t } = useI18n();

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);

function togglePassword() {
  showPassword.value = !showPassword.value;
}

async function login() {
  loading.value = true;
  try {
    const res = await axios.post("http://localhost:8000/api/login", {
      email: email.value,
      password: password.value,
    });

    triggerToast(t("messages.loginSuccess"), "success");

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("email", email.value);

    router.push("/otp");
  } catch (err) {
    let msg = t("messages.loginFailed");
    if (err.response?.status === 422) {
      msg = err.response.data.errors.email?.[0] || msg;
    }
    triggerToast(msg, "error");
  } finally {
    loading.value = false;
  }
}
</script>
