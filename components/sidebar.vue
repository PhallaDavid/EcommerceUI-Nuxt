<template>
  <div class="sidebar p-4 bg-gray-50 w-64 min-h-screen border-r border-gray-300 flex flex-col justify-between">
    <!-- Top links -->
    <div>
      <h2 class="font-bold text-xl mb-4">Emenu</h2>
      <ul class="space-y-3">
        <li>
          <NuxtLink
            to="/category/home"
            class="block px-4 py-2 bg-gray-200 rounded-lg text-lg hover:bg-blue-500 hover:text-white transition"
          >
            Home
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/category/about"
            class="block px-4 py-2 bg-gray-200 rounded-lg text-lg hover:bg-blue-500 hover:text-white transition"
          >
            About
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/category/contact"
            class="block px-4 py-2 bg-gray-200 rounded-lg text-lg hover:bg-blue-500 hover:text-white transition"
          >
            Contact
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/category/services"
            class="block px-4 py-2 bg-gray-200 rounded-lg text-lg hover:bg-blue-500 hover:text-white transition"
          >
            Services
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/category/blog"
            class="block px-4 py-2 bg-gray-200 rounded-lg text-lg hover:bg-blue-500 hover:text-white transition"
          >
            Blog
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/category/faq"
            class="block px-4 py-2 bg-gray-200 rounded-lg text-lg hover:bg-blue-500 hover:text-white transition"
          >
            FAQ
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/category/settings"
            class="block px-4 py-2 bg-gray-200 rounded-lg text-lg hover:bg-blue-500 hover:text-white transition"
          >
            Settings
          </NuxtLink>
        </li>
      </ul>
    </div>

    <!-- Bottom links -->
    <ul class="space-y-3 mt-6">
      <li>
        <NuxtLink
          to="/category/testimonials"
          class="block px-4 py-2 bg-gray-200 rounded-lg text-lg hover:bg-blue-500 hover:text-white transition"
        >
          Profile
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/category/logout"
          class="block px-4 py-2 bg-gray-200 rounded-lg text-lg hover:bg-blue-500 hover:text-white transition"
        >
          Logout
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
