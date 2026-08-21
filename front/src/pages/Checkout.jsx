import { useNavigate } from "react-router-dom";
// import { useCart } from "../contexts/CartContext";
// import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Checkout() {
  const navigate = useNavigate();
  // const { clearCart } = useCart();
  // const { token } = useAuth();

  const [address, setAddress] = useState({
    rua: "",
    numero: "",
    cep: "",
    cidade: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("pix");

  const handleCheckout = async (e) => {
    e.preventDefault();
    toast.success("Disseram que o pedido foi registrado");
    navigate("/pedidos");
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 mt-3">
        Finalizar Compra
      </h2>

      <form
        onSubmit={handleCheckout}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">
            Endereço de Entrega
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">
                CEP
              </label>
              <input
                type="number"
                required
                className="mt-1 w-full border border-gray-400 rounded-md p-2 focus:ring-blue-500 focus:ring-1 focus:border-blue-500 hover:border-gray-700 outline-none sem-setas"
                value={address.cep}
                onChange={(e) =>
                  setAddress({ ...address, cep: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-900">
                  Rua
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 w-full border border-gray-400 rounded-md p-2 focus:ring-blue-500 focus:ring-1 focus:border-blue-500 hover:border-gray-700 outline-none"
                  value={address.rua}
                  onChange={(e) =>
                    setAddress({ ...address, rua: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Número
                </label>
                <input
                  type="number"
                  required
                  className="mt-1 w-full border border-gray-400 rounded-md p-2 focus:ring-blue-500 focus:ring-1 focus:border-blue-500 hover:border-gray-700 outline-none sem-setas"
                  value={address.numero}
                  onChange={(e) =>
                    setAddress({ ...address, numero: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Cidade
              </label>
              <input
                type="text"
                required
                className="mt-1 w-full border border-gray-400 rounded-md p-2 focus:ring-blue-500 focus:ring-1 focus:border-blue-500 hover:border-gray-700 outline-none"
                value={address.cidade}
                onChange={(e) =>
                  setAddress({ ...address, cidade: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300 h-fit">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">
            Formas de Pagamento
          </h3>
          <div className="space-y-3 mb-8">
            <label className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-gray-100">
              <input
                type="radio"
                name="payment"
                value={"pix"}
                checked={paymentMethod === "pix"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-4 w-4"
              />
              <span className="font-medium text-gray-700">
                Pix (Aprovação Imediata)
              </span>
            </label>
            <label className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-gray-100">
              <input
                type="radio"
                name="payment"
                value={"cartao"}
                checked={paymentMethod === "cartao"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-4 w-4"
              />
              <span className="font-medium text-gray-700">
                Cartão de Crédito
              </span>
            </label>
            <label className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-gray-100">
              <input
                type="radio"
                name="payment"
                value={"boleto"}
                checked={paymentMethod === "boleto"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-4 w-4"
              />
              <span className="font-medium text-gray-700">Boleto Bancário</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-blue-900 font-bold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors cursor-pointer"
          >
            Confirmar Pagamento
          </button>
        </div>
      </form>
    </div>
  );
}
