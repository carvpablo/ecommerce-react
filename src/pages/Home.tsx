import Products from "../components/Products";
import { AlertCircle, RefreshCw, SearchX } from "lucide-react";
import {
  PRODUCT_CATEGORIES,
  useProducts,
} from "../context/ProductsContext";

export default function Home() {
  const {
    products,
    filteredProducts,
    loading,
    slowLoad,
    error,
    searchQuery,
    selectedCategory,
    setSelectedCategory,
    clearFilters,
    refreshProducts,
  } = useProducts();

  const hasActiveFilters =
    selectedCategory !== "ALL" || searchQuery.trim().length > 0;

  // "Todos" + apenas as categorias que têm ao menos um produto
  const visibleCategories = PRODUCT_CATEGORIES.filter(
    (category) =>
      category.value === "ALL" ||
      products.some((product) => product.type === category.value),
  );

  return (
    <div className="space-y-6">
      {/* Introdução compacta */}
      <section className="max-w-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Periféricos e itens para o seu setup
        </h1>
        <p className="mt-2 text-slate-600 leading-relaxed">
          Teclados, mouses, headsets, monitores e acessórios para gamers e home
          office.
        </p>
        <p className="mt-2 text-sm text-slate-600">
          Projeto de portfólio: o pagamento roda em modo teste.
        </p>
      </section>

      {/* Seção de Produtos */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-xl font-semibold text-slate-900 tracking-tight">
            {searchQuery.trim()
              ? `Resultados para "${searchQuery.trim()}"`
              : "Catálogo"}
          </h2>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={clearFilters}
              className={`text-sm font-medium text-slate-600 hover:text-indigo-700 px-3 py-2 rounded-lg hover:bg-slate-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                hasActiveFilters ? "" : "invisible"
              }`}
            >
              Limpar filtros
            </button>
            <span
              role="status"
              className="text-sm font-semibold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full tabular-nums"
            >
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "item" : "itens"}
            </span>
          </div>
        </div>

        {/* Filtro por Categoria: só categorias com produtos; rola na horizontal no mobile */}
        {visibleCategories.length > 2 && (
          <div
            role="group"
            aria-label="Filtrar produtos por categoria"
            className="-mx-4 px-4 py-1 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto sm:overflow-visible sm:flex-wrap"
          >
            {visibleCategories.map((category) => {
              const isSelected = selectedCategory === category.value;

              return (
                <button
                  key={category.value}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`shrink-0 whitespace-nowrap px-3.5 py-2 min-h-10 rounded-xl text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                    isSelected
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "bg-white text-slate-700 border border-slate-200 hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50/40"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        )}

        {loading ? (
          <div className="space-y-4">
            {slowLoad && (
              <p
                role="status"
                className="text-sm text-slate-600 bg-white border border-slate-200 rounded-xl px-4 py-3"
              >
                Carregando os produtos. O servidor gratuito pode levar até 1
                minuto para iniciar na primeira visita.
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-96 bg-white rounded-2xl border border-slate-200/80 animate-pulse motion-reduce:animate-none"
                />
              ))}
            </div>
          </div>
        ) : error ? (
          <div
            role="alert"
            className="text-center py-12 bg-white rounded-2xl border border-red-200"
          >
            <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
            <p className="text-slate-700 font-medium">{error}</p>
            <button
              onClick={refreshProducts}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition"
            >
              <RefreshCw className="w-4 h-4" />
              Tentar novamente
            </button>
          </div>
        ) : filteredProducts.length === 0 && hasActiveFilters ? (
          <div className="text-center py-14 bg-white rounded-2xl border border-dashed border-slate-300">
            <SearchX className="w-11 h-11 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-800">
              Nenhum produto encontrado com esses filtros
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Tente buscar por outro termo ou selecionar outra categoria.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <Products products={filteredProducts} />
        )}
      </section>
    </div>
  );
}
