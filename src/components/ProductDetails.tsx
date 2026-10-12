import axios from "axios";
import { type LoaderFunctionArgs } from "react-router";
import { useLoaderData, Link } from "react-router";
import { useCart } from "../context/CartContext";
import {
  ArrowLeft,
  ShoppingCart,
  ShieldCheck,
  Truck,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";

export async function Loader({ params }: LoaderFunctionArgs) {
  try {
    const { id } = params;
    const response = await axios.get(`http://localhost:3000/products/${id}`);
    return response.data;
  } catch (err) {
    const message =
      (axios.isAxiosError(err) && err.response?.data?.error) ||
      "Erro ao carregar produtos do servidor.";

    throw new Error(message, { cause: err });
  }
}

interface ProductResponse {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    stock: number;
  };
}

export default function ProductDetails() {
  const data: ProductResponse = useLoaderData();
  const product = data.product;
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Produto não encontrado.</p>
        <Link
          to="/"
          className="text-indigo-600 font-semibold hover:underline mt-2 inline-block"
        >
          Voltar para a loja
        </Link>
      </div>
    );
  }

  async function handleAddToCart() {
    setAdding(true);
    setFeedback(null);
    try {
      await addToCart(product.id, quantity);
      setFeedback("Produto adicionado ao carrinho!");
    } catch {
      setFeedback("Faça login para adicionar ao carrinho.");
    } finally {
      setAdding(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para o catálogo
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Lado Esquerdo: Imagem com Placeholder Elegante */}
        <div className="bg-gradient-to-br from-slate-50 to-indigo-50/50 p-8 flex items-center justify-center min-h-[360px] md:min-h-full">
          <div className="w-48 h-48 sm:w-64 sm:h-64 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center">
            <span className="text-7xl sm:text-8xl font-black text-indigo-300/60 select-none">
              {product.name.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        {/* Lado Direito: Informações e Compra */}
        <div className="p-6 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {product.stock > 0
                ? `${product.stock} disponíveis em estoque`
                : "Esgotado"}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {product.name}
            </h1>

            <p className="mt-4 text-slate-600 leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                R${" "}
                {(product.price / 100).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span className="text-xs text-slate-400">
                à vista no PIX ou cartão
              </span>
            </div>

            {/* Seletor de Quantidade */}
            <div className="mt-6 flex items-center gap-4">
              <label
                htmlFor="qty"
                className="text-sm font-medium text-slate-700"
              >
                Quantidade:
              </label>
              <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 transition font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-sm font-semibold text-slate-800">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 transition font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {feedback && (
              <p className="text-sm text-center font-medium text-emerald-600 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                {feedback}
              </p>
            )}

            <button
              onClick={handleAddToCart}
              disabled={adding || product.stock === 0}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-semibold rounded-2xl shadow-sm shadow-indigo-200 transition duration-150"
            >
              <ShoppingCart className="w-5 h-5" />
              {product.stock === 0 ? "Sem estoque" : "Adicionar ao Carrinho"}
            </button>

            {/* Benefícios */}
            <div className="grid grid-cols-3 gap-2 pt-6 border-t border-slate-100 text-center">
              <div className="flex flex-col items-center gap-1 text-slate-600">
                <Truck className="w-5 h-5 text-indigo-600" />
                <span className="text-[11px] font-medium leading-tight">
                  Frete Rápido
                </span>
              </div>
              <div className="flex flex-col items-center gap-1 text-slate-600">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                <span className="text-[11px] font-medium leading-tight">
                  Compra Segura
                </span>
              </div>
              <div className="flex flex-col items-center gap-1 text-slate-600">
                <RefreshCw className="w-5 h-5 text-indigo-600" />
                <span className="text-[11px] font-medium leading-tight">
                  7 dias p/ devolução
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
