import { z } from "zod";

export const saleItemSchema = z.object({
  itemId: z.number({ message: "El id del producto es obligatorio" }),
  quantity: z.number().min(1, "La cantidad debe ser al menos 1"),
});
export const cartItemSchema = z.object({
  id: z.number(),
  quantity: z.number(),
  name: z.string(),
  price: z.number(),
});

// Schema completo de la venta
export const saleSchema = z.object({
  items: z.array(saleItemSchema).min(1, "El carrito no puede estar vacío"),
});

export type SaleItem = z.infer<typeof saleItemSchema>;
export type Sale = z.infer<typeof saleSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
