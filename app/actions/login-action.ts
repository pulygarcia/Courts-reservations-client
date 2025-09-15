"use server";

import { loginSchema } from "../schemas/auth-schemas";

type ActionStateType = {
    success: string,
    errors: string[]
}

export async function loginAction(prevState:ActionStateType, formData: FormData) {
    const rawData = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const result = loginSchema.safeParse(rawData);
    if(!result.success){
        const errorMessages = result.error.issues.map(error => error.message);
        return {
            success: '',
            errors: errorMessages
        }
    }

    const request = await fetch(`${process.env.API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(rawData),
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
        success: 'Tu cuenta fue creada correctamente', 
        errors: [] 
    }
}
