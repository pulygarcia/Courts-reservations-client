'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from 'jsonwebtoken'

export const tokenGuard = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('jwt');
  if(!token){
    redirect('/auth/login')
  }

  return token
}

export const getUserIdFromCookies = async () => {
  const token = await tokenGuard()

  const decoded = jwt.decode(token.value) as { id?: string; sub?: string };
  return decoded?.id || decoded?.sub || null;
}

export const getUserRoleFromCookies = async () => {
  const token = await tokenGuard()

  const decoded = jwt.decode(token.value) as { id?: string; sub?: string };
  const userId = decoded?.id || decoded?.sub || null;

  const req = await fetch(`${process.env.API_BASE_URL}/users/${userId}`)
  const res = await req.json();

  return res.admin ? 'admin' : 'user'
}