"use server";

import { cookies } from "next/headers";
import { newItemSchema } from "../schemas/item-list-schemas";

type ActionStateType = {
    success: string,
    errors: string[]
}

export async function newItemAction(prevState:ActionStateType, formData: FormData) {
    const nameValue = formData.get("name");
    const priceValue = formData.get("price");
    const stockValue = formData.get("stock");

    const rawData = {
        name: nameValue,
        price: Number(priceValue),
        stock: Number(stockValue),
    }

    const result = newItemSchema.safeParse(rawData);
    if(!result.success){
        const errorMessages = result.error.issues.map(error => error.message);
        return {
            success: '',
            errors: errorMessages
        }
    }

    const token = (await cookies()).get('jwt')?.value
    const request = await fetch(`${process.env.API_BASE_URL}/charges`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(rawData),
    });

    const response = await request.json();

    if(!request.ok){
        return{
            errors: [response.message[0]],
            success: ''
        }
    }

    return {
        success: 'Item agregado correctamente',
        errors: []
    }
}
