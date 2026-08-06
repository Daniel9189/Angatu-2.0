import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  (useEffect(() => {
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
  }),
    [slug]);

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

      <div>
        <div>
            Espaço para Foto do Produto
        </div>

        <div>
            <h1>{product.name}</h1>

            <div>
                <span>
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price / 100)}
                </span>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
