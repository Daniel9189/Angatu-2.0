import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

function Header() {
  const { cart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const location = useLocation();

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchTerm.trim() !== "") {
      navigate(`/?q=${searchTerm}`);
    } else {
      navigate("/");
    }
  };

  const isLoginRoute = location.pathname === "/login";

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight hover:text-blue-100 transition-colors focus:outline-none"
        >
          Angatu
        </Link>

        {!isLoginRoute && (
          <>
            <form
              onSubmit={handleSearch}
              className="flex flex-1 max-w-2xl mx-4 sm:mx-8 shadow-sm"
            >
              <input
                type="text"
                placeholder="Busque por produtos, marcas ou modelos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 text-gray-800 bg-white border-none rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                type="submit"
                className="px-6 py-2 font-bold text-blue-900 bg-yellow-400 rounded-r-md hover:bg-yellow-500 transition-colors cursor-pointer"
              >
                Buscar
              </button>
            </form>

            <div className="flex items-center gap-6 md:gap-6">
              <Link
                to="/cadastrar-produto"
                className="text-white hover:text-blue-200 font-semibold transition-colors"
              >
                + Vender Produto
              </Link>
              <Link
                to="/pedidos"
                className="text-white hover:text-blue-200 font-semibold transition-colors"
              >
                Meus Pedidos
              </Link>
              <Link to="/carrinho">
                <div className="flex items-center gap-2 bg-blue-800 px-4 py-2 rounded-lg">
                  <span className="font-semibold hidden sm:block">Carrinho</span>
                  <span className="bg-white text-blue-800 rounded-full h-6 w-6 flex items-center justify-center font-bold text-sm">
                    {totalItems}
                  </span>
                </div>
              </Link>
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium hidden sm:block">
                    Olá, {user.name}
                  </span>
                  <button
                    onClick={logout}
                    className=" text-red-500 hover:text-red-600 px-4 py-2 font-semibold transition-colors cursor-pointer"
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-lg font-bold transition-colors shadow-sm"
                >
                  Entrar / Cadastrar
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
