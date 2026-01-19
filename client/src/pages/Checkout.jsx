import { useState } from "react";
import "../styles/home.css";
import Header from "../components/header";
import ResumenCompra from "../components/resumenCompra";
import { useCart } from "../context/cartContext";

export default function Checkout({ onLogout }) {
  const [loading, setLoading] = useState(false);

  const { cart } = useCart();

  const handleClick = async () => {
    setLoading(true);
    await onLogout();
  };

  return (
    <div className="home-page">
      <Header />
      <main className="cart-page-wrapper">
        <div className="cart-page-content">
          <section className="carrito-section-cart">
            <div>this is section about checkout main</div>
          </section>
          <ResumenCompra btnRuta={""} btnText={"Pagar con Wompi"}/>
        </div>
      </main>
      <footer>
        <button className="logout-btn" onClick={handleClick} disabled={loading}>
          {loading ? "Cerrando..." : "Cerrar sesión"}
        </button>
      </footer>
    </div>
  );
}
