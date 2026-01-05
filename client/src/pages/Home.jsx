import { useState} from "react";
import "../styles/home.css";
import Header from "../components/header";
import Hero from "../components/hero";

import imgHero from "../images/heroimg.png";

export default function Home({ onLogout }) {
  const [loading, setLoading] = useState(false);
  const [cantidad, setCantidad] = useState(0);

  const handleClick = async () => {
    setLoading(true);
    await onLogout();
  };

  return (
    <div className="home-page">
      <Header cantidad={cantidad} />
      <main className="home-page-content">
        <Hero cantidad={cantidad} setCantidad={setCantidad}/>
      </main>
      <footer>
        <h1>HUAWEI FreeClip</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa autem
          ipsa earum iste adipisci dolores magnam consequuntur! Accusamus
          repellendus, cupiditate, voluptatibus provident, unde nisi nesciunt
          vel officiis quas quos laudantium!
        </p>
        <img src={imgHero} alt="" />
        <button className="logout-btn" onClick={handleClick} disabled={loading}>
          {loading ? "Cerrando..." : "Cerrar sesión"}
        </button>
      </footer>
    </div>
  );
}
