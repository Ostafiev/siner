import type { ReactNode } from "react";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";
import AccountBar from "./AccountBar";
import s from "./AccountPage.module.css";

/**
 * Общая обёртка внутренних страниц: строка крошек (или простой заголовок)
 * слева, плашка аккаунта справа, дальше содержимое. Одна на корзину,
 * избранное и кабинет — чтобы отступы сверху везде совпадали.
 */
export default function AccountPage({
  crumbs,
  title,
  account = false,
  children,
}: {
  crumbs?: Crumb[];
  title?: string;
  account?: boolean;
  children: ReactNode;
}) {
  return (
    <section className={s.page}>
      <div className="container">
        <div className={s.head}>
          {crumbs ? <Breadcrumbs items={crumbs} /> : <h1 className={s.title}>{title}</h1>}
          {account && <AccountBar />}
        </div>
        {children}
      </div>
    </section>
  );
}
