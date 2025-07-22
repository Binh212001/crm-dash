import axiosInstance from "@/app/axiosInstance";
import type { Pagination } from "@/types/pagination.type";
import axios from "axios";

export interface Customer {
  id: string;
  name: string;
  email: string;
  orders?: number;
  ordersCount?: number;
  totalSpent?: number;
  city?: string;
  lastSeen?: string;
  lastOrder?: string;
  avatar?: string;
}
export interface CreateCustomer {
  name: string;
  email: string;
  orders?: number;
  ordersCount?: number;
  totalSpent?: number;
  city?: string;
  lastSeen?: string;
  lastOrder?: string;
  avatar?: string;
}

export interface CustomerData {
  data: Customer[];
  pagination: Pagination;
}

export interface Filter {
  page?: number;
  limit?: number;
  q?: string;
}

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCustomers = createAsyncThunk(
  "customers/getAll",
  async (filter: Filter, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/customer", {
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

// Get a single customer by ID
export const getCustomerById = createAsyncThunk(
  "customers/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/customer/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Create a new customer
export const createCustomer = createAsyncThunk(
  "customers/create",
  async (customer: CreateCustomer, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/customer", customer);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Update an existing customer
export const updateCustomer = createAsyncThunk(
  "customer/update",
  async (
    { id, customer }: { id: string; customer: Partial<Customer> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(`/customer/${id}`, customer);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Delete a customer
export const deleteCustomer = createAsyncThunk(
  "customer/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/customer/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);
