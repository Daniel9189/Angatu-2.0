import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

function Header() {
  const { cart } = useCart();

  const { user, isAuthenticated, logout } = useAuth();

  const totalItems = cart.reduce((total, item) => total + item.quantidade, 0);

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight hover:text-blue-100 transition-colors focus:outline-none"
        >
          Angatu
        </Link>

        <div className="flex items-center gap-6 md:gap-6">
          <Link
            to="/cadastrar-produto"
            className="text-sm md:text-base font-semibold bg-white/10 hover:bg-white/20 border border-white/30 px-4 py-2 rounded-lg transition-all"
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
            <div className="flex items-center gap-4">
              <span className="text-white font-medium hidden sm:block">
                Olá, {user.name}
              </span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-sm cursor-pointer"
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
      </div>
    </header>
  );
}

export default Header;
