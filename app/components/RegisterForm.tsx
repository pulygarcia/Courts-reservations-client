"use client";

import { useActionState, useEffect } from "react";
import { registerAction } from "../actions/register-action";
import { toast } from "react-toastify";

export default function RegisterForm() {
    const initialState = {
        success: '',
        errors: []
    }

    const [state, formAction] = useActionState(registerAction, initialState)

    useEffect(() => {
      if(state.errors){
        state.errors.map(e => toast.error(e))
      }
    },[state])

  return (
    <form action={formAction} className="max-w-md mx-auto space-y-6 p-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
        <span className="text-xs text-gray-600 mb-1">Las reservas que realices se guardarán a tu nombre y apellido</span>
        <input
          type="text"
          name="name"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
        <input
          type="text"
          name="lastName"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
        <input
          type="password"
          name="password"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition cursor-pointer"
      >
        Registrarse
      </button>
    </form>
  );
}
