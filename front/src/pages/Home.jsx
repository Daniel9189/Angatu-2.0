import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchParams] = useSearchParams();
  const STORAGE_URL = "http://localhost:8000/storage/";

  const query = searchParams.get("q");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = query
          ? `http://localhost:8000/api/products/search?q=${query}`
          : `http://localhost:8000/api/products`;

        const response = await fetch(url, {
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) throw new Error("Falha ao carregar");

        const data = await response.json();
        const productList = Array.isArray(data) ? data : data.data || [];
        setProducts(productList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [query]);

  useEffect(() => {
    api
      .get(`/products?page=${currentPage}`)
      .then((response) => {
        setProducts(response.data.data);
        setCurrentPage(response.data.current_page);
        setLastPage(response.data.last_page);
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }, [currentPage]);

  const irParaProximaPagina = () => {
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const irParaPaginaAnterior = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Produtos</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            to={`/produto/${product.slug}`}
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-5 flex flex-col"
          >
            <img
              src={
                product.images && product.images.length > 0
                  ? `${STORAGE_URL}${product.images[0].image_path}`
                  : "https://placehold.co/400x300/ffd36c/3d8bff?text=Sem+Imagem"
              }
              alt={product.name}
            />

            <h2 className="text-lg font-semibold text-gray-900 mb-2 truncate">
              {product.name}
            </h2>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2 grow">
              {product.description}
            </p>
            <div className="mt-auto">
              <span className="text-xl font-bold text-blue-600">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.price / 100)}
              </span>
              <p className="text-xs text-gray-400 mt-1">
                Estoque: {product.stock}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center items-center mt-12 gap-4">
        <button
          onClick={irParaPaginaAnterior}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Anterior
        </button>

        <span className="text-gray-600 font-medium">
          Página {currentPage} de {lastPage}
        </span>

        <button
          onClick={irParaProximaPagina}
          disabled={currentPage === lastPage}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}

export default Home;
