<template>
  <div class="max-w-7xl mx-auto relative">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <p class="text-gray-800 text-sm font-semibold">{{$t("nav.categories")}}</p>
      <NuxtLink
        class="text-gray-800 text-sm font-semibold hover:underline"
        :to="localePath('/')"
        >{{$t("nav.seeAll")}}</NuxtLink
      >
    </div>

    <!-- Slider -->
    <div
      ref="slider"
      class="overflow-hidden rounded-lg bg-gray-100 relative"
      @wheel.prevent="onWheel"
    >
      <div
        class="flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentIndex * cardWidth}px)` }"
      >
        <div
          v-for="category in categoriesToShow"
          :key="category.id"
          class="flex-shrink-0 w-64 p-4"
          data-aos="fade-right"
        >
          <NuxtLink
            :to="localePath(`/categories/${category.id}`)"
            class="flex flex-col items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              v-if="category.images"
              :src="`http://127.0.0.1:8000${category.images}`"
              alt="Category Image"
              class="w-32 h-32 object-cover rounded-full mb-2"
            />
            <img
              v-else
              src="/assets/placeholder.jpg"
              alt="No image available"
              class="w-32 h-32 object-cover rounded-full mb-2"
            />
            <p class="text-gray-800 font-semibold text-sm">
              {{ category.name }}
            </p>
          </NuxtLink>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <button
        v-if="categories.length > visibleCards"
        @click="prevSlide"
        class="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 z-10"
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
      <button
        v-if="categories.length > visibleCards"
        @click="nextSlide"
        class="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 z-10"
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
      cardWidth: 256, // matches w-64
      categories: [],
      visibleCards: 5, // default to 5
    };
  },
computed: {
  categoriesToShow() {
    if (!this.categories || this.categories.length === 0) {
      return []; // no categories at all
    }
    if (this.categories.length < 5) {
      const repeatTimes = Math.ceil(5 / this.categories.length);
      return [].concat(...Array(repeatTimes).fill(this.categories)).slice(0, 5);
    }
    return this.categories;
  },
},

  created() {
    this.fetchCategories();
  },
  mounted() {
    AOS.init({ duration: 700, once: true });
    this.calcVisibleCards();
    window.addEventListener("resize", this.calcVisibleCards);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.calcVisibleCards);
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
    calcVisibleCards() {
      this.visibleCards = Math.floor(
        this.$refs.slider.offsetWidth / this.cardWidth
      );
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
