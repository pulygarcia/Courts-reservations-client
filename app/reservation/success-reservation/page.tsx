import { getUserIdFromCookies } from "@/app/utils/auth";
import Link from "next/link";

export default async function successReservationPage() {

  const userId = await getUserIdFromCookies();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-4">¡Su reserva fue guardada!</h1>
      <p className="mb-6 text-gray-700 text-center">
        Tu reserva fue creada correctamente. Haz click en el botón para ver tus reservas.
      </p>
      <Link
        href={`/reservation/my-reservations/${userId}`}
        className="bg-green-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-600 transition"
      >
        Mis reservas
      </Link>
    </div>
  );
}