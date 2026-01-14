import carroVacio from "../images/carro-vacio.png";

export default function EmptyCart() {
  return (
    <article className="cart-empty">
      <div className="cart-empt-img-text-wrapper">
        <img src={carroVacio} alt="Carro vacío" />
        <div className="cart-empty-text">
          <h2>Tu carrito está vacío</h2>
          <p>Añade productos para verlos aquí.</p>
        </div>
      </div>
      <p className="cta-añadir">Ver productos</p>
    </article>
  );
}
