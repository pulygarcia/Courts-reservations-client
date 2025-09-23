export default function PricingListPage() {
  const items = [
    { name: "Hora de cancha", price: "$12000", highlight: true },
    { name: "Cubre grips (unidad)", price: "$2300" },
    { name: "Tubo de pelotas", price: "$9000" },
    { name: "Gaseosa 2L (coca, mirinda, pepsi, 7up)", price: "$2500" },
    { name: "Lata de gaseosa (coca, mirinda, pepsi, 7up)", price: "$1600" },
    { name: "Cerveza", price: "$1800" },
    { name: "Gatorade", price: "$2100" },
    { name: "Powerade", price: "$2100" },
    { name: "Agua", price: "$1200" },
    { name: "Jugo", price: "$1500" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-10">
          Lista de Precios
        </h1>

        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <ul>
            {items.map((item, idx) => (
              <li
                key={idx}
                className={`flex justify-between items-center px-6 py-4 border-b last:border-b-0 ${
                  item.highlight ? "bg-green-50 font-semibold text-green-700" : ""
                }`}
              >
                <span>{item.name}</span>
                <span>{item.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
