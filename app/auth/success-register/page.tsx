export default function successRegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-4">¡Registro exitoso!</h1>
      <p className="mb-6 text-gray-700 text-center">
        Tu cuenta fue creada correctamente. Haz click en el botón para iniciar sesión.
      </p>
      <a
        href="/auth/login"
        className="bg-green-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-600 transition"
      >
        Iniciar sesión
      </a>
    </div>
  );
}
