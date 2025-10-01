import { z } from "zod";

export const newItemSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre es obligatorio" })
    .max(50, { message: "El nombre no puede superar 50 caracteres" }),
  price: z
    .number({ message: "El precio debe ser un número" })
    .min(1, { message: "El precio debe ser mayor a 0" })
    .int({ message: "El precio debe ser un número entero" }),
});

export const editItemSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre es obligatorio" })
    .max(50, { message: "El nombre no puede superar 50 caracteres" })
    .optional(),
  price: z
    .number({ message: "El precio debe ser un número" })
    .min(1, { message: "El precio debe ser mayor a 0" })
    .int({ message: "El precio debe ser un número entero" })
    .optional()
});

export const itemResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
});

export type ItemResponseSchema = z.infer<typeof itemResponseSchema>;
