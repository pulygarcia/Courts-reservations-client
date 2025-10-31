'use client'

import { useActionState, useEffect, useState } from "react";
import { ItemResponseSchema } from "../schemas/item-list-schemas";
import { formatCurrency } from "../utils/list";
import { registerSaleAction } from "../actions/register-sale-action";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import { CartItem, SaleItem } from "../schemas/sale-schema";

export default function Cashier({items} : {items: ItemResponseSchema[]}) {
    const [cart, setCart] = useState<SaleItem[]>([]);

    const addToCart = (id: number) => {
        const itemExists = cart.find((item) => item.itemId === id)

        if(itemExists){
            //update qty
            const updatedCart = cart.map((item) =>
                item.itemId === id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );

            setCart(updatedCart);
        }else{
            setCart([...cart, {itemId: id, quantity: 1}])
        }
    };

    const clearCart = () => setCart([]);

    const cartDetails = cart.map((cartItem) => {
        const product = items.find((i) => +i.id === cartItem.itemId);
        if (!product) return null;
        return {
            id: Number(product.id,),
            name: product.name,
            price: product.price,
            quantity: cartItem.quantity,
        };
    })
    .filter((item) => item !== null && item !== undefined)

    const total = cartDetails.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    //ACTION
    const initialState = {
      success: '',
      errors: []
    }

    const registerSaleWithCart = registerSaleAction.bind(null, cart)
    const [state, formAction, pending] = useActionState(registerSaleWithCart, initialState)

    useEffect(() => {
        if(state.success){
            toast.success(state.success)
            clearCart()
        }
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
    <>
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-2 bg-white p-4 rounded-2xl shadow-lg">
            <h2 className="text-lg font-medium mb-4">Productos/Servicios</h2>
            <ul className="space-y-3">
                {items.map((p:ItemResponseSchema) => {
                    const noStock = p.stock === 0;
                return(
                <li key={p.id} className="flex items-center justify-between p-3 border border-blue-500 rounded-lg">
                    <div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-sm text-gray-500">{formatCurrency(p.price)}</div>
                        <div className={`text-sm` + noStock ? 'text-red-500' : 'text-gray-500'}> {noStock ? 'Sin stock' : ''} </div>
                    </div>
                    <button 
                        disabled={p.stock === 0} 
                        onClick={() => addToCart(+p.id)} 
                        className={`px-3 py-1 rounded-lg shadow-sm hover:shadow-lg transition focus:outline-none cursor-pointer` + 
                        (p.stock === 0? "opacity-50 cursor-not-allowed bg-gray-200 text-gray-500": "hover:shadow-lg cursor-pointer bg-white")}
                    >
                        Agregar
                    </button>
                </li>
                )})}
            </ul>
            </div>

            <aside className="bg-white p-4 rounded-2xl shadow-lg">
            <h2 className="text-lg font-medium mb-4">Consumo</h2>

            {cartDetails.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-gray-400 py-6">
                <p className="text-sm">No hay consumos agregados</p>
            </div>
            ) : (
            <ul className="space-y-3">
                {cartDetails.map((item: CartItem) => {
                const currentItem = items.find(i => +i.id === item.id)
                const maxQuantity = item.id === 1 ? 3 : currentItem?.stock!;

                return (
                <li
                    key={item.id}
                    className="p-3 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition bg-gray-50"
                >
                    <div className="flex justify-between items-center">
                    <div>
                        <div className="font-medium text-gray-800">{item.name}</div>
                        <div className="text-sm text-gray-500">
                        {formatCurrency(item.price)} c/u
                        </div>
                    </div>

                    <input
                        type="number"
                        min={1}
                        max={maxQuantity}
                        value={item.quantity}
                        onChange={(e) => {
                            const qty = Number(e.target.value);
                            if (qty >= 1 && qty <= maxQuantity) {
                            setCart((prev) =>
                                prev.map((p) =>
                                p.itemId === item.id ? { ...p, quantity: qty } : p
                                )
                            );
                            }
                        }}
                        className="w-16 text-center border rounded-lg py-1"
                    />

                    </div>
                </li>
                )})}
            </ul>
            )}


            <div className="pt-4 border-t mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-600">Total</div>
                <div className="text-xl font-semibold">{formatCurrency(total)}</div>
            </div>

            <div className="mt-3 flex flex-col gap-2">
                <form action={formAction}>
                    <input 
                        type="submit" 
                        className="w-full py-2 rounded-lg font-medium shadow-sm hover:shadow-lg transition bg-gray-100 cursor-pointer"
                        value={'Registrar venta'}
                    />
                </form>
                <button onClick={() => clearCart()} className="cursor-pointer hover:text-black transition w-full py-2 rounded-lg text-sm text-gray-600">
                    Vaciar carrito
                </button>
            </div>
            </aside>
        </section>
    </>
  );
}