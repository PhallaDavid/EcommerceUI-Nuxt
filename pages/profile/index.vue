<template>
  <div class="max-w-7xl mx-auto p-8 mt-8">
    <h2 class="text-3xl font-semibold mb-8 text-blue-500">My Profile</h2>

    <form @submit.prevent="updateProfile" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Avatar -->
      <div class="col-span-1 md:col-span-2 flex items-center gap-6">
        <img
          :src="profile.avatar || '/assets/default-avatar.png'"
          class="w-28 h-28 rounded-lg object-cover border"
          alt="Avatar"
        />
        <input
          type="file"
          @change="handleAvatarUpload"
          class="border rounded-lg p-2 w-full md:w-1/2"
        />
      </div>

      <!-- Name -->
      <div>
        <label class="block text-gray-700 font-medium mb-1">Full Name</label>
        <input
          type="text"
          v-model="profile.name"
          class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Email -->
      <div>
        <label class="block text-gray-700 font-medium mb-1">Email</label>
        <input
          type="email"
          v-model="profile.email"
          class="w-full border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
          disabled
        />
      </div>

      <!-- Phone -->
      <div>
        <label class="block text-gray-700 font-medium mb-1">Phone</label>
        <input
          type="text"
          v-model="profile.phone"
          class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Address -->
      <div class="col-span-1 md:col-span-2">
        <label class="block text-gray-700 font-medium mb-1">Address</label>
        <textarea
          v-model="profile.address"
          class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
          rows="3"
        ></textarea>
      </div>

      <!-- City -->
      <div>
        <label class="block text-gray-700 font-medium mb-1">City</label>
        <input
          type="text"
          v-model="profile.city"
          class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- State -->
      <div>
        <label class="block text-gray-700 font-medium mb-1">State</label>
        <input
          type="text"
          v-model="profile.state"
          class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- ZIP -->
      <div>
        <label class="block text-gray-700 font-medium mb-1">ZIP</label>
        <input
          type="text"
          v-model="profile.zip"
          class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Gallery Images -->
      <div class="col-span-1 md:col-span-2">
        <label class="block text-gray-700 font-medium mb-2">Gallery Images</label>
        <div class="flex gap-4 flex-wrap items-center">
          <div
            v-for="(img, index) in profile.images"
            :key="index"
            class="relative"
          >
            <img :src="img" class="w-24 h-24 rounded-lg object-cover border" />
            <button
              type="button"
              @click="removeImage(index)"
              class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
            >
              ×
            </button>
          </div>
          <input
            type="file"
            @change="handleImageUpload"
            multiple
            class="border rounded-lg p-2"
          />
        </div>
      </div>

      <!-- Save Button -->
      <div class="col-span-1 md:col-span-2 flex justify-end">
        <button
          type="submit"
          class="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
</template>



<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

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
    const token = localStorage.getItem("token");
    const res = await axios.get("http://127.0.0.1:8000/api/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
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
    const token = localStorage.getItem("token");
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

    await axios.post("http://127.0.0.1:8000/api/profile/update", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    alert("Profile updated successfully!");
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
</style>
