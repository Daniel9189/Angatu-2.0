import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../contexts/CartContext";

function ProductDetails() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const STORAGE_URL = "http://localhost:8000/storage/";

  useEffect(() => {
    api
      .get(`/products/${slug}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar produto:", error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto p-8 text-center text-gray-600 mt-20">
        <p className="text-xl animate-pulse">
          Carregando detalhes do produto...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto p-8 text-center mt-20">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Produto não encontrado
        </h1>
        <Link to={"/"} className="text-blue-600 hover:underline">
          Voltar para a vitrine
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Link
        to={"/"}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
      >
        &larr; Voltar para a vitrine
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 bg-gray-100 min-h-100 flex items-center justify-center text-gray-400 text-xl font-medium border-b md:border-b-0 md:border-r border-gray-200">
          <img
            src={
              product.images && product.images.length > 0
                ? `${STORAGE_URL}${product.images[0].image_path}`
                : "https://via.placeholder.com/400x300?text=Sem+Imagem"
            }
            alt={product.name}
          />
        </div>

        <div className="md:w-1/2 p-8 flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>

          <div className="mb-6">
            <span className="text-4xl font-extrabold text-blue-600">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.price / 100)}
            </span>
          </div>

          <div className="bg-green-50 text-green-700 px-4 py-2 rounded-md mb-8 inline-block w-max font-semibold">
            Em estoque: {product.stock} unidades
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Descrição
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-md transition-colors text-lg cursor-pointer"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
