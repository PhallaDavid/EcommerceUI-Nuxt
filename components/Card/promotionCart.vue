<template>
  <div class="max-w-7xl mx-auto rounded-lg relative">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4 px-2">
      <p class="text-gray-800 text-sm font-semibold">
        {{ $t("product.productDiscounted") }}
      </p>
      <NuxtLink
        class="text-gray-800 text-sm font-semibold hover:underline"
        :to="localePath('/products')"
        >{{ $t("nav.seeAll") }}</NuxtLink
      >
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
          class="flex-shrink-0 w-full xs:w-1/1 sm:w-1/2 md:w-1/4 lg:w-1/3 xl:w-1/4 px-1 sm:px-2"
          data-aos="fade-right"
        >
          <ProductCard :product="product" />
        </div>
      </div>

      <!-- Navigation Buttons -->
      <button
        @click="prevSlide"
        v-if="products.length > visibleCards"
        class="absolute top-1/2 left-0.5 sm:left-1 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-1.5 sm:p-2 rounded-full z-10 transition-all duration-200 shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 sm:w-6 sm:h-6"
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
      <button
        @click="nextSlide"
        v-if="products.length > visibleCards"
        class="absolute top-1/2 right-1 -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 sm:w-6 sm:h-6"
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
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import ProductCard from "~/components/Card/productCard.vue";
import { useLocalePath } from "#imports";

export default {
  components: { ProductCard },
  setup() {
    const localePath = useLocalePath();
    return { localePath };
  },
  data() {
    return {
      products: [],
      currentIndex: 0,
      cardWidth: 0,
      visibleCards: 1,
    };
  },
  computed: {
    maxIndex() {
      return Math.max(this.products.length - this.visibleCards, 0);
    },
  },
  mounted() {
    this.fetchProducts();
    AOS.init({ duration: 700, once: true });
    this.$nextTick(() => this.calcCardWidth());
    window.addEventListener("resize", this.calcCardWidth);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.calcCardWidth);
  },
  methods: {
    async fetchProducts() {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/products/promotion"
        );
        this.products = (res.data.data || res.data).slice(0, 10);
        this.$nextTick(() => this.calcCardWidth());
      } catch (error) {
        console.error("Error fetching promotion products:", error);
      }
    },
    calcCardWidth() {
      if (!this.$refs.slider) return;
      const cardEl = this.$refs.slider.querySelector(".flex-shrink-0");
      if (!cardEl) return;
      this.cardWidth = cardEl.offsetWidth;
      const sliderWidth = this.$refs.slider.offsetWidth;
      this.visibleCards = Math.floor(sliderWidth / this.cardWidth);
      if (this.currentIndex > this.maxIndex) this.currentIndex = this.maxIndex;
    },
    nextSlide() {
      if (this.currentIndex < this.maxIndex) this.currentIndex++;
    },
    prevSlide() {
      if (this.currentIndex > 0) this.currentIndex--;
    },
    onWheel(event) {
      if (event.deltaY < 0) this.prevSlide();
      else this.nextSlide();
    },
  },
};
</script>
