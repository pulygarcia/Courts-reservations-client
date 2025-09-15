import RegisterForm from "@/app/components/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <section className="flex justify-center items-center py-16 bg-gray-50">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
          Crear cuenta
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Completa los datos para registrar tu cuenta en
          <span className="text-green-500 font-semibold"> El Galpón Pádel</span>.
        </p>

        <RegisterForm />
        
        <p className="text-center text-gray-600 mt-6">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/auth/login"
            className="text-green-500 font-semibold hover:underline"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </section>
  );
}
