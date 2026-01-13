import Link from "next/link";
import { getUserRoleFromCookies } from "../utils/auth";
import { getChargesList } from "../utils/list";
import ListItem from "../components/ListItem";

export default async function PricingListPage() {
  type ItemResponse = {
    id: number;
    name: string;
    price: number;
    stock?: number|null;
  };

  const items = await getChargesList();
  const role = await getUserRoleFromCookies();
  const isAdmin = role === "admin";

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-10">
          Lista de Precios
        </h1>

        {isAdmin && (
          <div className="flex justify-end mb-4">
            <Link
              href="/list/new-item"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
            >
              + Agregar item
            </Link>
          </div>
        )}

        <div className="bg-white shadow-lg rounded-2xl overflow-hidden mt-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Producto/Servicio
                </th>
                {isAdmin && (
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Stock
                  </th>
                )}
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Precio
                </th>
                {isAdmin && (
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Acciones
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item: ItemResponse) => (
                <ListItem key={item.id} item={item} isAdmin={isAdmin} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
