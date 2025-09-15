import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .nonempty("El nombre es obligatorio")
    .min(2, "El nombre debe tener al menos 2 caracteres"),

  lastName: z
    .string()
    .nonempty("El apellido es obligatorio")
    .min(2, "El apellido debe tener al menos 2 caracteres"),

  email: z
    .email("El email no es válido"),

  password: z
    .string()
    .nonempty("La contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const loginSchema = z.object({
  email: z
    .email("El email no es válido"),

  password: z
    .string()
    .nonempty("La contraseña es obligatoria")
});
