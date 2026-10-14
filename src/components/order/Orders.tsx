import { Link } from "react-router";
import { useOrder } from "../../context/OrderContext";
export default function Orders() {
  const { orders } = useOrder();
  if (!orders || orders.length === 0) {
    return <p className="text-slate-500">Nenhum pedido encontrado.</p>;
  }
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Meus Pedidos</h1>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li
            key={order.id}
            className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-800">
                Pedido #{order.orderNumber}
              </span>
              <span className="text-xs text-slate-400">
                {new Date(order.createdAt).toLocaleDateString("pt-BR")}
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-900">
              Total: R${" "}
              {(order.total / 100).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </p>
            <Link to={`/orders/${order.id}`}>Ver detalhes</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
