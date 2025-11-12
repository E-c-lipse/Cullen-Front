interface NavItem {
  label: string;
  to: string;
}

const items: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Redeem", to: "/redeem" },
  { label: "Donate", to: "/donate" },
];

export default function Navbar() {
  return (
    <nav className="fixed flex w-full justify-center p-2 bg-(--bg-dark) z-50 text-(--text) border-b border-b-(--bg-lighter) shadow-s">
      <div className="flex w-full items-center justify-between max-w-280 mx-4">
        <div className="flex items-center gap-3">
          <i className="text-(--primary) fa-solid fa-droplet"></i>
          <h4>Cullen</h4>
        </div>
        <div className="flex items-center">
          <ul
            id="nav-menu"
            className="absolute md:static gap-6 top-[4.54rem] right-0 w-44 md:w-auto backdrop-blur-md flex flex-col md:flex-row md:items-center items-start transition-all duration-300 ease-in-out md:max-h-none opacity-0 md:opacity-100 max-h-0 overflow-hidden"
          >
            {items.map((item) => (
              <li key={item.to} className="py-2 md:py-0">
                <a
                  href={item.to}
                  className={`font-bold duration-300 hover:text-(--primary)`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 md:gap-8">
            <button
              id="menu-btn"
              className="md:hidden transition-all duration-300"
            >
              <svg
                className="md:hidden"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M4 6l16 0"></path>
                <path d="M4 12l16 0"></path>
                <path d="M4 18l16 0"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
