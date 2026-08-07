import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Header from "./components/Header";
import Cart from "./pages/Cart";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produto/:slug" element={<ProductDetails />} />
        <Route path="/carrinho" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
