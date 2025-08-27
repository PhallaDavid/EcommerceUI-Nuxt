// ~/stores/toastStore.js
import { ref } from "vue";

export const toastVisible = ref(false);
export const toastMessage = ref("");

// Use a consistent export name: triggerToast
export function triggerToast(message, duration = 3000) {
  toastMessage.value = message;
  toastVisible.value = true;
  setTimeout(() => {
    toastVisible.value = false;
  }, duration);
}
