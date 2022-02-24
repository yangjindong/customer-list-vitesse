import { defineStore } from 'pinia'
import axios from '~/plugins/http'
import type { CustomerProps } from '~/types'
import type CustomerStateTypes from '~/types'

export const useCustomerStore = defineStore({
  id: 'customer',
  state: (): CustomerStateTypes => ({
    customer: {
      first_name: '进东',
      last_name: '',
      email: '',
      phone: '',
      address: '',
      description: '',
      created_at: new Date(),
    },
    customers: { data: {} },
    columns: [
      {
        title: 'Name',
        key: 'name',
        width: 150,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        responsive: ['md'],
        width: 150,
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        width: 150,
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        width: 150,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        responsive: ['md'],
        width: 150,
      },
      {
        title: 'Created at',
        dataIndex: 'created_at',
        key: 'created_at',
      },
      {
        title: 'Operation',
        key: 'operation',
        width: 150,
        fixed: 'right',
        align: 'center',
      },
    ],
  }),
  getters: {
    getCustomers(state: CustomerStateTypes) {
      return state.customers.data
    },
  },
  // mutations: {
  //   listCustomers(state, data) {
  //     state.customers.data = data
  //   },
  //   getCustomer(state, data) {
  //     state.customer = data
  //   },
  //   createCustomer(state, data) {
  //     if (data._id) {
  //       state.customers.data[data._id] = data
  //     }
  //   },
  //   updateCustomer(state, data) {
  //     if (data._id) {
  //       state.customers.data[data._id] = data
  //     }
  //   },
  //   deleteCustomer(state, data) {
  //     delete state.customers.data[data._id]
  //   }
  // },
  actions: {
    async listCustomers() {
      const { data } = await axios({
        url: '/customers',
        method: 'get',
      })
      this.customers.data = data
      return data
    },
    async getCustomer(id: string | string[]): Promise<CustomerProps> {
      const { data } = await axios({
        url: `/customers/${id}`,
        method: 'get',
      })
      this.customer = data
      return data
    },
    async createCustomer(payload: CustomerProps) {
      const { data } = await axios({
        url: '/customers',
        method: 'post',
        data: payload,
      })
      if (data._id)
        this.customers.data[data._id] = data
    },
    async updateCustomer(id: string | string[], payload: CustomerProps) {
      const { data } = await axios({
        url: `/customers/${id}`,
        method: 'put',
        data: payload,
      })
      if (data._id)
        this.customers.data[data._id] = data
    },
    async deleteCustomer(id: string) {
      const { data } = await axios({
        url: `/customers/${id}`,
        method: 'delete',
      })
      delete this.customers.data[data._id]
    },
  },
})
