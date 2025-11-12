const HistoryData = [
  {
    date: "15 de mayo de 2025",
    type: "Donación",
    hospital: "Hospital Nacional Dos de Mayo",
    credits: "+170",
    isPositive: true,
  },
  {
    date: "20 de abril de 2025",
    type: "Canje",
    hospital: "Hospital Nacional Dos de Mayo",
    credits: "-220",
    isPositive: false,
    img: "https://upload.wikimedia.org/wikipedia/commons/3/30/20180122_Dos_de_Mayo_03.jpg",
  },
  {
    date: "10 de diciembre de 2024",
    type: "Donación",
    hospital: "Hospital Regional Cusco",
    credits: "+400",
    isPositive: true,
  },
];

export default function Dashboard() {
  return (
    <div className="pt-[3.45rem] px-4">
      <div className="max-w-7xl mx-auto mt-5">
        <header className="grid md:grid-cols-4 gap-5 mb-10 items-center">
          <div className="col-span-3">
            <h1 className="mb-4">Bienvenido, Harry</h1>
            <p className="text-(--text-muted)">
              Aquí tienes un resumen de tu actividad reciente.
            </p>
          </div>
          <div className="bg-(--bg) shadow-s p-8 rounded-xl flex flex-col justify-between border border-(--bg-lighter)">
            <p className="text-(--text-muted)">Créditos totales</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-5xl font-semibold">173</span>
              <i className="fa-solid fa-coins fa-2xl"></i>
            </div>
          </div>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-5">
            Historial de Donaciones y Canjes
          </h2>
          <div className="border border-(--bg-lighter) rounded-xl overflow-auto shadow-s">
            <table className="min-w-full divide-y divide-(--bg-lighter)">
              <thead className="bg-(--bg-light)">
                <tr>
                  <th className="px-6 py-3 text-left p-med">Date</th>
                  <th className="px-6 py-3 text-left p-med">Type</th>
                  <th className="px-6 py-3 text-left p-med">Hospital</th>
                  <th className="px-6 py-3 text-left p-med">Credits</th>
                </tr>
              </thead>
              <tbody className="bg-(--bg) divide-y divide-(--bg-light)">
                {HistoryData.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-(--bg-light) transition-all duration-300"
                  >
                    <td className="px-6 py-4 text-(--text) p-med">
                      {item.date}
                    </td>
                    <td className="px-6 py-4 text-(--text) p-med">
                      {item.type}
                    </td>
                    <td className="px-6 py-4 text-(--text) p-med">
                      {item.hospital}
                    </td>
                    <td
                      className={`px-6 py-4 p-med ${
                        item.isPositive ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {item.credits}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-5">Hospital actual</h2>
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="flex bg-(--bg) p-4 rounded-xl shadow-s w-full sm:w-auto border border-(--bg-lighter)">
              <div className="grow pr-4">
                <p className="font-semibold text-lg">
                  Hospital Nacional Dos de Mayo
                </p>
                <p className="text-gray-400 text-sm">Lima</p>
              </div>
              <img
                src={HistoryData[1].img}
                alt="Hospital"
                className="w-32 h-20 object-cover rounded-lg"
              />
            </div>

            <div className="flex gap-4 w-full sm:w-auto">
              <select className="bg-gray-800 text-white border border-gray-700 py-3 px-4 rounded-lg focus:ring-red-500 focus:border-red-500 appearance-none cursor-pointer grow min-w-[200px]">
                <option disabled>Seleccionar hospital...</option>
                <option>Hospital Nacional Dos de Mayo</option>
                <option>Hospital Regional Cusco</option>
              </select>

              <button className="bg-red-700 hover:bg-red-800 transition duration-200 p-3 rounded-full flex items-center justify-center w-12 h-12 shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-white"
                >
                  <path d="M21.5 2v6h-6" />
                  <path d="M2.5 22v-6h6" />
                  <path d="M20.42 18.36a8.5 8.5 0 0 1-17.84-4.88l.82-.94m2.1-4.72a8.5 8.5 0 0 1 17.84 4.88l-.82.94" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
