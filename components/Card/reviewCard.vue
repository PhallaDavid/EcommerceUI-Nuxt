<template>
  <section class="mt-8 bg-white rounded-lg shadow p-6">
    <!-- Overall Rating -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <p class="text-2xl font-bold">{{ averageRating.toFixed(1) }}</p>
        <div class="flex gap-1">
          <svg
            v-for="n in 5"
            :key="n"
            class="w-5 h-5"
            :class="
              n <= Math.round(averageRating)
                ? 'text-yellow-400'
                : 'text-gray-300'
            "
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.166L12 18.897l-7.334 3.866 1.4-8.166L.132 9.21l8.2-1.192z"
            />
          </svg>
        </div>
        <span class="text-gray-500">({{ reviews.length }} Reviews)</span>
      </div>
      <button
        @click="showForm = !showForm"
        class="text-blue-700 font-medium hover:underline"
      >
        Write a Review
      </button>
    </div>

    <!-- Review Form -->
    <div v-if="showForm" class="mb-4">
      <textarea
        v-model="newReview.comment"
        rows="3"
        placeholder="Write your review..."
        class="w-full border border-gray-300 rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
      <div class="flex items-center gap-2 mb-2">
        <span class="text-sm font-medium">Rating:</span>
        <div class="flex gap-1">
          <svg
            v-for="n in 5"
            :key="n"
            class="w-5 h-5 cursor-pointer"
            :class="n <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'"
            fill="currentColor"
            viewBox="0 0 24 24"
            @click="newReview.rating = n"
          >
            <path
              d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.166L12 18.897l-7.334 3.866 1.4-8.166L.132 9.21l8.2-1.192z"
            />
          </svg>
        </div>
      </div>
      <button
        @click="submitReview"
        class="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition disabled:opacity-50"
        :disabled="!newReview.comment || newReview.rating === 0"
      >
        Submit Review
      </button>
    </div>

    <!-- Reviews List -->
    <div v-if="reviews.length" class="divide-y divide-gray-200">
      <div v-for="review in reviews" :key="review.id" class="py-4">
        <div class="flex items-center justify-between">
          <h3 class="font-semibold">
            {{ review.user?.name || review.name || "Guest" }}
          </h3>
          <div class="flex gap-1">
            <svg
              v-for="n in 5"
              :key="n"
              class="w-4 h-4"
              :class="n <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.166L12 18.897l-7.334 3.866 1.4-8.166L.132 9.21l8.2-1.192z"
              />
            </svg>
          </div>
        </div>
        <p class="text-gray-600 mt-1">{{ review.comment }}</p>
      </div>
    </div>

    <p v-else class="text-gray-500 text-center py-4">No reviews yet.</p>
  </section>
</template>

<script>
import axios from "axios";
import { triggerToast } from "~/stores/toastStore";

export default {
  props: {
    productId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      reviews: [],
      showForm: false,
      newReview: {
        comment: "",
        rating: 0,
      },
    };
  },
  computed: {
    averageRating() {
      if (!this.reviews.length) return 0;
      return (
        this.reviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
        this.reviews.length
      );
    },
  },
  created() {
    this.fetchReviews();
  },
  methods: {
    async fetchReviews() {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/products/${this.productId}/reviews`
        );
        this.reviews = res.data;
      } catch (e) {
        console.error("Failed to fetch reviews:", e);
      }
    },
    async submitReview() {
      if (!this.newReview.comment || this.newReview.rating === 0) return;

      const token = localStorage.getItem("token");

      if (!token) {
        triggerToast("Please log in to submit a review.");
        return;
      }

      try {
        const res = await axios.post(
          `http://127.0.0.1:8000/api/products/${this.productId}/reviews`,
          this.newReview,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        this.reviews.unshift(res.data);
        this.newReview.comment = "";
        this.newReview.rating = 0;
        this.showForm = false;

        triggerToast("Review submitted successfully!");
      } catch (e) {
        console.error("Failed to submit review:", e);
        triggerToast("Failed to submit review!");
      }
    },
  },
};
</script>
