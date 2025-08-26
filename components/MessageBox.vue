<template>
  <div
    v-if="visibleLocal"
    class="fixed bottom-4 right-4 z-50 bg-white shadow-lg rounded-lg p-4 max-w-xs w-full"
  >
    <p class="text-gray-800">{{ message }}</p>
    <button
      @click="close"
      class="mt-2 text-sm text-green-500 hover:underline"
    >
      Close
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  message: {
    type: String,
    default: "",
  },
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:visible"]);
const visibleLocal = ref(props.visible);
watch(
  () => props.visible,
  (val) => {
    visibleLocal.value = val;
  }
);

function close() {
  visibleLocal.value = false;
  emit("update:visible", false);
}
</script>
