<template>
  <div>
    <button @click="createOrder" :disabled="loading">
      {{ loading ? 'Creating...' : 'Create Order' }}
    </button>
    <pre v-if="result">{{ result }}</pre>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const loading = ref(false)
const result = ref(null)
const token = ref(null)

const orderData = {
  user_id: 1,
  products: [
    { id: 1, quantity: 1 } // the product id and quantity you want to buy
  ],
  shipping_address: "123 Main Street, Phnom Penh",
  payment_method: "bank_transfer",
  total_price: 29.99,
  note: "Please deliver ASAP",
  payment_status: "pending",
  sku: "ORD123456789",
  order_status: "processing",
  shipping_fee: 5.00,
}

const createOrder = async () => {
  loading.value = true
  result.value = null
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/orders', orderData, {
      headers: { Authorization: `Bearer ${token.value}` },
    })
    result.value = JSON.stringify(response.data, null, 2)
    console.log('Order created:', response.data)
  } catch (error) {
    result.value = JSON.stringify(error.response?.data || error.message, null, 2)
    console.error('Failed to create order:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  token.value = localStorage.getItem('token')
})

</script>
