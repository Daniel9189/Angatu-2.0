import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/orders", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Falha ao carregar os pedidos.");
        }

        const data = await response.json();
        console.log(data);
        setOrders(data);
      } catch (erro) {
        console.error(erro);
        setError(
          "Não foi possível carregar o seu histórico de pedidos. Tente novamente.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const formatarMoeda = (valor) => {
    const valorReal = Number(valor) / 100;
    return valorReal.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const formatarData = (dataString) => {
    return new Date(dataString).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading)
    return (
      <div className="text-center mt-20 text-xl font-semibold text-gray-600">
        Carregando...
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-20 text-red-500 font-bold">
        Ops, ocorreu um erro: {error}
      </div>
    );

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Meus Pedidos</h2>
      {orders.length === 0 ? (
        <div className="text-center bg-gray-50 p-10 rounded-lg shadow-sm border">
          <p className="text-gray-600 text-lg mb-4">
            Você ainda não tem pedidos
          </p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700"
          >
            Ir para a vitrine
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={orders.id}
              className="bg-white border rounded-lg shadow-sm overflow-hidden"
            >
              <div className="bg-gray-50 p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                <div className="flex flex-col">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
                    Pedido realizado em
                  </p>
                  <p className="text-gray-800 font-medium">
                    {formatarData(order.created_at)}
                  </p>
                </div>

                <div className="flex flex-col sm:text-center">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
                    Total
                  </p>
                  <p className="text-blue-600 font-bold text-lg">
                    {formatarMoeda(order.total_amount)}
                  </p>
                </div>

                <div className="flex flex-col sm:text-right">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
                    Pedido Nº
                  </p>
                  <p className="text-gray-800 font-medium text-base">
                    #{order.id}
                  </p>
                </div>
              </div>

              <div className="p-4">
                <ul className="divide-y divide-gray-100">
                  {order.items.map((item) => (
                    <li
                      key={item.id}
                      className="py-3 flex justify-between items-center"
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-semibold text-gray-800">
                            {item.product
                              ? item.product.name
                              : "Produto Indisponível"}
                          </p>
                          <p className="text-sm text-gray-500">
                            Qtd: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="font-medium text-gray-700">
                        {formatarMoeda(item.price)}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
