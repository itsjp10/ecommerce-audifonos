import { useState, useEffect } from "react";
import { User, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header({ cantidad }) {
  const [bannerMessage, setBannerMessage] = useState("COMPRA HOY, RECIBE HOY");
  const messages = [
    "COMPRA HOY, RECIBE HOY",
    "¡DESCUENTO DEL 20%!",
    "ENVÍO GRATIS A TODA COLOMBIA",
    "PAGO CONTRA ENTREGA",
  ];

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setBannerMessage(messages[index]);
    }, 5000);

    return () => clearInterval(interval); // limpieza
  }, []);

  const navigate = useNavigate();

  return (
    <header className="home-header">
      <div className="banner">
        <p>{bannerMessage}</p>
      </div>
      <nav className="nav-links">
        <h1 className="logoAurea" onClick={() => navigate("/")}>
          Aurea<strong>Tech</strong>
        </h1>
        <ul className="nav-icons">
          <li>
            <User width={20} height={20} />
          </li>
          <li className="cart-icon">
            <ShoppingCart width={20} height={20} />
            <span className="cart-badge">{cantidad}</span>
          </li>
        </ul>
      </nav>
    </header>
  );
}
