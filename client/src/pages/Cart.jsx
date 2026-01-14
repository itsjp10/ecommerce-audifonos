import { useState } from "react";
import "../styles/home.css";
import Header from "../components/header";
import { useCart } from "../context/cartContext";
import imgHero from "../images/heroimg.png";
import { Trash2, Minus, Plus } from "lucide-react";

export default function Cart({ onLogout }) {
  const [loading, setLoading] = useState(false);

  const { cart, updateQuantity, removeFromCart } = useCart();

  const handleClick = async () => {
    setLoading(true);
    await onLogout();
  };

  const formatPrice = (value) => {
    return new Intl.NumberFormat("es-CO").format(value);
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  const cantidadItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="home-page">
      <Header />
      <main className="cart-page-content">
        <section className="carrito-section-cart">
          {cart.length > 0 && (
            <header className="cart-title">Carrito de compras</header>
          )}
          {cart.map((item) => (
            <article className="cart-item" key={item.id}>
              <img className="cart-item-img" src={imgHero} alt="" />
              <div className="cart-item-body">
                <div className="cart-item-body-header">
                  <h3 className="item-name">{item.product.name}</h3>
                  <button onClick={() => removeFromCart(item.product.id)}>
                    <Trash2 width={15} height={15} />
                  </button>
                </div>
                <div className="add-to-cart">
                  <div className="input-add">
                    <button
                      disabled={item.quantity === 1}
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                    >
                      <Minus width={15} height={15} />
                    </button>
                    {item.quantity}
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                    >
                      <Plus width={15} height={15} />
                    </button>
                  </div>
                  <span>+10 disponibles</span>
                </div>
              </div>
              <h2 className="cart-item-subtotal">
                <span>$</span>
                {formatPrice(item.quantity * item.product.price)}
              </h2>
            </article>
          ))}
        </section>
        <section className="resumen-compra">
          <header>Resumen de compra</header>
          <div className="resumen-compra-body">
            <div className="productos-precio">
              <p>Productos ({cantidadItems})</p>
              <span>$</span>
              {formatPrice(totalPrice)}
            </div>
            <div className="envios-precio">
              <p>Envios (2)</p>
              <span>gratis</span>
              {/*TODO: definir como serán los envios, si pagos o gratis con base a qué*/}
            </div>
            <div className="total-precio">
              <h3>Total</h3>
              <span>$</span>
              {formatPrice(totalPrice)}
            </div>
          </div>
          <button>Proceder al pago</button>
        </section>
      </main>
      <footer>
        <button className="logout-btn" onClick={handleClick} disabled={loading}>
          {loading ? "Cerrando..." : "Cerrar sesión"}
        </button>
      </footer>
    </div>
  );
}
