import { type Products } from "../pages/Home";

const CACHE_KEY = "@ecommerce:products_cache";
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos

interface CachedCatalog {
  data: Products;
  expiresAt: number;
}

let memoryCache: CachedCatalog | null = null;

/**
 * Retorna o catálogo em cache (memória ou sessionStorage) se ainda estiver válido.
 */
export function getCachedProducts(): Products | null {
  const now = Date.now();

  if (memoryCache && now < memoryCache.expiresAt) {
    return memoryCache.data;
  }

  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;

    const parsed: CachedCatalog = JSON.parse(raw);
    if (now < parsed.expiresAt) {
      memoryCache = parsed;
      return parsed.data;
    }

    sessionStorage.removeItem(CACHE_KEY);
  } catch {
    // Ignora falhas de leitura do sessionStorage
  }

  return null;
}

/**
 * Salva o catálogo no cache em memória e no sessionStorage com TTL de 5 minutos.
 */
export function setCachedProducts(data: Products): void {
  const entry: CachedCatalog = {
    data,
    expiresAt: Date.now() + CACHE_TTL_MS,
  };
  memoryCache = entry;

  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // Ignora falhas de escrita do sessionStorage
  }
}

/**
 * Limpa o cache do catálogo (útil após finalizar uma compra, se desejar atualizar o estoque).
 */
export function clearProductsCache(): void {
  memoryCache = null;
  try {
    sessionStorage.removeItem(CACHE_KEY);
  } catch {
    // Ignora
  }
}
