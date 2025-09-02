<template>
  <div id="controls-carousel" class="relative w-full" data-carousel="static">
    <!-- Carousel wrapper -->
    <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
      <!-- Dynamic Items -->
      <div
        v-for="(banner, index) in bannersWithImages"
        :key="banner.id"
        :class="[
          'duration-700 ease-in-out',
          currentIndex === index ? '' : 'hidden',
        ]"
        data-carousel-item
      >
        <img
          :src="getBannerImageUrl(banner.images[0])"
          class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover"
          :alt="banner.title || 'Banner Image'"
          @error="onImageError($event)"
        />
      </div>
    </div>

    <!-- Slider controls -->
    <button
      type="button"
      class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      @click="prevBanner"
    >
      <span
        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
      >
        <svg
          class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
        <span class="sr-only">Previous</span>
      </span>
    </button>

    <button
      type="button"
      class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      @click="nextBanner"
    >
      <span
        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
      >
        <svg
          class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
        <span class="sr-only">Next</span>
      </span>
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      currentIndex: 0,
      banners: [],
      fallbackImage: "https://via.placeholder.com/800x400?text=No+Image",
      interval: null,
      loading: true,
    };
  },
  computed: {
    bannersWithImages() {
      return this.banners.filter(
        (banner) => banner.images && banner.images.length > 0
      );
    },
  },
  created() {
    this.fetchBanner();
  },
  mounted() {
    this.interval = setInterval(() => {
      this.nextBanner();
    }, 5000);
  },
  beforeUnmount() {
    if (this.interval) clearInterval(this.interval);
  },
  methods: {
    async fetchBanner() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/banners");
        this.banners = response.data;
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        this.loading = false;
      }
    },
    getBannerImageUrl(imagePath) {
      if (!imagePath) return this.fallbackImage;
      if (imagePath.startsWith("http")) return imagePath;
      return `http://127.0.0.1:8000${imagePath}`;
    },
    nextBanner() {
      if (this.bannersWithImages.length === 0) return;
      this.currentIndex =
        (this.currentIndex + 1) % this.bannersWithImages.length;
    },
    prevBanner() {
      if (this.bannersWithImages.length === 0) return;
      this.currentIndex =
        (this.currentIndex - 1 + this.bannersWithImages.length) %
        this.bannersWithImages.length;
    },
    onImageError(event) {
      event.target.src = this.fallbackImage;
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
