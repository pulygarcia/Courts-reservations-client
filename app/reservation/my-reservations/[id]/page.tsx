import ReservationCard from "@/app/components/ReservationCard";
import { ReservationResponse } from "@/app/schemas/form-reservation-schema";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function MyReservationsPage({params,}: {params: Promise<{ id: string }>}) {
    const cookieStore = await cookies();
    const token = cookieStore.get('jwt');
    if(!token){
        redirect('/auth/login')
    }

    const { id } = await params

  const getUserReservations = async () => {
    const req = await fetch(`${process.env.API_BASE_URL}/users/${id}`)
    const res = await req.json();

    return res.reservations
  }

  const reservations = await getUserReservations();

  return (
    <div className="p-6 py-16 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Turnos pendientes</h1>

      {reservations.length < 1 && (
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="28"  height="28"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-folder-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13.5 19h-8.5a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v4" /><path d="M22 22l-5 -5" /><path d="M17 22l5 -5" /></svg>
          <p className="text-xl font-medium">No tenés reservas activas por el momento.</p>
          <p className="mt-2 text-gray-400">Tus reservas activas aparecerán en esta sección</p>
          <Link
            href="/reservation"
            className="mt-6 inline-block px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Realizar una nueva reserva
          </Link>
        </div>
      )}

      <div className="grid gap-4">
        {reservations.map((res:ReservationResponse) => (
          <ReservationCard res={res} key={res.id}/>
        ))}
      </div>
    </div>
  );
}
