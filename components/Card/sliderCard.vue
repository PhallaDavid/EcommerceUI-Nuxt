<template>
  <div
    class="w-full max-w-2xl sm:max-w-4xl lg:max-w-7xl mx-auto px-1 sm:px-2 relative"
  >
    <!-- Header -->
    <div class="flex justify-between items-center mb-2 sm:mb-3">
      <p class="text-gray-800 text-sm font-semibold">
        {{ $t("nav.categories") }}
      </p>
      <NuxtLink
        class="text-gray-800 text-sm font-semibold hover:underline"
        :to="localePath('/')"
      >
        {{ $t("nav.seeAll") }}
      </NuxtLink>
    </div>

    <!-- Slider -->
    <div ref="slider" class="overflow-hidden relative">
      <div
        class="flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentIndex * stepWidth}px)` }"
      >
        <div
          v-for="category in categoriesToShow"
          :key="category.id"
          class="flex-shrink-0 w-1/3 sm:w-1/4 md:w-1/6 lg:w-1/8 p-1"
          data-aos="fade-right"
        >
          <NuxtLink
            :to="localePath(`/categories/${category.id}`)"
            class="flex flex-col items-center p-1 border border-gray-100 rounded-lg transition hover:shadow-md"
          >
            <img
              v-if="category.images"
              :src="`http://127.0.0.1:8000${category.images}`"
              alt="Category Image"
              class="w-10 sm:w-12 md:w-14 lg:w-16 h-10 sm:h-12 md:h-14 lg:h-16 rounded-full mb-1"
            />
            <img
              v-else
              src="/assets/placeholder.jpg"
              alt="No image available"
              class="w-10 sm:w-12 md:w-14 lg:w-16 h-10 sm:h-12 md:h-14 lg:h-16 object-cover rounded-full mb-1"
            />
            <p
              class="text-gray-800 font-semibold text-xs sm:text-sm text-center"
            >
              {{ category.name }}
            </p>
          </NuxtLink>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <button
        v-if="categories.length > visibleCards"
        @click="prevSlide"
        class="absolute top-1/2 left-0 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75 z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
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
        v-if="categories.length > visibleCards"
        @click="nextSlide"
        class="absolute top-1/2 right-0 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75 z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
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
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useLocalePath } from "#imports";

export default {
  setup() {
    const localePath = useLocalePath();
    return { localePath };
  },
  data() {
    return {
      currentIndex: 0,
      categories: [],
      stepWidth: 0,
      visibleCards: 1,
    };
  },
  computed: {
    categoriesToShow() {
      if (!this.categories || this.categories.length === 0) return [];
      return this.categories.slice(0, 20);
    },
    maxIndex() {
      return Math.max(0, this.categoriesToShow.length - this.visibleCards);
    },
  },
  mounted() {
    AOS.init({ duration: 700, once: true });
    this.$nextTick(() => this.calcStepWidth());
    window.addEventListener("resize", this.calcStepWidth);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.calcStepWidth);
  },
  methods: {
    async fetchCategories() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/categories");
        this.categories = res.data;
        this.$nextTick(() => this.calcStepWidth());
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    calcStepWidth() {
      if (!this.$refs.slider) return;
      const cardEl = this.$refs.slider.querySelector(".flex-shrink-0");
      if (!cardEl) return;

      this.stepWidth = cardEl.offsetWidth;
      const sliderWidth = this.$refs.slider.offsetWidth;
      this.visibleCards = Math.floor(sliderWidth / this.stepWidth);
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
  created() {
    this.fetchCategories();
  },
};
</script>
