<template>
  <div text-4xl>
    <div i-carbon:user-multiple inline-block />
  </div>
  <a-row>
    <a-col :md="{ span: 16, offset: 4 }" :xs="24">
      <a-typography-title :level="3">
        Customers
      </a-typography-title>
      <ul>
        <li v-for="customer in customers" :key="customer._id">
          <router-link :to="`/customer/${customer._id}`">
            {{ customer.first_name }}{{ customer.last_name }}
          </router-link>
          {{ customer.email }}
          {{ customer.phone }}
        </li>
      </ul>
      <a-table
        bordered
        :data-source="customers"
        :columns="columns"
        :scroll="{ x: 1000 }"
      >
        <template #bodyCell="{ column, index, record }">
          <template v-if="column.key === 'name'">
            <div>{{ record.last_name }}{{ record.first_name }}</div>
          </template>
          <template v-if="column.key === 'operation'">
            <a-button class="mr-1" size="small" @click="handleShow(record)">
              Show
            </a-button>
            <a-button class="mr-1" size="small" @click="handleEdit(record)">
              Edit
            </a-button>
            <a-button
              type="primary"
              danger
              size="small"
              @click="handleDelete(record)"
            >
              Delete
            </a-button>
          </template>
        </template>
      </a-table>
      <br>
      <div>
        <a-button class="mr-3" type="primary" @click="$router.push('/customer/create')">
          Create Customer
        </a-button>
      </div>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { useCustomerStore } from '~/stores/customer'
import type { CustomerProps } from '~/types'

const customerStore = useCustomerStore()
const router = useRouter()
const columns = customerStore.columns
const customers = reactive([]) as CustomerProps[]
onMounted(async() => {
  await customerStore
    .listCustomers()
    .then((res: CustomerProps[]) => {
      res.forEach((customer) => {
        customers.push(customer)
      })
      // console.log(res)
    })
})
const handleShow = (record: CustomerProps) => {
  router.push(`/customer/${record._id}`)
}
const handleEdit = (record: CustomerProps) => {
  router.push(`/customer/${record._id}/edit`)
}
const handleDelete = (record: CustomerProps) => {
  if (record._id) {
    customerStore.deleteCustomer(record._id).then(() => {
      window.location.reload()
    })
  }
}
</script>
