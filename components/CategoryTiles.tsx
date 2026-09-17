import Link from "next/link";
import { asset } from "@/lib/asset";
import { categories } from "@/lib/catalog";
import s from "./CategoryTiles.module.css";

/**
 * Промежуточный экран каталога: четыре плитки разделов.
 * В покое плитка — только рамка и название; при наведении проявляется
 * фотография раздела, рамка золотится и выезжает «перейти».
 */
export default function CategoryTiles() {
  return (
    <div className={s.grid}>
      {categories.map((c) => (
        <Link key={c.slug} href={`/catalog/${c.slug}`} className={`${s.tile} reveal`}>
          {c.image && (
            <span
              className={s.photo}
              style={{ backgroundImage: `url(${asset(c.image)})` }}
              aria-hidden="true"
            />
          )}
          <span className={s.shade} aria-hidden="true" />

          <span className={s.body}>
            <span className={s.title}>{c.title}</span>
            <span className={s.go}>перейти</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
