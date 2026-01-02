import { useState } from "react";

export default function Home({ onLogout }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await onLogout();
  };
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Audífonos Store</h1>
        <button className="logout-btn" onClick={handleClick} disabled={loading}>
          {loading ? "Cerrando..." : "Cerrar sesión"}
        </button>
      </header>
      <main className="home-content">
        <div className="home-card">
          <h2 className="home-title">Bienvenido a la tienda</h2>
          <p className="home-sub">
            Aquí irán los productos. Integra las peticiones al backend donde
            necesites.
          </p>
          {/* ...espacio para listado de productos y llamadas a API... */}
        </div>
      </main>
    </div>
  );
}
