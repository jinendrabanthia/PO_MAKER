export enum OrderStatus {
  DRAFT = 'DRAFT',
  IMPORTING = 'IMPORTING',
  REVIEW_REQUIRED = 'REVIEW_REQUIRED',
  READY = 'READY',
  GENERATING = 'GENERATING',
  GENERATED = 'GENERATED',
  ARCHIVED = 'ARCHIVED',
  FAILED = 'FAILED',
}

export interface User {
  id: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  city?: string;
  mobile?: string;
  agency?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  productCode: string;
  designCode?: string;
  defaultPrice: number;
  defaultSizes: string[];
  imageUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  reference?: string;
  agency?: string;
  orderDate?: Date;
  advancePayment: number;
  advanceMode?: string;
  remark?: string;
  status: OrderStatus;
  totalQty: number;
  grandTotal: number;
  createdAt: Date;
  updatedAt: Date;
  products?: OrderProduct[];
}

export interface OrderProduct {
  id: string;
  orderId: string;
  productCode?: string;
  designCode?: string;
  quantity: number;
  netPrice: number;
  sizeCount: number;
  sizes: string[];
  lineTotal: number;
  imageUrl?: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UploadedFile {
  id: string;
  orderId: string;
  url: string;
  mimeType: string;
  size: number;
  type: 'SOURCE_DOCUMENT' | 'GENERATED_PDF' | 'PRODUCT_IMAGE';
  createdAt: Date;
}

export interface GeneratedDocument {
  id: string;
  orderId: string;
  fileId: string;
  version: number;
  createdAt: Date;
}

export interface ProcessingJob {
  id: string;
  orderId: string;
  type: string;
  status: string;
  attempts: number;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditLog {
  id: string;
  orderId: string;
  action: string;
  details: any;
  createdAt: Date;
}
