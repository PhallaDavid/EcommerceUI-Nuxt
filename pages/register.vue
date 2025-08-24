<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md bg-black rounded-2xl shadow-lg p-8">
      <!-- Header -->
      <div class="text-center mb-6">
        <h2 class="text-lg font-bold text-gray-200">Create Account Now</h2>
        <p class="text-xs text-gray-200">Create An Account Now start</p>
        <hr class="my-2 border-gray-600" />
        <p class="text-xs text-gray-200">Manage Payment</p>
      </div>

      <!-- Form Fields -->
      <div class="flex flex-col gap-4">
        <!-- Email -->
        <input
          type="text"
          placeholder="Email"
          class="w-full rounded-full bg-gray-900 py-2 pl-5 pr-4 text-gray-200 focus:ring-1 focus:ring-green-300 focus:outline-none"
        />

        <!-- Name -->
        <input
          type="text"
          placeholder="Name"
          class="w-full rounded-full bg-gray-900 py-2 pl-5 pr-4 text-gray-200 focus:ring-1 focus:ring-green-300 focus:outline-none"
        />

        <!-- Password -->
        <div class="relative w-full">
          <input
            type="password"
            placeholder="Password"
            class="w-full rounded-full bg-gray-900 py-2 pl-5 pr-10 text-gray-200 focus:ring-1 focus:ring-green-300 focus:outline-none"
          />
          <!-- Eye Icon -->
          <span
            onclick="togglePassword()"
            class="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
          >
            👁️
          </span>
        </div>

        <!-- Confirm Password -->
        <div class="relative w-full">
          <input
            type="password"
            placeholder="Confirm Password"
            class="w-full rounded-full bg-gray-900 py-2 pl-5 pr-10 text-gray-200 focus:ring-1 focus:ring-green-300 focus:outline-none"
          />
          <!-- Eye Icon -->
          <span
            onclick="togglePassword()"
            class="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
          >
            👁️
          </span>
        </div>

        <!-- Sign Up Button -->
        <button
          class="w-full rounded-full bg-green-400 px-4 py-2 font-semibold text-gray-900 hover:bg-green-500 transition"
        >
          SignUp
        </button>

        <!-- Sign In Link -->
        <div class="text-center mt-2">
          <span class=" text-gray-200">Already have an account?</span>
          <button @click="$router.push('/login')" class=" text-green-400 hover:underline ml-1">
            Sign In
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
