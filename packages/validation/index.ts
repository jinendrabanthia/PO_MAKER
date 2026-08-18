import { z } from 'zod';
import { OrderStatus } from '@orderflow/shared-types';

export const CustomerSchema = z.object({
  name: z.string().min(1, "Customer name is required"),
  city: z.string().optional(),
  mobile: z.string().optional(),
  agency: z.string().optional(),
});

export const ProductMasterSchema = z.object({
  productCode: z.string().min(1),
  designCode: z.string().optional(),
  defaultPrice: z.number().min(0),
  defaultSizes: z.array(z.string()),
  imageUrl: z.string().url().optional(),
  isActive: z.boolean().default(true),
});

export const OrderProductSchema = z.object({
  productCode: z.string().optional(),
  designCode: z.string().optional(),
  quantity: z.number().int().min(1),
  netPrice: z.number().min(0),
  sizeCount: z.number().int().min(1).default(1),
  sizes: z.array(z.string()),
  lineTotal: z.number().min(0).default(0),
  imageUrl: z.string().optional(),
  sortOrder: z.number().int().default(0),
});

export const OrderSchema = z.object({
  orderNumber: z.string().min(1),
  customerId: z.string().uuid(),
  reference: z.string().optional(),
  agency: z.string().optional(),
  orderDate: z.date().optional(),
  advancePayment: z.number().min(0).default(0),
  advanceMode: z.string().optional(),
  remark: z.string().optional(),
  status: z.nativeEnum(OrderStatus).default(OrderStatus.DRAFT),
  totalQty: z.number().int().min(0).default(0),
  grandTotal: z.number().min(0).default(0),
  products: z.array(OrderProductSchema).optional(),
});
