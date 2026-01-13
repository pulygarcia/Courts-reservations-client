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
  stock?: number|null;
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

    const getStockBadge = (stock: number | null | undefined) => {
        if (stock === undefined || stock === null) return <span className="text-slate-400">-</span>;
        if (stock === 0) return <span className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs font-bold">Sin stock</span>;
        if (stock < 5) return <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-md text-xs font-bold">{stock} Unidades</span>;
        return <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-bold">{stock} Disp.</span>;
    };

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
            <td className={` px-6 py-4 whitespace-nowrap`}>
            {getStockBadge(item.stock)}
            </td>
        )}

        <td className="px-6 py-4 whitespace-nowrap">
            <span>{formatCurrency(item.price)}</span>
        </td>

        {isAdmin && (
            <td className="px-6 py-4 whitespace-nowrap flex gap-4">
            <Link
                href={`/list/${item.id}/edit`}
                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                title="Editar"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </Link>

            <form action={formAction}>
                <button
                    type="submit"
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    title="Eliminar"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </button>
            </form>
            </td>
        )}
    </tr>
  );
}