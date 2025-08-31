<template>
  <div class="max-w-7xl mx-auto my-8">
    <h2 class="text-xl font-bold text-gray-800 mb-4">Related Products</h2>

    <!-- Slider Wrapper -->
    <div ref="slider" class="overflow-hidden relative">
      <div
        class="flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentIndex * cardWidth}px)` }"
      >
        <div
          v-for="product in relatedProducts"
          :key="product.id"
          class="flex-shrink-0 w-[220px] px-2"
        >
          <NuxtLink :to="localePath(`/products/${product.id}`)">
            <div class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg">
              <img
                v-if="product.images && product.images.length"
                :src="`http://127.0.0.1:8000${product.images[0]}`"
                class="w-full h-40 object-cover rounded"
                alt="product image"
              />
              <div class="mt-2 text-gray-800 font-semibold">
                {{ product.name }}
              </div>
              <div class="text-gray-500 text-sm">${{ product.price }}</div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Navigation -->
      <button
        @click="prevSlide"
        class="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
      >
        ◀
      </button>
      <button
        @click="nextSlide"
        class="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
      >
        ▶
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useLocalePath } from "#imports";
import axios from "axios";

const route = useRoute();
const localePath = useLocalePath();
const productId = route.params.id; // automatically get product ID from URL

const relatedProducts = ref([]);
const currentIndex = ref(0);
const cardWidth = 240;

async function fetchRelatedProducts() {
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/products/${productId}`
    );
    relatedProducts.value = res.data.related_products || [];
  } catch (err) {
    console.error("Error fetching related products:", err);
  }
}

function nextSlide() {
  if (
    currentIndex.value <
    relatedProducts.value.length - Math.floor(window.innerWidth / cardWidth)
  ) {
    currentIndex.value++;
  }
}

function prevSlide() {
  if (currentIndex.value > 0) currentIndex.value--;
}

onMounted(() => {
  fetchRelatedProducts();
});
</script>

<style scoped>
/* Optional: smooth transition for slider */
</style>
