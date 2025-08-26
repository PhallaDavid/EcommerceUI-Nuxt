<template>
  <div class="flex flex-col justify-center items-center gap-4">
    <h2 class="text-2xl text-gray-800 font-bold">Featured Products</h2>
    <p class="text-gray-800">Check out our featured products below:</p>
  </div>

  <div class="flex bg-gray-100 rounded flex-wrap justify-start gap-2 p-4">
    <ProductCard
      v-for="(item, index) in products"
      :key="index"
      :product="item"
      @card-click="goToProductDetail(item)"
      @cart-updated="updateCartCount"
      @favorite-updated="updateFavoriteCount"
    />
  </div>
</template>

<script>
import ProductCard from "~/components/Card/productCard.vue";
import axios from "axios";

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      favoriteCount: 0,
      products: [],
      cartCount: 0,
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
      }
    },
    updateCartCount(count) {
      this.$dispatch("cartCountUpdated", count);
    },
    goToProductDetail(product) {
      this.$router.push({
        path: "/Product-detail",
        query: { id: product.id },
      });
    },

    updateFavoriteCount(count) {
      this.favoriteCount = count;
      console.log("Favorite count updated:", count);
    },
  },
};
</script>
