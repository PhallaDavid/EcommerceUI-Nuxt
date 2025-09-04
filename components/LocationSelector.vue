<template>
  <div class="max-w-7xl mx-auto">
    <!-- Clean Header -->
    <div class="text-center mb-6">
      <div
        class="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg mb-3"
      >
        <svg
          class="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-gray-900 mb-1">Delivery Location</h2>
      <p class="text-gray-600 text-sm">
        Select your delivery location on the map
      </p>
    </div>

    <!-- Current Location Button -->
    <div class="flex justify-center mb-4">
      <button
        @click="getCurrentLocation"
        :disabled="loadingLocation"
        class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <svg
          v-if="!loadingLocation"
          class="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <svg
          v-else
          class="w-4 h-4 mr-2 animate-spin"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        {{ loadingLocation ? "Getting location..." : "Use Current Location" }}
      </button>
    </div>

    <!-- Selected Location Banner -->
    <!-- <div
      v-if="selectedLocation"
      class="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 flex items-center justify-between"
    >
      <div class="flex items-center space-x-2">
        <svg
          class="w-4 h-4 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span class="text-sm font-medium text-green-900"
          >Location selected</span
        >
        <span class="text-xs text-green-700">
          {{ selectedLocation.lat.toFixed(4) }},
          {{ selectedLocation.lng.toFixed(4) }}
        </span>
      </div>
      <button
        @click="selectedLocation = null"
        class="text-green-600 hover:text-green-800 p-1"
        title="Clear location"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div> -->

    <!-- Clean Map Container -->
    <div class="bg-white rounded-lg \ border border-gray-200 overflow-hidden">
      <div class="p-3 border-b border-gray-100 bg-gray-50">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <svg
              class="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            <span class="text-sm font-medium text-gray-900"
              >Select Location</span
            >
          </div>
          <span class="text-xs text-gray-500">Click on the map</span>
        </div>
      </div>
      <div class="relative">
        <div ref="mapContainer" class="w-full h-96"></div>
      </div>
    </div>

    <!-- Error Message -->
    <div
      v-if="locationError"
      class="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center justify-between"
    >
      <div class="flex items-center space-x-2">
        <svg
          class="w-4 h-4 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
        <span class="text-sm text-red-900">{{ locationError }}</span>
      </div>
      <button
        @click="locationError = ''"
        class="text-red-600 hover:text-red-800 p-1"
        title="Dismiss"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";

// Dynamic import for Leaflet (client-side only)
let L = null;
if (process.client) {
  import("leaflet").then((module) => {
    L = module.default;
  });
}

// Props
const props = defineProps({
  modelValue: {
    type: Object,
    default: null,
  },
});

// Emits
const emit = defineEmits(["update:modelValue"]);

// Reactive data
const selectedLocation = ref(props.modelValue);
const showMap = ref(true);
const loadingLocation = ref(false);
const locationError = ref("");
const mapContainer = ref(null);
let map = null;
let marker = null;

// Watch for external changes to modelValue
watch(
  () => props.modelValue,
  (newValue) => {
    selectedLocation.value = newValue;
  }
);

// Watch for changes to selectedLocation and emit update
watch(selectedLocation, (newValue) => {
  emit("update:modelValue", newValue);
});

// Get current location using geolocation API
const getCurrentLocation = () => {
  if (!process.client) return;

  if (!navigator.geolocation) {
    locationError.value = "Geolocation is not supported by this browser";
    return;
  }

  loadingLocation.value = true;
  locationError.value = "";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      selectedLocation.value = location;
      updateMapMarker(location);
      loadingLocation.value = false;
    },
    (error) => {
      loadingLocation.value = false;
      switch (error.code) {
        case error.PERMISSION_DENIED:
          locationError.value = "Location access denied by user";
          break;
        case error.POSITION_UNAVAILABLE:
          locationError.value = "Location information is unavailable";
          break;
        case error.TIMEOUT:
          locationError.value = "Location request timed out";
          break;
        default:
          locationError.value = "An unknown error occurred";
          break;
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000, // 5 minutes
    }
  );
};

// Initialize map
const initializeMap = () => {
  if (!process.client || !L || !mapContainer.value || map) return;

  // Initialize map centered on a default location (Phnom Penh, Cambodia)
  map = L.map(mapContainer.value).setView([11.5564, 104.9282], 13);

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // Add click handler to map
  map.on("click", (e) => {
    const location = {
      lat: e.latlng.lat,
      lng: e.latlng.lng,
    };
    selectedLocation.value = location;
    updateMapMarker(location);
  });

  // If we already have a selected location, show it on the map
  if (selectedLocation.value) {
    updateMapMarker(selectedLocation.value);
  }
};

// Update map marker
const updateMapMarker = (location) => {
  if (!process.client || !L || !map) return;

  // Remove existing marker
  if (marker) {
    map.removeLayer(marker);
  }

  // Add new marker
  marker = L.marker([location.lat, location.lng]).addTo(map);
  map.setView([location.lat, location.lng], 15);
};

// Initialize map on mount
onMounted(() => {
  if (process.client) {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      initializeMap();
    }, 100);
  }
});

// Watch for showMap changes to initialize/destroy map
watch(showMap, (newValue) => {
  if (!process.client) return;

  if (newValue) {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      initializeMap();
    }, 100);
  } else {
    // Clean up map when hiding
    if (map) {
      map.remove();
      map = null;
      marker = null;
    }
  }
});

onUnmounted(() => {
  if (map) {
    map.remove();
    map = null;
    marker = null;
  }
});
</script>

<style scoped>
@import "leaflet/dist/leaflet.css";
</style>
