import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Pagination } from '../types/pagination.type';

// ProductResponseDto from backend/src/api/order/dto/order-response.dto.ts
export interface ProductResponseDto {
  id: string;
  name: string;
}

// Tag interface (not in ProductResponseDto, but used in Product)
export interface Tag {
  id: string;
  name: string;
  description?: string;
}

// VariantValue and VariantAttribute interfaces
export interface VariantValue {
  id: string;
  name: string;
}

export interface VariantAttribute {
  id: string;
  name: string;
  values?: VariantValue[];
}

// CreateProductVariantDto matches backend/src/api/product/dto/create-product-variant.dto.ts
export interface CreateProductVariantDto {
  price: number;
  attributeId?: string;
  values?: string[];
}

// CreateProductDto matches backend/src/api/product/dto/create-product.dto.ts
export interface CreateProductDto {
  name: string;
  sku: string;
  description?: string;
  categoryId?: string;
  vendor?: string;
  collection?: string;
  tags?: string[]; // Tag IDs
  productVariant?: CreateProductVariantDto[];
}

// ProductVariant for frontend (not for create, but for display)
export interface ProductVariant {
  id?: string;
  price: number;
  attribute?: VariantAttribute;
  values?: VariantValue[];
}

// Product interface for frontend (extends ProductResponseDto, includes more fields)
export interface Product extends ProductResponseDto {
  sku: string;
  description?: string;
  categoryId?: string | null;
  vendor?: string;
  collection?: string;
  tags?: Tag[];
  productVariant?: ProductVariant[];
}

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  endpoints: (builder) => ({
    getProducts: builder.query<{ data: Product[]; pagination: Pagination }, void>({
      query: () => ({
        url: 'products',
        method: 'GET',
      }),
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => ({
        url: `products/${id}`,
        method: 'GET',
      }),
    }),
    createProduct: builder.mutation<Product, CreateProductDto>({
      query: (body) => ({
        url: 'products',
        method: 'POST',
        body,
      }),
    }),
    updateProduct: builder.mutation<Product, { id: string; data: Partial<CreateProductDto> }>({
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
