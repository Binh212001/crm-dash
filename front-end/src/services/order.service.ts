import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Pagination } from "../types/pagination.type";

// OrderResponseDto matches backend/src/api/order/dto/order-response.dto.ts
export interface OrderItemResponseDto {
  id: string;
  quantity: number;
  product?: ProductResponseDto;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderResponseDto {
  id: string;
  orderNumber: string;
  status: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  customerId?: string;
  userId?: string;
  notes?: string;
  shippingAddress?: string;
  billingAddress?: string;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
  items: OrderItemResponseDto[];
  customer?: CustomerResponseDto;
  createdAt: Date;
  updatedAt: Date;
}

// ProductResponseDto (reused from product service)
export interface ProductResponseDto {
  id: string;
  name: string;
  sku: string;
  description?: string;
  price?: number;
  stock?: number;
}

// CustomerResponseDto (reused from customer service)
export interface CustomerResponseDto {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

// CreateOrderItemDto matches backend/src/api/order/dto/create-order-item.dto.ts
export interface CreateOrderItemDto {
  productId?: string;
  quantity: number;
}

// CreateOrderDto matches backend/src/api/order/dto/create-order.dto.ts
export interface CreateOrderDto {
  orderNumber?: string;
  status?: string;
  subtotal: number;
  tax?: number;
  shipping?: number;
  total: number;
  customerId?: string;
  userId?: string;
  notes?: string;
  shippingAddress?: string;
  billingAddress?: string;
  items: CreateOrderItemDto[];
}

// UpdateOrderDto matches backend/src/api/order/dto/update-order.dto.ts
export interface UpdateOrderDto {
  orderNumber?: string;
  status?: string;
  subtotal?: number;
  tax?: number;
  shipping?: number;
  total?: number;
  customerId?: string;
  userId?: string;
  notes?: string;
  shippingAddress?: string;
  billingAddress?: string;
  items?: CreateOrderItemDto[];
}

// ListOrderDto matches backend/src/api/order/dto/list-order.dto.ts
export interface ListOrderDto {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  customerId?: string;
}

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  endpoints: (builder) => ({
    getOrders: builder.query<
      { data: OrderResponseDto[]; pagination: Pagination },
      ListOrderDto
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.search) searchParams.append("search", params.search);
        if (params.status) searchParams.append("status", params.status);
        if (params.customerId) searchParams.append("customerId", params.customerId);
        if (params.page !== undefined)
          searchParams.append("page", String(params.page));
        if (params.limit !== undefined)
          searchParams.append("limit", String(params.limit));
        const queryString = searchParams.toString();
        return {
          url: `orders${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
    }),
    getOrder: builder.query<OrderResponseDto, string>({
      query: (id) => ({
        url: `orders/${id}`,
        method: "GET",
      }),
    }),
    createOrder: builder.mutation<OrderResponseDto, CreateOrderDto>({
      query: (body) => ({
        url: "orders",
        method: "POST",
        body,
      }),
    }),
    updateOrder: builder.mutation<
      OrderResponseDto,
      { id: string; data: UpdateOrderDto }
    >({
      query: ({ id, data }) => ({
        url: `orders/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    updateOrderStatus: builder.mutation<
      OrderResponseDto,
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `orders/${id}/status`,
        method: "PUT",
        body: { status },
      }),
    }),
    updatePaymentStatus: builder.mutation<
      OrderResponseDto,
      { id: string; paymentStatus: string }
    >({
      query: ({ id, paymentStatus }) => ({
        url: `orders/${id}/payment-status`,
        method: "PUT",
        body: { paymentStatus },
      }),
    }),
    deleteOrder: builder.mutation<{ deleted: boolean }, string>({
      query: (id) => ({
        url: `orders/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useUpdateOrderStatusMutation,
  useUpdatePaymentStatusMutation,
  useDeleteOrderMutation,
} = orderApi;
