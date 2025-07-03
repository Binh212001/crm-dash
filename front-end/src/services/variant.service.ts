import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Pagination } from '../types/pagination.type';

export interface VariantValue {
  id: string;
  name: string;
}

export interface VariantAttribute {
  id: string;
  name: string;
  values: VariantValue[];
}

export interface VariantAttributeParam {
  q?: string;
  page?: number;
  limit?: number;
}

export const variantAttributeApi = createApi({
  reducerPath: 'variantAttributeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  endpoints: (builder) => ({
    getVariantAttributes: builder.query<{ data: VariantAttribute[]; pagination: Pagination }, VariantAttributeParam | void>({
      query: (params) => {
        if (params) {
          const searchParams = new URLSearchParams();
          if (params.page !== undefined) searchParams.append('page', String(params.page));
          if (params.limit !== undefined) searchParams.append('limit', String(params.limit));
          if (params.q !== undefined) searchParams.append('q', String(params.q));
          const queryString = searchParams.toString();
          return queryString ? `variant-attribute?${queryString}` : 'variant-attribute';
        }
        return 'variant-attribute';
      },
    }),
    getVariantAttribute: builder.query<VariantAttribute, string>({
      query: (id) => `variant-attribute/${id}`,
    }),
    createVariantAttribute: builder.mutation<VariantAttribute, Partial<VariantAttribute>>({
      query: (body) => ({
        url: 'variant-attribute',
        method: 'POST',
        body,
      }),
    }),
    updateVariantAttribute: builder.mutation<VariantAttribute, { id: string; data: Partial<VariantAttribute> }>({
      query: ({ id, data }) => ({
        url: `variant-attribute/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteVariantAttribute: builder.mutation<{ deleted: boolean }, string>({
      query: (id) => ({
        url: `variant-attribute/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetVariantAttributesQuery,
  useGetVariantAttributeQuery,
  useCreateVariantAttributeMutation,
  useUpdateVariantAttributeMutation,
  useDeleteVariantAttributeMutation,
} = variantAttributeApi;
