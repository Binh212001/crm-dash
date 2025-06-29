import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: Date;
  bio?: string;
  image?: string | File;
  numberOfCourse: number;
  referCode?: string;
  provider?: string;
  socialId?: string;
  role: {
    id: string;
    name: string;
    description?: string;
  };
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  endpoints: (builder) => ({
    getUsers: builder.query<{ data: User[]; pagination: any }, void>({
      query: () => 'user',
    }),
  }),
});

export const { useGetUsersQuery } = api;
