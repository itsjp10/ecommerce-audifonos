import { useState, useEffect, useRef } from "react";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";

import imgHero from "../images/heroimg.png";
import imgHero_2 from "../images/audifonos-2.png";
import imgHero_3 from "../images/audifonos-3.webp";

export default function Home({ onLogout }) {
  const [loading, setLoading] = useState(false);
  const [cantidad, setCantidad] = useState(0);

  const images = [imgHero, imgHero_2, imgHero_3];
  const [activeImage, setActiveImage] = useState(imgHero);

  const imageRef = useRef(null);

  const handleClick = async () => {
    setLoading(true);
    await onLogout();
  };

  const handleZoom = (e) => {
    const img = imageRef.current;
    const { left, top, width, height } = img.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    img.style.transformOrigin = `${x}% ${y}%`;
    img.style.transform = "scale(2.2)";
  };

  const resetZoom = () => {
    const img = imageRef.current;
    img.style.transformOrigin = "center";
    img.style.transform = "scale(1)";
  };

  return (
    <div className="home-page">
      <Header cantidad={cantidad} />
      <main className="home-page-content">
        <section className="info-purchase-section">
          <article className="info-section">
            <div className="product-gallery">
              <div
                className="main-image zoom-container"
                onMouseMove={handleZoom}
                onMouseLeave={resetZoom}
              >
                <img
                  ref={imageRef}
                  src={activeImage}
                  alt="G502 HERO"
                  className="zoom-image"
                />
              </div>

              <div className="thumbs">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    onClick={() => setActiveImage(img)}
                    className={activeImage === img ? "active" : ""}
                    alt=""
                  />
                ))}
              </div>
            </div>
          </article>
          <article className="purchase-section"></article>
        </section>
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
