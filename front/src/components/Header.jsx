import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

function Header() {
  const { cart } = useCart();

  const totalItems = cart.reduce((total, item) => total + item.quantidade, 0);

  return (
    <header className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Angatu
        </Link>

        <Link to="/carrinho">
          <div className="flex items-center gap-2 bg-blue-800 px-4 py-2 rounded-lg">
            <span className="font-semibold">Carrinho</span>
            <span className="bg-white text-blue-800 rounded-full h-6 w-6 flex items-center justify-center font-bold text-sm">
              {totalItems}
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
