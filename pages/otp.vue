<template>
  <div class="flex justify-center items-center">
    <div class="w-96 border border-gray-300 p-24 rounded-lg">
      <!-- Header -->
      <h2 class="text-center text-blue-500 text-xl font-bold mb-2">
        {{ $t("auth.otp") }}
      </h2>
      <p class="text-center text-gray-700 text-sm mb-6">
        {{ $t("messages.otpSent") }} <br />
        <span class="text-blue-500 font-semibold">{{ email }}</span>
      </p>

      <!-- OTP Inputs -->
      <div class="flex justify-center gap-2 mb-6">
        <input
          v-for="(digit, index) in 6"
          :key="index"
          type="text"
          maxlength="1"
          v-model="otp[index]"
          :disabled="loadingVerify"
          class="w-12 h-12 text-center text-lg rounded-full bg-indigo-50 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300"
          @input="moveToNext(index)"
          @keydown.backspace="handleBackspace(index, $event)"
          @paste="handlePaste"
          ref="otpInputs"
        />
      </div>

      <!-- Verify Button -->
      <button
        class="w-full py-2 mb-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 flex justify-center items-center gap-2"
        @click="verifyOtp"
        :disabled="loadingVerify || loadingResend"
      >
        <span v-if="!loadingVerify">{{ $t("auth.verifyOtp") }}</span>
        <Spinner v-else />
      </button>

      <!-- Resend OTP Button -->
      <button
        class="w-full py-2 bg-gray-200 text-blue-500 rounded-full font-semibold hover:bg-gray-300 transition-all duration-300 flex justify-center items-center gap-2"
        @click="resendOtp"
        :disabled="countdown > 0 || loadingResend || loadingVerify"
      >
        <span v-if="!loadingResend">
          <span v-if="countdown === 0">{{ $t("auth.resendOtp") }}</span>
          <span v-else>{{ $t("messages.resendIn") }} {{ countdown }}s</span>
        </span>
        <Spinner v-else />
      </button>
    </div>
  </div>
</template>

<script>
import Spinner from "~/components/Spinner.vue";

export default {
  components: { Spinner },
  data() {
    return {
      otp: Array(6).fill(""),
      email: "",
      countdown: 0,
      countdownTimer: null,
      loadingVerify: false,
      loadingResend: false,
    };
  },
  mounted() {
    this.email = localStorage.getItem("email") || "";
    this.sendOtp();

    this.$nextTick(() => {
      this.$refs.otpInputs?.[0]?.focus();
    });
  },
  beforeUnmount() {
    if (this.countdownTimer) clearInterval(this.countdownTimer);
  },
  methods: {
    startCountdown() {
      this.countdown = 60;
      this.countdownTimer = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          clearInterval(this.countdownTimer);
          this.countdownTimer = null;
        }
      }, 1000);
    },

    async sendOtp() {
      if (!this.email) return;
      this.loadingResend = true;

      try {
        const response = await fetch("http://localhost:8000/api/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: this.email }),
        });

        const result = await response.json();
        console.log("OTP sent:", result.message);
        this.startCountdown();
      } catch (error) {
        console.error("Error sending OTP:", error);
      } finally {
        this.loadingResend = false;
      }
    },

    resendOtp() {
      if (this.countdown === 0) {
        this.sendOtp();
      }
    },

    async verifyOtp() {
      this.loadingVerify = true;
      const code = this.otp.join("");

      try {
        const response = await fetch("http://localhost:8000/api/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: this.email, otp: code }),
        });

        const result = await response.json();
        if (response.ok && result.message.toLowerCase().includes("success")) {
          alert(this.$t("messages.otpVerified"));
          this.$router.push("/");
        } else {
          alert(this.$t("messages.invalidOtp"));
        }
      } catch (error) {
        console.error("OTP verify error", error);
        alert(this.$t("messages.otpError"));
      } finally {
        this.loadingVerify = false;
      }
    },

    moveToNext(index) {
      if (this.otp[index].length === 1 && index < 5) {
        this.$refs.otpInputs[index + 1].focus();
      }
    },

    handleBackspace(index, event) {
      if (event.key === "Backspace") {
        if (this.otp[index] === "") {
          if (index === 0) this.otp = Array(6).fill("");
          else this.$refs.otpInputs[index - 1].focus();
        }
      }
    },

    handlePaste(e) {
      const paste = e.clipboardData.getData("text").trim();
      if (/^\d{6}$/.test(paste)) {
        this.otp = paste.split("");
        this.$nextTick(() => {
          this.$refs.otpInputs[5].focus();
        });
      }
    },
  },
};
</script>
