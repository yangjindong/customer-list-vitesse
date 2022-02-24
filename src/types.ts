import type { ViteSSGContext } from 'vite-ssg'
import type { ColumnGroupType, ColumnType } from 'ant-design-vue/es/table'

export type UserModule = (ctx: ViteSSGContext) => void

export default interface CustomerStateTypes {
  customer: CustomerProps
  customers: { data: ListProps<CustomerProps> }
  columns: (ColumnGroupType<any> | ColumnType<any>)[]
}

export interface CustomerProps {
  _id?: string
  first_name: string
  last_name: string
  email: string
  phone: string
  address: string
  description: string
  created_at?: Date
}

export type ListProps<P> = Record<string, P>
