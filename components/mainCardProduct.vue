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
      @click="goToProductDetail(item)"
      @cart-updated="updateCartCount"
      @favorite-updated="updateFavoriteCount"
    />
  </div>
</template>

<script>
import ProductCard from "~/components/Card/productCard.vue";

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      favoriteCount: 0,
      products: [
        {
          id: 1,
          name: "Headphones",
          price: 599.0,
          image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1170&auto=format",
          description: "A perfect balance of high-fidelity audio",
          reviews: 121,
        },
        {
          id: 2,
          name: "Smart Watch",
          price: 299.0,
          image:
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1170",
          description: "Track fitness and stay connected",
          reviews: 89,
        },
        {
          id: 3,
          name: "Smart Watch",
          price: 299.0,
          image:
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1170",
          description: "Track fitness and stay connected",
          reviews: 89,
        },
        {
          id: 4,
          name: "Smart Watch",
          price: 299.0,
          image:
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1170",
          description: "Track fitness and stay connected",
          reviews: 89,
        },
        {
          id: 5,
          name: "Smart Watch",
          price: 299.0,
          image:
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1170",
          description: "Track fitness and stay connected",
          reviews: 89,
        },
      ],
      cartCount: 0,
    };
  },
  methods: {
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
