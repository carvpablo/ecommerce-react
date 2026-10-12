import axios from "axios";
import { useLoaderData, type LoaderFunctionArgs, Link } from "react-router";
import { type OrderType } from "../../context/OrderContext";
import {
  ArrowLeft,
  PackageCheck,
  Calendar,
  CreditCard,
  Truck,
  CheckCircle2,
} from "lucide-react";

export async function Loader({ params }: LoaderFunctionArgs) {
  try {
    const { id } = params;
    const response = await axios.get(`http://localhost:3000/orders/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    const message =
      (axios.isAxiosError(err) && err.response?.data?.error) ||
      "Erro ao carregar detalhes do pedido.";

    throw new Error(message, { cause: err });
  }
}

export default function OrderDetails() {
  const data = useLoaderData();
  const order: OrderType = data.order;

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <p className="text-slate-500">Pedido não encontrado.</p>
        <Link
          to="/orders"
          className="text-indigo-600 font-semibold hover:underline mt-2 inline-block"
        >
          Voltar para meus pedidos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Botão Voltar */}
      <Link
        to="/orders"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para todos os pedidos
      </Link>

      {/* Cabeçalho do Pedido */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full mb-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Pedido Concluído
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Pedido #{order.orderNumber}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 pt-1">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              {new Date(order.createdAt).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <span>•</span>
            <span className="text-slate-400">ID: {order.id}</span>
          </div>
        </div>

        <div className="text-left sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
          <span className="text-xs text-slate-400 block font-medium">Valor Total</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            R${" "}
            {(order.total / 100).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de Itens Comprados */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-indigo-600" />
            Itens do Pedido ({order.items?.length || 0})
          </h2>

          <div className="space-y-3">
            {order.items?.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <Link
                    to={`/products/${item.productId}`}
                    className="font-semibold text-slate-900 hover:text-indigo-600 transition text-base block"
                  >
                    {item.product?.name || "Produto"}
                  </Link>
                  {item.product?.description && (
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      {item.product.description}
                    </p>
                  )}
                  <div className="mt-2 flex items-center gap-3 text-xs sm:text-sm text-slate-500">
                    <span>
                      Qtd: <strong className="text-slate-800">{item.quantity}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      R$ {(item.price / 100).toFixed(2)} cada
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base font-bold text-slate-900 block">
                    R${" "}
                    {((item.price * item.quantity) / 100).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumo e Informações de Entrega */}
        <div className="space-y-5">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
              Informações do Pedido
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-slate-600">
                <CreditCard className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Pagamento Aprovado</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Frete Grátis</span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span>
                  R${" "}
                  {(order.total / 100).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Frete</span>
                <span className="text-emerald-600 font-medium">Grátis</span>
              </div>
              <div className="flex justify-between font-bold text-base text-slate-900 pt-2 border-t border-slate-100">
                <span>Total Pago</span>
                <span>
                  R${" "}
                  {(order.total / 100).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
