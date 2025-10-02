"use client";

import { useActionState, useEffect } from "react";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import { ItemResponseSchema } from "../schemas/item-list-schemas";
import { editItemAction } from "../actions/edit-item-action";

export default function EditItemForm({item}:{item:ItemResponseSchema}) {
    const initialState = {
      errors: [],
      success: ''
    }

    const editItemWithId = editItemAction.bind(null, +item.id)
    const [state, formAction, pending] = useActionState(editItemWithId, initialState);

    useEffect(() => {
      if(state.errors){
      state.errors.map(e => toast.error(e))
      }

      if(state.success){
          toast.success(state.success)
          redirect('/list')
      }
    },[state])

    if(pending){
      return (
        <Spinner />
      )
    }

  return (
    <form
      action={formAction}
      className="bg-white shadow-lg rounded-2xl p-8 flex flex-col gap-6"
    >
      <div className="flex flex-col">
        <label htmlFor="name" className="font-medium mb-2">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={item.name}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="price" className="font-medium mb-2">
          Precio
        </label>
        <input
          id="price"
          name="price"
          type="number"
          defaultValue={item.price}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {item.stock && (
        <div className="flex flex-col">
          <label htmlFor="stock" className="font-medium mb-2">
            Stock
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            defaultValue={item.stock}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      <input
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm cursor-pointer"
        value="Guardar cambios"
      />
    </form>
  );
}
