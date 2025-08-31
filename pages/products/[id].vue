<template>
  <div class="max-w-7xl mx-auto">
    <Breadcrumb :items="breadcrumbItems" />
    <section class="bg-white">
      <div class="max-w-screen-xl mx-auto 2xl:px-0">
        <div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16" v-if="product">
          <!-- Product Images -->
          <div class="relative overflow-hidden rounded-lg">
            <div
              class="relative overflow-hidden rounded-lg shadow zoom-container"
            >
              <transition name="slide" mode="out-in">
                <img
                  :key="mainImage"
                  :src="mainImage"
                  :alt="product.name"
                  class="w-full max-w-[600px] h-auto object-cover rounded-lg cursor-pointer zoom-image"
                  @click="openImageModal(currentIndex)"
                  @mousemove="handleMouseMove"
                  @mouseenter="showZoom = true"
                  @mouseleave="showZoom = false"
                />
              </transition>

              <!-- Zoom Preview -->
              <div
                v-if="showZoom"
                class="zoom-preview"
                :style="{
                  backgroundImage: `url(${mainImage})`,
                  backgroundPosition: zoomPosition,
                }"
              ></div>

              <!-- Image Count -->
              <div
                class="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm shadow z-10"
              >
                {{ currentIndex + 1 }}/{{ images.length }}
              </div>
            </div>

            <!-- Prev / Next Buttons -->
            <button
              @click="prevImage"
              class="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800/50 text-white p-2 rounded-full hover:bg-gray-800"
            >
              ‹
            </button>
            <button
              @click="nextImage"
              class="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800/50 text-white p-2 rounded-full hover:bg-gray-800"
            >
              ›
            </button>

            <!-- Thumbnails -->
            <div class="flex gap-2 mt-4 justify-center">
              <img
                v-for="(img, idx) in visibleThumbnails"
                :key="idx"
                :src="img"
                :alt="`Thumbnail ${idx + 1}`"
                class="w-16 h-16 object-cover rounded cursor-pointer border-2"
                :class="
                  mainImage === img ? 'border-blue-700' : 'border-gray-200'
                "
                @click="mainImage = img"
              />
            </div>
          </div>

          <!-- Product Info -->
          <div class="mt-6 sm:mt-8 lg:mt-0">
            <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl">
              {{ product.name }}
            </h1>

            <!-- Price and Rating -->
            <div
              class="mt-4 flex flex-col sm:flex-row sm:items-center sm:gap-4"
            >
              <p class="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                ${{ product.price }}
              </p>

              <div class="flex items-center gap-2 mt-2 sm:mt-0">
                <div class="flex items-center gap-1">
                  <svg
                    v-for="n in 5"
                    :key="n"
                    class="w-4 h-4"
                    :class="
                      n <= Math.round(product.rating || 0)
                        ? 'text-yellow-300'
                        : 'text-gray-300'
                    "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                    />
                  </svg>
                </div>
                <p class="text-sm text-gray-500">({{ product.rating || 0 }})</p>
                <span class="text-sm text-gray-900">
                  {{ product.sold_count || 0 }} {{ $t("product.sold") }}
                </span>
              </div>
            </div>

            <!-- Options -->
            <div class="mt-4 space-y-4">
              <div v-if="product.sizes?.length">
                <label class="text-sm font-medium text-gray-700"
                  >{{ $t("product.size") }}:</label
                >
                <div class="flex gap-2 mt-1">
                  <button
                    v-for="size in product.sizes"
                    :key="size"
                    @click="selectedSize = size"
                    :class="[
                      'px-3 py-1 rounded border transition',
                      selectedSize === size
                        ? 'bg-blue-700 text-white border-blue-700'
                        : 'bg-white text-gray-700 border-gray-300',
                    ]"
                  >
                    {{ size }}
                  </button>
                </div>
              </div>
              <div v-if="product.colors?.length">
                <label class="text-sm font-medium text-gray-700"
                  >{{ $t("product.color") }}:</label
                >
                <div class="flex gap-2 mt-1">
                  <span
                    v-for="color in product.colors"
                    :key="color"
                    @click="selectedColor = color"
                    :style="{ backgroundColor: color }"
                    :class="[
                      'w-6 h-6 rounded-full border cursor-pointer transition',
                      selectedColor === color
                        ? 'ring-2 ring-offset-1 ring-blue-700'
                        : 'border-gray-300',
                    ]"
                  ></span>
                </div>
              </div>
            </div>

            <!-- Buttons -->
            <div
              class="mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-4"
            >
              <button
                @click="toggleFavorite"
                type="button"
                class="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-red-600 transition"
              >
                <svg
                  class="w-5 h-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  :class="{ 'fill-red-500 stroke-red-600': isFavorite }"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                  />
                </svg>
                {{
                  isFavorite
                    ? $t("product.favourited")
                    : $t("product.addToFavourites")
                }}
              </button>

              <button
                @click="addToCart"
                type="button"
                class="text-white mt-4 sm:mt-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center transition disabled:opacity-50"
                :disabled="loading || product.stock === 0"
              >
                <svg
                  v-if="!loading"
                  class="w-5 h-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                  />
                </svg>
                <span v-if="!loading">
                  {{
                    product.stock > 0
                      ? $t("product.addToCart")
                      : $t("product.outOfStock")
                  }}
                </span>
                <svg
                  v-else
                  class="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              </button>
            </div>

            <hr class="my-6 md:my-8 border-gray-200" />

            <!-- Description -->
            <p class="mb-6 line-clamp-2 text-gray-500">
              {{ product.description || $t("product.noDescription") }}
            </p>
          </div>
        </div>

        <reviewCard v-if="product" :productId="product.id" />
        <LoadingOverlay v-else />
      </div>
    </section>

    <ImageModal
      :visible="showModal"
      :images="images"
      :startIndex="currentIndex"
      @close="showModal = false"
    />
    <relatedCart v-if="product" :productId="product.id" />
  </div>
