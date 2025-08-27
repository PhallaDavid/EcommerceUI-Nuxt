<template></template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      favourites: [],
    };
  },
  async mounted() {
    await this.fetchFavourites();
  },
  methods: {
    async fetchFavourites() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/products/favourite",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.favourites = response.data;
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    },
  },
};
</script>
