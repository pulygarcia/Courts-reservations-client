import Cashier from "../components/Cashier";
import { getUserRoleFromCookies } from "../utils/auth";


export default async function SalesRegisterPage() {
    const role = await getUserRoleFromCookies();
    const isAdmin = role === 'admin';
  
    if (!isAdmin) {
      return (
        <div className="py-16 text-center text-red-600 font-semibold">
          No tienes acceso a esta página
        </div>
      );
    }

    const getItemsList = async () => {
        const req = await fetch(`${process.env.API_BASE_URL}/charges`)
        const res = await req.json();
        return res
    }
    const itemsList = await getItemsList();

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-900 my-6">
            Caja / Registro de ventas
        </h2>

        <Cashier items={itemsList}/>
      </div>
    </main>
  );
}