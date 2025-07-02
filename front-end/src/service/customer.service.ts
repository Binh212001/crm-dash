import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Pagination } from '../types/pagination.type';

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  avatar?: string;
  orders: number;
  totalSpent: number;
  lastSeen?: string;
  lastOrder?: string;
}

export const customerApi = createApi({
  reducerPath: 'customerApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  endpoints: (builder) => ({
    getCustomers: builder.query<{ data: Customer[]; pagination: Pagination }, void>({
      query: () => 'customer',
    }),
    getCustomer: builder.query<Customer, string>({
      query: (id) => `customer/${id}`,
    }),
    createCustomer: builder.mutation<Customer, Partial<Customer>>({
      query: (body) => ({
        url: 'customer',
        method: 'POST',
        body,
      }),
    }),
    updateCustomer: builder.mutation<Customer, { id: string; data: Partial<Customer> }>({
      query: ({ id, data }) => ({
        url: `customer/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteCustomer: builder.mutation<{ deleted: boolean }, string>({
      query: (id) => ({
        url: `customer/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetCustomerQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApi;
