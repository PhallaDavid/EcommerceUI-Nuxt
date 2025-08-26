<template>
  <div class="flex justify-center p-4">
    <div class="flex w-50 h-auto flex-col gap-2 rounded-lg border border-gray-200 bg-gray-100 p-2 shadow-lg">
      <div class="relative">
        <img class="h-30 w-full rounded-lg object-cover" :src="product.images" :alt="product.name" />
        <span class="absolute top-2 right-2 cursor-pointer" @click="toggleFavorite"
          :title="isFavorite ? 'Remove from favorites' : 'Add to favorites'">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" :class="[ 
            'h-8 w-8 transition-colors duration-300',
            isFavorite
              ? 'fill-red-500 stroke-red-600'
              : 'fill-transparent stroke-green-700 hover:fill-red-500 hover:stroke-red-600',
          ]" stroke="currentColor" stroke-width="2">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09 
                 C13.09 3.81 14.76 3 16.5 3 
                 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </span>
      </div>

      <div class="flex justify-between pr-2 pl-2">
        <h1 class="text-xl font-semibold text-gray-700">{{ product.name }}</h1>
        <h1 class="text-sm font-semibold text-gray-700">${{ product.price }}</h1>
      </div>

      <span class="pl-2 text-xs text-gray-600">{{ product.description }}</span>

      <div class="flex flex-row gap-1 pl-2">
        <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4 w-4">
          <polygon points="12,2 15,9 22,9 17,14 18.5,21 12,17 5.5,21 7,14 2,9 9,9" fill="#065f46" />
        </svg>
        <span class="text-xs text-gray-600">({{ product.rating }})</span>
      </div>

      <!-- Add to Cart -->
      <button
        class="mt-2 ml-2 self-start rounded-full bg-green-800 p-2 font-semibold text-gray-200 hover:bg-green-700 transition flex items-center gap-2"
        @click="addToCart"
        :disabled="loading"
        aria-label="Add to Cart"
      >
        <span v-if="!loading">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.3 5.4a1 1 0 001 1.6h11.6a1 1 0 001-1.6L17 13M7 13H3m14 0a2 2 0 100 4 2 2 0 000-4zM7 17a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
        </span>
        <Spinner v-else  />
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Spinner from "../components/Spinner.vue";

export default {
  components: { Spinner },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isFavorite: false,
      loading: false,
      baseURL: "http://127.0.0.1:8000",
    };
  },
  mounted() {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    this.isFavorite = favs.includes(this.product.id);
  },
  methods: {
    async toggleFavorite() {
      try {
        const token = '109|qZRAG1f7rfv4DNyqHk9dMl8DSSSVmkLiXoXYA87i';
        const endpoint = `${this.baseURL}/api/products/${this.product.id}/favorite`;

        await axios.post(endpoint, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        this.isFavorite = !this.isFavorite;

        let favs = JSON.parse(localStorage.getItem("favorites") || "[]");
        if (this.isFavorite) {
          favs.push(this.product.id);
        } else {
          favs = favs.filter((id) => id !== this.product.id);
        }
        localStorage.setItem("favorites", JSON.stringify(favs));

        this.$emit("favorite-updated", this.product.id);
      } catch (error) {
        console.error("Error favoriting product:", error);
      }
    },

    async addToCart() {
      this.loading = true;
      try {
        const token = '109|qZRAG1f7rfv4DNyqHk9dMl8DSSSVmkLiXoXYA87i';
        const endpoint = `${this.baseURL}/api/products/${this.product.id}/cart`;

        await axios.post(endpoint, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        this.$emit("cart-updated", this.product.id);
        alert(`${this.product.name} added to cart`);
      } catch (error) {
        console.error("Error adding to cart:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
