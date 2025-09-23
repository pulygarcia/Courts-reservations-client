'use client'

import { useActionState, useEffect, useState } from "react";
import FormDatePicker from "./Datepicker";
import { createReservationAction } from "../actions/new-reservation-action";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import Spinner from "./Spinner";

export default function ReservationForm() {
    const allowedHours = Array.from({ length: 10 }, (_, i) => 14 + i); // [14,15,...23]
    
    const [startTime, setStartTime] = useState("");
    const [startHour, setStartHour] = useState<number | null>(null);//auxiliar startTime variable
    const [duration, setDuration] = useState<number | "">(""); // 1,2,3
    const maxDuration = 3;
    const [endTime, setEndTime] = useState("");

    const initialState = {
        errors: [],
        success: ''
    }
    const [state, formAction, pending] = useActionState(createReservationAction, initialState);

    useEffect(() => {
        if(state.errors){
        state.errors.map(e => toast.error(e))
        }

        if(state.success){
            toast.success(state.success)
            redirect('/reservation/success-reservation')
        }
    },[state])

    if(pending){
        return (
            <Spinner />
        )
    }

  return (
    <>
        <form action={formAction} className="space-y-6">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha
            </label>
            <FormDatePicker />
            </div>
            
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Hora de inicio
            </label>
            <select
                name="startTime"
                value={startTime} //divide hour by ":", and get de first position in order to match with option value (14, 15, 16...)
                onChange={(e) => {
                    //set it for send to the form as "hh:mm"
                    const value = e.target.value;
                    setStartTime(value);

                    //use auxiliar state starthour and convert to number to use for logic
                    const hour = Number(value.split(":")[0]);
                    setStartHour(hour);

                    //reset setduration and endtime because starttime has changed
                    setDuration("")
                    setEndTime("")
                }}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
                <option value="">Seleccionar hora</option>
                {allowedHours.map((h) => (
                    <option key={h} value={`${String(h).padStart(2, "0")}:00`}>
                        {h}:00
                    </option>
                ))}
            </select>

            </div>

            {startTime && (
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Duración
                </label>
                <select
                    name="duration"
                    value={duration}
                    onChange={(e) => {
                        const selectedDuration = Number(e.target.value);
                        setDuration(selectedDuration);

                        // calculate endTime
                        const startHour = Number(startTime.split(":")[0]);
                        const calculatedEnd = startHour + selectedDuration > 23 ? 23 : startHour + selectedDuration;
                        setEndTime(`${String(calculatedEnd).padStart(2, "0")}:00`);
                    }}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                    <option value="">Seleccionar duración</option>
                    {Array.from(
                        { length: Math.min(maxDuration, 23 - Number(startTime.split(":")[0])) },
                        (_, i) => i + 1
                    ).map((duration) => (
                        <option key={duration} value={duration}>
                        {duration} hora{duration > 1 ? "s" : ""}
                        </option>
                        /* 
                        Example-explication:

                        if startTime = 21 for example
                        23 - 21 = 2 → we can only book 1 o 2 hours
                        Math.min(3, 2) = 2
                        so create an array.from those 2 options [1,2] and map them.
                        */
                    ))}
                </select>

                {endTime && (
                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hora de fin
                    </label>
                    <input
                    type="text"
                    name="endTime"
                    value={endTime}
                    readOnly
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-700"
                    />
                </div>
                )}
            </div>
            )}

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Cancha
            </label>
            <select name="courtId" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">Seleccionar cancha</option>
                <option value="1">Cancha 1</option>
                <option value="2">Cancha 2</option>
            </select>
            </div>

            <input
                type="submit"
                className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition"
                value="Confirmar reserva" 
            />
        </form>
    </>
  );
}