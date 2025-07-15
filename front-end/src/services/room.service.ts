import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setAuthHeader } from './api';
import type { Pagination } from '../types/pagination.type';
import type { User } from './user.service';

// Room entity interface, matching backend @rooms.controller.ts
export interface Room {
  id: string;
  name?: string;
  description?: string;
  type?: string;
  members?:User[]; // Could be User[] if you have a User type
}

// DTO for creating a room, matching backend CreateRoomDto
export interface CreateRoomDto {
  name?: string;
  description?: string;
  members: string[];
  type: string;
}

// Message interface for chat messages
export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

// DTO for getting chats/messages
export interface GetChatDto {
  page?: number;
  limit?: number;
}

export const roomApi = createApi({
  reducerPath: 'roomApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/',
    prepareHeaders: (headers) => {
      return setAuthHeader(headers);
    },
  }),
  endpoints: (builder) => ({
    // Create a new room
    createRoom: builder.mutation<Room, CreateRoomDto>({
      query: (body) => ({
        url: 'rooms',
        method: 'POST',
        body,
      }),
    }),
    // Get all rooms for the current user/request
    getRooms: builder.query<Room[], void>({
      query: () => 'rooms',
    }),
    // Get chats/messages for a room
    getRoomChats: builder.query<{ data: Message[]; pagination?: Pagination }, { roomId: string; params?: GetChatDto }>({
      query: ({ roomId, params }) => {
        const searchParams = new URLSearchParams();
        if (params?.page !== undefined) searchParams.append('page', String(params.page));
        if (params?.limit !== undefined) searchParams.append('limit', String(params.limit));
        const queryString = searchParams.toString();
        return `rooms/${roomId}/chats${queryString ? `?${queryString}` : ''}`;
      },
    }),
  }),
});

export const {
  useCreateRoomMutation,
  useGetRoomsQuery,
  useGetRoomChatsQuery,
} = roomApi;
