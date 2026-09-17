import Link from "next/link";
import { asset } from "@/lib/asset";
import s from "./Showcase.module.css";

const cards = [
  { title: "Конструктор", href: "/constructor", side: "left" as const },
  { title: "Каталог", href: "/catalog", side: "right" as const },
];

export default function Showcase() {
  return (
    <section className={s.section}>
      <div className="container">
        <div className={s.grid}>
          {cards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className={`${s.card} ${s[c.side]} reveal`}
              aria-label={c.title}
            >
              {/* Орнамент — один круг на две карточки: каждая показывает свою половину */}
              <span
                className={s.ornament}
                style={{ backgroundImage: `url(${asset("/img/ornament.png")})` }}
                aria-hidden="true"
              />
              <span className={s.body}>
                <span className={s.title}>{c.title}</span>
                </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
