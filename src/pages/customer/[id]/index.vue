<template>
  <a-row>
    <a-col :md="{ span: 12, offset: 6 }" :xs="24">
      <a-button type="primary" @click="$router.push('/customer')">
        View All Customers
      </a-button>
      <h3 class="mt-3">
        {{ customer.first_name }} {{ customer.last_name }}
      </h3>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { useCustomerStore } from '~/stores/customer'
import type { CustomerProps } from '~/types'

const route = useRoute()
const customerStore = useCustomerStore()
const customer = reactive<CustomerProps>(customerStore.customer)
onMounted(async() => {
  const result = await customerStore.getCustomer(route.params.id)
  customer.first_name = result.first_name
  customer.last_name = result.last_name
  customer.email = result.email
  customer.phone = result.phone
  customer.address = result.address
  customer.description = result.description
})
</script>
