"use server";

import { cookies } from "next/headers";
import { reservationSchema } from "../schemas/form-reservation-schema";

type ActionStateType = {
    success: string,
    errors: string[]
}

export async function createReservationAction(prevState:ActionStateType, formData: FormData) {
    const rawData = {
        courtId: formData.get("courtId"),
        date: formData.get("date"),
        startTime: formData.get("startTime"),
        endTime: formData.get("endTime")
    }

    const result = reservationSchema.safeParse(rawData);
    if(!result.success){
        console.log(result.error.issues);
        const errorMessages = result.error.issues.map(error => error.message);
        return {
            success: '',
            errors: errorMessages
        }
    }

    const token = (await cookies()).get('jwt')
    const request = await fetch(`${process.env.API_BASE_URL}/reservations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(result.data),
    });

    const response = await request.json();

    if(!request.ok){
        return{
            errors: [response.message],
            success: ''
        }
    }

    return { 
        success: 'Tu turno fue reservado con éxito', 
        errors: [] 
    }
}
