import { describe, it, expect } from 'vitest';
import { calculateLineTotals, calculateOrderTotals } from './index';
import { OrderProduct } from '@orderflow/shared-types';

describe('Calculations Service', () => {
  describe('calculateLineTotals', () => {
    it('should calculate correctly for 1 size', () => {
      const product: Partial<OrderProduct> = { quantity: 2, netPrice: 100, sizes: ['M'] };
      const result = calculateLineTotals(product);
      expect(result.totalProductQty).toBe(2);
      expect(result.lineTotal).toBe(200);
    });

    it('should calculate correctly for multiple sizes', () => {
      const product: Partial<OrderProduct> = { quantity: 3, netPrice: 150, sizes: ['S', 'M', 'L', 'XL'] };
      // sizeCount = 4, qty = 3 => totalQty = 12. netPrice = 150 => 12 * 150 = 1800
      const result = calculateLineTotals(product);
      expect(result.totalProductQty).toBe(12);
      expect(result.lineTotal).toBe(1800);
    });

    it('should handle zero quantity', () => {
      const product: Partial<OrderProduct> = { quantity: 0, netPrice: 100, sizes: ['M'] };
      const result = calculateLineTotals(product);
      expect(result.totalProductQty).toBe(0);
      expect(result.lineTotal).toBe(0);
    });

    it('should handle negative quantity safely', () => {
      const product: Partial<OrderProduct> = { quantity: -5, netPrice: 100, sizes: ['M'] };
      const result = calculateLineTotals(product);
      expect(result.totalProductQty).toBe(0);
      expect(result.lineTotal).toBe(0);
    });

    it('should handle missing prices as 0', () => {
      const product: Partial<OrderProduct> = { quantity: 2, sizes: ['M'] };
      const result = calculateLineTotals(product);
      expect(result.totalProductQty).toBe(2);
      expect(result.lineTotal).toBe(0);
    });

    it('should handle empty sizes by treating sizeCount as 1', () => {
      const product: Partial<OrderProduct> = { quantity: 5, netPrice: 10, sizes: [] };
      const result = calculateLineTotals(product);
      expect(result.totalProductQty).toBe(5);
      expect(result.lineTotal).toBe(50);
    });

    it('should handle decimal prices accurately', () => {
      const product: Partial<OrderProduct> = { quantity: 1, netPrice: 10.5, sizes: ['M', 'L'] };
      // totalQty = 2, netPrice = 10.5 => 21
      const result = calculateLineTotals(product);
      expect(result.totalProductQty).toBe(2);
      expect(result.lineTotal).toBe(21);
    });
  });

  describe('calculateOrderTotals', () => {
    it('should sum up multiple products correctly', () => {
      const products: Partial<OrderProduct>[] = [
        { quantity: 2, netPrice: 100, sizes: ['M'] }, // Qty: 2, Total: 200
        { quantity: 1, netPrice: 50, sizes: ['S', 'M'] }, // Qty: 2, Total: 100
      ];
      const result = calculateOrderTotals(products);
      expect(result.totalQty).toBe(4);
      expect(result.grandTotal).toBe(300);
    });

    it('should handle an empty product list', () => {
      const result = calculateOrderTotals([]);
      expect(result.totalQty).toBe(0);
      expect(result.grandTotal).toBe(0);
    });

    it('should handle invalid/corrupted products gracefully', () => {
      const products: Partial<OrderProduct>[] = [
        { quantity: 2, netPrice: 100, sizes: ['M'] }, // Qty: 2, Total: 200
        { }, // Qty: 0, Total: 0
      ];
      const result = calculateOrderTotals(products);
      expect(result.totalQty).toBe(2);
      expect(result.grandTotal).toBe(200);
    });
  });
});
