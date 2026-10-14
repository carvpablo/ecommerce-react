import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    stock: number;
  };
}

export interface Cart {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  products: CartItem[];
}

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  updateQuantity: (cartItemId: string, newQuantity: number) => Promise<void>;
  refreshCart: () => Promise<void>;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export default function CartProvider({ children }: { children: ReactNode }) {
  const { isLogged } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  // 1. Busca carrinho atualizado do usuário
  async function fetchCart() {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/cart", {
        withCredentials: true,
      });
      setCart(response.data.cart);
    } catch (err) {
      console.error("Erro ao carregar carrinho:", err);
      setCart(null);
    } finally {
      setLoading(false);
    }
  }

  // 2. Busca ou limpa carrinho quando o status de login muda
  useEffect(() => {
    if (isLogged) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [isLogged]);

  // 3. Adicionar item ao carrinho
  async function addToCart(productId: string, quantity = 1) {
    if (!cart) throw new Error("Usuário não possui carrinho ativo");

    await axios.post(
      "http://localhost:3000/cart",
      {
        cartId: cart.id,
        productId,
        quantity,
      },
      { withCredentials: true },
    );

    await fetchCart();
  }

  // 4. Remover item do carrinho
  async function removeFromCart(cartItemId: string) {
    await axios.delete(`http://localhost:3000/cart/${cartItemId}`, {
      withCredentials: true,
    });

    await fetchCart();
  }

  // 5. Atualizar quantidade de um item
  async function updateQuantity(cartItemId: string, newQuantity: number) {
    if (newQuantity <= 0) {
      return removeFromCart(cartItemId);
    }

    await axios.patch(
      `http://localhost:3000/cart/${cartItemId}`,
      { quantity: newQuantity },
      { withCredentials: true },
    );

    await fetchCart();
  }

  function clearCart() {
    setCart(null);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        refreshCart: fetchCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook personalizado
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
}
