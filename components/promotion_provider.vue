<template>
  <div
    ref="slider"
    class="relative overflow-hidden"
    @wheel.prevent="onWheel"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
  >
    <div
      class="flex transition-transform duration-500 ease-in-out"
      :style="{ transform: `translateX(-${currentIndex * cardWidth}px)` }"
    >
      <div
        v-for="(promo, index) in promotions"
        :key="index"
        class="flex-shrink-0 p-2"
        :class="cardClasses"
      >
        <div
          class="flex flex-col items-center text-center rounded-lg transition transform p-4 sm:p-4 md:p-6"
          :style="gradientStyle(promo.gradient)"
        >
          <img
            :src="promo.image"
            alt=""
            class="w-12 h-12 mb-2 sm:w-12 sm:h-14"
          />
          <p class="font-medium text-white text-sm sm:text-base">
            {{ promo.title }}
          </p>
          <span class="text-xs sm:text-sm text-white/80">{{ promo.desc }}</span>
        </div>
      </div>
    </div>

    <!-- Buttons -->
    <button
      v-show="promotions.length > 1"
      @click="prevSlide"
      class="absolute top-1/2 -translate-y-1/2 left-5 bg-opacity-50 hover:bg-opacity-70 text-white p-2 sm:p-3 rounded-full z-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4 sm:w-5 sm:h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>

    <button
      v-show="promotions.length > 1"
      @click="nextSlide"
      class="absolute top-1/2 -translate-y-1/2 right-5 sm:right-24 md:right-8  bg-opacity-50 hover:bg-opacity-70 text-white p-2 sm:p-3 rounded-full z-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4 sm:w-5 sm:h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      promotions: [
        {
          image: "/assets/shopping.png",
          title: "Big Sale",
          desc: "Up to 50% off",
          gradient: ["#FF7E5F", "#FEB47B"],
        },
        {
          image: "/assets/new-arrivals.png",
          title: "New Arrivals",
          desc: "Latest products",
          gradient: ["#6A82FB", "#FC5C7D"],
        },
        {
          image: "/assets/flash-deal.png",
          title: "Flash Deal",
          desc: "Limited time offer",
          gradient: ["#43C6AC", "#F8FFAE"],
        },
        {
          image: "/assets/special-tag.png",
          title: "Special Offer",
          desc: "Exclusive discounts",
          gradient: ["#FF512F", "#DD2476"],
        },
      ],
      currentIndex: 0,
      cardWidth: 0,
      visibleCards: 1,
      touchStartX: 0,
    };
  },
  computed: {
    maxIndex() {
      return Math.max(this.promotions.length - this.visibleCards, 0);
    },
    cardClasses() {
      return "w-[100%] sm:w-1/2 md:w-1/3 lg:w-1/4 mx-auto"; // small mobile card width
    },
  },
  mounted() {
    this.updateCardWidth();
    window.addEventListener("resize", this.updateCardWidth);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateCardWidth);
  },
  methods: {
    gradientStyle(colors) {
      return {
        background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
      };
    },
    updateCardWidth() {
      this.$nextTick(() => {
        const cardEl = this.$refs.slider.querySelector(".flex-shrink-0");
        if (!cardEl) return;
        this.cardWidth = cardEl.offsetWidth;
        const sliderWidth = this.$refs.slider.offsetWidth;
        this.visibleCards = Math.floor(sliderWidth / this.cardWidth) || 1;
        if (this.currentIndex > this.maxIndex)
          this.currentIndex = this.maxIndex;
      });
    },
    nextSlide() {
      if (this.currentIndex < this.maxIndex) this.currentIndex++;
    },
    prevSlide() {
      if (this.currentIndex > 0) this.currentIndex--;
    },
    onWheel(event) {
      event.deltaY < 0 ? this.prevSlide() : this.nextSlide();
    },
    onTouchStart(event) {
      this.touchStartX = event.touches[0].clientX;
    },
    onTouchMove(event) {
      const touchEndX = event.touches[0].clientX;
      const diff = this.touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? this.nextSlide() : this.prevSlide();
        this.touchStartX = touchEndX;
      }
    },
  },
};
</script>
