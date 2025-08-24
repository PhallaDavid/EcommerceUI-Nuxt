<template>
  <div class="flex justify-center p-4">
    <div
      class="flex w-50 h-auto flex-col gap-2 rounded-lg border-1 border-gray-200 bg-gray-100 p-2 shadow-lg"
    >
      <!-- Image container -->
      <div class="relative">
        <img
          class="h-30 w-full rounded-lg object-cover"
          :src="product.image"
          :alt="product.name"
        />
        <!-- Favorite Heart -->
        <span class="absolute top-2 right-2 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="h-8 w-8"
          >
            <path
              fill="#065f46"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
               2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
               C13.09 3.81 14.76 3 16.5 3
               19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </span>
      </div>

      <!-- Product Info -->
      <div class="flex justify-between pr-2 pl-2">
        <h1 class="text-xl font-semibold text-gray-700">{{ product.name }}</h1>
        <h1 class="text-sm font-semibold text-gray-700">
          ${{ product.price }}
        </h1>
      </div>
      <span class="pl-2 text-xs text-gray-600">
        {{ product.description }}
      </span>

      <!-- Ratings -->
      <div class="flex flex-row gap-1 pl-2">
        <svg
          v-for="i in 5"
          :key="i"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="h-4 w-4"
        >
          <polygon
            points="12,2 15,9 22,9 17,14 18.5,21 12,17 5.5,21 7,14 2,9 9,9"
            fill="#065f46"
          />
        </svg>
        <span class="text-xs text-gray-600">({{ product.reviews }})</span>
      </div>

      <!-- Add to Cart -->
      <button
        class="mt-2 ml-2 self-start rounded-full bg-green-800 px-4 py-2 font-semibold text-gray-200"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script>
import loading from "../loading.vue";
export default {
  components: {
    loading,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>
