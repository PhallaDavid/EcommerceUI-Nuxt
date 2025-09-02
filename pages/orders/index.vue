<template>
  <div class="rounded-lg">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"
      ></div>
      <span class="ml-3 text-slate-600">{{ t("common.loading") }}</span>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <div class="text-red-600 mb-4">
        <svg
          class="w-16 h-16 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          ></path>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-slate-900 mb-2">
        {{ t("common.error") }}
      </h3>
      <p class="text-slate-600 mb-4">{{ error }}</p>
      <button
        @click="fetchOrders"
        class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
      >
        {{ t("common.retry") }}
      </button>
    </div>

    <!-- No Orders State -->
    <div v-else-if="!orders || orders.length === 0" class="text-center py-12">
      <div class="text-slate-400 mb-4">
        <svg
          class="w-16 h-16 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          ></path>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-slate-900 mb-2">
        {{ t("order.noOrders") }}
      </h3>
      <p class="text-slate-600">{{ t("order.noOrdersMessage") }}</p>
    </div>

    <!-- Orders List -->
    <div v-else>
      <div class="flex justify-between items-center border-b border-gray-200 pb-4">
        <h3 class="text-2xl font-semibold text-slate-900">
          {{ t("order.orderHistory") }}
        </h3>
        <select
          v-model="selectedStatus"
          class="appearance-none cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 outline-0 px-4 py-2 rounded-md text-[15px]"
        >
          <option value="">{{ t("order.allOrders") }}</option>
          <option value="completed">{{ t("order.completed") }}</option>
          <option value="processing">{{ t("order.processing") }}</option>
          <option value="cancelled">{{ t("order.cancelled") }}</option>
          <option value="pending">{{ t("order.pending") }}</option>
        </select>
      </div>

      <div class="mt-4 space-y-4">
        <div
          v-for="order in filteredOrders"
          :key="order.id"
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center gap-16 p-8 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
        >
          <!-- Products -->
          <div>
            <h6 class="text-[15px] font-medium text-slate-900">
              {{ getOrderProductNames(order) }}
            </h6>
            <p class="text-[13px] text-slate-500 mt-1">
              {{ t("order.orderNumber") }}:
              <span class="text-slate-900 font-medium">#{{ order.id }}</span>
            </p>
          </div>

          <!-- Date -->
          <div>
            <h6 class="text-[15px] font-medium text-slate-500">
              {{ t("order.orderDate") }}
            </h6>
            <p class="text-[15px] text-slate-900 font-medium mt-2">
              {{ formatDate(order.created_at) }}
            </p>
          </div>

          <!-- Status -->
          <div>
            <h6 class="text-[15px] font-medium text-slate-500">
              {{ t("order.orderStatus") }}
            </h6>
            <p
              :class="getStatusClass(order.status)"
              class="text-[13px] font-medium mt-2 inline-block rounded-md py-1.5 px-3"
            >
              {{ getStatusText(order.status) }}
            </p>
          </div>

          <!-- Total -->
          <div>
            <h6 class="text-[15px] font-medium text-slate-500">
              {{ t("common.price") }}
            </h6>
            <p class="text-[15px] text-slate-900 font-medium mt-2">
              {{ t("common.currency") }}{{ parseFloat(order.total).toFixed(2) }}
            </p>
          </div>

          <!-- Actions -->
          <div class="flex flex-wrap gap-2 justify-end">
            <button
              v-if="order.status === 'completed'"
              class="text-[15px] font-medium px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white tracking-wide"
            >
              {{ t("order.buyAgain") }}
            </button>
            <button
              v-if="order.status === 'processing'"
              class="text-[15px] font-medium px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white tracking-wide"
            >
              {{ t("order.cancelOrder") }}
            </button>
            <button
              @click="openModal(order)"
              class="text-[15px] font-medium px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-slate-900 tracking-wide"
            >
              {{ t("order.viewOrder") }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <OrderDetailModal
      :show="showModal"
      :order="selectedOrder"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import OrderDetailModal from "~/components/OrderDetailModal.vue"; // You can also define inline

const { t } = useI18n();

const orders = ref([]);
const loading = ref(true);
const error = ref("");
const selectedStatus = ref("");

const showModal = ref(false);
const selectedOrder = ref({});

const filteredOrders = computed(() => {
  if (!selectedStatus.value) return orders.value;
  return orders.value.filter((order) => order.status === selectedStatus.value);
});

const fetchOrders = async () => {
  try {
    loading.value = true;
    error.value = "";

    const { $axios } = useNuxtApp();
    const response = await $axios.get("/orders/history");

    orders.value = response.data.orders || [];
  } catch (err) {
    console.error("Error fetching orders:", err);
    error.value =
      err.response?.data?.message || err.message || "Failed to load orders";
  } finally {
    loading.value = false;
  }
};

const openModal = (order) => {
  selectedOrder.value = order;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedOrder.value = {};
};

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

const getOrderProductNames = (order) => {
  if (!order.items || order.items.length === 0) return "No products";
  if (order.items.length === 1)
    return order.items[0].product?.name || "Product";
  return `${order.items[0].product?.name || "Product"} +${
    order.items.length - 1
  } more`;
};

onMounted(fetchOrders);
</script>
