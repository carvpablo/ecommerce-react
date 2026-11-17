import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import axios from "axios";
import { API_URL } from "../config/api";

export type ProductType =
  | "PERIFÉRICO"
  | "MONITOR"
  | "MOUSEPAD"
  | "CADEIRA"
  | "ACESSÓRIO";

export type CategoryFilter = ProductType | "ALL";

export const PRODUCT_CATEGORIES: { value: CategoryFilter; label: string }[] = [
  { value: "ALL", label: "Todos" },
  { value: "PERIFÉRICO", label: "Periféricos" },
  { value: "MONITOR", label: "Monitores" },
  { value: "MOUSEPAD", label: "Mousepads" },
  { value: "CADEIRA", label: "Cadeiras" },
  { value: "ACESSÓRIO", label: "Acessórios" },
];

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  type?: ProductType | null;
  stock: number;
}

interface ProductsContextType {
  products: Product[];
  filteredProducts: Product[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: CategoryFilter;
  setSelectedCategory: (category: CategoryFilter) => void;
  clearFilters: () => void;
  loading: boolean;
  slowLoad: boolean;
  error: string | null;
  refreshProducts: () => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | null>(null);

// Tempo máximo de espera (cold start do servidor gratuito pode passar de 30 s)
const REQUEST_TIMEOUT_MS = 60_000;
// Depois desse tempo carregando, avisamos que o servidor pode estar iniciando
const SLOW_LOAD_AFTER_MS = 4_000;

function getProductsErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    if (err.code === "ECONNABORTED") {
      return "O servidor demorou demais para responder. Tente novamente em instantes.";
    }
    if (!err.response) {
      return "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.";
    }
    if (err.response.status >= 500) {
      return "O servidor teve um problema ao carregar os produtos. Tente novamente em instantes.";
    }
  }
  return "Não foi possível carregar os produtos. Tente novamente.";
}

export default function ProductsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("ALL");
  const [loading, setLoading] = useState(true);
  const [slowLoad, setSlowLoad] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchProducts() {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/products`, {
        timeout: REQUEST_TIMEOUT_MS,
      });
      setProducts(response.data.products || []);
    } catch (err) {
      setError(getProductsErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!loading) {
      setSlowLoad(false);
      return;
    }
    const timer = setTimeout(() => setSlowLoad(true), SLOW_LOAD_AFTER_MS);
    return () => clearTimeout(timer);
  }, [loading]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "ALL" || product.type === selectedCategory;

      const matchesQuery =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [products, searchQuery, selectedCategory]);

  function clearFilters() {
    setSearchQuery("");
    setSelectedCategory("ALL");
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        filteredProducts,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        clearFilters,
        loading,
        slowLoad,
        error,
        refreshProducts: fetchProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
}
