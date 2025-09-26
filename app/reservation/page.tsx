import ReservationForm from "../components/ReservationForm";
import Link from "next/link";
import { getUserIdFromCookies } from "../utils/auth";
import { getFixedReservations, getTodayReservations, weekDays } from "../utils/reservations";
import ReservationsSidebar from "../components/ReservationsSideBar";

export default async function ReservationPage() {
  const userId = await getUserIdFromCookies();


  const todayReservations = await getTodayReservations()
  const fixedReservations = await getFixedReservations()
  
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

          <p className="text-center text-gray-500 mb-6">
            ¿Querés reservar un turno fijo?{" "}
            <Link href="/reservation/fixed" className="text-blue-600 underline font-medium">
              Hacelo desde acá
            </Link>
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

        <ReservationsSidebar 
          todayReservations={todayReservations} 
          fixedReservations={fixedReservations} 
          weekDays={weekDays}
        />
      </div>
    </section>
  );
}
