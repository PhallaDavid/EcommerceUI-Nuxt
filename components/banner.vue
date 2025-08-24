<template>
  <div class="w-full max-w-7xl mx-auto overflow-hidden rounded-lg relative">
    <div
      class="flex transition-transform duration-700 ease-in-out"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        v-for="(banner, index) in banners"
        :key="index"
        class="w-full h-44 sm:h-60 md:h-[360px] lg:h-[400px] xl:h-[480px] flex-shrink-0"
      >
        <img
          :src="banner"
          alt="Banner"
          class="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>

    <!-- Prev Button -->
    <button
      @click="prevBanner"
      class="absolute top-1/2 left-4 -translate-y-1/2 p-2 text-white bg-gray-800 rounded-full hover:bg-gray-700 z-10"
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
      class="absolute top-1/2 right-4 -translate-y-1/2 p-2 text-white bg-gray-800 rounded-full hover:bg-gray-700 z-10"
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
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      banners: [
        "https://mir-s3-cdn-cf.behance.net/project_modules/fs/2bbcfa99737217.5ef9be3dbb9a9.jpg",
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
        "https://eegoitaly.in/cdn/shop/collections/Sports_Shoes_Banner.png?v=1690211860&width=1600",
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
