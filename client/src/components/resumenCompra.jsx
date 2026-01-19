import { EmptyResumen } from "../components/emptyCart";
import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";

export default function ResumenCompra({ cta = true}) {
  const navigate = useNavigate();
  const { cart } = useCart();

  const formatPrice = (value) => {
    return new Intl.NumberFormat("es-CO").format(value);
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0,
  );

  const cantidadItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section
      className={`resumen-compra ${cart.length === 0 ? "empty-resumen" : ""}`}
    >
      {cart.length > 0 && (
        <>
          <header>Resumen de compra</header>
          <div className="resumen-compra-body">
            <div className="productos-precio">
              <p>Productos ({cantidadItems})</p>
              <p>
                <span>$</span>
                {formatPrice(totalPrice)}
              </p>
            </div>
            <div className="envios-precio">
              <p>Envios (1)</p>
              <span>gratis</span>
              {/*TODO: definir como serán los envios, si pagos o gratis con base a qué*/}
            </div>
            <div className="total-precio">
              <h3>Total</h3>
              <p>
                <span>$</span>
                {formatPrice(totalPrice)}
              </p>
            </div>
          </div>
          {cta === true && (
            <button
              onClick={() => navigate("/checkout")}
              className="checkout-cart-btn"
            >
              Proceder al pago
            </button>
          )}
        </>
      )}
      {cart.length === 0 && <EmptyResumen />}
    </section>
  );
}
