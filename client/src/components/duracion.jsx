import imgHero from "../images/heroimg.png";
import arco from "../images/arco.png";

export default function Duracion() {
  return (
    <section className="duration-section">
      <div className="duration-container">
        <article className="duration-info">
          <h1>Batería de larga duración</h1>
          <p>
            Escucha por hasta 8 horas cuando uses los auriculares con una sola
            carga, o por hasta 36 horas con el estuche completamente cargado.{" "}
            <strong>
              Usar un solo auricular cuando se tiene el estuche con carga
              completa asegura una vida de batería más larga.{" "}
            </strong>
            Una carga de 10 minutos permite escuchar hasta por 3 horas.
          </p>
          <p>
            Escucha hasta <span>8</span> Horas
          </p>
        </article>
        <article className="duration-img">
          <div className="base-badge">
            <img className="duration-img-base" src={arco} alt="" />
            <h1 className="hours-badge"><span>36</span> horas</h1>
          </div>

          <div className="duration-img-decoration">
            <img className="duration-img-content" src={imgHero} alt="" />
          </div>
        </article>
      </div>
    </section>
  );
}
