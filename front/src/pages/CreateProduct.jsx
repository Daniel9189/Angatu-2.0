import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

export default function CreateProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });
  const { token } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 0) {
      const newImages = selectedFiles.map((file) => ({
        file: file,
        url: URL.createObjectURL(file),
      }));

      setImages((prevImages) => [...prevImages, ...newImages]);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove),
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Math.round(parseFloat(data.price) * 100));
    formData.append("stock", parseInt(data.stock));
    formData.append("is_active", true);

    if (images) {
      formData.append("image", images);
    }

    try {
      const response = await fetch("http://localhost:8000/api/products", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success("Produto cadastrado com sucesso!");
        navigate("/");
      } else {
        const errorData = await response.json();
        console.error("Erro na validação:", errorData);
        toast.error("Erro ao cadastrar. Verifique o console.");
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      toast.error("Erro ao conectar com o servidor.");
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
            value={data.name}
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
            value={data.description}
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
              value={data.price}
              onChange={handleInputChange}
              required
              min={0}
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
              value={data.stock}
              onChange={handleInputChange}
              required
              min={0}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mb-6 mt-4">
          <label className="font-semibold text-gray-700">
            Imagens do Produto
          </label>

          <input
            type="file"
            id="image-upload"
            multiple
            accept="image/png, image/jpg, image/webp"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="hidden"
          />

          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-400 rounded-md p-6 hover:border-gray-700 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors mt-1"
          >
            <span className="text-sm font-semibold text-blue-700 bg-blue-100 px-4 py-2 rounded-md mb-2">
              {images.length === 0
                ? "Selecionar Imagens"
                : "Adicionar mais imagens"}
            </span>
            <p className="text-xs text-gray-500">
              Formatos suportados: PNG, JPG ou WEBPP
            </p>
          </label>

          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="relative border border-gray-300 rounded-md p-2 bg-gray-50 flex flex-col items-center shadow-sm"
                >
                  <img
                    src={img.url}
                    alt={`Preview ${index}`}
                    className="h-24 w-full object-cover rounded-md mb-2 border border-gray-200"
                  />

                  <div
                    className="text-xs text-gray-700 w-full truncate text-center mb-2"
                    title={img.file.name}
                  >
                    <p>{img.file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(img.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="text-red-600 hover:text-red-800 text-sm font-bold px-3 py-2 bg-red-50 hover:bg-red-100 rounded-md transition-colors cursor-pointer"
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          )}
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
