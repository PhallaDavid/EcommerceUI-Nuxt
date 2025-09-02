<template>
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div
      class="flex flex-col justify-center items-center gap-2 mb-6 text-center"
    >
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-800">
        Featured Products
      </h2>
      <p class="text-gray-600 text-sm sm:text-base">
        Check out our featured products below:
      </p>
    </div>

    <!-- Skeleton Loader -->
    <SkeletonCard v-if="loading" />

    <!-- Products Grid -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2"
    >
      <ProductCard
        v-for="(item, index) in products"
        :key="item.id || index"
        :product="item"
        @card-click="goToProductDetail(item)"
        @cart-updated="updateCartCount"
        @favorite-updated="updateFavoriteCount"
        @show-toast="showToastMessage"
      />
    </div>

    <!-- Toast Message -->
    <ToastMessage v-model="showToast" :message="toastMessage" />
  </div>
</template>

<script>
import ProductCard from "~/components/Card/productCard.vue";
import ToastMessage from "~/components/ToastMessage.vue";
import SkeletonCard from "~/components/Card/skeletonCard.vue";
import axios from "axios";
import { fetchCart } from "~/stores/cartStore";

export default {
  components: { ProductCard, ToastMessage, SkeletonCard },
  data() {
    return {
      loading: true, // Loading state added
      favoriteCount: 0,
      products: [],
      showToast: false,
      toastMessage: "",
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/products");
        this.products = res.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        this.loading = false; // Turn off loading after request finishes
      }
    },

    updateCartCount() {
      fetchCart();
    },

    updateFavoriteCount(count) {
      this.favoriteCount = count;
      console.log("Favorite count updated:", count);
    },

    goToProductDetail(product) {
      this.$router.push({
        path: "/Product-detail",
        query: { id: product.id },
      });
    },

    showToastMessage(msg) {
      this.toastMessage = msg;
      this.showToast = true;
      setTimeout(() => (this.showToast = false), 3000);
    },
  },
};
</script>
