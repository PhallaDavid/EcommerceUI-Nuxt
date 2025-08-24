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

      <!-- Carousel -->
      <div
        class="flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentIndex * cardWidth}px)` }"
      >
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="flex-shrink-0 w-[280px]"
          data-aos="fade-right"
        >
          <div
            class="flex flex-col rounded-lg p-4 text-center font-semibold cursor-pointer"
          >
            <img
              :src="category.image"
              alt="Category Image"
              class="w-40 h-40 mx-auto object-cover mb-4 rounded-full"
            />
            <p class="text-gray-800 text-sm font-semibold">
              {{ category.name }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Prev Button -->
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

export default {
  data() {
    return {
      currentIndex: 0,
      cardWidth: 280,
      categories: [
        {
          name: "Electronics",
          image:
            "https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/shoes_women_tcc_d_234be42564.jpg",
        },
        {
          name: "Clothing",
          image:
            "https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/shoes_women_tcc_d_234be42564.jpg",
        },
        {
          name: "Home & Garden",
          image:
            "https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/shoes_women_tcc_d_234be42564.jpg",
        },
        {
          name: "Sports",
          image:
            "https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/shoes_women_tcc_d_234be42564.jpg",
        },
        {
          name: "Toys",
          image:
            "https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/shoes_women_tcc_d_234be42564.jpg",
        },
        {
          name: "Books",
          image:
            "https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/shoes_women_tcc_d_234be42564.jpg",
        },
        {
          name: "Beauty",
          image:
            "https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/shoes_women_tcc_d_234be42564.jpg",
        },
        {
          name: "Automotive",
          image:
            "https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/shoes_women_tcc_d_234be42564.jpg",
        },
      ],
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
  methods: {
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
