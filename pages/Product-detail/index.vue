<template>
  <div class="max-w-7xl mx-auto">
    <h1 class="text-xl text-gray-200 font-semibold mb-4">Product Details</h1>
    <div class="flex flex-row gap-8">
      <div class="flex flex-col gap-4 lg:w-1/2 w-full">
        <div class="w-120 h-120 flex self-center">
          <img
            :src="mainImage"
            alt="Main product image"
            class="w-120 h-120 object-cover rounded"
          />
        </div>
        <div class="flex items-center gap-2">
          <div class="flex items-center relative w-[320px]">
            <button
              @click="prevSlide"
              :disabled="startIndex === 0"
              class="px-2 py-2 rounded-full bg-gray-700 disabled:bg-gray-400 text-white z-20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div class="flex w-full gap-4 overflow-hidden flex-grow">
              <img
                v-for="(img, index) in visibleThumbnails"
                :key="index + startIndex"
                :src="img"
                alt="Thumbnail"
                class="h-20 w-20 rounded cursor-pointer border-2"
                :class="{
                  'border-green-600': img === mainImage,
                  'border-transparent': img !== mainImage,
                }"
                @click="mainImage = img"
              />
            </div>

            <!-- Next button (right), positioned absolute -->
            <button
              @click="nextSlide"
              :disabled="startIndex + visibleCount >= images.length"
              class="absolute right-0 top-1/2 transform -translate-y-1/2 px-2 py-2 rounded-full bg-gray-700 disabled:bg-gray-400 text-white z-20"
            >
              <!-- Right arrow SVG -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div v-if="product" class="lg:w-1/2 w-full text-gray-800 p-6">
        <h2 class="text-3xl font-bold mb-4">{{ product.name }}</h2>
        <p class="text-lg mb-2">{{ product.description }}</p>
        <p class="text-xl font-semibold text-green-700 mb-2">
          ${{ product.price }}
        </p>
        <p class="text-sm text-gray-600 mb-4">Reviews: {{ product.reviews }}</p>
        <button
          class="bg-green-800 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>

    <!-- Other product details -->
    <div v-if="product" class="p-6 mt-6">
      <h2 class="text-2xl font-semibold">{{ product.name }}</h2>
      <p class="my-2">{{ product.description }}</p>
      <p class="text-lg font-bold text-blue-600">$ {{ product.price }}</p>
      <p class="text-sm">Reviews: {{ product.reviews }}</p>
    </div>

    <p v-else class="text-gray-500 mt-4">Loading or product not found...</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1170",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1170",
        "https://images.unsplash.com/photo-1585386959984-a4155224c4c6?q=80&w=1170",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1170",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1170",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1170",
        "https://images.unsplash.com/photo-1585386959984-a4155224c4c6?q=80&w=1170",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1170",
      ],
      mainImage: "",
      product: null,
      startIndex: 0,
      visibleCount: 6,
    };
  },
  computed: {
    visibleThumbnails() {
      return this.images.slice(
        this.startIndex,
        this.startIndex + this.visibleCount
      );
    },
  },
  async created() {
    const id = this.$route.query.id;
    if (id) {
      await this.fetchProductDetail(id);
      // set main image after product is fetched
      this.mainImage = this.images.length > 0 ? this.images[0] : this.product?.image;
    }
  },
  methods: {
    async fetchProductDetail(id) {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);
        this.product = res.data;
      } catch (error) {
        console.error("Error fetching product detail:", error);
      }
    },
    nextSlide() {
      if (this.startIndex + this.visibleCount < this.images.length) {
        this.startIndex++;
      }
    },
    prevSlide() {
      if (this.startIndex > 0) {
        this.startIndex--;
      }
    },
    selectThumbnail(image) {
      this.mainImage = image;
    },
  },
};
</script>

