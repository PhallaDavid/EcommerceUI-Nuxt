<template>
  <div class="max-w-7xl mx-auto bg-gray-100 rounded-lg p-4 relative">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4 px-2">
      <p class="text-gray-800 text-sm font-semibold">Promotion Products</p>
      <NuxtLink class="text-gray-800 text-sm font-semibold hover:underline" to="/products">See All</NuxtLink>
    </div>

    <!-- Slider -->
    <div ref="slider" class="overflow-hidden relative" @wheel.prevent="onWheel">
      <div
        class="flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentIndex * cardWidth}px)` }"
      >
        <div
          v-for="product in products"
          :key="product.id"
          class="flex-shrink-0 w-64 sm:w-56 md:w-60 lg:w-64 px-2"
          data-aos="fade-right"
        >
          <ProductCard :product="product" />
        </div>
      </div>

      <!-- Navigation Buttons -->
      <button
        @click="prevSlide"
        class="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        @click="nextSlide"
        class="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import ProductCard from "~/components/Card/productCard.vue";

export default {
  components: { ProductCard },
  data() {
    return {
      products: [],
      currentIndex: 0,
      cardWidth: 280,
    };
  },
  computed: {
    maxIndex() {
      const sliderWidth = this.$refs.slider?.offsetWidth || 0;
      const visibleCards = Math.floor(sliderWidth / this.cardWidth);
      return Math.max(this.products.length - visibleCards, 0);
    },
  },
  mounted() {
    this.fetchProducts();
    AOS.init({ duration: 700, once: true });
    window.addEventListener("resize", this.updateMaxIndex);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateMaxIndex);
  },
  methods: {
    async fetchProducts() {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/products/promotion"
        );
        console.log("Fetched products:", res.data);
        this.products = res.data.data || res.data; // handle API response shape
      } catch (error) {
        console.error("Error fetching promotion products:", error);
      }
    },
    nextSlide() {
      if (this.currentIndex < this.maxIndex) this.currentIndex++;
    },
    prevSlide() {
      if (this.currentIndex > 0) this.currentIndex--;
    },
    onWheel(event) {
      event.preventDefault();
      if (event.deltaY < 0) this.prevSlide();
      else this.nextSlide();
    },
    updateMaxIndex() {
      // recompute maxIndex on resize
      this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
    },
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  .w-\[280px\] {
    width: 220px !important;
  }
}
</style>
