import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import {
  ShoppingBag,
  ShoppingCart,
  LogOut,
  User,
  LogIn,
  PackageCheck,
} from "lucide-react";

export default function NavBar() {
  const { isLogged, userName, handleLogout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition"
        >
          <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-sm">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            E-Shop<span className="text-indigo-600">.</span>
          </span>
        </Link>

        {/* Links de navegação e ações */}
        <nav className="flex items-center gap-3 sm:gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition"
          >
            Catálogo
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition"
          >
            Sobre
          </Link>

          <div className="h-4 w-px bg-slate-200" />

          {isLogged ? (
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium text-slate-600">
                Hello {userName}!
              </p>

              <Link
                to="/orders"
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
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
