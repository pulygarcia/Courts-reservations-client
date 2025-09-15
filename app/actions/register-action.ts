"use server";

import { registerSchema } from "../schemas/auth-schemas";

type ActionStateType = {
    success: string,
    errors: string[]
}

export async function registerAction(prevState:ActionStateType, formData: FormData) {
    const rawData = {
        name: formData.get("name"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const result = registerSchema.safeParse(rawData);
    if(!result.success){
        const errorMessages = result.error.issues.map(error => error.message);
        return {
            success: '',
            errors: errorMessages
        }
    }

    //send name + lastname in same field ("name") before sending to endpoint
    const finalData = {
        name: `${result.data.name} ${result.data.lastName}`,
        email: result.data.email,
        password: result.data.password,
    };

    const request = await fetch(`${process.env.API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(finalData),
    });

    const response = await request.json();

    if(!request.ok){
        return{
            errors: [response.message],
            success: ''
        }
    }

    return { 
        success: 'Tu cuenta fue creada correctamente', 
        errors: [] 
    }
}
