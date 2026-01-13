'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserRoleFromCookies } from "../utils/auth";

export default function MainHeader() {
    const pathname = usePathname();
    const [role, setRole] = useState('')
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const getUserRole = async () => {
            setLoading(true);
            try {
                const role = await getUserRoleFromCookies();
                setRole(role);
            } catch (error) {
                console.log(error);
            }finally {
                setLoading(false);
            }
        }

        getUserRole();
    },[]);

    const isAdmin = role === 'admin';

    const navLinkStyles = (path: string) => 
        `text-sm font-medium transition-colors duration-200 ${
            pathname === path 
            ? 'text-blue-600 border-b-2 border-blue-600' 
            : 'text-gray-600 hover:text-blue-600'
    }`;

    const adminBtnStyles = "flex items-center gap-2 bg-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-900 transition-all shadow-sm active:scale-95";

  return (
    <header className="bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
            <h1 className="text-2xl font-bold text-blue-900">
                El Galpón <span className="text-green-500">Pádel</span>
            </h1>
            
            <nav className="hidden md:flex space-x-8">
                <Link href="/" className={navLinkStyles('/')}>
                    Inicio
                </Link>
                <Link href="/reservation" className={navLinkStyles('/reservation')}>
                    Reservar
                </Link>
                 {!isAdmin && (
                    <Link href="/list" className={navLinkStyles('/list')}>
                        Precios
                    </Link>
                )}
            </nav>

            <div className="flex items-center gap-4">
                {!isAdmin && (
                    <Link href="/contact" className={navLinkStyles('/contact')}>
                        Contacto
                    </Link>
                )}

                {isAdmin && (
                    <Link 
                        href="/list" 
                        className={adminBtnStyles}
                    >
                        <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-pencil-dollar"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /><path d="M21 15h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" /><path d="M19 21v1m0 -8v1" /></svg>
                            <span>Precios</span>
                        </div>
                    </Link>
                )}
                
                {isAdmin && (
                    <Link 
                        href="/sales-register" 
                        className={adminBtnStyles}
                    >
                        <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-cash-register"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M21 15h-2.5c-.398 0 -.779 .158 -1.061 .439c-.281 .281 -.439 .663 -.439 1.061c0 .398 .158 .779 .439 1.061c.281 .281 .663 .439 1.061 .439h1c.398 0 .779 .158 1.061 .439c.281 .281 .439 .663 .439 1.061c0 .398 -.158 .779 -.439 1.061c-.281 .281 -.663 .439 -1.061 .439h-2.5" /><path d="M19 21v1m0 -8v1" /><path d="M13 21h-7c-.53 0 -1.039 -.211 -1.414 -.586c-.375 -.375 -.586 -.884 -.586 -1.414v-10c0 -.53 .211 -1.039 .586 -1.414c.375 -.375 .884 -.586 1.414 -.586h2m12 3.12v-1.12c0 -.53 -.211 -1.039 -.586 -1.414c-.375 -.375 -.884 -.586 -1.414 -.586h-2" /><path d="M16 10v-6c0 -.53 -.211 -1.039 -.586 -1.414c-.375 -.375 -.884 -.586 -1.414 -.586h-4c-.53 0 -1.039 .211 -1.414 .586c-.375 .375 -.586 .884 -.586 1.414v6m8 0h-8m8 0h1m-9 0h-1" /><path d="M8 14v.01" /><path d="M8 17v.01" /><path d="M12 13.99v.01" /><path d="M12 17v.01" /></svg>
                            <span>Caja</span>
                        </div>
                    </Link>
                )}

                {isAdmin && (
                    <Link
                        href="/sales-register/history"
                        className={adminBtnStyles}
                    >
                        <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-list"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l11 0" /><path d="M9 12l11 0" /><path d="M9 18l11 0" /><path d="M5 6l0 .01" /><path d="M5 12l0 .01" /><path d="M5 18l0 .01" /></svg>
                            <span>Ventas</span>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    </header>
  );
}