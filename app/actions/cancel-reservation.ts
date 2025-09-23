"use server";

import { cookies } from "next/headers";

type ActionStateType = {
    success: string,
    errors: string[]
}

export async function cancelReservationAction(id:number, prevState:ActionStateType) {
    const token = (await cookies()).get('jwt')?.value
    const request = await fetch(`${process.env.API_BASE_URL}/reservations/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    });

    const response = await request.json();

    if(!request.ok){
        return{
            errors: [response.message],
            success: ''
        }
    }

    return { 
        success: 'Tu turno fue cancelado', 
        errors: [] 
    }
}
