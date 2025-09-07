<template>
  <div class="p-4 max-w-2xl sm:max-w-3xl lg:max-w-7xl mx-auto">
    <p class="text-lg font-semibold mb-4">{{ $t("policy.title") }}</p>

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
          v-for="(item, index) in policies"
          :key="index"
          class="flex-shrink-0 p-4"
          :class="cardClasses"
        >
          <div
            class="flex flex-col items-center text-center rounded-lg shadow-lg hover:scale-105 transition transform"
            :style="gradientStyle(item.gradient)"
          >
            <img :src="item.icon" alt="" class="w-14 h-14 mb-2" />
            <p class="font-medium text-white">{{ item.title }}</p>
            <span class="text-sm text-white/80">{{ item.desc }}</span>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <button
        v-if="policies.length > visibleCards"
        @click="prevSlide"
        class="absolute top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 sm:p-3 rounded-full z-20 left-1 sm:left-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 sm:w-5 h-4 sm:h-5"
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
        v-if="policies.length > visibleCards"
        @click="nextSlide"
        class="absolute top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 sm:p-3 rounded-full z-20 right-1 sm:right-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 sm:w-5 h-4 sm:h-5"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      policies: [
        {
          icon: "/assets/free-delivery.png",
          title: this.$t("policy.freeShipping"),
          desc: this.$t("policy.freeShippingDesc"),
          gradient: ["#FF7E5F", "#FEB47B"],
        },
        {
          icon: "/assets/encrypted-phone.png",
          title: this.$t("policy.support"),
          desc: this.$t("policy.supportDesc"),
          gradient: ["#6A82FB", "#FC5C7D"],
        },
        {
          icon: "/assets/cash-back.png",
          title: this.$t("policy.moneyBack"),
          desc: this.$t("policy.moneyBackDesc"),
          gradient: ["#43C6AC", "#F8FFAE"],
        },
        {
          icon: "/assets/credit-card.png",
          title: this.$t("policy.securePayment"),
          desc: this.$t("policy.securePaymentDesc"),
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
      return Math.max(this.policies.length - this.visibleCards, 0);
    },
    cardClasses() {
      return "w-full sm:w-1/2 md:w-1/3 lg:w-1/4";
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.updateCardWidth();
      window.addEventListener("resize", this.updateCardWidth);
    });
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
      if (event.deltaY < 0) this.prevSlide();
      else this.nextSlide();
    },
    onTouchStart(event) {
      this.touchStartX = event.touches[0].clientX;
    },
    onTouchMove(event) {
      const touchEndX = event.touches[0].clientX;
      const diff = this.touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) this.nextSlide();
        else this.prevSlide();
        this.touchStartX = touchEndX;
      }
    },
  },
};
</script>
