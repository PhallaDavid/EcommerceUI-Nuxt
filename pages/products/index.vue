<template>
  <div class="max-w-7xl mx-auto 6">
    <div>
      <mainCardProduct />
    </div>
  </div>
</template>

<script>
import mainCardProduct from "~/components/mainCardProduct.vue";

export default {
  components: { mainCardProduct },
  //   props: {
  //     products: {
  //       type: Array,
  //       required: true,
  //       default: () => [],
  //     },
  //   },
};
</script>

<style scoped>
/* Optional: add some spacing or hover effects if needed */
</style>
