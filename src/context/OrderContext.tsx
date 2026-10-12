import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    stock: number;
  };
}

export interface OrderType {
  id: string;
  orderNumber: number;
  total: number;
  userId: string;
  createdAt: string;
  items: OrderItem[];
}

export interface OrderContextType {
  orders: OrderType[] | null;
  addOrder: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | null>(null);

export default function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<OrderType[] | null>(null);
  const { isLogged } = useAuth();

  async function fetchOrders() {
    try {
      const response = await axios.get("http://localhost:3000/orders", {
        withCredentials: true,
      });
      setOrders(response.data.orders);
    } catch (err) {
      console.error("Error fetching orders", err);
      setOrders(null);
    }
  }

  async function createOrder() {
    try {
      await axios.post(
        "http://localhost:3000/orders",
        {},
        {
          withCredentials: true,
        },
      );
      await fetchOrders();
    } catch (err) {
      console.error("Failed to create order", err);
      throw err;
    }
  }

  useEffect(() => {
    if (isLogged) {
      fetchOrders();
    } else {
      setOrders(null);
    }
  }, [isLogged]);

  return (
    <OrderContext.Provider value={{ orders, addOrder: createOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("Hook must be used inside a component");
  }
  return context;
}
