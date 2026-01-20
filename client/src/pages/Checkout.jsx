import { useState } from "react";
import "../styles/home.css";
import Header from "../components/header";
import ResumenCompra from "../components/resumenCompra";
import { useCart } from "../context/cartContext";

import { CreditCard } from "lucide-react";
import Nequi from "../images/nequi_icon.jpeg";
import Pse from "../images/pse_logo.png";

export default function Checkout({ onLogout }) {
  const [loading, setLoading] = useState(false);
  const [seleccionado, setSeleccionado] = useState("");

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
            <header className="payment-methods">
              <div
                className={seleccionado === "tarjeta" ? "method-selected" : ""}
                onClick={() => setSeleccionado("tarjeta")}
              >
                <CreditCard />
                <p>Tarjeta</p>
              </div>
              <div
                className={seleccionado === "nequi" ? "method-selected" : ""}
                onClick={() => setSeleccionado("nequi")}
              >
                <img src={Nequi} alt="" />
                <p>Nequi</p>
              </div>
              <div
                className={seleccionado === "pse" ? "method-selected" : ""}
                onClick={() => setSeleccionado("pse")}
              >
                <img src={Pse} alt="" />
                <p>PSE</p>
              </div>
            </header>
          </section>
          <ResumenCompra isCheckout={true} />
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
