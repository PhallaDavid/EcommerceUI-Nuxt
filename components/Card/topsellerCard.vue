<template>
  <section class="py-8 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Section Title -->
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Top Sellers</h2>

      <!-- Top Sellers Cards -->
      <div class="flex gap-6 overflow-x-auto pb-4">
        <!-- Card 1 -->
        <div
          class="relative flex w-64 flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow hover:shadow-lg transition flex-shrink-0"
        >
          <span
            class="absolute top-2 left-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow"
          >
            Top Seller
          </span>
          <img
            src="/"
            alt="Product 1"
            class="rounded-lg w-full h-40 object-cover transition-transform duration-500 hover:scale-105"
          />
          <div class="flex justify-between items-center mt-2">
            <h2 class="text-lg font-semibold text-gray-700">Classic Sneakers</h2>
            <span class="text-sm font-bold text-gray-900">$120</span>
          </div>
          <div class="flex items-center gap-1 mt-1">
            <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4 w-4" :fill="i <= 4 ? '#facc15' : '#e5e7eb'">
              <polygon points="12,2 15,9 22,9 17,14 18.5,21 12,17 5.5,21 7,14 2,9 9,9"/>
            </svg>
            <span class="text-xs text-gray-500">(250 sold)</span>
          </div>
          <button class="mt-3 w-full bg-blue-700 text-white py-2 rounded-full font-semibold hover:bg-blue-600 transition flex justify-center items-center gap-2">
            Add to Cart
          </button>
        </div>

        <!-- Card 2 -->
        <div
          class="relative flex w-64 flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow hover:shadow-lg transition flex-shrink-0"
        >
          <span
            class="absolute top-2 left-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow"
          >
            Top Seller
          </span>
          <img
            src="/"
            alt="Product 2"
            class="rounded-lg w-full h-40 object-cover transition-transform duration-500 hover:scale-105"
          />
          <div class="flex justify-between items-center mt-2">
            <h2 class="text-lg font-semibold text-gray-700">Leather Bag</h2>
            <span class="text-sm font-bold text-gray-900">$80</span>
          </div>
          <div class="flex items-center gap-1 mt-1">
            <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4 w-4" :fill="i <= 5 ? '#facc15' : '#e5e7eb'">
              <polygon points="12,2 15,9 22,9 17,14 18.5,21 12,17 5.5,21 7,14 2,9 9,9"/>
            </svg>
            <span class="text-xs text-gray-500">(300 sold)</span>
          </div>
          <button class="mt-3 w-full bg-blue-700 text-white py-2 rounded-full font-semibold hover:bg-blue-600 transition flex justify-center items-center gap-2">
            Add to Cart
          </button>
        </div>

        <!-- Add more cards as needed -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "TopSellersSection",
};
</script>

<style scoped>
/* Optional: hide scrollbar */
.flex::-webkit-scrollbar {
  display: none;
}
.flex {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
