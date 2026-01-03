import { useState, useEffect } from "react";
import "../styles/home.css";

export default function Home({ onLogout }) {
  const [loading, setLoading] = useState(false);
  const [bannerMessage, setBannerMessage] = useState("COMPRA HOY, RECIBE HOY");
  const messages = [
    "COMPRA HOY, RECIBE HOY",
    "¡DESCUENTO DEL 20%!",
    "ENVÍO GRATIS A TODA COLOMBIA",
    "PAGO CONTRA ENTREGA",
  ];

  const handleClick = async () => {
    setLoading(true);
    await onLogout();
  };

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setBannerMessage(messages[index]);
    }, 5000);

    return () => clearInterval(interval); // limpieza
  }, []);

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="banner">
          <p>{bannerMessage}</p>
        </div>
        <button className="logout-btn" onClick={handleClick} disabled={loading}>
          {loading ? "Cerrando..." : "Cerrar sesión"}
        </button>
      </header>
      <main className="home-content"></main>
    </div>
  );
}
