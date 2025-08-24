<template>
  <div class="flex justify-center align-items-center">
    <div class="d-flex flex-center flex min-h-2 gap-4 p-24">
      <div
        class="flex w-96 flex-col justify-center gap-6 rounded-2xl bg-black p-8 shadow-lg"
      >
        <!-- Title -->
        <div class="flex justify-center">
          <span class="text-xl font-bold text-gray-200">OTP Verification</span>
        </div>

        <!-- Subtitle -->
        <div class="flex flex-col justify-center text-center">
          <span class="text-sm font-semibold text-gray-200"
            >Verify Your Phone Number</span
          >
          <span class="text-xs text-gray-400"
            >Enter the 4-digit code sent to your phone</span
          >
        </div>

        <!-- OTP Inputs -->
        <div class="flex justify-center gap-3">
          <input
            type="text"
            maxlength="1"
            class="h-12 w-12 rounded-md border border-gray-600 bg-gray-900 text-center text-lg text-gray-200 focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none"
          />
          <input
            type="text"
            maxlength="1"
            class="h-12 w-12 rounded-md border border-gray-600 bg-gray-900 text-center text-lg text-gray-200 focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none"
          />
          <input
            type="text"
            maxlength="1"
            class="h-12 w-12 rounded-md border border-gray-600 bg-gray-900 text-center text-lg text-gray-200 focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none"
          />
          <input
            type="text"
            maxlength="1"
            class="h-12 w-12 rounded-md border border-gray-600 bg-gray-900 text-center text-lg text-gray-200 focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:outline-none"
          />
        </div>

        <!-- Verify Button -->
        <button
          class="w-full rounded-full bg-green-400 px-4 py-2 font-semibold text-gray-900 transition hover:bg-green-500"
        >
          Verify
        </button>
      </div>
    </div>
  </div>
</template>
