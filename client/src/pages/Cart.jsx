import { useState } from "react";
import "../styles/home.css";
import Header from "../components/header";
import { EmptyCart, EmptyResumen } from "../components/emptyCart";
import ResumenCompra from "../components/resumenCompra";
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
    0,
  );

  const cantidadItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="home-page">
      <Header />
      <main className="cart-page-wrapper">
        <div className="cart-page-content">
          <section className="carrito-section-cart">
            {cart.length === 0 && <EmptyCart />}
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
          <ResumenCompra isCheckout={false}/>
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
