import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AccountPage from "@/components/AccountPage";
import LineItem, { type LineSpec } from "@/components/LineItem";
import { CheckIcon } from "@/components/Icons";
import { findProduct } from "@/lib/catalog";
import { contacts } from "@/lib/data";
import { findOrder, orders, statusLabel, type OrderLine } from "@/lib/orders";
import s from "./order.module.css";

type Params = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return orders.map((o) => ({ id: o.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  return { title: `Заказ № ${id}` };
}

const specsOf = (i: OrderLine): LineSpec[] =>
  [
    i.base ? { label: "Основа", value: i.base } : null,
    i.pearl ? { label: "Вставка", value: i.pearl } : null,
    i.size ? { label: "Размер", value: i.size } : null,
  ].filter(Boolean) as LineSpec[];

export default async function OrderPage({ params }: Params) {
  const { id } = await params;
  const order = findOrder(id);
  if (!order) notFound();

  return (
    <AccountPage
      crumbs={[
        { label: "Личный кабинет", href: "/orders" },
        { label: "Заказы", href: "/orders" },
        { label: `Заказ № ${order.id}` },
      ]}
      account
    >
      <div className={s.layout}>
        <div className={s.items}>
          {order.items.map((line, n) => {
            const p = findProduct(line.category, line.slug);
            if (!p) return null;
            return (
              <LineItem
                key={`${line.slug}-${n}`}
                image={p.image}
                title={p.title}
                subtitle={p.subtitle}
                specs={specsOf(line)}
                actionLabel="Подробнее"
                actionHref={`/catalog/${line.category}/${line.slug}`}
                price="цена по запросу"
              />
            );
          })}
        </div>

        <aside className={s.panel}>
          <div className={s.head}>
            <span className={s.date}>{order.date}</span>
            <span className={s.status}>
              {order.status === "delivered" && <CheckIcon className={s.check} />}
              {statusLabel[order.status]}
            </span>
          </div>

          <h2 className={s.label}>Адрес доставки</h2>
          <p className={s.value}>{order.address}</p>
          {order.tracking && (
            <a href={order.tracking} className={s.track}>
              Отслеживание доставки
            </a>
          )}

          <h2 className={s.label}>Получатель</h2>
          <p className={s.value}>{order.recipient}</p>

          <h2 className={s.label}>Сумма заказа</h2>
          <p className={s.value}>по запросу</p>

          <a
            href={`mailto:${contacts.email}?subject=Заказ № ${order.id}`}
            className={s.support}
          >
            Написать в поддержку
          </a>
        </aside>
      </div>
    </AccountPage>
  );
}
