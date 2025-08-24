<template>
  <div>
    <Banner />
    <Slider />
    <MainCardProduct />

    <!-- <h1 class="text-3xl bg-red-500 font-bold underline">Hello world!</h1> -->
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
