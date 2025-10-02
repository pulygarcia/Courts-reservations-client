"use server";

import { cookies } from "next/headers";
import { editItemSchema } from "../schemas/item-list-schemas";

type ActionStateType = {
    success: string,
    errors: string[]
}

export async function editItemAction(id:number,prevState:ActionStateType, formData:FormData): Promise<ActionStateType> {
    const nameValue = formData.get("name");
    const priceValue = formData.get("price");
    const stockValue = formData.get("stock");

    const rawData = {
        name: nameValue,
        price: Number(priceValue),
        stock: Number(stockValue)
    }

    const result = editItemSchema.safeParse(rawData);
    if(!result.success){
        const errorMessages = result.error.issues.map(error => error.message);
        return {
            success: '',
            errors: errorMessages
        }
    }

    const token = (await cookies()).get('jwt')?.value
    const request = await fetch(`${process.env.API_BASE_URL}/charges/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
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
        success: 'Item modificado correctamente',
        errors: []
    }
}
