import axios from "axios";
import { useLoaderData } from "react-router";
import Products from "../components/Products";
import { Sparkles } from "lucide-react";

export async function Loader() {
  try {
    const response = await axios.get("http://localhost:3000/products");
    return response.data;
  } catch (err) {
    const message =
      (axios.isAxiosError(err) && err.response?.data?.error) ||
      "Erro ao carregar produtos do servidor.";

    throw new Error(message, { cause: err });
  }
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
}

export interface Products {
  products: Product[];
}

export default function Home() {
  const data: Products = useLoaderData();

  return (
    <div className="space-y-8">
      {/* Banner / Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 text-white p-8 sm:p-12 shadow-lg">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-indigo-100 mb-4 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            Novos Produtos Disponíveis
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            As Melhores Ofertas em Um Só Lugar
          </h1>
          <p className="mt-4 text-indigo-100 text-base sm:text-lg max-w-xl leading-relaxed">
            Descubra nossa linha de produtos exclusivos com preços especiais e entrega rápida para todo o Brasil.
          </p>
        </div>
        <div className="absolute -right-12 -bottom-12 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Seção de Produtos */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Catálogo de Produtos
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Confira os itens disponíveis para compra imediata
            </p>
          </div>
          <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            {data?.products?.length || 0} itens
          </span>
        </div>

        <Products products={data.products} />
      </section>
    </div>
  );
}
