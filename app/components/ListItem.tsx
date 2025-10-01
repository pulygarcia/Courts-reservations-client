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
            <Spinner />
        )
    }

  return (
    <li
        key={item.id}
        className={`flex justify-between items-center px-6 py-4 border-b last:border-b-0 ${
            item.id === 1 ? "bg-green-50 font-semibold text-green-700" : ""
        }`}
    >
        <div className="flex flex-col">
            <span>{item.name}</span>
        </div>

        <div className="flex items-center gap-4">
            <span>{formatCurrency(item.price)}</span>

            {isAdmin && (
            <>
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
            </>
            )}
        </div>
    </li>
  );
}