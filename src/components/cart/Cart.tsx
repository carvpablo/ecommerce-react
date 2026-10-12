import { Link, useNavigate } from "react-router";
import {
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useOrder } from "../../context/OrderContext";
import { useState } from "react";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, refreshCart } = useCart();
  const products = cart?.products || [];
  const { addOrder } = useOrder();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleCheckout() {
    try {
      setLoading(true);
      setError(null);
      // 1. Cria o pedido no backend
      await addOrder();
      // 2. Atualiza o carrinho (que agora está vazio no banco)
      await refreshCart();
      // 3. Redireciona o cliente para a página de pedidos!
      navigate("/orders");
    } catch (err: any) {
      const msg = err.response?.data?.error || "Erro ao finalizar compra.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  const total = products.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Meu Carrinho de Compras
        </h1>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Continuar Comprando
        </Link>
      </div>

      {!cart || products.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-10 text-center space-y-4">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-semibold text-slate-800">
            Seu carrinho está vazio
          </h2>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Explore nossos produtos e adicione seus itens favoritos ao carrinho
            para finalizar a compra.
          </p>
          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow-sm transition"
            >
              Explorar Catálogo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Produtos */}
          <div className="lg:col-span-2 space-y-4">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between gap-4 shadow-xs"
              >
                <div className="flex-1">
                  <Link
                    to={`/products/${item.product.id}`}
                    className="font-semibold text-slate-900 hover:text-indigo-600 transition text-base block"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-slate-500 mt-0.5 line-clamp-1">
                    {item.product.description}
                  </p>
                  <div className="mt-3 flex items-center gap-4 text-sm">
                    <span className="font-semibold text-slate-900 text-base">
                      R${" "}
                      {(
                        (item.product.price * item.quantity) /
                        100
                      ).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                    <span className="text-xs text-slate-400">
                      (R$ {(item.product.price / 100).toFixed(2)} cada)
                    </span>
                  </div>
                </div>

                {/* Controles de Quantidade e Remoção */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 text-slate-600 hover:bg-slate-200 transition font-bold"
                      title="Diminuir quantidade"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-sm font-semibold text-slate-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                      className="px-3 py-1 text-slate-600 hover:bg-slate-200 transition font-bold disabled:opacity-40"
                      title="Aumentar quantidade"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                    title="Remover produto do carrinho"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Resumo do Pedido */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs h-fit space-y-5">
            <h2 className="font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
              Resumo do Pedido
            </h2>
            <div className="flex justify-between items-center text-slate-600 text-sm">
              <span>Subtotal ({products.length} itens)</span>
              <span>
                R${" "}
                {(total / 100).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-600 text-sm">
              <span>Frete</span>
              <span className="text-emerald-600 font-semibold">Grátis</span>
            </div>
            <div className="border-t border-slate-100 pt-3 flex justify-between items-center font-bold text-base text-slate-900">
              <span>Total</span>
              <span>
                R${" "}
                {(total / 100).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            {error && (
              <div className="flex items-center gap-2 p-3.5 bg-red-50 text-red-700 text-sm rounded-xl border border-red-200">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading || products.length === 0}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-semibold rounded-xl text-sm transition"
            >
              {loading ? "Processando..." : "Finalizar Compra"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
