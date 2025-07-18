import axiosInstance from "@/app/axiosInstance";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// User type based on backend/src/api/user/dto/user-response.dto.ts
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

export interface UserFilter {
  page?: number;
  limit?: number;
  q?: string;
}

export interface UserData {
  data: User[];
  pagination: {
    limit: number;
    currentPage: number;
    totalRecords: number;
    totalPages: number;
  };
}

// Get all users with optional filters
export const getUsers = createAsyncThunk(
  "users/getAll",
  async (filter: UserFilter, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user", {
        params: {
          page: filter.page,
          limit: filter.limit,
          q: filter.q,
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Get a single user by ID
export const getUserById = createAsyncThunk(
  "users/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/user/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Create a new user
export const createUser = createAsyncThunk(
  "users/create",
  async (userData: Partial<User>, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user", userData);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Update an existing user
export const updateUser = createAsyncThunk(
  "users/update",
  async (
    { id, userData }: { id: string; userData: Partial<User> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(`/user/${id}`, userData);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Delete a user by ID
export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/user/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);
