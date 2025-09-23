"use client";

import { useActionState, useEffect } from "react";
import { loginAction } from "../actions/login-action";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

export default function LoginForm() {

    const initialState = {
      success: '',
      errors: []
    }
    
    const [state, formAction, pending] = useActionState(loginAction, initialState)

    useEffect(() => {
      if(state.errors){
        state.errors.map(e => toast.error(e))
      }
    },[state])

    if(pending){
      return (
          <Spinner />
      )
    }

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="ejemplo@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contraseña
        </label>
        <input
          type="password"
          name="password"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="********"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition cursor-pointer"
      >
        Ingresar
      </button>
    </form>
  );
}
