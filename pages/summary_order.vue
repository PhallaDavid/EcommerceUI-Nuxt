<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { cartItems, fetchCart } from "@/stores/cartStore";
import { triggerToast } from "~/stores/toastStore";
import LocationSelector from "~/components/LocationSelector.vue";
import Breadcrumb from "~/components/Breadcrumb.vue";

const loading = ref(false);
const result = ref(null);
const currentStep = ref(1);
const selectedLocation = ref(null);
const selectedPaymentMethod = ref("");
onMounted(() => {
  fetchCart();
});
const totalAmount = computed(() =>
  cartItems.value
    .reduce(
      (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
      0
    )
    .toFixed(2)
);

// Breadcrumb items
const breadcrumbItems = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Checkout", to: null },
];

// Steps configuration
const steps = [
  { id: 1, title: "Review Cart", description: "Check your items" },
  { id: 2, title: "Select Location", description: "Choose delivery location" },
  { id: 3, title: "Confirm Order", description: "Place your order" },
];

// Navigation functions
const nextStep = () => {
  if (currentStep.value < steps.length) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const canProceedToNext = computed(() => {
  switch (currentStep.value) {
    case 1:
      return cartItems.value.length > 0;
    case 2:
      return selectedLocation.value !== null;
    case 3:
      return true;
    default:
      return false;
  }
});

const createOrder = async () => {
  if (!selectedLocation.value) {
    triggerToast({
      message: "Please select a delivery location first",
      type: "error",
      duration: 3000,
    });
    return;
  }

  if (!selectedPaymentMethod.value) {
    triggerToast({
      message: "Please select a payment method",
      type: "error",
      duration: 3000,
    });
    return;
  }

  loading.value = true;
  result.value = null;

  const token = localStorage.getItem("token");

  const orderData = {
    products: cartItems.value.map((item) => ({
      id: item.product.id,
      quantity: item.quantity,
    })),
    shipping: 50,
    delivery_location: selectedLocation.value,
    payment_method: selectedPaymentMethod.value,
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
  <div class="flex flex-col w-full sm:px-6 lg:px-8 space-y-8">
    <!-- Breadcrumb Navigation -->
    <Breadcrumb :items="breadcrumbItems" />

    <!-- <div class="text-center">
      <h2 class="text-3xl font-bold text-gray-900 mb-2">
        {{ $t("order.checkout") }}
      </h2>
      <p class="text-gray-600">Complete your order in just a few steps</p>
    </div> -->

    <div class="flex items-center justify-center space-x-4 mb-8">
      <div v-for="step in steps" :key="step.id" class="flex items-center">
        <div
          :class="[
            'flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold transition-all duration-300',
            currentStep >= step.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-600',
          ]"
        >
          {{ step.id }}
        </div>
        <div class="ml-3 hidden sm:block">
          <div
            :class="[
              'text-sm font-medium',
              currentStep >= step.id ? 'text-blue-600' : 'text-gray-500',
            ]"
          >
            {{ step.title }}
          </div>
          <div class="text-xs text-gray-400">{{ step.description }}</div>
        </div>
        <div
          v-if="step.id < steps.length"
          :class="[
            'w-12 h-0.5 mx-4 transition-all duration-300',
            currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200',
          ]"
        ></div>
      </div>
    </div>

    <!-- Step Content -->
    <div class="bg-white rounded-lg p-6 min-h-[500px]">
      <!-- Step 1: Review Cart -->
      <div v-if="currentStep === 1" class="space-y-6">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">
          {{ $t("order.reviewYourCart") }}
        </h3>

        <div class="space-y-4">
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            <div class="flex items-center space-x-4">
              <img
                class="w-16 h-16 object-cover rounded-lg"
                :src="
                  item.product.images?.[0]
                    ? `http://127.0.0.1:8000${item.product.images[0]}`
                    : 'https://via.placeholder.com/64'
                "
                :alt="item.product.name"
              />
              <div>
                <h4 class="font-medium text-gray-900">
                  {{ item.product.name }}
                </h4>
                <p class="text-sm text-gray-600">${{ item.product.price }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-semibold text-gray-900">
                ${{ (item.product.price * item.quantity).toFixed(2) }}
              </p>
              <p class="text-sm text-gray-600">Qty: {{ item.quantity }}</p>
            </div>
          </div>
        </div>

        <!-- Order Summary for Step 1 -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h4 class="font-semibold text-gray-900 mb-2">
            {{ $t("order.orderSummary") }}
          </h4>
          <div class="flex justify-between py-1">
            <span>{{ $t("common.subtotal") }}</span>
            <span>${{ totalAmount }}</span>
          </div>
          <div class="flex justify-between py-1">
            <span>{{ $t("common.shipping") }}</span>
            <span>$50</span>
          </div>
          <div
            class="flex justify-between py-1 border-t border-gray-300 pt-2 font-semibold"
          >
            <span>{{ $t("common.total") }}</span>
            <span>${{ (parseFloat(totalAmount) + 50).toFixed(2) }}</span>
          </div>
        </div>
      </div>

      <!-- Step 2: Location Selection -->
      <div v-if="currentStep === 2" class="space-y-6">
        <LocationSelector v-model="selectedLocation" class="w-full" />

        <div
          v-if="selectedLocation"
          class="bg-green-50 border border-green-200 rounded-lg p-4"
        >
          <div class="flex items-center space-x-2">
            <svg
              class="w-5 h-5 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-green-800 font-medium">{{
              $t("order.locationSelected")
            }}</span>
          </div>
          <p class="text-green-700 text-sm mt-1">
            Coordinates: {{ selectedLocation.lat.toFixed(4) }},
            {{ selectedLocation.lng.toFixed(4) }}
          </p>
        </div>
      </div>

      <!-- Step 3: Confirm Order -->
      <div v-if="currentStep === 3" class="space-y-6">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">
          {{ $t("order.confirmYourOrder") }}
        </h3>

        <!-- Payment Method Selection -->
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900">Payment Method</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <!-- Cash on Delivery -->
            <label
              class="relative flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all"
              :class="{
                'border-blue-500 bg-blue-50': selectedPaymentMethod === 'cod',
              }"
            >
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                v-model="selectedPaymentMethod"
                class="sr-only"
              />
              <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                  <div
                    class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 12l3-3 3 3"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h5 class="font-medium text-gray-900">Cash on Delivery</h5>
                  <p class="text-sm text-gray-500">Pay when you receive</p>
                </div>
              </div>
              <div
                v-if="selectedPaymentMethod === 'cod'"
                class="absolute top-3 right-3 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </label>

            <!-- Credit/Debit Card -->
            <label
              class="relative flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all"
              :class="{
                'border-blue-500 bg-blue-50': selectedPaymentMethod === 'card',
              }"
            >
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                v-model="selectedPaymentMethod"
                class="sr-only"
              />
              <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                  <div
                    class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h5 class="font-medium text-gray-900">Credit/Debit Card</h5>
                  <p class="text-sm text-gray-500">Visa, Mastercard, etc.</p>
                </div>
              </div>
              <div
                v-if="selectedPaymentMethod === 'card'"
                class="absolute top-3 right-3 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </label>

            <!-- Bank Transfer -->
            <label
              class="relative flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all"
              :class="{
                'border-blue-500 bg-blue-50': selectedPaymentMethod === 'bank',
              }"
            >
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                v-model="selectedPaymentMethod"
                class="sr-only"
              />
              <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                  <div
                    class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-5 h-5 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h5 class="font-medium text-gray-900">Bank Transfer</h5>
                  <p class="text-sm text-gray-500">Direct bank transfer</p>
                </div>
              </div>
              <div
                v-if="selectedPaymentMethod === 'bank'"
                class="absolute top-3 right-3 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </label>

            <!-- Digital Wallet -->
            <label
              class="relative flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all"
              :class="{
                'border-blue-500 bg-blue-50':
                  selectedPaymentMethod === 'wallet',
              }"
            >
              <input
                type="radio"
                name="paymentMethod"
                value="wallet"
                v-model="selectedPaymentMethod"
                class="sr-only"
              />
              <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                  <div
                    class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-5 h-5 text-orange-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h5 class="font-medium text-gray-900">Digital Wallet</h5>
                  <p class="text-sm text-gray-500">PayPal, Apple Pay, etc.</p>
                </div>
              </div>
              <div
                v-if="selectedPaymentMethod === 'wallet'"
                class="absolute top-3 right-3 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </label>
          </div>

          <!-- Selected Payment Method Display -->
          <div
            v-if="selectedPaymentMethod"
            class="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center space-x-2"
          >
            <svg
              class="w-4 h-4 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span class="text-sm font-medium text-green-900">
              Payment method selected:
              <span class="font-semibold">
                {{
                  selectedPaymentMethod === "cod"
                    ? "Cash on Delivery"
                    : selectedPaymentMethod === "card"
                    ? "Credit/Debit Card"
                    : selectedPaymentMethod === "bank"
                    ? "Bank Transfer"
                    : "Digital Wallet"
                }}
              </span>
            </span>
          </div>
        </div>

        <!-- Order Details -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Items Summary -->
          <div class="space-y-4">
            <h4 class="font-medium text-gray-900">{{ $t("order.items") }}</h4>
            <div class="space-y-2">
              <div
                v-for="item in cartItems"
                :key="item.id"
                class="flex justify-between text-sm"
              >
                <span>{{ item.product.name }} (x{{ item.quantity }})</span>
                <span
                  >${{ (item.product.price * item.quantity).toFixed(2) }}</span
                >
              </div>
            </div>
          </div>

          <!-- Delivery Info -->
          <div class="space-y-4">
            <h4 class="font-medium text-gray-900">
              {{ $t("order.deliveryInfo") }}
            </h4>
            <div class="text-sm space-y-2">
              <div class="flex justify-between">
                <span>{{ $t("order.deliveryLocation") }}</span>
                <span class="text-green-600">
                  {{
                    selectedLocation
                      ? `${selectedLocation.lat.toFixed(
                          4
                        )}, ${selectedLocation.lng.toFixed(4)}`
                      : "Not selected"
                  }}
                </span>
              </div>
              <div class="flex justify-between">
                <span>{{ $t("common.shipping") }}</span>
                <span>$50</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Final Total -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="flex justify-between items-center">
            <span class="text-lg font-semibold text-gray-900">{{
              $t("common.total")
            }}</span>
            <span class="text-2xl font-bold text-blue-600">
              ${{ (parseFloat(totalAmount) + 50).toFixed(2) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="flex justify-between items-center">
      <button
        v-if="currentStep > 1"
        @click="prevStep"
        class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
      >
        {{ $t("common.previous") }}
      </button>

      <div v-else class="w-24"></div>

      <button
        v-if="currentStep < steps.length"
        @click="nextStep"
        :disabled="!canProceedToNext"
        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {{ $t("common.next") }}
      </button>

      <button
        v-else
        @click="createOrder"
        :disabled="loading || !canProceedToNext"
        class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {{ loading ? $t("common.loading") : $t("order.placeOrder") }}
      </button>
    </div>

    <!-- Debug / API response -->
    <pre v-if="result" class="bg-gray-100 p-4 rounded text-sm mt-8">{{
      result
    }}</pre>
  </div>
</template>

<style scoped>
.table-hover tbody tr:hover {
  background-color: #f9fafb;
}
</style>
