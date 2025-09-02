<template>
  <div class="w-full space-y-6">
    <!-- Location Selection Options -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <button
        @click="getCurrentLocation"
        :disabled="loadingLocation"
        class="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1"
      >
        <div class="flex items-center justify-center space-x-3">
          <div class="relative">
            <i class="fi fi-rr-marker text-xl"></i>
            <div v-if="loadingLocation" class="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping"></div>
          </div>
          <span class="text-sm">
            {{ loadingLocation ? $t("common.loading") : $t("order.useCurrentLocation") }}
          </span>
        </div>
        <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </button>

      <button
        @click="showMap = !showMap"
        class="group relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
      >
        <div class="flex items-center justify-center space-x-3">
          <i class="fi fi-rr-map text-xl"></i>
          <span class="text-sm">{{ $t("order.chooseOnMap") }}</span>
        </div>
        <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </button>
    </div>

    <!-- Selected Location Display -->
    <div v-if="selectedLocation" class="animate-fade-in">
      <div class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 shadow-sm">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <i class="fi fi-rr-check text-white text-sm"></i>
            </div>
            <div>
              <h4 class="font-semibold text-green-800">{{ $t("order.locationSelected") }}</h4>
              <p class="text-sm text-green-600">
                {{ selectedLocation.lat.toFixed(4) }}, {{ selectedLocation.lng.toFixed(4) }}
              </p>
            </div>
          </div>
          <button
            @click="selectedLocation = null"
            class="text-green-600 hover:text-green-800 transition-colors p-1"
            title="Clear location"
          >
            <i class="fi fi-rr-cross-small text-lg"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Map Container -->
    <div v-if="showMap" class="animate-fade-in space-y-4">
      <div class="relative">
        <div ref="mapContainer" class="w-full h-80 bg-gray-100 rounded-xl shadow-inner border border-gray-200"></div>
        <div class="absolute top-4 left-4 bg-white px-3 py-2 rounded-lg shadow-md">
          <div class="flex items-center space-x-2">
            <i class="fi fi-rr-info text-blue-500"></i>
            <span class="text-sm text-gray-700">{{ $t("order.selectLocation") }}</span>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center space-x-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
        <i class="fi fi-rr-mouse-pointer text-gray-500"></i>
        <span>Click on the map to select your delivery location</span>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="locationError" class="animate-fade-in">
      <div class="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-4 shadow-sm">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
            <i class="fi fi-rr-exclamation text-white text-sm"></i>
          </div>
          <div class="flex-1">
            <h4 class="font-semibold text-red-800">Location Error</h4>
            <p class="text-sm text-red-600 mt-1">{{ locationError }}</p>
          </div>
          <button
            @click="locationError = ''"
            class="text-red-600 hover:text-red-800 transition-colors p-1"
            title="Dismiss"
          >
            <i class="fi fi-rr-cross-small text-lg"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Instructions -->
    <div v-if="!selectedLocation && !showMap" class="text-center py-8">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <i class="fi fi-rr-map-marker text-gray-400 text-2xl"></i>
      </div>
      <h4 class="text-lg font-medium text-gray-900 mb-2">{{ $t("order.selectLocation") }}</h4>
      <p class="text-sm text-gray-600 max-w-md mx-auto">
        Choose how you'd like to select your delivery location. You can use your current location or select a specific place on the map.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import L from 'leaflet'

// Props
const props = defineProps({
  modelValue: {
    type: Object,
    default: null
  }
})

// Emits
const emit = defineEmits(['update:modelValue'])

// Reactive data
const selectedLocation = ref(props.modelValue)
const showMap = ref(false)
const loadingLocation = ref(false)
const locationError = ref('')
const mapContainer = ref(null)
let map = null
let marker = null

// Watch for external changes to modelValue
watch(() => props.modelValue, (newValue) => {
  selectedLocation.value = newValue
})

// Watch for changes to selectedLocation and emit update
watch(selectedLocation, (newValue) => {
  emit('update:modelValue', newValue)
})

// Get current location using geolocation API
const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    locationError.value = 'Geolocation is not supported by this browser'
    return
  }

  loadingLocation.value = true
  locationError.value = ''

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      selectedLocation.value = location
      updateMapMarker(location)
      loadingLocation.value = false
    },
    (error) => {
      loadingLocation.value = false
      switch (error.code) {
        case error.PERMISSION_DENIED:
          locationError.value = 'Location access denied by user'
          break
        case error.POSITION_UNAVAILABLE:
          locationError.value = 'Location information is unavailable'
          break
        case error.TIMEOUT:
          locationError.value = 'Location request timed out'
          break
        default:
          locationError.value = 'An unknown error occurred'
          break
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000 // 5 minutes
    }
  )
}

// Initialize map
const initializeMap = () => {
  if (!mapContainer.value || map) return

  // Initialize map centered on a default location (Phnom Penh, Cambodia)
  map = L.map(mapContainer.value).setView([11.5564, 104.9282], 13)

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)

  // Add click handler to map
  map.on('click', (e) => {
    const location = {
      lat: e.latlng.lat,
      lng: e.latlng.lng
    }
    selectedLocation.value = location
    updateMapMarker(location)
  })

  // If we already have a selected location, show it on the map
  if (selectedLocation.value) {
    updateMapMarker(selectedLocation.value)
  }
}

// Update map marker
const updateMapMarker = (location) => {
  if (!map) return

  // Remove existing marker
  if (marker) {
    map.removeLayer(marker)
  }

  // Add new marker
  marker = L.marker([location.lat, location.lng]).addTo(map)
  map.setView([location.lat, location.lng], 15)
}

// Watch for showMap changes to initialize/destroy map
watch(showMap, (newValue) => {
  if (newValue) {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      initializeMap()
    }, 100)
  } else {
    // Clean up map when hiding
    if (map) {
      map.remove()
      map = null
      marker = null
    }
  }
})

// Cleanup on unmount
onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
    marker = null
  }
})
</script>

<style scoped>
/* Fade in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

/* Ping animation for loading indicator */
@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* Leaflet CSS overrides for better integration */
