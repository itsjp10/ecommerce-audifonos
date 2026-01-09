import { useState } from "react";
import "../styles/home.css";
import Header from "../components/header";

export default function Cart({ onLogout }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await onLogout();
  };

  return (
    <div className="home-page">
      <Header/>
      <main className="home-page-content">
        <h1>Here will be all the products in the cart</h1>
      </main>
      <footer>
        <button className="logout-btn" onClick={handleClick} disabled={loading}>
          {loading ? "Cerrando..." : "Cerrar sesión"}
        </button>
      </footer>
    </div>
  );
}
