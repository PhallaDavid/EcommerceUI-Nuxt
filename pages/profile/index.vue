<template>
  <div class="sm:px-6 lg:px-8">
    <div class="mx-auto">
      <!-- Header -->
      <div class="text-center mb-12 animate-fade-in">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">
          {{ $t("profile.myProfile") }}
        </h1>
        <p class="text-lg text-gray-600">{{ $t("profile.editProfile") }}</p>
      </div>

      <!-- Profile Card -->
      <div class="bg-white rounded-lg overflow-hidden animate-slide-up">
        <form @submit.prevent="updateProfile" class="p-8">
          <!-- Avatar Section -->
          <div class="mb-8 text-center">
            <div class="relative inline-block">
              <img
                :src="profile.avatar || '/assets/default-avatar.png'"
                class="w-32 h-32 rounded-full object-cover border-4 border-white mx-auto"
                alt="Avatar"
              />
              <div
                class="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 shadow-lg"
              >
                <svg
                  class="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
              </div>
            </div>
            <input
              type="file"
              @change="handleAvatarUpload"
              class="mt-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
            />
          </div>

          <!-- Form Fields -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <!-- Name -->
            <div class="animate-fade-in-delay-1">
              <label class="block text-sm font-medium text-gray-700 mb-2">{{
                $t("profile.fullName")
              }}</label>
              <input
                type="text"
                v-model="profile.name"
                class="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
                placeholder="Enter your full name"
              />
            </div>

            <!-- Email -->
            <div class="animate-fade-in-delay-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">{{
                $t("auth.email")
              }}</label>
              <input
                type="email"
                v-model="profile.email"
                class="w-full border border-gray-300 rounded-xl p-4 bg-gray-50 cursor-not-allowed"
                disabled
              />
            </div>

            <!-- Phone -->
            <div class="animate-fade-in-delay-3">
              <label class="block text-sm font-medium text-gray-700 mb-2">{{
                $t("auth.phone")
              }}</label>
              <input
                type="text"
                v-model="profile.phone"
                class="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
                placeholder="Enter your phone number"
              />
            </div>

            <!-- City -->
            <div class="animate-fade-in-delay-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">{{
                $t("profile.city")
              }}</label>
              <input
                type="text"
                v-model="profile.city"
                class="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
                placeholder="Enter your city"
              />
            </div>

            <!-- State -->
            <div class="animate-fade-in-delay-5">
              <label class="block text-sm font-medium text-gray-700 mb-2">{{
                $t("profile.state")
              }}</label>
              <input
                type="text"
                v-model="profile.state"
                class="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
                placeholder="Enter your state"
              />
            </div>

            <!-- ZIP -->
            <div class="animate-fade-in-delay-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">{{
                $t("profile.zip")
              }}</label>
              <input
                type="text"
                v-model="profile.zip"
                class="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
                placeholder="Enter your ZIP code"
              />
            </div>
          </div>

          <!-- Address -->
          <div class="mb-8 animate-fade-in-delay-7">
            <label class="block text-sm font-medium text-gray-700 mb-2">{{
              $t("profile.address")
            }}</label>
            <textarea
              v-model="profile.address"
              class="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-md resize-none"
              rows="4"
              placeholder="Enter your address"
            ></textarea>
          </div>

          <!-- Gallery Images -->
          <div class="mb-8 animate-fade-in-delay-8">
            <label class="block text-sm font-medium text-gray-700 mb-4">{{
              $t("profile.galleryImages")
            }}</label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div
                v-for="(img, index) in profile.images"
                :key="index"
                class="relative group animate-scale-in"
              >
                <img
                  :src="img"
                  class="w-full h-24 rounded-xl object-cover border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                />
                <button
                  type="button"
                  @click="removeImage(index)"
                  class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 shadow-lg"
                >
                  ×
                </button>
              </div>
            </div>
            <input
              type="file"
              @change="handleImageUpload"
              multiple
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-500 file:to-indigo-600 file:text-white hover:file:from-blue-600 hover:file:to-indigo-700 transition-all duration-200"
            />
          </div>

          <!-- Save Button -->
          <div class="flex justify-end animate-fade-in-delay-9">
            <button
              type="submit"
              class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {{ $t("common.save") }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const profile = ref({
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  avatar: "",
  images: [],
  avatarFile: null,
  newImages: [],
});

async function fetchProfile() {
  try {
    const { $axios } = useNuxtApp();
    const res = await $axios.get("/profile");
    const data = res.data.user;
    profile.value = {
      ...profile.value,
      ...data,
      images: data.images || [],
      avatarFile: null,
      newImages: [],
    };
  } catch (err) {
    console.error("Error fetching profile:", err);
  }
}

function handleAvatarUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  profile.value.avatar = URL.createObjectURL(file);
  profile.value.avatarFile = file;
}

function handleImageUpload(e) {
  const files = Array.from(e.target.files);
  files.forEach((file) => {
    profile.value.images.push(URL.createObjectURL(file));
  });
  profile.value.newImages.push(...files);
}

function removeImage(index) {
  profile.value.images.splice(index, 1);
  profile.value.newImages.splice(index, 1);
}

async function updateProfile() {
  try {
    const { $axios } = useNuxtApp();
    const formData = new FormData();
    formData.append("name", profile.value.name);
    formData.append("phone", profile.value.phone || "");
    formData.append("address", profile.value.address || "");
    formData.append("city", profile.value.city || "");
    formData.append("state", profile.value.state || "");
    formData.append("zip", profile.value.zip || "");
    if (profile.value.avatarFile)
      formData.append("avatar", profile.value.avatarFile);
    if (profile.value.newImages.length) {
      profile.value.newImages.forEach((file) =>
        formData.append("images[]", file)
      );
    }

    await $axios.post("/profile/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    alert($t("messages.updateProfileSuccess"));
    fetchProfile();
  } catch (err) {
    console.error("Error updating profile:", err);
  }
}

onMounted(() => {
  fetchProfile();
});
</script>

<style scoped>
input[type="file"] {
  cursor: pointer;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out forwards;
}

.animate-scale-in {
  animation: scaleIn 0.5s ease-out forwards;
}

.animate-fade-in-delay-1 {
  animation: fadeIn 0.6s ease-out 0.1s forwards;
  opacity: 0;
}

.animate-fade-in-delay-2 {
  animation: fadeIn 0.6s ease-out 0.2s forwards;
  opacity: 0;
}

.animate-fade-in-delay-3 {
  animation: fadeIn 0.6s ease-out 0.3s forwards;
  opacity: 0;
}

.animate-fade-in-delay-4 {
  animation: fadeIn 0.6s ease-out 0.4s forwards;
  opacity: 0;
}

.animate-fade-in-delay-5 {
  animation: fadeIn 0.6s ease-out 0.5s forwards;
  opacity: 0;
}

.animate-fade-in-delay-6 {
  animation: fadeIn 0.6s ease-out 0.6s forwards;
  opacity: 0;
}

.animate-fade-in-delay-7 {
  animation: fadeIn 0.6s ease-out 0.7s forwards;
  opacity: 0;
}

.animate-fade-in-delay-8 {
  animation: fadeIn 0.6s ease-out 0.8s forwards;
  opacity: 0;
}

.animate-fade-in-delay-9 {
  animation: fadeIn 0.6s ease-out 0.9s forwards;
  opacity: 0;
}
</style>
