<template>
  <div class="flex justify-center p-4">
    <div
      data-aos="fade-right"
      class="flex w-65 h-auto flex-col gap-2 rounded-lg border border-gray-200 bg-gray-100 p-2 transition hover:shadow-lg"
    >
      <div class="relative">
        <img
          v-if="product.images && product.images.length"
          :src="`http://127.0.0.1:8000${product.images[currentImage]}`"
          :alt="product.name"
          class="rounded-lg object-cover w-full h-40 transition-transform duration-500 hover:scale-105"
        />
        <img
          v-else
          src="/assets/placeholder.jpg"
          alt="No image available"
          class="w-full h-40 rounded-lg"
        />
        <button
          v-if="product.images && product.images.length > 1"
          @click="prevImage"
          class="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full bg-gray-700 bg-opacity-50 p-1 text-white hover:bg-opacity-75 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          v-if="product.images && product.images.length > 1"
          @click="nextImage"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-gray-700 bg-opacity-50 p-1 text-white hover:bg-opacity-75 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <span
          class="absolute top-2 right-2 cursor-pointer"
          @click="toggleFavorite"
          :title="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            :class="[
              'h-8 w-8 transition-colors duration-300',
              isFavorite
                ? 'fill-red-500 stroke-red-600'
                : 'fill-transparent stroke-blue-700 hover:fill-red-500 hover:stroke-red-600',
            ]"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                     2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09 
                     C13.09 3.81 14.76 3 16.5 3 
                     19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </span>
        <div
          v-if="product.images && product.images.length > 1"
          class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1"
        >
          <span
            v-for="(img, index) in product.images"
            :key="index"
            @click="currentImage = index"
            :class="[
              'w-2 h-2 rounded-full cursor-pointer',
              currentImage === index ? 'bg-blue-700' : 'bg-gray-200',
            ]"
          ></span>
        </div>
      </div>

      <!-- Product Info -->
      <div class="flex justify-between pr-2 pl-2">
        <h1 class="text-xl font-semibold text-gray-700">{{ product.name }}</h1>
        <h1 class="text-sm font-semibold text-gray-700">
          ${{ product.price }}
        </h1>
      </div>
      <span class="pl-2 text-xs text-gray-600">{{ product.description }}</span>

      <!-- Rating -->
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
        <span class="text-xs text-gray-600">({{ product.rating }})</span>
      </div>

      <!-- Add to Cart -->
      <button
        class="mt-2 ml-2 self-start rounded-full bg-blue-800 p-2 font-semibold text-gray-200 hover:bg-blue-700 transition flex items-center gap-2"
        @click="addToCart"
        :disabled="loading"
        aria-label="Add to Cart"
      >
        <span v-if="!loading">
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
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.3 5.4a1 1 0 001 1.6h11.6a1 1 0 001-1.6L17 13M7 13H3m14 0a2 2 0 100 4 2 2 0 000-4zM7 17a2 2 0 100 4 2 2 0 000-4z"
            />
          </svg>
        </span>
        <Spinner v-else />
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Spinner from "../components/Spinner.vue";
import { token, addToCart as addCartItem, fetchCart } from "~/stores/cartStore";
import { triggerToast } from "~/stores/toastStore";
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  components: { Spinner },
  props: { product: { type: Object, required: true } },
  data() {
    return { isFavorite: false, loading: false, currentImage: 0 };
  },
  mounted() {
    if (process.client) {
      const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
      this.isFavorite = favs.includes(this.product.id);
    }
  },

  methods: {
    prevImage() {
      if (this.product.images && this.product.images.length > 1) {
        this.currentImage =
          (this.currentImage - 1 + this.product.images.length) %
          this.product.images.length;
      }
    },
    nextImage() {
      if (this.product.images && this.product.images.length > 1) {
        this.currentImage =
          (this.currentImage + 1) % this.product.images.length;
      }
    },
    async toggleFavorite() {
      if (!process.client) return;
      const t = token.value || localStorage.getItem("token");
      if (!t) {
        triggerToast("Please log in first");
        return;
      }

      try {
        const url = `http://127.0.0.1:8000/api/products/${this.product.id}/favorite`;
        if (this.isFavorite)
          await axios.delete(url, {
            headers: { Authorization: `Bearer ${t}` },
          });
        else
          await axios.post(
            url,
            {},
            { headers: { Authorization: `Bearer ${t}` } }
          );

        this.isFavorite = !this.isFavorite;
        let favs = JSON.parse(localStorage.getItem("favorites") || "[]");
        if (this.isFavorite) favs.push(this.product.id);
        else favs = favs.filter((id) => id !== this.product.id);
        localStorage.setItem("favorites", JSON.stringify(favs));
        triggerToast(
          this.isFavorite ? "Added to favorites!" : "Removed from favorites!"
        );
      } catch (e) {
        triggerToast("Failed to update favorites!");
        console.error(e);
      }
    },
    async addToCart() {
      if (!process.client) return;
      const t = token.value || localStorage.getItem("token");
      if (!t) {
        triggerToast("Please log in first");
        return;
      }

      this.loading = true;
      try {
        await axios.post(
          `http://127.0.0.1:8000/api/products/${this.product.id}/cart`,
          {},
          { headers: { Authorization: `Bearer ${t}` } }
        );
        addCartItem({ ...this.product, quantity: 1 });
        await fetchCart();
        triggerToast(`${this.product.name} added to cart!`);
      } catch (e) {
        triggerToast("Failed to add to cart!");
        console.error(e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
img {
  transition: transform 0.5s ease;
}
</style>
