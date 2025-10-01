import { getUserRoleFromCookies } from "@/app/utils/auth";
import NewItemForm from "@/app/components/NewItemForm";

export default async function NewItemPage() {
  const role = await getUserRoleFromCookies();
  const isAdmin = role === "admin";

  if (!isAdmin) {
    return (
      <div className="py-16 text-center text-red-600 font-semibold">
        No tienes acceso a esta página
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-10">
        Agregar Nuevo Item
      </h1>

      <NewItemForm />
    </div>
  );
}
