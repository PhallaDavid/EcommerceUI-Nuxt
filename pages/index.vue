<template>
  <div>
    <Banner />
    <Slider />
    <MainCardProduct />
  </div>
</template>

<script setup>
import Banner from "~/components/banner.vue";
import Slider from "~/components/Card/sliderCard.vue";
import MainCardProduct from "~/components/mainCardProduct.vue";
definePageMeta({
  layout: "default",
});
</script>
