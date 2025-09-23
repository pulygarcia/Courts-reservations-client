import ReservationForm from "../components/ReservationForm";
import Link from "next/link";
import { getUserIdFromCookies } from "../utils/auth";
import { ReservationResponse } from "../schemas/form-reservation-schema";
import { isToday, parseISO } from "date-fns";

export default async function ReservationPage() {
  const userId = await getUserIdFromCookies();

  const getTodayReservations = async () => {
    const req = await fetch(`${process.env.API_BASE_URL}/reservations`);
    const res = await req.json();

    const todayReservations = res.filter((r: { date: string }) => 
      isToday(parseISO(r.date))
    );

    //order asc
    todayReservations.sort((a:any, b:any) => {
      const startA = Number(a.startTime.split(":")[0]);
      const startB = Number(b.startTime.split(":")[0]);

      const result = startA - startB //if < 0 → a before b, if > 0 → a after b
      return result; //reordered array
    });

    return todayReservations;
  };

  const todayReservations = await getTodayReservations()
  
  return (
    <section className="flex justify-center items-start py-6 md:py-16 bg-gray-50">
      <div className="flex-col flex md:flex-row gap-6 md:gap-8 w-full max-w-5xl">

        <div className=" bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
            Realizar Reserva
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Completa los datos para reservar tu cancha en{" "}
            <span className="text-green-500 font-semibold">El Galpón Pádel</span>.
          </p>

          <ReservationForm />

          <div className="border-t mt-8 pt-6 text-center">
            <p className="text-gray-500 mb-2">¿Querés revisar tus turnos?</p>
            <Link
              href={`/reservation/my-reservations/${userId}`}
              className="text-green-600 font-semibold hover:underline"
            >
              Ver mis reservas
            </Link>
          </div>
        </div>

        <div className="md:flex-1 w-full md:w-64 bg-white shadow-lg rounded-2xl p-6">
          <h3 className="text-xl font-bold text-red-600 mb-4">
            Ocupado (Hoy)
          </h3>
          <ul className="space-y-3">
            {todayReservations.length === 0 && (
              <li className="p-3 rounded-lg text-gray-500 text-sm border border-gray-200 text-center">
                No hay reservas para hoy.
              </li>
            )}

            {todayReservations.map((res:ReservationResponse) => (
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
        </div>
      </div>
    </section>
  );
}
