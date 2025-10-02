'use client'

import Link from "next/link";
import { formatCurrency } from "../utils/list";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { deleteItemAction } from "../actions/delete-item-action";
import { useRouter } from "next/navigation";

type ListItemProps = {
  id: number;
  name: string;
  price: number;
  stock: number|null;
};

export default function ListItem({item, isAdmin} : {item: ListItemProps, isAdmin: boolean}) {
    const router = useRouter();

    const initialState = {
        errors: [],
        success: ''
    }

    const deleteItemWithId = deleteItemAction.bind(null, item.id)
    const [state, formAction, pending] = useActionState(deleteItemWithId, initialState);

    useEffect(() => {
        if(state.errors){
        state.errors.map(e => toast.error(e))
        }

        if(state.success){
            toast.success(state.success)
            router.refresh()
        }
    },[state])
    
    if(pending){
        return (
            <tr>
                <td><Spinner /></td>
            </tr>
        )
    }

  return (
    <tr
        className={`${
            item.id === 1 ? "bg-green-50 font-semibold text-green-700" : ""
        }`}
    >
        <td className="px-6 py-4 whitespace-nowrap">
            <span>{item.name}</span>
        </td>

        {isAdmin && (
            <td className="px-6 py-4 whitespace-nowrap">
                {item.stock ?? "-"}
            </td>
        )}

        <td className="px-6 py-4 whitespace-nowrap">
            <span>{formatCurrency(item.price)}</span>
        </td>

        {isAdmin && (
            <td className="px-6 py-4 whitespace-nowrap flex gap-4">
            <Link
                href={`/list/${item.id}/edit`}
                className="text-blue-600 hover:underline cursor-pointer"
            >
                Editar
            </Link>

            <form action={formAction}>
                <input
                type="submit"
                className="text-red-600 hover:underline cursor-pointer"
                value="Eliminar"
                />
            </form>
            </td>
        )}
    </tr>
  );
}