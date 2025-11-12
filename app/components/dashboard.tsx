import Card from "./ui/card/card";

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
            <h2 className="mb-4">Bienvenido, Harry</h2>
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
          <h4 className="text-2xl font-semibold mb-5">
            Historial de Donaciones y Canjes
          </h4>
          <div className="border border-(--bg-lighter) rounded-xl overflow-auto shadow-s">
            <table className="min-w-full divide-y divide-(--bg-lighter)">
              <thead className="bg-(--bg-light)">
                <tr>
                  <th className="px-6 py-3 text-left p-med">Fecha</th>
                  <th className="px-6 py-3 text-left p-med">Tipo</th>
                  <th className="px-6 py-3 text-left p-med">Hospital</th>
                  <th className="px-6 py-3 text-left p-med">Créditos</th>
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

        <section className="mb-10">
          <h4 className="text-2xl font-semibold mb-5">Hospital actual</h4>
          <div className="flex flex-col sm:flex-row gap-10 items-start sm:items-center">
            <Card
              img={HistoryData[1].img}
              body="Hospital Nacional Dos de Mayo"
              footer="Av. Miguel Grau cdra. 13, Lima"
            ></Card>

            <div>
              <p className="p-bold mb-4">Cambio de hospital</p>
              <div className="flex gap-4 w-full sm:w-auto">
                <select className="bg-(--bg) text-(--text) border border-(--bg-lighter) py-3 px-4 rounded-lg appearance-none cursor-pointer">
                  <option disabled>Seleccionar hospital...</option>
                  <option>Hospital Nacional Dos de Mayo</option>
                  <option>Hospital Regional Cusco</option>
                </select>

                <button className="bg-(--primary) hover:bg-(--primary-95) transition duration-300 p-3 rounded-full flex items-center justify-center w-12 h-12 ">
                  <i className="fa-solid fa-rotate-right"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
