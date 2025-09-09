export default function MainHeader() {
  return (
    <header className="bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
            <h1 className="text-2xl font-bold text-blue-900">
                El Galpón <span className="text-green-500">Pádel</span>
            </h1>
            
            <nav className="hidden md:flex space-x-8">
            <a href="/" className="hover:text-blue-600 transition">
                Inicio
            </a>
            <a href="/reservation" className="hover:text-blue-600 transition">
                Reservar
            </a>
            <a href="/#contact" className="hover:text-blue-600 transition">
                Contacto
            </a>
            </nav>

            <div>
            <a
                href="/reservation"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
                ¡Reservá ahora!
            </a>
            </div>
        </div>
    </header>
  );
}