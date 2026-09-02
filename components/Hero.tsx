import Link from "next/link";
import { asset } from "@/lib/asset";
import s from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={s.hero} aria-label="SINNERGEMS">
      <picture className={s.picture}>
        <source media="(max-width: 900px)" srcSet={asset("/img/hero-mobile.jpg")} />
        <img
          src={asset("/img/hero-desktop.jpg")}
          alt="Ювелир вручную обрабатывает золотую бусину"
          fetchPriority="high"
        />
      </picture>

      {/* Кружок «о нас» на золотой линии — в макете он только на мобильной версии */}
      <div className={s.aboutBand}>
        <span className={s.line} />
        <Link href="/about" className={s.aboutBtn}>
          о нас
        </Link>
      </div>
    </section>
  );
}
