import Link from "next/link";
import { news } from "@/lib/data";
import { asset } from "@/lib/asset";
import SectionTitle from "./SectionTitle";
import s from "./News.module.css";

export default function News() {
  const [featured, ...rest] = news;
  const href = (slug: string) => `/news/${slug}`;

  return (
    <section className={s.section} aria-label="Новости">
      <div className="container">
        <SectionTitle
          action={
            <Link href="/news" className={s.more}>
              Еще новости
            </Link>
          }
        >
          Новости
        </SectionTitle>

        <div className={`${s.row} reveal`}>
          {/* крупная карточка: текст лежит поверх фотографии */}
          <article className={`${s.item} ${s.featured}`}>
            <Link href={href(featured.slug)} className={s.card}>
              <img src={asset(featured.image)} alt="" loading="lazy" />
              <span className={s.shade} aria-hidden="true" />
              <time className={s.date}>{featured.date}</time>
              <h3 className={s.headline}>{featured.title}</h3>
            </Link>
            <Link href={href(featured.slug)} className={s.link}>
              подробнее
            </Link>
          </article>

          {/* остальные — фото сверху, подпись снизу, размер по убыванию */}
          {rest.map((n) => (
            <article key={n.slug} className={s.item}>
              <Link href={href(n.slug)} className={s.card}>
                <img src={asset(n.image)} alt="" loading="lazy" />
                <time className={s.date}>{n.date}</time>
              </Link>
              <h3 className={s.title}>
                <Link href={href(n.slug)}>{n.title}</Link>
              </h3>
              <Link href={href(n.slug)} className={s.link}>
                подробнее
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
