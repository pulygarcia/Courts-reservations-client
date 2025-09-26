'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MainHeader() {
    const pathname = usePathname();

  return (
    <header className="bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
            <h1 className="text-2xl font-bold text-blue-900">
                El Galpón <span className="text-green-500">Pádel</span>
            </h1>
            
            <nav className="hidden md:flex space-x-8">
                <Link href="/" className={`${pathname === '/' ? 'text-blue-600' : 'hover:text-blue-600 transition'}`}>
                    Inicio
                </Link>
                <Link href="/reservation" className={`${pathname === '/reservation' ? 'text-blue-600' : 'hover:text-blue-600 transition'}`}>
                    Reservar
                </Link>
                <Link href="/list" className={`${pathname === '/list' ? 'text-blue-600' : 'hover:text-blue-600 transition'}`}>
                    Precios
                </Link>
                <Link href="/contact" className={`${pathname === '/contact' ? 'text-blue-600' : 'hover:text-blue-600 transition'}`}>
                    Contacto
                </Link>
            </nav>

            <div>
            <Link
                href="/reservation"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
                ¡Reservá ahora!
            </Link>
            </div>
        </div>
    </header>
  );
}