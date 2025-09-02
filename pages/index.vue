<template>
  <div class="flex flex-col gap-12 sm:gap-16 lg:gap-20 px-4 sm:px-6 lg:px-8">
    <Banner />
    <Slider />
    <!-- <TopSeller /> -->
    <Promotion />
    <!-- <MainCardProduct /> -->
  </div>
</template>

<script setup>
import Banner from "~/components/banner.vue";
// import TopSeller from "~/components/Card/topsellerCard.vue";
import Slider from "~/components/Card/sliderCard.vue";
// import MainCardProduct from "~/components/mainCardProduct.vue";
import Promotion from "~/components/Card/promotionCart.vue";

definePageMeta({
  layout: "default",
});
</script>
