import axiosInstance from "@/app/axiosInstance";
import type { Pagination } from "@/types/pagination.type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Product interfaces
export interface Product {
  id?: string;
  name: string;
  sku: string;
  description?: string;
  categoryId?: string;
  vendor?: string;
  collection?: string;
  stock?: number | string;
  price?: number | string;
  image?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductData {
  data: Product[];
  pagination: Pagination;
}

export interface ProductFilter {
  page?: number;
  limit?: number;
  q?: string;
  categoryId?: string;
}

export const getProducts = createAsyncThunk(
  "products/getAll",
  async (filter: ProductFilter, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/products", {
        params: {
          page: filter.page,
          limit: filter.limit,
          q: filter.q,
          categoryId: filter.categoryId,
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

export const getProductById = createAsyncThunk(
  "products/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/create",
  async (product: Product, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/products", product);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async (
    { id, product }: { id: string; product: Partial<Product> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(`/products/${id}`, product);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/products/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);
