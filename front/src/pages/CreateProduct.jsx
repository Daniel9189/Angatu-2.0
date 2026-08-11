import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      user_id: 3,
      name: formData.name,
      description: formData.description,
      price: Math.round(parseFloat(formData.price) * 100),
      stock: parseInt(formData.stock),
      is_active: true,
    };

    try {
      const response = await fetch("http://localhost:8000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Produto cadastrado com sucesso!");
        navigate("/");
      } else {
        const errorData = await response.json();
        console.error("Erro na validação:", errorData);
        alert("Erro ao cadastrar. Verifique o console.");
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      alert("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Cadastrar Novo Produto
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">Nome do Produto</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">
            Descrição (Opcional)
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-700">Preço (R$)</label>
            <input
              type="number"
              name="price"
              step={0.01}
              value={formData.price}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-700">
              Estoque Inicial
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors disabled:bg-gray-400 cursor-pointer"
        >
          {loading ? "Salvando..." : "Salvar Produto"}
        </button>
      </form>
    </div>
  );
}
