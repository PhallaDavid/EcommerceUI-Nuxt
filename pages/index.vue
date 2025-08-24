<template>
  <div>
    <Banner />
    <Slider />

    <!-- <h1 class="text-3xl bg-red-500 font-bold underline">Hello world!</h1> -->
  </div>
</template>
<script>
import Banner from "~/components/banner.vue";
import Slider from "~/components/Card/sliderCard.vue";
export default {
  layout: "default",
  components: {
    Banner,
    Slider,
  },
};

</script>
