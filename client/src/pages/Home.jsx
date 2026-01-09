import { useState } from "react";
import "../styles/home.css";
import Header from "../components/header";
import Hero from "../components/hero";
import Info from "../components/Info";
import Modelo from "../components/modelo";
import Duracion from "../components/duracion";

export default function Home({ onLogout }) {
  const [loading, setLoading] = useState(false);
  const [cantidad, setCantidad] = useState(0);

  const handleClick = async () => {
    setLoading(true);
    await onLogout();
  };

  return (
    <div className="home-page">
      <Header/>
      <main className="home-page-content">
        <Hero cantidad={cantidad} setCantidad={setCantidad} />
        <Info />
        <Modelo />
        <Duracion />
      </main>
      <footer>
        <button className="logout-btn" onClick={handleClick} disabled={loading}>
          {loading ? "Cerrando..." : "Cerrar sesión"}
        </button>
      </footer>
    </div>
  );
}
