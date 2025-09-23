import { ReservationResponse } from "../schemas/form-reservation-schema";
import { format, parse, parseISO } from "date-fns";

export default function ReservationCard({res} : {res: ReservationResponse}) {
    const formattedDate = format(parseISO(res.date), "dd-MM-yyyy");

    // hour to date object (date does not matters)
    const parsedStartTime = parse(res.startTime, "HH:mm:ss", new Date());
    const parsedEndTime = parse(res.endTime, "HH:mm:ss", new Date());
    // format to only hours and minutes
    const formattedStartTime = format(parsedStartTime, "HH:mm");
    const formattedEndTime = format(parsedEndTime, "HH:mm");

  return (
    <>
        <div
            key={res.id}
            className="rounded-2xl shadow-md p-5 bg-white hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold mb-2 capitalize">{res.court.name}</h2>

            <div className="text-sm text-gray-600 space-y-1">

              <p>
                <span className="font-medium">📅 Fecha:</span> {formattedDate}
              </p>
              <p>
                <span className="font-medium">⏰ Horario:</span> {formattedStartTime} - {formattedEndTime}
              </p>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button className="px-3 py-1 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition cursor-pointer">
                Cancelar reserva
              </button>
            </div>
          </div>
    </>
  );
}