<template>
  <div class="max-w-7xl mx-auto">
    <!-- Breadcrumb -->
    <Breadcrumb :items="breadcrumbItems" />

    <section class="bg-white">
      <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16" v-if="product">
          <!-- Product Image -->
          <div class="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img
              class="w-full dark:hidden"
              :src="mainImage"
              :alt="product.name"
            />
            <img
              class="w-full hidden dark:block"
              :src="mainImage"
              :alt="product.name"
            />
          </div>

          <!-- Product Details -->
          <div class="mt-6 sm:mt-8 lg:mt-0">
            <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl">
              {{ product.name }}
            </h1>

            <div class="mt-4 sm:items-center sm:gap-4 sm:flex">
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
                <p
                  class="text-sm font-medium leading-none text-gray-500 dark:text-gray-400"
                >
                  ({{ product.rating || 0 }})
                </p>
                <span class="text-sm font-medium leading-none text-gray-900">
                  {{ product.sold_count || 0 }} Sold
                </span>
              </div>
            </div>

            <div class="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              <button
                type="button"
                class="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-4 focus:ring-gray-100  "
              >
                <svg
                  class="w-5 h-5 -ms-2 me-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                  />
                </svg>
                Add to Favorites
              </button>

              <button
                type="button"
                class="text-white mt-4 sm:mt-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center justify-center"
                :disabled="product.stock === 0"
              >
                <svg
                  class="w-5 h-5 -ms-2 me-2"
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
                {{ product.stock > 0 ? "Add to Cart" : "Out of Stock" }}
              </button>
            </div>

            <hr class="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            <p class="mb-6 text-gray-500 dark:text-gray-400">
              {{ product.description || "No additional details available." }}
            </p>
          </div>
        </div>

        <!-- Loading State -->
        <p v-else class="text-gray-500 dark:text-gray-400">
          Loading product...
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumb.vue";

export default {
  components: { Breadcrumb },
  data() {
    return {
      product: null,
      images: [],
      mainImage: "",
      fallbackImage: "/assets/placeholder.jpg",
      breadcrumbItems: [],
    };
  },
  async created() {
    const id = this.$route.params.id;
    if (id) await this.fetchProduct(id);
  },
  methods: {
    async fetchProduct(id) {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);
        this.product = res.data;

        // Update Breadcrumb
        this.breadcrumbItems = [
          { label: "Home", to: "/" },
          { label: "Products", to: "/products" },
          { label: this.product.name, to: `/products/${this.product.id}` },
        ];

        // Check and set product images
        if (this.product.images && this.product.images.length > 0) {
          this.images = this.product.images.map(
            (img) => `http://127.0.0.1:8000${img}`
          );
          this.mainImage = this.images[0];
        } else {
          this.images = [this.fallbackImage];
          this.mainImage = this.fallbackImage;
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
        this.product = null;
      }
    },
  },
};
</script>
