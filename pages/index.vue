<template>
  <div>
    <Banner />
    <Slider />
    <MainCardProduct />

  </div>
</template>
<script>
import Banner from "~/components/banner.vue";
import Slider from "~/components/Card/sliderCard.vue";
import MainCardProduct from "~/components/mainCardProduct.vue";
export default {
  layout: "default",
  components: {
    Banner,
    Slider,
    MainCardProduct,
  },
};
</script>
