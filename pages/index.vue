<template>
<template>
  <div class="gap-20">
    <Banner />
    <Slider />
    <!-- <TopSeller /> -->
    <Promotion />
    <MainCardProduct />
  </div>
</template>

</template>

<script setup>
import Banner from "~/components/banner.vue";
// import TopSeller from "~/components/Card/topsellerCard.vue";
import Slider from "~/components/Card/sliderCard.vue";
import MainCardProduct from "~/components/mainCardProduct.vue";
import Promotion from "~/components/Card/promotionCart.vue";
definePageMeta({
  layout: "default",
});
</script>
