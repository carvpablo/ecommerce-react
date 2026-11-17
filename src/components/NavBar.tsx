import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import {
  ShoppingBag,
  ShoppingCart,
  LogOut,
  User,
  LogIn,
  PackageCheck,
  Search,
  X,
} from "lucide-react";

function navLinkClass({ isActive }: { isActive: boolean }) {
  return `text-sm font-medium transition border-b-2 py-1 ${
    isActive
      ? "text-indigo-700 border-indigo-600"
      : "text-slate-600 border-transparent hover:text-indigo-600"
  }`;
}

export default function NavBar() {
  const { isLogged, userName, handleLogout } = useAuth();
  const { searchQuery, setSearchQuery } = useProducts();
  const location = useLocation();
  const navigate = useNavigate();

  function handleSearchChange(value: string) {
    setSearchQuery(value);
    if (location.pathname !== "/" && value.trim() !== "") {
      navigate("/");
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition shrink-0"
        >
          <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-sm">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            E-Shop<span className="text-indigo-600">.</span>
          </span>
        </Link>

        {/* Barra de Pesquisa */}
        <div className="flex-1 max-w-md relative">
          <Search
            aria-hidden="true"
            className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          />
          <input
            type="search"
            aria-label="Buscar produtos"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setSearchQuery("");
            }}
            placeholder="Buscar produtos..."
            className="w-full pl-10 pr-10 py-2 text-sm bg-slate-100/80 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-500 focus:outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition [&::-webkit-search-cancel-button]:appearance-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Limpar busca"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 p-1.5 rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Links de navegação e ações */}
        <nav aria-label="Principal" className="flex items-center gap-3 sm:gap-6">
          <NavLink to="/" end className={navLinkClass}>
            Catálogo
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            Sobre
          </NavLink>

          <div className="h-4 w-px bg-slate-200" />

          {isLogged ? (
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium text-slate-600">
                Olá, {userName}!
              </p>

              <Link
                to="/orders"
                aria-label="Meus pedidos"
                className="relative flex items-center gap-2 p-2 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition"
                title="Meus Pedidos"
              >
                <PackageCheck className="w-5 h-5" />
                <span className="hidden sm:inline text-sm font-medium">
                  Pedidos
                </span>
              </Link>

              <Link
                to="/cart"
                aria-label="Carrinho"
                className="relative flex items-center gap-2 p-2 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition"
                title="Carrinho"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden sm:inline text-sm font-medium">
                  Carrinho
                </span>
              </Link>

              <button
                onClick={handleLogout}
                aria-label="Sair"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 transition"
              >
                <LogIn className="w-4 h-4" />
                Entrar
              </Link>
              <Link
                to="/signin"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm rounded-lg transition"
              >
                <User className="w-4 h-4" />
                Cadastrar
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
