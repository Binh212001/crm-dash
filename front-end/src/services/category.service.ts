import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Pagination } from '../types/pagination.type';

export interface Category {
  id: string;
  name: string;
  description?: string;
  parentId?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryParam {
  q?: string;
  page?: number;
  limit?: number;
}

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  endpoints: (builder) => ({
    getCategories: builder.query<{ data: Category[]; pagination: Pagination }, CategoryParam | void>({
      query: (params) => {
        if (params) {
          const searchParams = new URLSearchParams();
          if (params.page !== undefined) searchParams.append('page', String(params.page));
          if (params.limit !== undefined) searchParams.append('limit', String(params.limit));
          if (params.q !== undefined) searchParams.append('q', String(params.q));
          const queryString = searchParams.toString();
          return queryString ? `category?${queryString}` : 'category';
        }
        return 'category';
      },
    }),
    getCategory: builder.query<Category, string>({
      query: (id) => `category/${id}`,
    }),
    createCategory: builder.mutation<Category, Partial<Category>>({
      query: (body) => ({
        url: 'category',
        method: 'POST',
        body,
      }),
    }),
    updateCategory: builder.mutation<Category, { id: string; data: Partial<Category> }>({
      query: ({ id, data }) => ({
        url: `category/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteCategory: builder.mutation<{ deleted: boolean }, string>({
      query: (id) => ({
        url: `category/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
