import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuth();

  const valorTotal = cart.reduce((total, item) => {
    return total + item.price * item.quantidade;
  }, 0);

  const handleCheckout = async () => {
    setLoading(true);

    const payload = {
      items: cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantidade,
      })),
    };

    try {
      const response = await fetch("http://localhost:8000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Pedido realizado com sucesso! O estoque foi atualizado.");
        clearCart();
        navigate("/");
      } else {
        const errorData = await response.json();

        alert(`Não foi possível finalizar: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Erro de conexão: ", error);
      alert("Erro ao conectar com o servidor para finalizar a compra.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center mt-12">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Seu carrinho está vazio
        </h2>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
        >
          Voltar às compras
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Meu Carrinho</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b border-gray-200 py-4 last:border-0"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-gray-500">Quantidade: {item.quantidade}</p>
            </div>

            <div className="flex items-center gap-6">
              <span className="font-bold text-lg text-blue-600">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format((item.price * item.quantidade) / 100)}
              </span>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 font-semibold cursor-pointer"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow-inner flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <span className="text-xl font-bold text-gray-700 mr-3">
            Total a pagar:
          </span>
          <span className="text-3xl font-extrabold text-green-600 block md:inline mt-2 md:mt-0">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(valorTotal / 100)}
          </span>
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg transition-colors disabled:bg-gray-400 cursor-pointer shadow-md text-lg"
        >
          {loading ? "Processando Pedido..." : "Finalizar Compra"}
        </button>
      </div>
    </div>
  );
}

export default Cart;
