import { Outlet, useNavigation } from "react-router";
import AuthProvider from "./context/AuthContext";
import CartProvider from "./context/CartContext";
import NavBar from "./components/NavBar";
import OrderProvider from "./context/OrderContext";

function App() {
  const navigation = useNavigation();
  const isNavigating = navigation.state === "loading";

  return (
    <AuthProvider>
      <OrderProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 relative">
            {/* Barra de carregamento superior (tipo YouTube / GitHub) */}
            {isNavigating && (
              <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-indigo-100 overflow-hidden">
                <div className="h-full bg-indigo-600 animate-pulse w-full shadow-xs" />
              </div>
            )}

            <NavBar />
            <main
              className={`flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-opacity duration-200 ${
                isNavigating ? "opacity-60" : "opacity-100"
              }`}
            >
              <Outlet />
            </main>
            <footer className="bg-white border-t border-slate-200 py-6 text-center text-sm text-slate-500">
              <p>
                © {new Date().getFullYear()} E-Shop Store. Todos os direitos
                reservados.
              </p>
            </footer>
          </div>
        </CartProvider>
      </OrderProvider>
    </AuthProvider>
  );
}

export default App;
