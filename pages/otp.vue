<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="w-96 bg-black p-8 rounded-xl shadow-lg">
      <h2 class="text-center text-white text-xl mb-2">OTP Verification</h2>
      <p class="text-center text-gray-400 text-sm mb-4">
        6-digit code has been sent to <br />
        <span class="text-green-400 font-semibold">{{ email }}</span>
      </p>

      <!-- OTP Inputs -->
      <div class="flex justify-center gap-2 mb-6">
        <input
          v-for="(digit, index) in 6"
          :key="index"
          type="text"
          maxlength="1"
          v-model="otp[index]"
          class="w-10 h-12 text-center text-lg rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-green-400"
          @input="moveToNext(index)"
          @keydown.backspace="handleBackspace(index, $event)"
          @paste="handlePaste"
          ref="otpInputs"
        />
      </div>

      <!-- Verify Button -->
      <button
        class="w-full py-2 mb-3 bg-green-400 text-black rounded-full font-semibold"
        @click="verifyOtp"
      >
        Verify OTP
      </button>

      <!-- Resend OTP Button -->
      <button
        class="w-full py-2 bg-gray-600 text-white rounded-full font-semibold"
        @click="resendOtp"
        :disabled="countdown > 0"
      >
        <span v-if="countdown === 0">Resend OTP</span>
        <span v-else>Resend in {{ countdown }}s</span>
      </button>
    </div>
  </div>
</template>

<script>
definePageMeta({
  middleware: "guest",
});
export default {
  data() {
    return {
      otp: Array(6).fill(""),
      email: "",
      countdown: 0,
      countdownTimer: null,
    };
  },
  mounted() {
    this.email = localStorage.getItem("email") || "";
    this.sendOtp();

    // Focus the first input after rendering
    this.$nextTick(() => {
      this.$refs.otpInputs?.[0]?.focus();
    });
  },
  beforeUnmount() {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
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

      try {
        const response = await fetch("http://localhost:8000/api/send-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: this.email }),
        });

        const result = await response.json();
        console.log("OTP sent:", result.message);
        this.startCountdown();
      } catch (error) {
        console.error("Error sending OTP:", error);
      }
    },

    resendOtp() {
      if (this.countdown === 0) {
        this.sendOtp();
      }
    },

    async verifyOtp() {
      const code = this.otp.join("");

      try {
        const response = await fetch("http://localhost:8000/api/verify-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
            otp: code,
          }),
        });

        const result = await response.json();
        if (response.ok && result.message.toLowerCase().includes("success")) {
          alert("OTP Verified Successfully!");
          this.$router.push("/");
        } else {
          alert("Invalid OTP. Try again.");
        }
      } catch (error) {
        console.error("OTP verify error", error);
        alert("An error occurred during verification. Please try again.");
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
          if (index === 0) {
            this.otp = Array(6).fill("");
          } else {
            this.$refs.otpInputs[index - 1].focus();
          }
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
