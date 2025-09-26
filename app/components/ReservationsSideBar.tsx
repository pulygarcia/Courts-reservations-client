'use client';

import { FixedReservationResponse, ReservationResponse } from "../schemas/form-reservation-schema";

interface WeekDay {
  value: string | number;
  day: string;
}

interface Props {
  todayReservations?: ReservationResponse[];
  fixedReservations: FixedReservationResponse[];
  weekDays: WeekDay[];
}

export default function ReservationsSidebar({todayReservations, fixedReservations, weekDays,}: Props) {
  return (
    <div className="md:flex-1 w-full md:w-64 bg-white shadow-lg rounded-2xl p-6">
      <h3 className="text-xl font-bold text-red-600 mb-4">Ocupado (Hoy)</h3>
      <ul className="space-y-3 overflow-y-auto max-h-[600px]">
        {todayReservations?.length === 0 && (
          <li className="p-3 rounded-lg text-gray-500 text-sm border border-gray-200 text-center">
            No hay reservas para hoy.
          </li>
        )}

        {todayReservations?.map((res) => (
          <li
            key={res.id}
            className="p-3 rounded-lg text-gray-700 text-sm border border-red-200"
          >
            <span className="bg-gray-100 text-gray-700 p-1 rounded me-2">
              {res.startTime.slice(0, 5)} - {res.endTime.slice(0, 5)}
            </span>{" "}
            ocupada en <span className="capitalize">{res.court.name}</span>
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-bold text-red-600 mb-4 mt-6">
        Turnos fijos ocupados
      </h3>
      <ul className="space-y-3 overflow-y-auto max-h-[600px]">
        {fixedReservations.length === 0 && (
          <li className="p-3 rounded-lg text-gray-500 text-sm border border-gray-200 text-center">
            No hay turnos fijos ocupados.
          </li>
        )}

        {fixedReservations.map((res) => {
          const dayName = weekDays.find(
            (d) => Number(d.value) === Number(res.dayOfWeek)
          )?.day;

          return (
            <li
              key={res.id}
              className="p-3 rounded-lg text-gray-700 text-sm border border-red-200"
            >
              <span className="bg-gray-100 text-gray-700 p-1 rounded me-2">
                {dayName} de {res.startTime.slice(0, 5)} - {res.endTime.slice(0, 5)}
              </span>{" "}
              <span className="capitalize font-medium text-blue-700">
                {res.court.name}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
