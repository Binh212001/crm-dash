# Order API

This module provides comprehensive CRUD operations for managing orders in the e-commerce system.

## Order Statuses

- `pending` - Order is created but not yet confirmed
- `confirmed` - Order has been confirmed
- `processing` - Order is being processed
- `shipped` - Order has been shipped
- `delivered` - Order has been delivered
- `cancelled` - Order has been cancelled
- `refunded` - Order has been refunded

## Payment Statuses

- `pending` - Payment is pending
- `paid` - Payment has been completed
- `failed` - Payment has failed
- `refunded` - Payment has been refunded
- `partially_refunded` - Payment has been partially refunded

## Endpoints

### Create Order
- **POST** `/orders`
- **Body:**
```json
{
  "orderNumber": "string (optional, auto-generated if not provided)",
  "status": "pending|confirmed|processing|shipped|delivered|cancelled|refunded",
  "paymentStatus": "pending|paid|failed|refunded|partially_refunded",
  "subtotal": "number (required)",
  "tax": "number (optional, default: 0)",
  "shipping": "number (optional, default: 0)",
  "total": "number (required)",
  "customerId": "uuid (optional)",
  "userId": "uuid (optional)",
  "notes": "string (optional)",
  "shippingAddress": "string (optional)",
  "billingAddress": "string (optional)",
  "items": [
    {
      "productVariantId": "uuid (optional)",
      "productName": "string (required, max 200 chars)",
      "variantName": "string (optional, max 100 chars)",
      "unitPrice": "number (required, min 0)",
      "quantity": "number (required, min 1)",
      "sku": "string (optional)"
    }
  ]
}
```

### List Orders
- **GET** `/orders`
- **Query Parameters:**
  - `page`: number (default: 1)
  - `limit`: number (default: 10)
  - `search`: string (optional, searches in orderNumber, notes, trackingNumber)
  - `status`: OrderStatus (optional)
  - `paymentStatus`: PaymentStatus (optional)
  - `customerId`: uuid (optional)
  - `userId`: uuid (optional)

### Get Order by ID
- **GET** `/orders/:id`

### Update Order
- **PUT** `/orders/:id`
- **Body:** Same as create (all fields optional)

### Update Order Status
- **PUT** `/orders/:id/status`
- **Body:**
```json
{
  "status": "pending|confirmed|processing|shipped|delivered|cancelled|refunded"
}
```

### Update Payment Status
- **PUT** `/orders/:id/payment-status`
- **Body:**
```json
{
  "paymentStatus": "pending|paid|failed|refunded|partially_refunded"
}
```

### Delete Order
- **DELETE** `/orders/:id`

## Response Format

### Single Order Response
```json
{
  "id": "uuid",
  "orderNumber": "string",
  "status": "OrderStatus",
  "paymentStatus": "PaymentStatus",
  "subtotal": "number",
  "tax": "number",
  "shipping": "number",
  "total": "number",
  "customerId": "uuid",
  "userId": "uuid",
  "notes": "string",
  "shippingAddress": "string",
  "billingAddress": "string",
  "trackingNumber": "string",
  "estimatedDelivery": "date",
  "shippedAt": "date",
  "deliveredAt": "date",
  "items": [
    {
      "id": "uuid",
      "productName": "string",
      "variantName": "string",
      "unitPrice": "number",
      "quantity": "number",
      "totalPrice": "number",
      "sku": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ],
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Paginated Response
```json
{
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 10,
    "itemCount": 5,
    "pageCount": 1,
    "hasPreviousPage": false,
    "hasNextPage": false
  }
}
```

## Features

- **Complete CRUD Operations** - Create, Read, Update, Delete orders
- **Order Items Management** - Each order can contain multiple items
- **Status Management** - Track order and payment status with automatic timestamps
- **Search & Filtering** - Search by order number, notes, tracking number
- **Filtering** - Filter by status, payment status, customer, or user
- **Pagination** - All list endpoints support pagination
- **Validation** - Comprehensive input validation
- **Soft Delete** - Orders are marked as deleted but not physically removed
- **Auto-generated Order Numbers** - Unique order numbers are generated automatically
- **Relationship Support** - Orders can be linked to customers and users
- **Product Variant Support** - Order items can reference specific product variants

## Business Logic

- **Order Number Generation**: If not provided, generates unique order numbers in format `ORD-{timestamp}-{random}`
- **Total Calculation**: Order items automatically calculate total price (unitPrice * quantity)
- **Status Timestamps**: Automatically sets `shippedAt` and `deliveredAt` when status changes
- **Cascade Operations**: Deleting an order also removes associated order items 