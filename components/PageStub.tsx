import Link from "next/link";
import s from "./PageStub.module.css";

/**
 * Временная страница-заглушка: заголовок в стиле сайта плюс честная подпись,
 * что раздел ещё в работе. Как только приходит макет — заглушка меняется на
 * настоящую вёрстку, маршрут и ссылки в меню остаются теми же.
 */
export default function PageStub({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={s.page}>
      <div className="container">
        <div className={s.head}>
          <span className={s.ghost} aria-hidden="true">
            {title}
          </span>
          <h1 className={`${s.title} gold-text`}>{title}</h1>
        </div>

        <p className={s.note}>{note ?? "Раздел в работе — вёрстка по макету впереди."}</p>

        {children}

        <Link href="/" className={s.back}>
          На главную
        </Link>
      </div>
    </section>
  );
}
