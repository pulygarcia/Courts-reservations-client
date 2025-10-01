import { getUserRoleFromCookies } from "@/app/utils/auth";
import EditItemForm from "@/app/components/EditItemForm";
import { getItemById } from "@/app/utils/list";

export default async function NewItemPage({params} : {params: {id:string}}) {
  const {id} = await params;
  const item = await getItemById(+id);

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
        Editar Item
      </h1>

      <EditItemForm item={item}/>
    </div>
  );
}