<template>
  <a-row>
    <a-col :md="{ span: 12, offset: 6 }" :xs="24">
      <h2>Edit customer</h2>
      <a-form layout="vertical" :model="customer">
        <a-form-item label="First Name">
          <a-input v-model:value="customer.first_name" />
        </a-form-item>
        <a-form-item label="Last Name">
          <a-input v-model:value="customer.last_name" />
        </a-form-item>
        <a-form-item label="Email">
          <a-input v-model:value="customer.email" />
        </a-form-item>
        <a-form-item label="Phone">
          <a-input v-model:value="customer.phone" />
        </a-form-item>
        <a-form-item label="Address">
          <a-input v-model:value="customer.address" />
        </a-form-item>
        <a-form-item label="Description">
          <a-input v-model:value="customer.description" />
        </a-form-item>
        <a-button type="primary" @click="updateCustomer">
          Update Customer
        </a-button>
        <a-button
          style="margin-left: 10px"
          type="primary"
          plain
          @click="$router.push('/customer')"
        >
          View All Customers
        </a-button>
      </a-form>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { message } from 'ant-design-vue/es'
import { useCustomerStore } from '~/stores/customer'
import type { CustomerProps } from '~/types'

const router = useRouter()
const route = useRoute()
const customerStore = useCustomerStore()
const customer = reactive<CustomerProps>(customerStore.customer)
// const customer = toRefs(store.state.customer.customer)
onMounted(async() => {
  const result = await customerStore.getCustomer(route.params.id)
  customer.first_name = result.first_name
  customer.last_name = result.last_name
  customer.email = result.email
  customer.phone = result.phone
  customer.address = result.address
  customer.description = result.description
})
// console.log(customer)
const updateCustomer = () => {
  customerStore
    .updateCustomer(route.params.id, customer)
    .then(() => {
      message.success('Customer is updated successfully')
      setTimeout(() => {
        router.push('/customer')
      }, 3000)
    })
}
</script>
