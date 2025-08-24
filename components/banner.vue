<template>
  <div
    class="w-full max-w-7xl mx-auto overflow-hidden rounded-lg shadow-lg"
  >
    <div class="relative h-44 sm:h-60 md:h-[360px] lg:h-[400px] xl:h-[480px]">
      <img
        :src="banners[currentIndex]"
        alt="Banner"
        class="w-full h-full rounded-lg object-cover transition duration-500"
      />
      <!-- Prev Button -->
      <button
        @click="prevBanner"
        class="absolute top-1/2 left-4 -translate-y-1/2 p-2 text-white bg-gray-800 rounded-full hover:bg-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <!-- Next Button -->
      <button
        @click="nextBanner"
        class="absolute top-1/2 right-4 -translate-y-1/2 p-2 text-white bg-gray-800 rounded-full hover:bg-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      banners: [
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
        "https://images.unsplash.com/photo-1522199778949-687d08a7e9d9",
      ],
    };
  },
  methods: {
    nextBanner() {
      this.currentIndex = (this.currentIndex + 1) % this.banners.length;
    },
    prevBanner() {
      this.currentIndex =
        (this.currentIndex - 1 + this.banners.length) % this.banners.length;
    },
  },
};
</script>
