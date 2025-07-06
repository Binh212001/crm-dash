import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Pagination } from "../types/pagination.type";

// ProductResponseDto matches backend/src/api/product/dto/product-response.ts
export interface ProductResponseDto {
  id: string;
  name: string;
  sku: string;
  description?: string;
  category?: Category;
  vendor?: string;
  collection?: string;
  tags?: Tag[];
  price?: number;
  stock?: number; // Added stock
}

// Tag interface (used in ProductResponseDto)
export interface Tag {
  id: string;
  name: string;
  description?: string;
}
export interface Category {
  id: string;
  name: string;
  description?: string;
}

// CreateProductDto matches backend/src/api/product/dto/create-product.dto.ts
export interface CreateProductDto {
  name: string;
  sku: string;
  description?: string;
  categoryId?: string;
  vendor?: string;
  collection?: string;
  price?: number;
  tags?: string[]; // Tag IDs
  stock?: number; // Added stock
  // productVariant?: CreateProductVariantDto[]; // Not in create-product.dto.ts, comment out for now
}

// UpdateProductDto matches backend/src/api/product/dto/update-product.dto.ts
export interface UpdateProductDto {
  name?: string;
  description?: string;
  categoryId?: string;
  vendor?: string;
  collection?: string;
  tags?: string[];
  stock?: number; // Added stock
  price?: number;
}

export interface ProductParam {
  q?: string;
  page?: number;
  limit?: number;
}

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  endpoints: (builder) => ({
    getProducts: builder.query<
      { data: ProductResponseDto[]; pagination: Pagination },
      ProductParam
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.q) searchParams.append("q", params.q);
        if (params.page !== undefined)
          searchParams.append("page", String(params.page));
        if (params.limit !== undefined)
          searchParams.append("limit", String(params.limit));
        const queryString = searchParams.toString();
        return {
          url: `products${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
    }),
    getProduct: builder.query<ProductResponseDto, string>({
      query: (id) => ({
        url: `products/${id}`,
        method: "GET",
      }),
    }),
    createProduct: builder.mutation<ProductResponseDto, CreateProductDto>({
      query: (body) => ({
        url: "products",
        method: "POST",
        body,
      }),
    }),
    updateProduct: builder.mutation<
      ProductResponseDto,
      { id: string; data: UpdateProductDto }
    >({
      query: ({ id, data }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation<{ message: string; id: string }, string>({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
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
