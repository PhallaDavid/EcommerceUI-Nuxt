<template>
  <div>
    <!-- Modal Overlay with Blur -->
    <div
      v-if="show"
      class="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-center z-50 p-4"
    >
      <!-- Modal -->
      <div
        class="bg-white rounded-xl shadow-xl w-full max-w-5xl p-6 relative overflow-y-auto max-h-[90vh]"
      >
        <!-- Close Button -->
        <button
          @click="close"
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          ✕
        </button>

        <!-- Modal Header -->
        <h2 class="text-3xl font-semibold text-slate-900 mb-6">
          {{ t("order.orderDetails") }} #{{ order.id }}
        </h2>

        <!-- Order Info -->
        <div class="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p class="font-medium text-slate-500">{{ t("order.orderDate") }}</p>
            <p class="text-slate-900 mt-1">
              {{ formatDate(order.created_at) }}
            </p>
          </div>
          <div>
            <p class="font-medium text-slate-500">
              {{ t("order.orderStatus") }}
            </p>
            <p
              :class="getStatusClass(order.status)"
              class="inline-block mt-1 py-1.5 px-3 rounded-md font-medium text-[14px]"
            >
              {{ getStatusText(order.status) }}
            </p>
          </div>
        </div>

        <!-- Products Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-100">
                <th class="p-3 text-sm font-medium text-slate-700">Image</th>
                <th class="p-3 text-sm font-medium text-slate-700">Product</th>
                <th class="p-3 text-sm font-medium text-slate-700">Price</th>
                <th class="p-3 text-sm font-medium text-slate-700">Quantity</th>
                <th class="p-3 text-sm font-medium text-slate-700">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in order.items"
                :key="item.id"
                class="border-b hover:bg-gray-50 transition"
              >
                <td class="p-3">
                  <img
                    v-if="item.product.images && item.product.images.length"
                    :src="item.product.images[0]"
                    alt="Product Image"
                    class="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td class="p-3 text-slate-900 font-medium">
                  {{ item.product.name }}
                </td>
                <td class="p-3 text-slate-900">
                  {{ t("common.currency")
                  }}{{ parseFloat(item.price).toFixed(2) }}
                </td>
                <td class="p-3 text-slate-900">{{ item.quantity }}</td>
                <td class="p-3 text-slate-900 font-semibold">
                  {{ t("common.currency")
                  }}{{ (item.price * item.quantity).toFixed(2) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Total -->
        <div class="mt-6 flex justify-end border-t border-gray-200 pt-4">
          <p class="text-2xl font-semibold text-slate-900">
            {{ t("common.total") }}: {{ t("common.currency")
            }}{{ parseFloat(order.total).toFixed(2) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const { t } = useI18n();

defineProps({
  show: Boolean,
  order: Object,
});

const emit = defineEmits(["close"]);

const close = () => emit("close");

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return (
    date.toLocaleDateString() +
    " " +
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
};

const getStatusClass = (status) => {
  const classes = {
    completed: "bg-green-100 text-green-600",
    processing: "bg-blue-100 text-blue-600",
    cancelled: "bg-red-100 text-red-600",
    pending: "bg-yellow-100 text-yellow-600",
    shipped: "bg-purple-100 text-purple-600",
    delivered: "bg-green-100 text-green-600",
  };
  return classes[status] || "bg-gray-100 text-gray-600";
};

const getStatusText = (status) => {
  const texts = {
    completed: t("order.completed"),
    processing: t("order.processing"),
    cancelled: t("order.cancelled"),
    pending: t("order.pending"),
    shipped: t("order.shipped"),
    delivered: t("order.delivered"),
  };
  return texts[status] || status;
};
</script>
