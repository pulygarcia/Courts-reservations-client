import ReservationCard from "@/app/components/ReservationCard";
import { ReservationResponse } from "@/app/schemas/form-reservation-schema";
import { cookies } from "next/headers";
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

      <div className="grid gap-4">
        {reservations.map((res:ReservationResponse) => (
          <ReservationCard res={res} key={res.id}/>
        ))}
      </div>
    </div>
  );
}
