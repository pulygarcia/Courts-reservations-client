import { z } from "zod";

export const reservationSchema = z.object({
  date: z
  .string()
  .nonempty({ message: "La fecha es obligatoria" })
  .regex(/^\d{4}-\d{2}-\d{2}$/),
  startTime: z
  .string()
  .nonempty({ message: "La hora de inicio es obligatoria" })
  .regex(/^\d{2}:\d{2}$/),
  
  endTime: z
  .string()
  .nonempty({ message: "La hora de fin es obligatoria" })
  .regex(/^\d{2}:\d{2}$/),
  courtId: z
    .string()
    .nonempty({ message: "Seleccionar la cancha es obligatorio" })
    .regex(/^\d+$/)
    .transform((val) => Number(val)),
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
    /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/
  ),
  endTime: z.string().regex(
    /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/
  ),
});

export const fixedReservationSchema = z.object({
  dayOfWeek: z
  .string()
  .nonempty({ message: "El día de la semana es obligatorio" })
  .regex(/^[0-6]$/)
  .transform((val) => Number(val)),
  startTime: z
  .string()
  .nonempty({ message: "La hora de inicio es obligatoria" })
  .regex(/^\d{2}:\d{2}$/),
  endTime: z
  .string()
  .nonempty({ message: "La hora de fin es obligatoria" })
  .regex(/^\d{2}:\d{2}$/),
  courtId: z
    .string()
    .nonempty({ message: "Seleccionar la cancha es obligatorio" })
    .regex(/^\d+$/)
    .transform((val) => Number(val)),
});

export const fixedReservationResponseSchema = z.object({
  id: z.number(),
  dayOfWeek: z.number().min(0).max(6),
  startTime: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/),
  endTime: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/),
  court: z.object({
    id: z.number(),
    name: z.string(),
  }),
});



export type ReservationResponse = z.infer<typeof reservationResponseSchema>;
export type FixedReservationResponse = z.infer<typeof fixedReservationResponseSchema>;

