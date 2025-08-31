<template>
  <div
    class="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto overflow-hidden rounded-lg relative"
  >
    <div
      v-if="loading"
      class="animate-pulse w-full h-44 sm:h-60 md:h-[360px] lg:h-[400px] xl:h-[480px] bg-gray-200 rounded-lg relative"
    ></div>

    <!-- Banner Wrapper -->
    <div
      v-else
      class="relative w-full h-44 sm:h-60 md:h-[360px] lg:h-[400px] xl:h-[480px]"
    >
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
          <!-- <div
            class="absolute bottom-4 left-4 bg-black/50 text-white px-4 py-2 rounded"
          >
            {{ banner.title }}
          </div> -->
        </div>
      </transition-group>
    </div>
    <button
      @click="prevBanner"
      class="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 p-1.5 sm:p-2 text-white bg-gray-800/80 hover:bg-gray-700/80 rounded-full z-10 transition-all duration-200"
      :disabled="bannersWithImages.length === 0"
      aria-label="Previous banner"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4 sm:w-6 sm:h-6"
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
      class="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 p-1.5 sm:p-2 text-white bg-gray-800/80 hover:bg-gray-700/80 rounded-full z-10 transition-all duration-200"
      :disabled="bannersWithImages.length === 0"
      aria-label="Next banner"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4 sm:w-6 sm:h-6"
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

    <!-- Dots Navigation -->
    <div
      v-if="bannersWithImages.length > 1"
      class="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 sm:space-x-2 z-10"
    >
      <button
        v-for="(banner, index) in bannersWithImages"
        :key="`dot-${banner.id}`"
        @click="goToBanner(index)"
        :class="[
          'rounded-full transition-all duration-300',
          'w-2 h-2 sm:w-3 sm:h-3',
          index === currentIndex
            ? 'bg-white scale-125 shadow-lg'
            : 'bg-white/50 hover:bg-white/75',
        ]"
        :aria-label="`Go to banner ${index + 1}`"
      ></button>
    </div>
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
    goToBanner(index) {
      this.currentIndex = index;
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
