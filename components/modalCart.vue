<template>
  <div>
    <transition name="slide">
      <div v-if="visible" class="fixed inset-y-0 right-0 z-50 flex">
        <!-- Overlay -->
        <div class="fixed inset-0 bg-gray-500/75" @click="$emit('close')"></div>

        <!-- Sidebar -->
        <div
          class="relative bg-white w-150 h-full p-6 overflow-y-auto shadow-xl"
        >
          <h2 class="text-lg text-gray-800 font-semibold mb-4">
            Shopping Cart
          </h2>

          <!-- Not Logged In -->
          <div
            v-if="!token"
            class="flex flex-col items-center justify-center py-12 px-6 text-gray-600"
          >
            <img
              src="/assets/encrypted-phone.png"
              alt="Login required"
              class="w-32 h-32 mb-6 opacity-80"
            />
            <p class="text-lg font-medium text-center mb-4">
              Please log in to see your cart.
            </p>
            <nuxt-link
              to="/login"
              class="px-4 py-2 bg-blue-500 text-gray-200 rounded-full hover:bg-blue-500-dark transition"
            >
              Sign In
            </nuxt-link>
          </div>

          <!-- Cart Items -->
          <div v-else>
            <ul
              class="flow-root max-h-[calc(100vh-150px)] overflow-y-auto -my-6 divide-y divide-gray-200"
            >
              <li v-for="item in cartItems" :key="item.id" class="flex py-6">
                <!-- Product Image -->
                <div
                  class="w-24 h-24 shrink-0 overflow-hidden rounded-md border border-gray-200"
                >
                  <img
                    :src="
                      item.product.images?.[0]
                        ? `http://127.0.0.1:8000${item.product.images[0]}`
                        : 'https://via.placeholder.com/150'
                    "
                    :alt="item.product.name"
                    class="object-cover w-full h-full"
                  />
                </div>

                <!-- Product Info -->
                <div class="ml-4 flex flex-1 flex-col justify-between">
                  <div>
                    <div
                      class="flex justify-between text-base font-medium text-gray-900"
                    >
                      <p>{{ item.product.name }}</p>
                      <p class="ml-4">
                        ${{
                          (
                            parseFloat(item.product.price) * item.quantity
                          ).toFixed(2)
                        }}
                      </p>
                    </div>

                    <!-- Quantity Controls -->
                    <div
                      class="mt-1 flex items-center gap-2 text-sm text-gray-500"
                    >
                      <span>Qty:</span>
                      <button
                        class="flex items-center justify-center w-8 h-8 border rounded hover:bg-gray-100 transition"
                        @click="updateQuantity(item, item.quantity - 1)"
                        :disabled="item.quantity <= 1"
                      >
                        <svg
                          class="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M20 12H4"
                          ></path>
                        </svg>
                      </button>
                      <input
                        type="number"
                        v-model.number="item.quantity"
                        @change="updateQuantity(item, item.quantity)"
                        min="1"
                        class="w-12 text-center border rounded transition"
                      />
                      <button
                        class="flex items-center justify-center w-8 h-8 border rounded hover:bg-gray-100 transition"
                        @click="updateQuantity(item, item.quantity + 1)"
                      >
                        <svg
                          class="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 4v16m8-8H4"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <!-- Remove Button -->
                  <div class="flex justify-end mt-2">
                    <button
                      class="font-medium text-red-500 hover:text-red-700 transition"
                      @click="removeFromCart(item.product_id)"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>

              <!-- Empty Cart Message -->
              <div
                v-if="cartItems.length === 0"
                class="text-center py-10 text-gray-500"
              >
                Your cart is empty.
              </div>
            </ul>

            <!-- Total -->
            <div
              class="mt-6 border-t border-gray-200 pt-4 flex justify-between font-semibold text-lg"
            >
              <span>Total:</span>
              <span>${{ totalAmount }}</span>
            </div>

            <!-- Checkout Button -->
            <div class="mt-4 flex justify-end">
              <button
                class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                @click="checkout"
                :disabled="cartItems.length === 0"
              >
                Checkout
              </button>
            </div>
          </div>

          <!-- Close Button -->
          <button
            class="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            @click="$emit('close')"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
  cartItems,
  cartCount,
  token,
  fetchCart,
  addToCart,
} from "@/stores/cartStore";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({ visible: Boolean });

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
    await axios.delete(`http://127.0.0.1:8000/api/products/${id}/cart`, {
      headers: { Authorization: `Bearer ${token.value}` },
    });
    await fetchCart();
  } catch (err) {
    console.error(err);
  }
}

async function updateQuantity(item, qty) {
  if (qty < 1 || !token.value) return;
  const oldQty = item.quantity;
  item.quantity = qty;
  cartCount.value = cartItems.value.reduce((sum, i) => sum + i.quantity, 0);
  try {
    await axios.put(
      `http://127.0.0.1:8000/api/products/${item.product_id}/cart`,
      { quantity: qty },
      { headers: { Authorization: `Bearer ${token.value}` } }
    );
    await fetchCart();
  } catch (err) {
    item.quantity = oldQty;
    cartCount.value = cartItems.value.reduce((sum, i) => sum + i.quantity, 0);
    console.error(err);
  }
}

function checkout() {
  router.push("/summary_order");
}

onMounted(() => {
  fetchCart();
});
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
