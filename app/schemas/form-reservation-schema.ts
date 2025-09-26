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

export const fixedReservationSchema = z.object({
  courtId: z
    .string()
    .nonempty({ message: "Seleccionar la cancha es obligatorio" })
    .regex(/^\d+$/, { message: "El ID de la cancha debe ser un número" })
    .transform((val) => Number(val)),

  dayOfWeek: z
    .string()
    .nonempty({ message: "El día de la semana es obligatorio" })
    .regex(/^[0-6]$/, { message: "El día debe ser un número entre 0 y 6" })
    .transform((val) => Number(val)),

  startTime: z
    .string()
    .nonempty({ message: "La hora de inicio es obligatoria" })
    .regex(/^\d{2}:\d{2}$/, { message: "La hora de inicio debe ser HH:MM" }),

  endTime: z
    .string()
    .nonempty({ message: "La hora de fin es obligatoria" })
    .regex(/^\d{2}:\d{2}$/, { message: "La hora de fin debe ser HH:MM" }),
});

export const fixedReservationResponseSchema = z.object({
  id: z.number(),

  court: z.object({
    id: z.number(),
    name: z.string(),
  }),

  dayOfWeek: z.number().min(0).max(6),

  startTime: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, "Formato de hora inválido"),

  endTime: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, "Formato de hora inválido"),
});



export type ReservationResponse = z.infer<typeof reservationResponseSchema>;
export type FixedReservationResponse = z.infer<typeof fixedReservationResponseSchema>;

