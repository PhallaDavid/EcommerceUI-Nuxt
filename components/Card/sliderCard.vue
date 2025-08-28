<template>
  <div class="max-w-7xl mx-auto pt-8 relative">
    <!-- Category Wrapper -->
    <div
      ref="slider"
      class="overflow-hidden rounded-lg bg-gray-100"
      @wheel="onWheel"
    >
      <!-- Header -->
      <div class="flex flex-row justify-between items-center p-4">
        <p class="text-gray-800 text-sm font-semibold">Category</p>
        <nuxt-link
          class="text-gray-800 text-sm font-semibold hover:underline"
          to="/"
          >See All</nuxt-link
        >
      </div>
      <div
        class="flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentIndex * cardWidth}px)` }"
      >
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="flex-shrink-0 w-[200px]"
          data-aos="fade-right"
        >
          <NuxtLink
            :to="`/categories/${category.id}`"
            class="flex flex-col rounded-lg p-4 text-center font-semibold cursor-pointer"
          >
            <img
              v-if="category.images"
              :src="`http://127.0.0.1:8000${category.images}`"
              alt="Category Image"
              class="w-30 h-30 hover:shadow-lg mx-auto hover:border-gray-200 border-lg object-cover mb-4 rounded-full"
            />
            <img
              v-else
              src="/assets/placeholder.jpg"
              alt="No image available"
              class="w-30 h-30 mx-auto object-cover mb-4 rounded-full"
            />

            <p class="text-gray-800 text-sm font-semibold">
              {{ category.name }}
            </p>
            <p class="text-gray-800 text-xs font-light">
              {{ category.description }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </div>
    <button
      @click="prevSlide"
      class="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
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
      @click="nextSlide"
      class="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
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
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

export default {
  data() {
    return {
      currentIndex: 0,
      cardWidth: 280,
      categories: [],
    };
  },
  computed: {
    maxIndex() {
      const visibleCards = Math.floor(
        this.$refs.slider?.offsetWidth / this.cardWidth
      );
      return Math.max(this.categories.length - visibleCards, 0);
    },
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/categories");
        this.categories = res.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
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
  },
  mounted() {
    AOS.init({ duration: 700, once: true });
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
