import Link from "next/link";
import s from "./Breadcrumbs.module.css";

export type Crumb = { label: string; href?: string };

/** «ГЛАВНАЯ / КАТАЛОГ / КОЛЬЦА» — последний пункт крупнее и без ссылки. */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className={s.wrap} aria-label="Хлебные крошки">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={`${item.label}-${i}`} className={s.item}>
            {item.href && !last ? (
              <Link href={item.href} className={s.link}>
                {item.label}
              </Link>
            ) : (
              <span className={last ? s.current : s.link}>{item.label}</span>
            )}
            {!last && <span className={s.sep}>/</span>}
          </span>
        );
      })}
    </nav>
  );
}
