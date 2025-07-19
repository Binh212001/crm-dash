import axiosInstance from "@/app/axiosInstance";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Order types based on backend/src/api/order/dto/order-response.dto.ts
export interface Order {
  id: string;
  orderNumber: string;
  status: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  customerId: string;
  userId: string;
  notes: string;
  shippingAddress: string;
  billingAddress: string;
  trackingNumber: string;
  estimatedDelivery: string;
  shippedAt: string | null;
  deliveredAt: string | null;
  items: OrderItem[];
  customer: Customer;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  quantity: number;
  product: Product;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  categoryId: string;
  vendor: string;
  collection: string;
  stock: string;
  price: string;
  image: string;
  tags: string[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface OrderFilter {
  page?: number;
  limit?: number;
  q?: string;
  status?: string;
  customerId?: string;
  userId?: string;
}

export interface OrderData {
  data: Order[];
  pagination: {
    limit: number;
    currentPage: number;
    totalRecords: number;
    totalPages: number;
  };
}

// Get all orders with optional filters
export const getOrders = createAsyncThunk(
  "orders/getAll",
  async (filter: OrderFilter, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/orders", {
        params: {
          page: filter.page,
          limit: filter.limit,
          q: filter.q,
          status: filter.status,
          customerId: filter.customerId,
          userId: filter.userId,
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

// Get a single order by ID
export const getOrderById = createAsyncThunk(
  "orders/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/orders/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Create a new order
export const createOrder = createAsyncThunk(
  "orders/create",
  async (orderData: Partial<Order>, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/orders", orderData);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Update an existing order
export const updateOrder = createAsyncThunk(
  "orders/update",
  async (
    { id, orderData }: { id: string; orderData: Partial<Order> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(`/orders/${id}`, orderData);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Delete an order by ID
export const deleteOrder = createAsyncThunk(
  "orders/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/orders/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Update order status
export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async (
    { id, status }: { id: string; status: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(`/orders/${id}/status`, {
        status,
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

// Get order overview
export const getOrderOverview = createAsyncThunk(
  "orders/getOverview",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/orders/overview");
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);
