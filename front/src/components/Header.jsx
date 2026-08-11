import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

function Header() {
  const { cart } = useCart();

  const totalItems = cart.reduce((total, item) => total + item.quantidade, 0);

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight hover:text-blue-100 transition-colors"
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
          <Link to="/carrinho">
            <div className="flex items-center gap-2 bg-blue-800 px-4 py-2 rounded-lg">
              <span className="font-semibold hidden sm:block">Carrinho</span>
              <span className="bg-white text-blue-800 rounded-full h-6 w-6 flex items-center justify-center font-bold text-sm">
                {totalItems}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
