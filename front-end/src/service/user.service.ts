import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Pagination } from '../types/pagination.type';

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt?: string;
  createdBy?: string | null;
  updatedAt?: string;
  updatedBy?: string | null;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  endpoints: (builder) => ({
    getUsers: builder.query<{ data: User[]; pagination: Pagination }, void>({
      query: () => 'user',
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
