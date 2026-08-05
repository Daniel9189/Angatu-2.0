import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get("/products")
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos", error);
      });
  }, []);

  return (
    <>
      <div>Marketplace</div>
      {products.map((product) => (
        <div key={product.id ?? product.name}>
          {product.name} - R$ {(product.price / 100).toFixed(2)}
        </div>
      ))}
    </>
  );
}

export default App;
