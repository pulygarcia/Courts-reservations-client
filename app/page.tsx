import Link from "next/link";

export default function Home() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center">
      <img
        src="https://media.snl.no/media/311146/standard_compressed_padel_utstyr.jpg"
        alt="Cancha de pádel"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gray-900/70" />

      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Bienvenido a <span className="text-green-400">El Galpón pádel club</span>
        </h1>
        <p className="text-lg md:text-2xl mb-6">
          Reservá tu cancha y comprá productos de pádel. Fácil, rápido y online
        </p>
        <div className="flex items-center gap-4 justify-center">
          <Link
            href="/reservation"
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Reservar
          </Link>

          <Link
            href="/list"
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Ver precios
          </Link>
        </div>
      </div>
    </section>
  );
}
