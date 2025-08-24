<template>
  <div class="max-w-7xl mx-auto pt-8 relative">
    <div
      ref="slider"
      class="overflow-hidden rounded-lg shadow-lg"
      @wheel="onWheel"
    >
      <div
        class="flex transition-transform duration-500"
        :style="{ transform: `translateX(-${currentIndex * cardWidth}%)` }"
      >
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="flex-shrink-0 w-1/4 p-4"
        >
          <div
            class="bg-green-500 rounded-lg p-6 text-white text-center font-semibold cursor-pointer hover:bg-green-600"
          >
            {{ category.name }}
          </div>
        </div>
      </div>
    </div>

    <!-- Prev Button -->
    <button
      @click="prevSlide"
      class="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
    >
      ←
    </button>

    <!-- Next Button -->
    <button
      @click="nextSlide"
      class="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
    >
      →
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      cardWidth: 25, // each card is 25% width
      categories: [
        { name: "Electronics" },
        { name: "Clothing" },
        { name: "Home & Garden" },
        { name: "Sports" },
        { name: "Toys" },
        { name: "Books" },
        { name: "Beauty" },
        { name: "Automotive" },
      ],
    };
  },
  computed: {
    maxIndex() {
      return Math.max(this.categories.length - 4, 0);
    },
  },
  methods: {
    nextSlide() {
      if (this.currentIndex < this.maxIndex) {
        this.currentIndex++;
      }
    },
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    onWheel(event) {
      event.preventDefault();
      if (event.deltaY < 0) {
        this.prevSlide();
      } else {
        this.nextSlide();
      }
    },
  },
};
</script>
