import { z } from 'zod';
import { OrderStatus } from '@orderflow/shared-types';

export const CompanyTemplateSchema = z.object({
  templateName: z.string().min(1, "Template name is required"),
  buyerName: z.string().min(1, "Buyer name is required"),
  buyerCity: z.string().optional(),
  buyerMobile: z.string().optional(),
  buyerRef: z.string().optional(),
  buyerAgency: z.string().optional(),
  sellerName: z.string().min(1, "Seller name is required"),
  sellerAddress: z.string().optional(),
  sellerPhone: z.string().optional(),
  sellerEmail: z.string().optional(),
  sellerGstin: z.string().optional(),
  sellerWebsite: z.string().optional(),
});

export const ProductMasterSchema = z.object({
  productCode: z.string().min(1),
  defaultPrice: z.number().min(0),
  defaultSizes: z.array(z.string()),
  imageUrl: z.string().url().optional(),
  isActive: z.boolean().default(true),
});

export const OrderProductSchema = z.object({
  category: z.string().default("General"),
  productCode: z.string().optional(),
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
  companyTemplateId: z.string().uuid(),
  orderDate: z.date().optional(),
  advancePayment: z.number().min(0).default(0),
  advanceMode: z.string().optional(),
  remark: z.string().optional(),
  status: z.nativeEnum(OrderStatus).default(OrderStatus.DRAFT),
  totalQty: z.number().int().min(0).default(0),
  grandTotal: z.number().min(0).default(0),
  products: z.array(OrderProductSchema).optional(),
});
