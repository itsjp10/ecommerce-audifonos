import carroVacio from "../images/carro-vacio.png";
import { useNavigate } from "react-router-dom";

export function EmptyCart() {
  const navigate = useNavigate();
  return (
    <article className="cart-empty">
      <div className="cart-empt-img-text-wrapper">
        <img src={carroVacio} alt="Carro vacío" />
        <div className="cart-empty-text">
          <h2>Tu carrito está vacío</h2>
          <p>Añade productos para verlos aquí.</p>
        </div>
      </div>
      <p
        className="cta-añadir"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && navigate("/login")}
        onClick={() => navigate("/home")}
      >
        Ver productos
      </p>
    </article>
  );
}

export function EmptyResumen() {
  return (
    <>
      <header>Resumen de compra</header>
      <div className="resumen-compra-body">
        <p className="empty-resumen-text">Aquí verás los importes de tu compra una vez que agregues productos.</p>        
      </div>
    </>
  );
}
