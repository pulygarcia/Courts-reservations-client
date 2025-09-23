'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from 'jsonwebtoken'

export const getUserIdFromCookies = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt");
    if(!token){
      redirect('/auth/login')
    }

    const decoded = jwt.decode(token.value) as { id?: string; sub?: string };
    return decoded?.id || decoded?.sub || null;
}