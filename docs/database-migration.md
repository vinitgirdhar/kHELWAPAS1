# Database Migration: From Mock Data to Prisma ORM

This document outlines the migration from in-memory mock data to a SQLite database using Prisma ORM in the KhelWapas project.

## Overview

The project has been successfully migrated from using mock data arrays in `src/lib/*` files to a proper SQLite database with Prisma ORM. This provides:

- **Persistence**: Data survives application restarts
- **Scalability**: Better performance with larger datasets
- **Relationships**: Proper foreign key relationships between entities
- **Type Safety**: Full TypeScript support with Prisma Client
- **Migrations**: Version-controlled database schema changes

## What Was Changed

### 1. Dependencies Added
- `prisma`: Database ORM toolkit
- `@prisma/client`: Generated Prisma client for database operations

### 2. Database Schema
Created `prisma/schema.prisma` with the following models:

#### User Model
```prisma
model User {
  id               String   @id @default(cuid())
  name             String
  email            String   @unique
  avatar           String
  role             UserRole
  status           UserStatus
  phone            String
  registrationDate String
  rating           Float
  street           String
  city             String
  state            String
  zip              String
  
  orders          Order[]
  
  @@map("users")
}
```

#### Product Model
```prisma
model Product {
  id             String   @id @default(cuid())
  name           String
  category       String
  type           ProductType
  price          Int
  originalPrice  Int?
  grade          String?
  image          String
  images         String // JSON string of image URLs
  dataAiHint     String
  badge          String?
  description    String
  specs          String // JSON string of specifications
  status         String
  listingDate    String
  sku            String
  
  orders        Order[]
  
  @@map("products")
}
```

#### Order Model
```prisma
model Order {
  orderId        String   @id @default(cuid())
  customerId     String
  productId      String
  amount         Int
  paymentStatus  PaymentStatus
  paymentMethod  String
  pickupStatus   PickupStatus
  orderStatus    OrderStatus
  orderDate      String
  history        String // JSON string of order history
  
  customer      User     @relation(fields: [customerId], references: [id])
  product      Product  @relation(fields: [productId], references: [id])
  
  @@map("orders")
}
```

#### SellRequest Model
```prisma
model SellRequest {
  id             String   @id @default(cuid())
  fullName       String
  email          String
  category       String
  title          String
  description    String
  price          Int
  contactMethod  ContactMethod
  contactDetail  String?
  imageUrls      String // JSON string of image URLs
  status         SellRequestStatus
  
  @@map("sell_requests")
}
```

### 3. New Database Services
Replaced mock data files with database service files:

- `src/lib/db/products.ts` - Product CRUD operations
- `src/lib/db/users.ts` - User CRUD operations  
- `src/lib/db/orders.ts` - Order CRUD operations
- `src/lib/db/sell-requests.ts` - Sell request CRUD operations

### 4. Prisma Client Setup
Created `src/lib/prisma.ts` for proper Prisma client initialization with Next.js hot reload support.

## Database Operations

### Products
```typescript
import { getAllProducts, getProductById, addProduct } from '@/lib/db/products'

// Get all products
const products = await getAllProducts()

// Get product by ID
const product = await getProductById('product-id')

// Add new product
const newProduct = await addProduct({
  name: 'New Product',
  category: 'Cricket',
  type: 'new',
  price: 5000,
  // ... other fields
})
```

### Users
```typescript
import { getAllUsers, getUserById, addUser } from '@/lib/db/users'

// Get all users
const users = await getAllUsers()

// Get user by ID
const user = await getUserById('user-id')

// Add new user
const newUser = await addUser({
  name: 'John Doe',
  email: 'john@example.com',
  // ... other fields
})
```

### Orders
```typescript
import { getAllOrders, getOrderById, createOrder } from '@/lib/db/orders'

// Get all orders
const orders = await getAllOrders()

// Get order by ID
const order = await getOrderById('order-id')

// Create new order
const newOrder = await createOrder({
  customerId: 'user-id',
  productId: 'product-id',
  amount: 5000,
  // ... other fields
})
```

### Sell Requests
```typescript
import { getAllSellRequests, addSellRequest } from '@/lib/db/sell-requests'

// Get all sell requests
const requests = await getAllSellRequests()

// Add new sell request
const newRequest = await addSellRequest({
  fullName: 'Jane Doe',
  email: 'jane@example.com',
  // ... other fields
})
```

## Environment Setup

### 1. Environment Variables
Create `.env` file in project root:
```env
DATABASE_URL="file:./dev.db"
```

### 2. Database Commands
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name <migration-name>

# Reset database and run seed
npx prisma migrate reset

# Run seed script
npm run db:seed

# Open Prisma Studio (database GUI)
npx prisma studio
```

## Migration Process

### 1. Initial Setup
- Installed Prisma dependencies
- Initialized Prisma with SQLite
- Created database schema
- Generated Prisma client

### 2. Data Migration
- Created seed script (`prisma/seed.ts`)
- Migrated all mock data to database
- Maintained data structure and relationships

### 3. Code Updates
- Updated API routes to use database services
- Replaced mock data imports with Prisma queries
- Maintained backward compatibility with existing components

## Benefits of the Migration

### Before (Mock Data)
- ❌ Data lost on application restart
- ❌ No data persistence
- ❌ Limited scalability
- ❌ No relationships between entities
- ❌ Manual data management

### After (Prisma ORM)
- ✅ Persistent data storage
- ✅ Automatic data persistence
- ✅ Better scalability
- ✅ Proper entity relationships
- ✅ Automated data management
- ✅ Type-safe database operations
- ✅ Database migrations
- ✅ Better performance

## Future Enhancements

### 1. Additional Models
- **Cart**: Shopping cart functionality
- **Reviews**: Product reviews and ratings
- **Categories**: Product categorization
- **Brands**: Product brand management

### 2. Advanced Features
- **Search**: Full-text search capabilities
- **Filtering**: Advanced product filtering
- **Pagination**: Efficient data pagination
- **Caching**: Redis integration for performance

### 3. Database Options
- **PostgreSQL**: For production use
- **MySQL**: Alternative relational database
- **MongoDB**: For document-based data

## Troubleshooting

### Common Issues

#### 1. Database Connection
```bash
# Check if database file exists
ls -la dev.db

# Reset database if corrupted
npx prisma migrate reset
```

#### 2. Schema Changes
```bash
# After schema changes, regenerate client
npx prisma generate

# Create new migration
npx prisma migrate dev --name <change-description>
```

#### 3. Seed Issues
```bash
# Clear database and reseed
npx prisma migrate reset
npm run db:seed
```

## Conclusion

The migration to Prisma ORM provides a solid foundation for the KhelWapas application. The database is now persistent, scalable, and maintainable, while preserving all existing functionality. The new architecture supports future growth and feature additions.

For questions or issues, refer to the [Prisma documentation](https://www.prisma.io/docs) or check the project's database service files for implementation examples.
