import señorAudifonos from "../images/señor-audifonos.webp";

export default function Modelo() {
  return (
    <section
      className="modelo-section"
      style={{ backgroundImage: `url(${señorAudifonos})` }}
    >
      <article className="modelo-container">
        <div className="modelo-box">
          <h1>Ajuste seguro</h1>
          <p className="modelo-desc">
            Con un diseño ergonómico basado en los datos de más de{" "}
            <strong>10 mil orejas humanas</strong> para garantizar su comodidad,
            y una optimización múltiple a nivel micrométrico, los auriculares se
            sentirán como hechos a tu medida.
          </p>
          <p className="datos-modelo">
            Datos de <span>10,000</span> orejas humanas
          </p>
        </div>
      </article>
    </section>
  );
}
