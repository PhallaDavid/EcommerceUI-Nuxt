<template>
    <div class="flex-center relative flex min-h-screen bg-gray-900 p-4">
  <!-- Background Pattern -->
  <div class="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/uploads/dot-grid.png')] opacity-20"></div>

  <!-- Profile Card -->
  <div class="relative flex w-96 flex-col items-center gap-4 overflow-hidden rounded-2xl bg-black shadow-lg">
    <!-- Cover / Banner -->
    <div class="h-40 w-full bg- bg-cover bg-center"></div>

    <!-- Profile Image -->
    <img
      src="https://files.fm/f/nby39br8xn"
"
      class="-mt-14 h-28 w-28 rounded-full border-4 border-green-400 shadow-md"
      alt="Profile Image"
    />

    <!-- Name & Role -->
    <span class="text-lg font-bold text-gray-200">Phalla David</span>
    <span class="text-sm text-gray-400">Web Developer</span>

    <!-- Skills -->
    <div class="flex flex-wrap justify-center gap-2 px-4">
      <span class="rounded-full border-2 border-green-400 px-4 py-1 text-sm font-semibold text-gray-200">Vue.js</span>
      <span class="rounded-full border-2 border-green-400 px-4 py-1 text-sm font-semibold text-gray-200">Nuxt.js</span>
      <span class="rounded-full border-2 border-green-400 px-4 py-1 text-sm font-semibold text-gray-200">Laravel</span>
      <span class="rounded-full border-2 border-green-400 px-4 py-1 text-sm font-semibold text-gray-200">+5</span>
    </div>

    <!-- Stats -->
    <div class="flex w-full justify-around border-t border-gray-700 py-4">
      <div class="flex flex-col items-center">
        <span class="font-semibold text-gray-200">4.9</span>
        <p class="text-xs text-gray-400">Rating</p>
      </div>
      <div class="flex flex-col items-center">
        <span class="font-semibold text-gray-200">10+</span>
        <p class="text-xs text-gray-400">Clients</p>
      </div>
      <div class="flex flex-col items-center">
        <span class="font-semibold text-gray-200">$4/hr</span>
        <p class="text-xs text-gray-400">Rate</p>
      </div>
    </div>

    <!-- Button -->
    <button class="mb-4 w-11/12 rounded-full bg-green-400 px-4 py-2 font-semibold text-gray-900 transition hover:bg-green-500">Get In Touch</button>
  </div>
</div>

</template>