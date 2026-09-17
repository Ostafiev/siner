"use client";

import { useState } from "react";
import Link from "next/link";
import LineItem, { type LineSpec } from "./LineItem";
import { findProduct } from "@/lib/catalog";
import { useCart, type CartItem } from "@/lib/useCart";
import s from "./CartView.module.css";

const specsOf = (i: CartItem): LineSpec[] =>
  [
    i.base ? { label: "Основа", value: i.base } : null,
    i.pearl ? { label: "Вставка", value: i.pearl } : null,
    i.size ? { label: "Размер", value: i.size } : null,
  ].filter(Boolean) as LineSpec[];

export default function CartView() {
  const { items, ready, remove, clear } = useCart();
  const [sent, setSent] = useState(false);

  if (!ready) return <div className={s.layout} aria-hidden="true" />;

  if (sent) {
    return (
      <div className={s.done}>
        <p className={s.doneTitle}>Заявка отправлена</p>
        <p className={s.doneNote}>
          Менеджер магазина свяжется с вами, чтобы уточнить детали заказа и стоимость.
        </p>
        <Link href="/catalog" className={s.doneLink}>
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className={s.done}>
        <p className={s.doneTitle}>Корзина пуста</p>
        <p className={s.doneNote}>
          Добавьте украшение из каталога — заказ оформляется заявкой, оплата не нужна.
        </p>
        <Link href="/catalog" className={s.doneLink}>
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <form
      className={s.layout}
      onSubmit={(e) => {
        e.preventDefault();
        /* заглушка: заявка пока никуда не уходит, форму подключим вместе с бэком */
        clear();
        setSent(true);
      }}
    >
      <div className={s.items}>
        {items.map((i) => {
          /* сборка из конструктора описывает себя сама */
          if (i.custom) {
            return (
              <LineItem
                key={i.id}
                image={i.custom.image ?? "/img/beads/kind3.png"}
                title={i.custom.title}
                specs={i.custom.specs}
                actionLabel="Изменить"
                actionHref="/constructor"
                price="цена по запросу"
                onRemove={() => remove(i.id)}
              />
            );
          }

          const p = findProduct(i.category, i.slug);
          if (!p) return null;
          return (
            <LineItem
              key={i.id}
              image={p.image}
              title={p.title}
              subtitle={p.subtitle}
              specs={specsOf(i)}
              actionLabel="Настроить"
              actionHref={`/catalog/${i.category}/${i.slug}`}
              price="цена по запросу"
              onRemove={() => remove(i.id)}
            />
          );
        })}
      </div>

      <aside className={s.panel}>
        <h2 className={s.panelTitle}>Контактная информация</h2>

        <label className={s.field}>
          <span>Телефон</span>
          <input type="tel" name="phone" required autoComplete="tel" />
        </label>

        <label className={s.field}>
          <span>E-mail</span>
          <input type="email" name="email" required autoComplete="email" />
        </label>

        <label className={s.field}>
          <span>Имя и Фамилия</span>
          <input type="text" name="name" required autoComplete="name" />
        </label>

        <h2 className={`${s.panelTitle} ${s.second}`}>Доставка</h2>

        <label className={s.field}>
          <span>Адрес</span>
          <textarea name="address" rows={3} required />
        </label>

        <dl className={s.sum}>
          <div>
            <dt>Товаров в заявке</dt>
            <dd>{items.length}</dd>
          </div>
          <div>
            <dt>Доставка</dt>
            <dd>бесплатно</dd>
          </div>
          <div className={s.total}>
            <dt>Стоимость</dt>
            <dd>по запросу</dd>
          </div>
        </dl>

        <button type="submit" className={s.submit}>
          Отправить заявку
        </button>

        <p className={s.consent}>
          Оставляя заявку, я принимаю{" "}
          <Link href="/privacy">условия конфиденциальности персональной информации</Link> в
          том числе в части обработки и использования моих персональных данных.
        </p>
      </aside>
    </form>
  );
}
