<template>
  <div class="relative inline-block text-left">
    <div>
      <button
        @click="toggleDropdown"
        type="button"
        class="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
        id="language-menu"
        aria-expanded="true"
        aria-haspopup="true"
      >
        <svg
          class="h-4 w-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          ></path>
        </svg>
        <span class="hidden sm:inline">{{ currentLocale.name }}</span>
        <svg
          :class="[
            'h-4 w-4 transition-transform duration-200',
            isDropdownOpen ? 'rotate-180' : '',
          ]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <div
      v-show="isDropdownOpen"
      class="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white border border-gray-200 focus:outline-none z-50"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="language-menu"
    >
      <div class="py-2" role="none">
        <button
          v-for="locale in availableLocales"
          :key="locale.code"
          @click="switchLanguage(locale.code)"
          class="flex items-center justify-start gap-3 w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
          :class="{
            'bg-blue-50 text-blue-700 font-medium':
              locale.code === $i18n.locale,
          }"
          role="menuitem"
        >
          <span class="text-lg flex-shrink-0 w-6 text-center">
            {{
              locale.code === "en" ? "🇺🇸" : locale.code === "km" ? "🇰🇭" : "🇨🇳"
            }}
          </span>
          <span class="flex-1">{{ locale.name }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useLocalePath, navigateTo } from "#imports";

const { locale, locales, setLocale } = useI18n();
const route = useRoute();
const localePath = useLocalePath();

const isDropdownOpen = ref(false);

const availableLocales = computed(() => locales.value);

const currentLocale = computed(
  () => locales.value.find((l) => l.code === locale.value) || locales.value[0]
);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const switchLanguage = async (code) => {
  await setLocale(code);
  // Navigate to the same page but in the new language
  await navigateTo(localePath(route.fullPath, code));
  isDropdownOpen.value = false;
};

// Close dropdown when clicking outside
const closeDropdown = (event) => {
  if (!event.target.closest("#language-menu")) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdown);
});
</script>
