import { useState } from "react";
import imgHero from "../images/heroimg.png";

export default function Info() {
  return (
    <>
      <section className="secondary-section">
        <article className="secondary-article">
          <h1>HUAWEI FreeClip</h1>
          <div className="mini-hr"></div>
          <p className="item-desc">
            C-bridge Design | Tecnología de ajuste abierto | Reconocimiento
            adaptativo de canal izquierdo y derecho
          </p>
          <img src={imgHero} alt="" />
        </article>
      </section>
    </>
  );
}
