<template>
  <transition name="slide">
    <div v-if="visible" class="fixed inset-y-0 right-0 z-50 flex">
      <!-- Overlay -->
      <div class="fixed inset-0" @click="$emit('close')"></div>

      <!-- Sidebar modal panel -->
      <div class="relative bg-white w-96 h-full p-6 overflow-y-auto shadow-lg">
        <h2 class="text-lg font-semibold mb-4">Shopping Cart</h2>

        <div v-if="!token" class="text-center py-10 text-gray-500">
          Please log in to see your cart.
        </div>

        <div v-else>
          <div v-if="loading" class="text-center py-10">Loading...</div>

          <div v-else class="max-h-[calc(100vh-150px)] overflow-y-auto">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="flex justify-between items-center border-b border-gray-200 py-2"
            >
              <div>
                <p class="font-semibold">{{ item.product.name }}</p>
                <p class="text-sm text-gray-600">Qty: {{ item.quantity }}</p>
                <p class="text-sm text-gray-600">
                  ${{ (parseFloat(item.product.price) * item.quantity).toFixed(2) }}
                </p>
              </div>
              <button
                class="text-red-500 hover:text-red-700 font-semibold"
                @click="removeFromCart(item.id)"
              >
                Remove
              </button>
            </div>

            <div v-if="cartItems.length === 0" class="text-center py-10 text-gray-500">
              Your cart is empty.
            </div>
          </div>

          <div class="mt-4 flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>${{ totalAmount }}</span>
          </div>

          <div class="mt-4 flex justify-end">
            <button
              class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              @click="checkout"
              :disabled="cartItems.length === 0"
            >
              Checkout
            </button>
          </div>
        </div>

        <button
          class="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-3xl font-bold"
          @click="$emit('close')"
          aria-label="Close modal"
        >
          &times;
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import axios from "axios";

const props = defineProps({
  visible: Boolean,
});

const cartItems = ref([]);
const loading = ref(false);
const token = ref(null);

onMounted(() => {
  token.value = localStorage.getItem("token");
});

async function fetchCart() {
  if (!token.value) {
    cartItems.value = [];
    return;
  }

  loading.value = true;
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/cart", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    // Assuming your API returns cart items inside response.data.data
    cartItems.value = response.data.data;
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    cartItems.value = [];
  } finally {
    loading.value = false;
  }
}

watch(
  () => props.visible,
  (newVal) => {
    if (newVal) fetchCart();
  }
);

const totalAmount = computed(() =>
  cartItems.value
    .reduce(
      (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
      0
    )
    .toFixed(2)
);

async function removeFromCart(id) {
  if (!token.value) return;
  try {
    await axios.delete(`http://127.0.0.1:8000/api/cart/${id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    await fetchCart();
  } catch (error) {
    console.error("Failed to remove item:", error);
  }
}

function checkout() {
  alert("Proceed to checkout!");
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(100%);
}
</style>
