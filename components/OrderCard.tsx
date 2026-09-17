import Link from "next/link";
import { asset } from "@/lib/asset";
import { findProduct } from "@/lib/catalog";
import { statusLabel, type Order } from "@/lib/orders";
import { contacts } from "@/lib/data";
import { CheckIcon } from "./Icons";
import s from "./OrderCard.module.css";

/** Карточка заказа в списке кабинета. Вся карточка — ссылка на заказ. */
export default function OrderCard({ order }: { order: Order }) {
  const first = findProduct(order.items[0]?.category, order.items[0]?.slug ?? "");
  const second = findProduct(order.items[1]?.category, order.items[1]?.slug ?? "");
  const rest = order.items.length - 1;

  return (
    <article className={`${s.card} reveal`}>
      <Link href={`/orders/${order.id}`} className={s.hit} aria-label={`Заказ № ${order.id}`} />

      <header className={s.head}>
        <span className={s.num}>№ {order.id}</span>
        <span className={s.status}>
          {order.status === "delivered" && <CheckIcon className={s.check} />}
          {statusLabel[order.status]}
        </span>
      </header>

      <div className={s.media}>
        {first && <img className={s.main} src={asset(first.image)} alt="" loading="lazy" />}
        {rest > 0 && second && (
          <span className={s.more}>
            <img src={asset(second.image)} alt="" loading="lazy" />
            <span className={s.count}>+{rest}</span>
          </span>
        )}
      </div>

      <dl className={s.info}>
        <div>
          <dt>Адрес:</dt>
          <dd>{order.address}</dd>
        </div>
        <div>
          <dt>Получатель:</dt>
          <dd>{order.recipient}</dd>
        </div>
        <div>
          <dt>Стоимость:</dt>
          <dd>по запросу</dd>
        </div>
      </dl>

      <a href={`mailto:${contacts.email}?subject=Заказ № ${order.id}`} className={s.support}>
        Написать в поддержку
      </a>
    </article>
  );
}
