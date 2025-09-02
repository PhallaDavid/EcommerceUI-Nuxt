<template>
  <footer class="bg-white dark:bg-gray-100">
    <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
      <div class="md:flex md:justify-between">
        <div class="mb-6 md:mb-0">
          <nuxt-link :to="localePath('/')" class="flex items-center">
            <img
              src="/assets/logo.jpg"
              alt="Logo"
              class="h-12 rounded-full object-contain"
            />
            <span class="font-bold text-xl text-gray-800"></span>
          </nuxt-link>
        </div>
        <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-4">
          <!-- Navigation Menu -->
          <div>
            <h2
              class="mb-6 text-sm font-semibold text-gray-900 uppercase text-gray-800"
            >
              {{ $t("nav.categories") }}
            </h2>
            <ul class="text-gray-500 text-gray-800 font-medium">
              <li class="mb-4">
                <nuxt-link
                  :to="localePath('/')"
                  class="hover:underline hover:text-blue-600 transition-colors duration-200"
                  >{{ $t("nav.home") }}</nuxt-link
                >
              </li>
              <li class="mb-4">
                <nuxt-link
                  :to="localePath('/products')"
                  class="hover:underline hover:text-blue-600 transition-colors duration-200"
                  >{{ $t("nav.products") }}</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  :to="localePath('/contact')"
                  class="hover:underline hover:text-blue-600 transition-colors duration-200"
                  >{{ $t("nav.contact") }}</nuxt-link
                >
              </li>
            </ul>
          </div>
          <!-- Customer Service -->
          <div>
            <h2
              class="mb-6 text-sm font-semibold text-gray-900 uppercase text-gray-800"
            >
              {{ $t("footer.customerService") }}
            </h2>
            <ul class="text-gray-500 text-gray-800 font-medium">
              <li class="mb-4">
                <nuxt-link
                  :to="localePath('/contact')"
                  class="hover:underline hover:text-blue-600 transition-colors duration-200"
                  >{{ $t("footer.help") }}</nuxt-link
                >
              </li>
              <li class="mb-4">
                <nuxt-link
                  :to="localePath('/contact')"
                  class="hover:underline hover:text-blue-600 transition-colors duration-200"
                  >{{ $t("footer.faq") }}</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  :to="localePath('/contact')"
                  class="hover:underline hover:text-blue-600 transition-colors duration-200"
                  >{{ $t("footer.returns") }}</nuxt-link
                >
              </li>
            </ul>
          </div>
          <!-- Company Info -->
          <div>
            <h2
              class="mb-6 text-sm font-semibold text-gray-900 uppercase text-gray-800"
            >
              {{ $t("footer.aboutUs") }}
            </h2>
            <ul class="text-gray-500 text-gray-800 font-medium">
              <li class="mb-4">
                <nuxt-link
                  :to="localePath('/contact')"
                  class="hover:underline hover:text-blue-600 transition-colors duration-200"
                  >{{ $t("footer.contactUs") }}</nuxt-link
                >
              </li>
              <li class="mb-4">
                <nuxt-link
                  :to="localePath('/contact')"
                  class="hover:underline hover:text-blue-600 transition-colors duration-200"
                  >{{ $t("footer.shipping") }}</nuxt-link
                >
              </li>
              <li>
                <nuxt-link
                  :to="localePath('/contact')"
                  class="hover:underline hover:text-blue-600 transition-colors duration-200"
                  >{{ $t("footer.privacyPolicy") }}</nuxt-link
                >
              </li>
            </ul>
          </div>
          <!-- Follow Us -->
          <div>
            <h2
              class="mb-6 text-sm font-semibold text-gray-900 uppercase text-gray-800"
            >
              {{ $t("footer.followUs") }}
            </h2>
            <ul class="text-gray-500 text-gray-800 font-medium">
              <li class="mb-4">
                <a
                  href="https://facebook.com"
                  class="hover:underline hover:text-blue-600 transition-colors duration-200"
                  >Facebook</a
                >
              </li>
              <li class="mb-4">
                <a
                  href="https://instagram.com"
                  class="hover:underline hover:text-blue-600 transition-colors duration-200"
                  >Instagram</a
                >
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  class="hover:underline hover:text-blue-600 transition-colors duration-200"
                  >Twitter</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr
        class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"
      />
      <div class="sm:flex sm:items-center sm:justify-between">
        <span class="text-sm text-gray-500 sm:text-center text-gray-800"
          >© 2025 E-Menu. {{ $t("footer.allRightsReserved") }}.
        </span>
        <div class="flex mt-4 sm:justify-center sm:mt-0">
          <a
            href="https://facebook.com"
            class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 8 19"
            >
              <path
                fill-rule="evenodd"
                d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="sr-only">Facebook page</span>
          </a>
          <a
            href="https://instagram.com"
            class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
              />
            </svg>
            <span class="sr-only">Instagram page</span>
          </a>
          <a
            href="https://twitter.com"
            class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 17"
            >
              <path
                fill-rule="evenodd"
                d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="sr-only">Twitter page</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { locale, t } = useI18n();
import { useLocalePath } from "#imports";
const localePath = useLocalePath();
</script>
