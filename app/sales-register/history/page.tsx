import { SaleApiResponse } from "@/app/schemas/sale-schema";
import { getUserRoleFromCookies, tokenGuard } from "@/app/utils/auth";
import { formatCurrency } from "@/app/utils/list";

export default async function SalesRegisterPage() {
  const role = await getUserRoleFromCookies();
  const isAdmin = role === "admin";

  if (!isAdmin) {
    return (
      <div className="py-16 text-center text-red-600 font-semibold">
        No tienes acceso a esta página
      </div>
    );
  }

    const getSalesList = async () => {
        const token = (await tokenGuard()).value;

        const req = await fetch(`${process.env.API_BASE_URL}/sales`, {
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}` 
            }
        });
        
        const res = await req.json();
        return res;
    };
    const salesList: SaleApiResponse = await getSalesList();

    const getTodayGains = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // day start
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1); // next day start
    
        const totalToday = salesList
        .filter((sale) => {
            const saleDate = new Date(sale.createdAt);
            return saleDate >= today && saleDate < tomorrow;
        })
        .reduce((acc, sale) => acc + +sale.total, 0);

        return totalToday
    }

    const getCurrentMonthGains = () => {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime(); // timestamp inicio del mes
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1).getTime(); // timestamp primer día del mes siguiente

      const totalThisMonth = salesList
        .filter((sale) => {
          const saleDate = new Date(sale.createdAt).getTime();
          return saleDate >= startOfMonth && saleDate < endOfMonth;
        })
        .reduce((acc, sale) => acc + Number(sale.total), 0);

      return totalThisMonth;
    };

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-3xl font-bold text-blue-900 mb-4 sm:mb-0">
            Historial de ventas
          </h2>

          <div className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <div className="bg-green-100 text-green-800 font-bold rounded-xl p-4 shadow-md text-lg text-center sm:text-left">
                  <p>Ganancias del día</p>
                  <p className="text-2xl">{formatCurrency(getTodayGains())}</p>
                </div>

                <div className="bg-blue-100 text-blue-800 font-bold rounded-xl p-4 shadow-md text-lg text-center sm:text-left">
                  <p>Ganancias del mes</p>
                  <p className="text-2xl">{formatCurrency(getCurrentMonthGains())}</p>
                </div>
              </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="py-3 px-4 text-left"># Venta</th>
                <th className="py-3 px-4 text-left">Empleado</th>
                <th className="py-3 px-4 text-left">Productos</th>
                <th className="py-3 px-4 text-left">Total</th>
                <th className="py-3 px-4 text-left">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {salesList.length > 0 ? (
                salesList.map((sale) => (
                  <tr
                    key={sale.id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="py-2 px-4 font-medium text-gray-700">
                      #{sale.id}
                    </td>
                    <td className="py-2 px-4 text-gray-700">
                      {sale.user?.name || "—"}
                      <div className="text-sm text-gray-500">
                        {sale.user?.email}
                      </div>
                    </td>

                    <td className="py-2 px-4 text-gray-600">
                      {sale.items.map((item) => {

                        return(
                        <div
                          key={item.id}
                          className="text-sm flex justify-between"
                        >
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span>${parseFloat(item.price).toFixed(2)}</span>
                        </div>
                      )})}
                    </td>

                    <td className="py-2 px-4 font-semibold text-green-700">
                      ${parseFloat(sale.total).toFixed(2)}
                    </td>

                    <td className="py-2 px-4 text-gray-600">
                      {new Date(sale.createdAt).toLocaleString("es-AR", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No hay ventas registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
