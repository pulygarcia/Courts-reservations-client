import { z } from "zod";

export const reservationSchema = z.object({
  courtId: z
    .string()
    .nonempty({ message: "Seleccionar la cancha es obligatorio" })
    .regex(/^\d+$/, { message: "El ID de la cancha debe ser un número" })
    .transform((val) => Number(val)),

  date: z
    .string()
    .nonempty({ message: "La fecha es obligatoria" })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "La fecha debe ser YYYY-MM-DD" }),

  startTime: z
    .string()
    .nonempty({ message: "La hora de inicio es obligatoria" })
    .regex(/^\d{2}:\d{2}$/, { message: "La hora de inicio debe ser HH:MM" }),

  endTime: z
    .string()
    .nonempty({ message: "La hora de fin es obligatoria" })
    .regex(/^\d{2}:\d{2}$/, { message: "La hora de fin debe ser HH:MM" }),
});

export const reservationResponseSchema = z.object({
  id: z.number().int().positive(),
  court: z.object({
    id: z.number().int().positive(),
    name: z.string(),
  }),
  date: z.string().regex(
    /^\d{4}-\d{2}-\d{2}$/,
    "La fecha debe estar en formato YYYY-MM-DD"
  ),
  startTime: z.string().regex(
    /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
    "La hora de inicio debe estar en formato HH:mm:ss"
  ),
  endTime: z.string().regex(
    /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
    "La hora de fin debe estar en formato HH:mm:ss"
  ),
});

export type ReservationResponse = z.infer<typeof reservationResponseSchema>;

