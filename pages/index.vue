<template>
  <div class="flex flex-col gap-4 sm:gap-8 lg:gap-12 px-2 sm:px-4 lg:px-6">
    <!-- Banner -->
    <Banner />

    <!-- Slider -->
    <Slider />
    <PromotionPovider/>

    <!-- Top Seller -->
    <!-- <TopSeller /> -->

    <!-- Promotion -->
    <Promotion />

    <!-- Main Card Product -->
    <!-- <MainCardProduct /> -->

    <!-- Policy Section -->
    <policy />
  </div>
</template>

<script setup>
import Banner from "~/components/banner.vue";
import PromotionPovider from "~/components/promotion_provider.vue";
// import TopSeller from "~/components/Card/topsellerCard.vue";
import Slider from "~/components/Card/sliderCard.vue";
// import MainCardProduct from "~/components/mainCardProduct.vue";
// import Promotion from "~/components/Card/promotionCart.vue";
import policy from "~/components/policy.vue";

definePageMeta({
  layout: "default",
});
</script>

<style scoped>
/* Optional: you can add small spacing tweaks here if needed */
</style>
