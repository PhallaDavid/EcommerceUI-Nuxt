import { ref } from "vue";
import axios from "axios";

export const cartItems = ref([]);
export const cartCount = ref(0);
export const token = ref(null);

if (process.client) {
  token.value = localStorage.getItem("token");
}

export async function fetchCart() {
  if (!process.client || !token.value) {
    cartItems.value = [];
    cartCount.value = 0;
    return;
  }

  try {
    const res = await axios.get("http://127.0.0.1:8000/api/cart", {
      headers: { Authorization: `Bearer ${token.value}` },
    });
    cartItems.value = res.data;
    cartCount.value = cartItems.value.reduce((sum, i) => sum + i.quantity, 0);
  } catch (e) {
    cartItems.value = [];
    cartCount.value = 0;
  }
}

export function addToCart(item) {
  if (!process.client) return;
  cartItems.value.push(item);
  cartCount.value = cartItems.value.reduce((sum, i) => sum + i.quantity, 0);
}
