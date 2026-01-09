import { useState, useRef } from "react";
import { Trash } from "lucide-react";
import imgHero from "../images/heroimg.png";
import imgHero_2 from "../images/audifonos-2.png";
import imgHero_3 from "../images/audifonos-3.webp";
import { useCart } from "../context/cartContext";

export default function Hero({}) {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();

  const PRODUCT_ID = "cf58ece2-13e1-46c8-b1d0-5c635ba43bef"; //TODO: en produccion debe ir incluido con fotos y descripcion del name
  const item = cart.find((i) => i.product.id === PRODUCT_ID);
  const cantidad = item ? item.quantity : 0;

  const images = [imgHero, imgHero_2, imgHero_3];
  const [activeImage, setActiveImage] = useState(imgHero);

  const imageRef = useRef(null);

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
      <article className="purchase-section">
        <div className="info-purchase">
          <h1 className="title-purchase">HUAWEI FreeClip</h1>
          <p className="desc-purchase">Auriculares inalámbricos open-ear</p>
          <p className="precio-purchase">$546.000</p>
        </div>
        <div className="carrito-section">
          <span>En stock. Listo para envío.</span>
          <div className="carrito-controls">
            {cantidad === 0 && (
              <button
                className="añadir-carrito"
                onClick={() => addToCart(PRODUCT_ID, 1)}
              >
                Añadir al carrito
              </button>
            )}

            {cantidad === 1 && (
              <div className="cantidad-control">
                <button onClick={() => removeFromCart(PRODUCT_ID)}>
                  <Trash width={15} height={15} />
                </button>

                <span>{cantidad}</span>

                <button
                  onClick={() => updateQuantity(PRODUCT_ID, cantidad + 1)}
                >
                  +
                </button>
              </div>
            )}

            {cantidad > 1 && (
              <div className="cantidad-control">
                <button
                  onClick={() => updateQuantity(PRODUCT_ID, cantidad - 1)}
                >
                  -
                </button>

                <span>{cantidad}</span>

                <button
                  onClick={() => updateQuantity(PRODUCT_ID, cantidad + 1)}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
        <p className="desc-product">
          Diseñados para una experiencia auditiva avanzada. HUAWEI FreeClip
          ofrecen un diseño abierto innovador, sonido de alta fidelidad,
          llamadas nítidas y comodidad ultraligera para todo el día.
        </p>
      </article>
    </section>
  );
}
