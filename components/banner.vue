<template>
  <div class="w-full max-w-7xl mx-auto overflow-hidden rounded-lg relative">
    <!-- Banner Wrapper -->
    <div class="relative w-full h-44 sm:h-60 md:h-[360px] lg:h-[400px] xl:h-[480px]">
      <transition-group name="fade" tag="div" class="w-full h-full relative">
        <div
          v-for="(banner, index) in bannersWithImages"
          :key="banner.id"
          v-show="index === currentIndex"
          class="absolute inset-0 w-full h-full"
        >
          <img
            :src="getBannerImageUrl(banner.images[0])"
            :alt="banner.title || 'Banner Image'"
            class="w-full h-full object-cover rounded-lg"
            @error="onImageError($event)"
          />
          <!-- Title Overlay -->
          <div class="absolute bottom-4 left-4 bg-black/50 text-white px-4 py-2 rounded">
            {{ banner.title }}
          </div>
        </div>
      </transition-group>
    </div>

    <!-- Previous Button -->
    <button
      @click="prevBanner"
      class="absolute top-1/2 left-4 -translate-y-1/2 p-2 text-white bg-gray-800 rounded-full hover:bg-gray-700 z-10"
      :disabled="bannersWithImages.length === 0"
      aria-label="Previous banner"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <!-- Next Button -->
    <button
      @click="nextBanner"
      class="absolute top-1/2 right-4 -translate-y-1/2 p-2 text-white bg-gray-800 rounded-full hover:bg-gray-700 z-10"
      :disabled="bannersWithImages.length === 0"
      aria-label="Next banner"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
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
    };
  },
  computed: {
    bannersWithImages() {
      return this.banners.filter(banner => banner.images && banner.images.length > 0);
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
      }
    },
    getBannerImageUrl(imagePath) {
      if (!imagePath) return this.fallbackImage;
      if (imagePath.startsWith("http")) return imagePath;
      return `http://127.0.0.1:8000${imagePath}`;
    },
    nextBanner() {
      if (this.bannersWithImages.length === 0) return;
      this.currentIndex = (this.currentIndex + 1) % this.bannersWithImages.length;
    },
    prevBanner() {
      if (this.bannersWithImages.length === 0) return;
      this.currentIndex = (this.currentIndex - 1 + this.bannersWithImages.length) % this.bannersWithImages.length;
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
