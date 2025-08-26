<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md bg-gray-200 rounded-lg p-8">
      <!-- Header -->
      <div class="text-center mb-6">
        <h2 class="text-lg font-bold text-gray-800">Create Account Now</h2>
        <p class="text-xs text-gray-800">Create An Account Now start</p>
        <p class="text-xs text-gray-800">Manage Payment</p>
      </div>

      <!-- Form Fields -->
      <div class="flex flex-col gap-4">
        <!-- Email -->
        <input
          v-model="email"
          type="text"
          id="email"
          placeholder="Email"
          class="w-full rounded-full bg-gray-100 py-2 pl-5 pr-4 text-gray-800 focus:ring-1 focus:ring-green-300 focus:outline-none"
        />

        <!-- Name -->
        <input
          v-model="name"
          id="name"
          type="text"
          placeholder="Name"
          class="w-full rounded-full bg-gray-100 py-2 pl-5 pr-4 text-gray-800 focus:ring-1 focus:ring-green-300 focus:outline-none"
        />

        <!-- Password -->
        <div class="relative w-full">
          <input
            v-model="password"
            id="password"
            type="password"
            placeholder="Password"
            class="w-full rounded-full bg-gray-100 py-2 pl-5 pr-10 text-gray-800 focus:ring-1 focus:ring-green-300 focus:outline-none"
          />
          <!-- Eye Icon -->
          <span
            onclick="togglePassword()"
            class="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
          >
            👁️
          </span>
        </div>

        <!-- Confirm Password -->
        <div class="relative w-full">
          <input
            v-model="password_confirmation"
            id="password_confirmation"
            type="password"
            placeholder="Confirm Password"
            class="w-full rounded-full bg-gray-100 py-2 pl-5 pr-10 text-gray-800 focus:ring-1 focus:ring-green-300 focus:outline-none"
          />
          <!-- Eye Icon -->
          <span
            onclick="togglePassword()"
            class="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
          >
            👁️
          </span>
        </div>

        <!-- Sign Up Button -->
        <button
          @click="register"
          class="w-full rounded-full bg-green-400 px-4 py-2 font-semibold text-gray-900 hover:bg-green-500 transition"
        >
          SignUp
        </button>

        <!-- Sign In Link -->
        <div class="text-center mt-2">
          <span class="text-gray-800">Already have an account?</span>
          <button
            @click="$router.push('/login')"
            class="text-green-400 hover:underline ml-1"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default{
  data(){
    return{
      email:"",
      name:"",
      password:"",
      password_confirmation:"",
      errorMessage:"",
    }
  },
  methods: {
    async register() {
      this.errorMessage = "";
      try {
        const response = await axios.post("http://localhost:8000/api/register", {
          email: this.email,
          name: this.name,
          password: this.password,
          password_confirmation: this.password_confirmation,
        });
        console.log("Registration success:", response.data);
        localStorage.setItem("token", response.data.token);
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.errorMessage = error.response.data.errors.email
            ? error.response.data.errors.email[0]
            : "Invalid data.";
        } else {
          this.errorMessage = "Registration failed. Please try again.";
        }
        console.error("Registration failed:", error.response.data);
      }
    },
  },
}
</script>
