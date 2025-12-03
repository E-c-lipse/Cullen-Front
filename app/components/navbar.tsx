import Link from "next/link";
import { useAuth } from "../auth/contexts/auth-context";
import { LogOut } from "lucide-react";

interface NavItem {
  label: string;
  to: string;
}

const items: NavItem[] = [
  { label: "Inicio", to: "/" },
  { label: "Canjear", to: "/redeem" },
  { label: "Donar", to: "/donate" },
];

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="fixed flex w-full justify-center p-2 bg-(--bg-dark) z-50 text-(--text) border-b border-b-(--bg-lighter) shadow-s">
      <div className="flex w-full items-center justify-between max-w-280 mx-4">
        <div className="flex items-center gap-3">
          <i className="text-red-700 fa-solid fa-droplet"></i>
          <h4>Cullen</h4>
        </div>
        <div className="flex items-center">
          <ul
            id="nav-menu"
            className="absolute md:static gap-6 top-[4.54rem] right-0 w-44 md:w-auto backdrop-blur-md flex flex-col md:flex-row md:items-center items-start transition-all duration-300 ease-in-out md:max-h-none opacity-0 md:opacity-100 max-h-0 overflow-hidden"
          >
            {items.map((item) => (
              <li key={item.to} className="py-2 md:py-0">
                <Link
                  href={item.to}
                  className={`font-bold duration-300 hover:text-red-700`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <button className="bg-red-700 hover:bg-red-600 flex items-center gap-2 px-5 py-1.5 rounded-md ml-6 cursor-pointer transition duration-300" onClick={logout}>
            <LogOut size={18} />
            <span className="font-medium text-(--text)">Cerrar sesión</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
