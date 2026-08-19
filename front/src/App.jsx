import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import CreateProduct from "./pages/CreateProduct";
import Login from "./components/Login";
import Orders from "./pages/Orders";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produto/:slug" element={<ProductDetails />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="/cadastrar-produto" element={<CreateProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pedidos" element={<Orders />} />
      </Routes>
    </>
  );
}

export default App;
