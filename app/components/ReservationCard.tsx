'use client'

import { useActionState, useEffect } from "react";
import { ReservationResponse } from "../schemas/form-reservation-schema";
import { format, parse, parseISO } from "date-fns";
import { cancelReservationAction } from "../actions/cancel-reservation";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

export default function ReservationCard({res} : {res: ReservationResponse}) {
    const formattedDate = format(parseISO(res.date), "dd-MM-yyyy");

    // hour to date object (date does not matters)
    const parsedStartTime = parse(res.startTime, "HH:mm:ss", new Date());
    const parsedEndTime = parse(res.endTime, "HH:mm:ss", new Date());
    // format to only hours and minutes
    const formattedStartTime = format(parsedStartTime, "HH:mm");
    const formattedEndTime = format(parsedEndTime, "HH:mm");

    const initialState = {
      success: '',
      errors: []
    }

    const cancelReservationWithId = cancelReservationAction.bind(null, res.id)
    const [state, formAction, pending] = useActionState(cancelReservationWithId, initialState)

    useEffect(() => {
        if(state.errors){
        state.errors.map(e => toast.error(e))
        }

        if(state.success){
            toast.success(state.success)
            redirect('/reservation/success-cancelation')
        }
    },[state])

    if(pending){
      return (
        <Spinner />
      )
    }

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
              <form action={formAction}>
                <input 
                  type="submit" 
                  className="px-3 py-1 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
                  value="Cancelar reserva"/>
              </form>
            </div>
          </div>
    </>
  );
}