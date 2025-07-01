import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Pagination } from '../types/pagination.type';

export interface Tag {
  id: string;
  name: string;
  description?: string;
}

export interface VariantValue {
  id: string;
  value: string;
}

export interface VariantAttribute {
  id: string;
  name: string;
  values: VariantValue[];
}

export interface ProductVariant {
  id: string;
  values: VariantValue[];
  attribute: VariantAttribute;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  categoryId?: string | null;
  vendor?: string;
  collection?: string;
  tags?: Tag[];
  variants?: ProductVariant[];
}

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  endpoints: (builder) => ({
    getProducts: builder.query<{ data: Product[]; pagination: Pagination }, void>({
      query: () => 'products',
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `products/${id}`,
    }),
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: 'products',
        method: 'POST',
        body,
      }),
    }),
    updateProduct: builder.mutation<Product, { id: string; data: Partial<Product> }>({
      query: ({ id, data }) => ({
        url: `products/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteProduct: builder.mutation<{ message: string; id: string }, string>({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
