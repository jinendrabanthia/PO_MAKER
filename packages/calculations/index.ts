import { OrderProduct, Order } from '@orderflow/shared-types';

/**
 * Calculates the total quantity and line total for a single product.
 */
export function calculateLineTotals(product: Partial<OrderProduct>): { totalProductQty: number; lineTotal: number; sizeCount: number } {
  const quantity = typeof product.quantity === 'number' && product.quantity > 0 ? product.quantity : 0;
  const netPrice = typeof product.netPrice === 'number' && product.netPrice >= 0 ? product.netPrice : 0;
  
  const actualSizeCount = Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes.length : 1;

  const totalProductQty = quantity * actualSizeCount;
  const lineTotal = totalProductQty * netPrice;

  return { totalProductQty, lineTotal, sizeCount: actualSizeCount };
}

/**
 * Calculates the grand totals for an entire order.
 */
export function calculateOrderTotals(products: Partial<OrderProduct>[]): { totalQty: number; grandTotal: number } {
  let totalQty = 0;
  let grandTotal = 0;

  for (const product of products) {
    const { totalProductQty, lineTotal } = calculateLineTotals(product);
    totalQty += totalProductQty;
    grandTotal += lineTotal;
  }

  return { totalQty, grandTotal };
}
