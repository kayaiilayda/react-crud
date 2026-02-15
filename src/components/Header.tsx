import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-secondary sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <span className="text-primary text-2xl md:text-3xl font-bold">
            İlayFlix
          </span>
        </Link>

        <nav className="flex items-center gap-2 md:gap-4">
          <Link
            to="/"
            className={`px-3 py-2 rounded-lg text-sm md:text-base transition-colors no-underline ${
              isActive("/")
                ? "bg-primary text-white"
                : "text-text-muted hover:text-white hover:bg-white/10"
            }`}
          >
            Ana Sayfa
          </Link>
          <Link
            to="/ekle"
            className={`px-3 py-2 rounded-lg text-sm md:text-base transition-colors no-underline ${
              isActive("/ekle")
                ? "bg-primary text-white"
                : "text-text-muted hover:text-white hover:bg-white/10"
            }`}
          >
            + Yeni Ekle
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
