import { useState } from "react";
import "../styles/metodos.css";
import visa_card from "../images/tarjetas/visa.webp";
import mastercard_card from "../images/tarjetas/mastercard.png";
import amex_card from "../images/tarjetas/amex.png";
import { LockKeyhole } from "lucide-react";
import { tokenizar } from "../services/tokenizar";

export function Tarjeta() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [brand, setBrand] = useState(null);

  const [cardName, setCardName] = useState("");
  const [docType, setDocType] = useState("cc");
  const [docNumber, setDocNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+57");
  const [phone, setPhone] = useState("");
  const [installments, setInstallments] = useState("1");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [tokenizada, setTokenizada] = useState("")

  const detectBrand = (number) => {
    if (/^4/.test(number)) return "visa";
    if (/^5[1-5]/.test(number)) return "mastercard";
    if (/^3[47]/.test(number)) return "amex";
    return "unknown";
  };

  const parseExpDate = (value) => {
    if (!value || !value.includes("/")) {
      return { exp_month: null, exp_year: null };
    }

    const [month, year] = value.split("/");

    // Normalizamos
    const exp_month = month.padStart(2, "0");
    const exp_year = year.length === 2 ? year : year.slice(-2);

    return { exp_month, exp_year };
  };

  const handleTokenizar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { exp_month, exp_year } = parseExpDate(expiry);
    if (!exp_month || !exp_year) {
      setError("Fecha de expiración inválida");
      setLoading(false);
      return;
    }

    try {
      const res = await tokenizar({
        number: cardNumber.replace(/\s+/g, ""),
        cvc,
        exp_month,
        exp_year,
        card_holder: cardName,
      });

      if (res.status === "CREATED") {
        setSuccess(true);
        setTokenizada(res.data.id)
      } else {
        setError(res.message || "No se pudo tokenizar la tarjeta");
      }
    } catch (err) {
      setError(err.message || "Error en el registro");
    } finally {
      setLoading(false);
    }
  };

  const franquicia = {
    visa: visa_card,
    mastercard: mastercard_card,
    amex: amex_card,
  };

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, "");
    const detectedBrand = detectBrand(digits);
    setBrand(detectedBrand);

    // AmEx: 4-6-5
    if (detectedBrand === "amex") {
      return digits
        .slice(0, 15)
        .replace(/^(\d{4})(\d{0,6})(\d{0,5})/, (_, a, b, c) =>
          [a, b, c].filter(Boolean).join(" "),
        );
    }

    // Visa / Mastercard: 4-4-4-4
    return digits.slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);

    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiry(e.target.value);
    setExpiry(formatted);
  };

  const handleCvcChange = (e) => {
    const maxLength = brand === "amex" ? 4 : 3;
    const digits = e.target.value.replace(/\D/g, "").slice(0, maxLength);
    setCvc(digits);
  };

  return (
    <form className="card-form">
      {/* Número de tarjeta */}
      <div className="field">
        <label>Número de tarjeta</label>
        <div className="num-tarjeta">
          <input
            className="input-num-tarjeta"
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={handleCardNumberChange}
            inputMode="numeric"
          />
          <div
            className={
              brand && brand !== "unknown"
                ? "franquicia-wrapper"
                : "franquicia-wrapper-fijo"
            }
          >
            <img
              className={brand && brand !== "unknown" ? "franquicia-img" : ""}
              src={franquicia[brand]}
              alt=""
            />
          </div>
        </div>
      </div>

      {/* Expiración y CVC */}
      <div className="row-exp-cvc">
        <div className="field">
          <label>Expiración</label>
          <input
            className="input-data-cardForm"
            type="text"
            placeholder="MM/YY"
            value={expiry}
            onChange={handleExpiryChange}
            inputMode="numeric"
            maxLength={5}
          />
        </div>

        <div className="field">
          <label>CVC</label>
          <input
            className="input-data-cardForm"
            type="text"
            placeholder={brand === "amex" ? "4 dígitos" : "3 dígitos"}
            value={cvc}
            onChange={handleCvcChange}
            inputMode="numeric"
          />
        </div>
      </div>

      {/* Nombre en la tarjeta */}
      <div className="field">
        <label>Nombre en la tarjeta</label>
        <input
          className="input-data-cardForm"
          type="text"
          placeholder="Como aparece en la tarjeta"
          value={cardName}
          onChange={(e) => setCardName(e.target.value.toUpperCase())}
        />
      </div>

      {/* Documento */}
      <div className="row-type-doc">
        <div className="field-type">
          <label>Tipo de documento</label>
          <select value={docType} onChange={(e) => setDocType(e.target.value)}>
            <option value="cc">CC</option>
            <option value="ce">CE</option>
            <option value="nit">NIT</option>
            <option value="pp">Pasaporte</option>
          </select>
        </div>

        <div className="field">
          <label>Número de documento</label>
          <input
            className="input-data-cardForm"
            type="text"
            placeholder="Número identificación"
            value={docNumber}
            onChange={(e) => setDocNumber(e.target.value.replace(/\D/g, ""))}
          />
        </div>
      </div>

      {/* Celular */}
      <div className="row-cod-cel">
        <div className="field-code">
          <label>Código</label>
          <select
            className="country-code"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          >
            <option value="+57">🇨🇴 +57</option>
            <option value="+52">🇲🇽 +52</option>
            <option value="+54">🇦🇷 +54</option>
            <option value="+51">🇵🇪 +51</option>
            <option value="+1">🇺🇸 +1</option>
          </select>
        </div>

        <div className="field">
          <label>Celular</label>
          <input
            className="input-data-cardForm"
            type="text"
            placeholder="Número de celular"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
          />
        </div>
      </div>

      {/* Cuotas */}
      <div className="field-cuotas">
        <label>Cuotas</label>
        <select
          value={installments}
          onChange={(e) => setInstallments(e.target.value)}
        >
          <option value="1">1 cuota</option>
          <option value="2">2 cuotas</option>
          <option value="3">3 cuotas</option>
          <option value="6">6 cuotas</option>
          <option value="12">12 cuotas</option>
        </select>
      </div>

      <button type="button" className="pay-button" onClick={handleTokenizar}>
        Pagar ahora
        <span>
          <LockKeyhole width={16} />
        </span>
      </button>
      <span>{tokenizada}</span>
    </form>
    
  );
}

export function Nequi() {
  return <form action="">this is Nequi</form>;
}

export function Pse() {
  return <form action="">this is Pse</form>;
}
