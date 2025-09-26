import FixedReservationForm from "@/app/components/fixedReservationForm";
import { FixedReservationResponse } from "@/app/schemas/form-reservation-schema";
import Link from "next/link";

export default async function FixedReservationPage() {
  const getFixedReservations = async () => {
      const req = await fetch(`${process.env.API_BASE_URL}/fixed-reservations`);
      const res = await req.json();

      //order asc
      const orderedReservations = res.sort((a:any, b:any) => {
        const startA = Number(a.startTime.split(":")[0]);
        const startB = Number(b.startTime.split(":")[0]);
  
        const result = startA - startB //if < 0 → a before b, if > 0 → a after b
        return result; //reordered array
      });
  
      return orderedReservations;
  };

  const reservations = await getFixedReservations();

  const weekDays = [
    {value: '1', day: 'Lunes'},
    {value: '2', day: 'Martes'},
    {value: '3', day: 'Miercoles'},
    {value: '4', day: 'Jueves'},
    {value: '5', day: 'Viernes'},
    {value: '6', day: 'Sabado'},
    {value: '0', day: 'Domingo'}
  ]


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

        <div className="bg-white shadow-lg rounded-2xl p-6 flex-1 md:w-64">
          <h3 className="text-xl font-bold text-red-600 mb-4">
            Turnos fijos ocupados
          </h3>
          <ul className="space-y-3 overflow-y-auto max-h-[600px]">
            {reservations.length === 0 && (
              <li className="p-3 rounded-lg text-gray-500 text-sm border border-gray-200 text-center">
                No se encontraron turnos fijos reservados.
              </li>
            )}

            {reservations.map((res: FixedReservationResponse) => {
              const dayName = weekDays.find(d => Number(d.value) === Number(res.dayOfWeek))?.day;

              return(
                <li
                  key={res.id}
                  className="p-3 rounded-lg text-gray-700 text-sm border border-red-200"
                >
                  <span className="bg-gray-100 text-gray-700 p-1 rounded me-2">
                    {dayName} de {res.startTime.slice(0, 5)} - {res.endTime.slice(0, 5)}
                  </span>{" "}
                  <span className="capitalize font-medium text-blue-700">{res.court.name}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
