import axiosInstance from "@/app/axiosInstance";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Room type based on backend/src/api/rooms/dto/room-respone.dto.ts
export interface Room {
  id: string;
  name?: string;
  description?: string;
  type: string;
  members: User[];
}

export interface User {
  id: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: string;
  bio?: string;
  name: string;
  avatar?: string;
  role?: {
    id: string;
    name: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

// Get all rooms for the current user
export const getRooms = createAsyncThunk(
  "rooms/getAll",
  async (_: void, { rejectWithValue }) => {
    try {
      // @rooms.controller.ts: GET /rooms (current user)
      const response = await axiosInstance.get("/rooms");
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Create a new room
export const createRoom = createAsyncThunk(
  "rooms/create",
  async (
    data: {
      name?: string;
      description?: string;
      memberId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      // @rooms.controller.ts: POST /rooms
      const response = await axiosInstance.post("/rooms", data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);
