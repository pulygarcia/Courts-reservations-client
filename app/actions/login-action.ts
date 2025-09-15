"use server";

import { cookies } from "next/headers";
import { loginSchema } from "../schemas/auth-schemas";
import { redirect } from "next/navigation";

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

    await((await cookies()).set("jwt", response.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 90, // 90 days
        path: "/",
    }))

    redirect('/reservation');
}
