import LoginForm from "@/app/components/LoginForm";

export default function LoginPage() {
  return (
    <section className="flex justify-center items-center py-16 bg-gray-50">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
          Iniciar sesión
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Completa los datos para iniciar sesión en 
          <span className="text-green-500 font-semibold"> El Galpón Pádel</span>.
        </p>

        <LoginForm />
        
      </div>
    </section>
  );
}
