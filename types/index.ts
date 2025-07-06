// User types
export interface User {
  id: number
  name: string
  email: string
  role: string
  customerId: number
  customer?: Customer
}

export interface Admin {
  id: number
  name: string
  email: string
}

// Customer types
export interface Customer {
  id: number
  companyName: string
  address?: string
  phoneNumber?: string
  contactPerson?: string
}

// Product types
export interface Product {
  id: number
  name: string
  productCode: string
  description?: string
  category?: string
  price: number
  stockQuantity: number
  minStockLevel: number
  imageUrl?: string
  leadTimeDays: number
  isActive: boolean
}

// Order types
export interface Order {
  id: number
  orderNumber: string
  customerId: number
  userId: number
  totalAmount: number
  status: OrderStatus
  deliveryAddress?: string
  desiredDeliveryDate?: Date
  notes?: string
  orderedAt: Date
  customer?: Customer
  user?: User
  orderItems?: OrderItem[]
}

export interface OrderItem {
  id: number
  orderId: number
  productId: number
  quantity: number
  unitPrice: number
  subtotal: number
  product?: Product
}

// Enums
export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered'
}

export enum UserRole {
  USER = 'user',
  MANAGER = 'manager'
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Cart types
export interface CartItem {
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
  totalAmount: number
}