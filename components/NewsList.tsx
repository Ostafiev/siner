import Link from "next/link";
import { asset } from "@/lib/asset";
import type { Article } from "@/lib/news";
import s from "./NewsList.module.css";

/**
 * Лента новостей. Макета не было — язык взят с главной: первая новость
 * крупная, текст лежит поверх фотографии, остальные идут сеткой.
 */
export default function NewsList({ items }: { items: Article[] }) {
  const [featured, ...rest] = items;
  if (!featured) return null;

  return (
    <div className={s.wrap}>
      <article className={`${s.featured} reveal`}>
        <Link href={`/news/${featured.slug}`} className={s.cover}>
          <img src={asset(featured.image)} alt="" />
          <span className={s.shade} aria-hidden="true" />
          <span className={s.overlay}>
            <time className={s.date}>{featured.date}</time>
            <span className={s.bigTitle}>{featured.title}</span>
          </span>
        </Link>
        <p className={s.excerpt}>{featured.excerpt}</p>
        <Link href={`/news/${featured.slug}`} className={s.more}>
          Читать
        </Link>
      </article>

      <div className={s.grid}>
        {rest.map((a) => (
          <article key={a.slug} className={`${s.item} reveal`}>
            <Link href={`/news/${a.slug}`} className={s.thumb}>
              <img src={asset(a.image)} alt="" loading="lazy" />
              <time className={s.date}>{a.date}</time>
            </Link>
            <h3 className={s.title}>
              <Link href={`/news/${a.slug}`}>{a.title}</Link>
            </h3>
            <p className={s.excerpt}>{a.excerpt}</p>
            <Link href={`/news/${a.slug}`} className={s.more}>
              Читать
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
