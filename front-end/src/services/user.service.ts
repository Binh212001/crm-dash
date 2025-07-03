import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Pagination } from '../types/pagination.type';

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: string;
  bio?: string;
  avatar?: string;
  createdAt?: string;
  createdBy?: string | null;
  updatedAt?: string;
  updatedBy?: string | null;
}

export interface UserParam {
  q? :string;
  page?: number;
  limit?: number;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  endpoints: (builder) => ({
    getUsers: builder.query<{ data: User[]; pagination: Pagination }, UserParam | void>({
      query: (params) => {
        if (params) {
          const searchParams = new URLSearchParams();
          if (params.page !== undefined) searchParams.append('page', String(params.page));
          if (params.limit !== undefined) searchParams.append('limit', String(params.limit));
          if (params.q !== undefined) searchParams.append('q', String(params.q));
          const queryString = searchParams.toString();
          return queryString ? `user?${queryString}` : 'user';
        }
        return 'user';
      },
    }),
    getUser: builder.query<User, string>({
      query: (id) => `user/${id}`,
    }),
    createUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: 'user',
        method: 'POST',
        body,
      }),
    }),
    updateUser: builder.mutation<User, { id: string; data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `user/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteUser: builder.mutation<{ deleted: boolean }, string>({
      query: (id) => ({
        url: `user/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
