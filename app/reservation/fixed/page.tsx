import FixedReservationForm from "@/app/components/fixedReservationForm";
import ReservationsSidebar from "@/app/components/ReservationsSideBar";
import { getFixedReservations, weekDays } from "@/app/utils/reservations";
import Link from "next/link";

export default async function FixedReservationPage() {
  const fixedReservations = await getFixedReservations();

  return (
    <section className="flex justify-center items-start py-6 md:py-16 bg-gray-50">
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl">
        <div className="bg-white shadow-lg rounded-2xl p-8 flex-1">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
            Reservar Turno Fijo
          </h2>

          <p className="text-center text-gray-600 mb-8">
            Asegurá tu horario todas las semanas en{" "}
            <span className="text-green-500 font-semibold">El Galpón Pádel</span>.
          </p>

          <FixedReservationForm />

          <div className="border-t mt-8 pt-6 text-center">
            <p className="text-gray-500 mb-2">¿Preferís hacer una reserva común?</p>
            <Link
              href="/reservation"
              className="text-green-600 font-semibold hover:underline"
            >
              Ir a reservas comunes
            </Link>
          </div>
        </div>

        <ReservationsSidebar 
          fixedReservations={fixedReservations} 
          weekDays={weekDays}
        />
      </div>
    </section>
  );
}
