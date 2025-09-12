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

