AI Output Contract

Use structured JSON only.

Never accept arbitrary AI prose as application state.

Use:

Zod

for validation.

Example:

const ProductSchema = z.object({
  productCode: z.string(),
  designCode: z.string().optional(),
  quantity: z.number().positive(),
  netPrice: z.number().nonnegative(),
  sizes: z.array(z.union([
    z.number(),
    z.string()
  ])),
  imageReference: z.string().optional()
});
30. Confidence Handling

AI extraction should support:

HIGH
MEDIUM
LOW

Example:

{
  "field": "netPrice",
  "value": 1049,
  "confidence": 0.98
}

Low-confidence fields must be surfaced for confirmation.