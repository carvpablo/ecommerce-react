import { type Products as ProductsType } from "../pages/Home";
import { Link } from "react-router";
import { ArrowRight, Box } from "lucide-react";

export default function Products({ products }: ProductsType) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
        <Box className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-slate-800">Nenhum produto encontrado</h3>
        <p className="text-sm text-slate-500 mt-1">Volte mais tarde para novas ofertas!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => {
        return (
          <div
            key={product.id}
            className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all duration-200 overflow-hidden"
          >
            {/* Imagem Placeholder Estilizada */}
            <div className="h-48 bg-gradient-to-tr from-slate-100 to-indigo-50/50 flex items-center justify-center relative overflow-hidden">
              <span className="text-5xl font-black text-indigo-200/60 select-none group-hover:scale-110 transition duration-300">
                {product.name.charAt(0).toUpperCase()}
              </span>
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-xs font-semibold px-2.5 py-1 rounded-full text-slate-600 shadow-xs">
                {product.stock > 0 ? `${product.stock} em estoque` : "Esgotado"}
              </div>
            </div>

            {/* Conteúdo do Card */}
            <div className="flex-1 p-5 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition line-clamp-1 text-base">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Preço</span>
                  <span className="text-lg font-bold text-slate-900">
                    R$ {(product.price / 100).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>

                <Link
                  to={`/products/${product.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl text-xs font-semibold transition"
                >
                  Ver mais
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
