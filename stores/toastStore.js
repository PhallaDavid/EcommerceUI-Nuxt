
import { ref } from "vue";

export const toastVisible = ref(false);
export const toastMessage = ref("");

export function triggerToast(message, duration = 3000) {
  toastMessage.value = message;
  toastVisible.value = true;
  setTimeout(() => {
    toastVisible.value = false;
  }, duration);
}
