# Permissions API

This module provides CRUD operations for managing permissions and roles in the system.

## Endpoints

### Permissions

#### Create Permission
- **POST** `/permissions`
- **Body:**
```json
{
  "name": "string (max 50 chars)",
  "description": "string (max 200 chars, optional)"
}
```

#### List Permissions
- **GET** `/permissions`
- **Query Parameters:**
  - `page`: number (default: 1)
  - `limit`: number (default: 10)
  - `search`: string (optional, searches in name and description)

#### Get Permission by ID
- **GET** `/permissions/:id`

#### Update Permission
- **PUT** `/permissions/:id`
- **Body:** Same as create (all fields optional)

#### Delete Permission
- **DELETE** `/permissions/:id`

### Roles

#### Create Role
- **POST** `/roles`
- **Body:**
```json
{
  "name": "string (max 50 chars)",
  "description": "string (max 200 chars, optional)",
  "isDefault": "boolean (optional, default: false)",
  "permissionIds": ["uuid array (optional)"]
}
```

#### List Roles
- **GET** `/roles`
- **Query Parameters:**
  - `page`: number (default: 1)
  - `limit`: number (default: 10)
  - `search`: string (optional, searches in name and description)

#### Get Role by ID
- **GET** `/roles/:id`

#### Update Role
- **PUT** `/roles/:id`
- **Body:** Same as create (all fields optional)

#### Delete Role
- **DELETE** `/roles/:id`

## Response Format

All endpoints return data in the following format:

### Single Item Response
```json
{
  "id": "uuid",
  "name": "string",
  "description": "string",
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

- **Soft Delete**: All delete operations use soft delete (records are marked as deleted but not physically removed)
- **Search**: List endpoints support search functionality
- **Pagination**: All list endpoints support pagination
- **Validation**: All inputs are validated using class-validator decorators
- **Relations**: Roles can be associated with multiple permissions
- **Default Roles**: Roles can be marked as default for new users 