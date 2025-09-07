<template>
  <div class="max-w-7xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">{{ categoryName }}</h1>

    <div
      class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-1"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="{
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || '/default.png',
          stock: product.stock,
          slug: product.slug,
        }"
      />
    </div>

    <p v-if="loading" class="text-gray-500 mt-4">Loading products...</p>
    <p v-if="!loading && products.length === 0" class="text-gray-500 mt-4">
      No products found in this category.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import ProductCard from "@/components/Card/productCard.vue";

const route = useRoute();
const categoryId = route.params.id;
const products = ref([]);
const categoryName = ref("");
const loading = ref(true);

const fetchProductsByCategory = async () => {
  loading.value = true;
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/products/category/${categoryId}`
    );

    // ensure it’s an array
    products.value = Array.isArray(res.data) ? res.data : [];

    if (products.value.length > 0) {
      categoryName.value = products.value[0].category?.name || "Unknown";
    }
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchProductsByCategory);
</script>