</template>

<script>
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumb.vue";
import LoadingOverlay from "@/components/loadingOverlay.vue";
import { token, addToCart as addCartItem, fetchCart } from "~/stores/cartStore";
import { triggerToast } from "~/stores/toastStore";
import reviewCard from "~/components/Card/reviewCard.vue";
import ImageModal from "@/components/ImageModal.vue";
import relatedCart from "@/components/Card/relatedCart.vue";

export default {
  components: {
    Breadcrumb,
    LoadingOverlay,
    reviewCard,
    ImageModal,
    relatedCart,
  },
  data() {
    return {
      showModal: false,
      product: null,
      images: [],
      mainImage: "",
      fallbackImage: "/assets/placeholder.jpg",
      breadcrumbItems: [],
      currentIndex: 0,
      thumbnailStart: 0,
      maxThumbnails: 5,
      isFavorite: false,
      loading: false,
      showZoom: false,
      zoomPosition: "0% 0%",
      selectedSize: "",
      selectedColor: "",
    };
  },
  computed: {
    visibleThumbnails() {
      return this.images.slice(
        this.thumbnailStart,
        this.thumbnailStart + this.maxThumbnails
      );
    },
  },
  watch: {
    mainImage(newImage) {
      this.currentIndex = this.images.indexOf(newImage);
      if (this.currentIndex < this.thumbnailStart) {
        this.thumbnailStart = this.currentIndex;
      } else if (
        this.currentIndex >=
        this.thumbnailStart + this.maxThumbnails
      ) {
        this.thumbnailStart = this.currentIndex - this.maxThumbnails + 1;
      }
    },
  },
  async created() {
    const id = this.$route.params.id;
    if (id) await this.fetchProduct(id);
    this.loadFavoriteState();
  },
  methods: {
    openImageModal(index) {
      this.currentIndex = index;
      this.showModal = true;
    },
    async fetchProduct(id) {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);
        this.product = res.data;
        this.product.reviews = this.product.reviews || [];
        this.product.sizes = ["S", "M", "L", "XL"];
        this.product.colors = ["#FF0000", "#00FF00", "#0000FF"];
        this.product.heights = ["Short", "Medium", "Tall"];
        this.breadcrumbItems = [
          { label: this.$t("nav.home"), to: "/" },
          { label: this.$t("nav.products"), to: "/products" },
          { label: this.product.name, to: `/products/${this.product.id}` },
        ];
        this.images =
          this.product.images?.length > 0
            ? this.product.images.map((img) => `http://127.0.0.1:8000${img}`)
            : [this.fallbackImage];
        this.mainImage = this.images[0];
      } catch (err) {
        console.error("Failed to fetch product:", err);
        this.product = null;
      }
    },
    loadFavoriteState() {
      if (process.client) {
        const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
        this.isFavorite = favs.includes(parseInt(this.$route.params.id));
      }
    },
    async toggleFavorite() {
      const t = token.value || localStorage.getItem("token");
      if (!t) {
        triggerToast("Please log in first");
        return;
      }

      try {
        const url = `http://127.0.0.1:8000/api/products/${this.product.id}/favorite`;
        if (this.isFavorite) {
          await axios.delete(url, {
            headers: { Authorization: `Bearer ${t}` },
          });
        } else {
          await axios.post(
            url,
            {},
            { headers: { Authorization: `Bearer ${t}` } }
          );
        }

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
    nextImage() {
      if (this.images.length === 0) return;
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.mainImage = this.images[this.currentIndex];
    },
    prevImage() {
      if (this.images.length === 0) return;
      this.currentIndex =
        (this.currentIndex - 1 + this.images.length) % this.images.length;
      this.mainImage = this.images[this.currentIndex];
    },
    handleMouseMove(event) {
      const rect = event.target.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      this.zoomPosition = `${x}% ${y}%`;
    },
  },
};
</script>
<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.4s ease;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}

.zoom-container {
  position: relative;
}

.zoom-preview {
  position: absolute;
  top: 0;
  right: -420px;
  width: 400px;
  height: 400px;
  background-size: 200%;
  background-repeat: no-repeat;
  border: 2px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 20;
  pointer-events: none;
}

@media (max-width: 1024px) {
  .zoom-preview {
    display: none;
  }
}
</style>
