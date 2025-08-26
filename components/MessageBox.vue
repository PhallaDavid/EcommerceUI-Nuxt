<template>
  <div
    v-if="visible"
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
import { ref, watch, defineProps, defineEmits } from "vue";

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

const visible = ref(props.visible);

watch(() => props.visible, (val) => {
  visible.value = val;
});

function close() {
  visible.value = false;
  emit("update:visible", false);
}
</script>
