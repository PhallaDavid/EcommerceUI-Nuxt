<template>
  <div
    v-if="isVisible"
    :class="[
      'fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4 px-6 py-3 rounded-lg text-white shadow-lg z-50 transition-opacity duration-300',
      typeClass,
    ]"
  >
    {{ message }}
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  message: { type: String, default: "" },
  visible: { type: Boolean, default: false },
  type: { type: String, default: "success" },
});

const emit = defineEmits(["update:visible"]);
const isVisible = ref(props.visible);

watch(
  () => props.visible,
  (val) => {
    isVisible.value = val;
    if (val) autoHide();
  }
);

watch(isVisible, (val) => {
  if (!val) emit("update:visible", false);
});
const autoHide = () => {
  setTimeout(() => {
    isVisible.value = false;
  }, 3000);
};

const typeClass = computed(() => {
  return props.type === "error" ? "bg-red-500" : "bg-blue-500";
});
</script>
