<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { cartItems, fetchCart } from "@/stores/cartStore";
import { triggerToast } from "~/stores/toastStore";

const loading = ref(false);
const result = ref(null);

// Fetch cart items on mount
onMounted(() => {
  fetchCart();
});

// Calculate total amount
const totalAmount = computed(() =>
  cartItems.value
    .reduce(
      (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
      0
    )
    .toFixed(2)
);

const createOrder = async () => {
  loading.value = true;
  result.value = null;

  const token = localStorage.getItem("token");

  const orderData = {
    products: cartItems.value.map((item) => ({
      id: item.product.id,
      quantity: item.quantity,
    })),
    shipping: 50,
  };

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/orders",
      orderData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    result.value = response.data;
    console.log("Order created:", response.data);

    // Show toast instead of alert
    triggerToast({
      message: "Order successfully created!",
      type: "success",
      duration: 3000,
    });

    // Redirect after a short delay
    setTimeout(() => {
      fetchCart();
      window.location.href = "/"; // or use router if available
    }, 1000);
  } catch (error) {
    result.value = error.response?.data || error.message;
    console.error("Failed to create order:", error);

    triggerToast({
      message: "Failed to create order. Check console for details.",
      type: "error",
      duration: 4000,
    });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col w-full sm:px-6 lg:px-8 space-y-6">
    <h2 class="text-2xl font-semibold text-gray-900">
      {{ $t("order.orderSummary") }}
    </h2>
    <h4 class="text-lg font-semibold text-gray-700">
      {{ $t("order.billingAndDeliveryInfo") }}
    </h4>

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Cart Table -->
      <div class="flex-1 bg-white shadow rounded-lg p-4">
        <table class="w-full text-left table-hover">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="py-2 text-gray-600">{{ $t("common.product") }}</th>
              <th class="py-2 text-gray-600">{{ $t("common.quantity") }}</th>
              <th class="py-2 text-gray-600 text-right">
                {{ $t("common.price") }}
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="item in cartItems" :key="item.id">
              <td class="py-4 flex items-center gap-3">
                <img
                  class="w-12 h-12 object-cover rounded"
                  :src="
                    item.product.images?.[0]
                      ? `http://127.0.0.1:8000${item.product.images[0]}`
                      : 'https://via.placeholder.com/50'
                  "
                  :alt="item.product.name"
                />
                <span class="font-medium text-gray-800">{{
                  item.product.name
                }}</span>
              </td>
              <td class="py-4 font-medium text-gray-700">
                x{{ item.quantity }}
              </td>
              <td class="py-4 font-semibold text-gray-900 text-right">
                ${{ (item.product.price * item.quantity).toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Order Summary Box -->
      <div class="w-full lg:w-1/3 bg-gray-50 p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          {{ $t("order.orderSummary") }}
        </h3>
        <div class="flex justify-between py-2 text-gray-700">
          <span>{{ $t("common.subtotal") }}</span>
          <span>${{ totalAmount }}</span>
        </div>
        <div class="flex justify-between py-2 text-gray-700">
          <span>{{ $t("common.shipping") }}</span>
          <span>$50</span>
        </div>
        <div
          class="flex justify-between py-2 text-gray-700 border-t border-gray-200 mt-2 pt-2 font-semibold"
        >
          <span>{{ $t("common.total") }}</span>
          <span>${{ (parseFloat(totalAmount) + 50).toFixed(2) }}</span>
        </div>
        <button
          :disabled="loading"
          @click="createOrder"
          class="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
        >
          {{ loading ? $t("common.loading") : $t("order.placeOrder") }}
        </button>
      </div>
    </div>

    <!-- Debug / API response -->
    <pre v-if="result" class="bg-gray-100 p-4 rounded text-sm">{{
      result
    }}</pre>
  </div>
</template>

<style scoped>
.table-hover tbody tr:hover {
  background-color: #f9fafb;
}
</style>
