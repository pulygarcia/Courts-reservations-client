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

export const saleSchema = z.object({
  items: z.array(saleItemSchema).min(1, "El carrito no puede estar vacío"),
});

//API RESPONSE SCHEMA
const SaleItemSchema = z.object({
  id: z.number(),
  quantity: z.number(),
  price: z.string(),
  name: z.string(),
});

// user that save the sale
const SaleUserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  admin: z.boolean(),
});

const SaleSchema = z.object({
  id: z.number(),
  items: z.array(SaleItemSchema),
  total: z.string(),
  createdAt: z.string(), //iso string...
  user: SaleUserSchema,
});

export type SaleItem = z.infer<typeof saleItemSchema>;
export type Sale = z.infer<typeof saleSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;


// Schema para la respuesta completa de la API
export const SaleApiResponseSchema = z.array(SaleSchema);

// ✅ Generar type de TypeScript desde Zod
export type SaleApiResponse = z.infer<typeof SaleApiResponseSchema>;
