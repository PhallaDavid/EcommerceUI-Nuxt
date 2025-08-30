<template>
  <div class="flex flex-row gap-2 overflow-hidden bg-gray-100 p-4 rounded-lg">
    <div
      v-for="n in 5"
      :key="n"
      class="flex-shrink-0 w-[200px] flex flex-col items-center gap-2"
    >
      <!-- Circle skeleton for image -->
      <div class="w-28 h-28 bg-gray-300 animate-pulse rounded-full"></div>

      <!-- Text skeletons -->
      <div class="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
      <div class="w-32 h-3 bg-gray-300 animate-pulse rounded"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SkeletonCategory",
};
</script>
