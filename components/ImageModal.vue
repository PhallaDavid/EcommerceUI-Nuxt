<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
  >
    <!-- Close Button -->
    <button
      @click="$emit('close')"
      class="absolute top-4 right-4 text-white text-3xl font-bold hover:opacity-80"
    >
      ✕
    </button>

    <!-- Image Container -->
    <div class="relative flex items-center max-w-4xl w-full px-6">
      <!-- Prev Button -->
      <button
        @click="prev"
        class="absolute left-2 bg-gray-800/60 text-white p-3 rounded-full hover:bg-gray-700"
      >
        ‹
      </button>

      <!-- Image -->
      <img
        :src="images[currentIndex]"
        class="max-h-[80vh] max-w-full mx-auto rounded shadow-lg"
        :alt="`Image ${currentIndex + 1}`"
      />

      <!-- Next Button -->
      <button
        @click="next"
        class="absolute right-2 bg-gray-800/60 text-white p-3 rounded-full hover:bg-gray-700"
      >
        ›
      </button>
    </div>

    <!-- Image Counter -->
    <div class="absolute bottom-4 text-white text-sm">
      {{ currentIndex + 1 }} / {{ images.length }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    images: Array,
    startIndex: Number,
  },
  data() {
    return {
      currentIndex: this.startIndex || 0,
    };
  },
  watch: {
    startIndex(newVal) {
      this.currentIndex = newVal || 0;
    },
    visible(newVal) {
      // Reset to startIndex when modal is opened
      if (newVal) this.currentIndex = this.startIndex || 0;
    },
  },
  methods: {
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    prev() {
      this.currentIndex =
        (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
  },
};
</script>

<style scoped>
button {
  transition: background-color 0.2s;
}
</style>
