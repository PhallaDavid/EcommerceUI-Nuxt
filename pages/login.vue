<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="w-full max-w-md">
      <div class="flex flex-col gap-4 rounded-lg bg-gray-200 p-8">
        <span class="text-center text-lg font-bold text-gray-800">
          Welcome Back...!
        </span>

        <!-- Name Field -->
        <label for="name" class="text-sm text-gray-800">Name</label>
        <div class="relative w-full">
          <span
            class="absolute inset-y-0 left-3 flex items-center text-gray-400"
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
            type="text"
            name="name"
            id="name"
            placeholder="Enter Your Name"
            class="w-full rounded-full bg-gray-100 py-2 pr-4 pl-10 text-gray-800 focus:ring-1 focus:ring-green-300 focus:outline-none"
          />
        </div>

        <!-- Password Field -->
        <label for="Password" class="text-sm text-gray-800">Password</label>
        <div class="relative w-full">
          <span
            class="absolute inset-y-0 left-3 flex items-center text-gray-400"
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
            type="password"
            name="Password"
            id="Password"
            placeholder="Enter Your Password"
            class="w-full rounded-full bg-gray-100 py-2 pr-10 pl-10 text-gray-800 focus:ring-1 focus:ring-green-300 focus:outline-none"
          />
          <!-- Eye Icon -->
          <span
            onclick="togglePassword()"
            class="absolute inset-y-0 right-3 flex cursor-pointer items-center text-gray-400"
          >
            <svg
              id="eyeIcon"
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
          </span>
        </div>

        <span class="cursor-pointer self-end text-green-300 hover:underline">
          Forget password?
        </span>

        <button
          @click="$router.push('/otp')"
          class="w-full rounded-full bg-green-400 px-4 py-2 font-semibold text-gray-900 hover:bg-green-500"
        >
          Login
        </button>
        <div class="text-center mt-2">
          <span class="text-gray-800">Don't have an account?</span>
          <button
            @click="$router.push('/register')"
            class="text-green-400 hover:underline ml-1"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
