"use server";

import { cookies } from "next/headers";
import { SaleItem, saleSchema } from "../schemas/sale-schema";

type ActionStateType = {
    success: string,
    errors: string[]
}

export async function registerSaleAction(cart:SaleItem[],prevState:ActionStateType) {
    //parse cart to format that api expects
    const payload = {
        items: cart.map(item => ({
            itemId: item.itemId,
            quantity: item.quantity
        }))
    };

    const result = saleSchema.safeParse(payload);
    if(!result.success){
        const errorMessages = result.error.issues.map(error => error.message);
        return {
            success: '',
            errors: errorMessages
        }
    }

    const token = (await cookies()).get('jwt')?.value
    const request = await fetch(`${process.env.API_BASE_URL}/sales`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(result.data),
    });

    const response = await request.json();
    console.log(request);
    console.log(response);

    if(!request.ok){
        return{
            errors: [response.message],
            success: ''
        }
    }

    return { 
        success: 'La venta fue registrada', 
        errors: [] 
    }
}
