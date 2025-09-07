<template>
  <div class="p-4">
    <p class="text-lg font-semibold mb-4">{{ $t("policy.title") }}</p>

    <!-- Responsive grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Free Shipping -->
      <div
        class="flex flex-col items-center text-center p-8 border border-gray-200 rounded-lg"
      >
        <img src="/assets/free-delivery.png" alt="" class="w-14 h-14" />
        <p class="font-medium">{{ $t("policy.freeShipping") }}</p>
        <span class="text-sm text-gray-600">
          {{ $t("policy.freeShippingDesc") }}
        </span>
      </div>

      <!-- 24/7 Support -->
      <div
        class="flex flex-col items-center text-center p-8 border border-gray-200 rounded-lg"
      >
        <img src="/assets/encrypted-phone.png" alt="" class="w-14 h-14" />
        <p class="font-medium">{{ $t("policy.support") }}</p>
        <span class="text-sm text-gray-600">
          {{ $t("policy.supportDesc") }}
        </span>
      </div>

      <!-- Money Back -->
      <div
        class="flex flex-col items-center text-center p-8 border border-gray-200 rounded-lg"
      >
        <img src="/assets/cash-back.png" alt="" class="w-14 h-14" />
        <p class="font-medium">{{ $t("policy.moneyBack") }}</p>
        <span class="text-sm text-gray-600">
          {{ $t("policy.moneyBackDesc") }}
        </span>
      </div>

      <!-- Secure Payment -->
      <div
        class="flex flex-col items-center text-center p-8 border border-gray-200 rounded-lg"
      >
        <img src="/assets/credit-card.png" alt="" class="w-14 h-14" />
        <p class="font-medium">{{ $t("policy.securePayment") }}</p>
        <span class="text-sm text-gray-600">
          {{ $t("policy.securePaymentDesc") }}
        </span>
      </div>
    </div>
  </div>
</template>
