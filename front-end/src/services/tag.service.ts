import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Pagination } from '../types/pagination.type';
import { setAuthHeader } from './api';

// Tag interface matches backend Tag entity/dto
export interface Tag {
  id: string;
  name: string;
  description?: string;
}

// CreateTagDto matches backend/src/api/tag/dto/create-tag.dto.ts
export interface CreateTagDto {
  name: string;
  description?: string;
}

// UpdateTagDto matches backend/src/api/tag/dto/update-tag.dto.ts
export interface UpdateTagDto {
  name?: string;
  description?: string;
}

export interface TagParam {
  q?: string;
  page?: number;
  limit?: number;
}

export const tagApi = createApi({
  reducerPath: 'tagApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' ,
    prepareHeaders: (headers) => {
      return setAuthHeader(headers);
    },
   }),
  endpoints: (builder) => ({
    getTags: builder.query<{ data: Tag[]; pagination: Pagination }, TagParam | void>({
      query: (params) => {
        if (params) {
          const searchParams = new URLSearchParams();
          if (params.page !== undefined) searchParams.append('page', String(params.page));
          if (params.limit !== undefined) searchParams.append('limit', String(params.limit));
          if (params.q !== undefined) searchParams.append('q', String(params.q));
          const queryString = searchParams.toString();
          return queryString ? `tag?${queryString}` : 'tag';
        }
        return 'tag';
      },
    }),
    getTag: builder.query<Tag, string>({
      query: (id) => `tag/${id}`,
    }),
    createTag: builder.mutation<Tag, CreateTagDto>({
      query: (body) => ({
        url: 'tag',
        method: 'POST',
        body,
      }),
    }),
    updateTag: builder.mutation<Tag, { id: string; data: UpdateTagDto }>({
      query: ({ id, data }) => ({
        url: `tag/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteTag: builder.mutation<{ deleted: boolean }, string>({
      query: (id) => ({
        url: `tag/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetTagsQuery,
  useGetTagQuery,
  useCreateTagMutation,
  useUpdateTagMutation,
  useDeleteTagMutation,
} = tagApi;
