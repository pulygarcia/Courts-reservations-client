import Link from "next/link";
import { getUserRoleFromCookies } from "../utils/auth";
import { getChargesList } from "../utils/list";
import ListItem from "../components/ListItem";

export default async function PricingListPage() {
  type ItemResponse = {
    id: number;
    name: string;
    price: number;
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

        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <ul>
            {items.map((item: ItemResponse) => (
              <ListItem key={item.id} item={item} isAdmin={isAdmin} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
