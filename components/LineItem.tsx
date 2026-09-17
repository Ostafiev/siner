"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { asset } from "@/lib/asset";
import { TrashIcon } from "./Icons";
import s from "./LineItem.module.css";

export type LineSpec = { label: string; value: string };

/**
 * Широкая строка товара: фотография слева, название и выбранные варианты
 * справа, внизу ссылка-действие и цена. Одинаково выглядит в корзине и
 * в заказе — отличаются только подпись ссылки и корзинка для удаления.
 */
export default function LineItem({
  image,
  title,
  subtitle,
  specs,
  actionLabel,
  actionHref,
  price,
  onRemove,
}: {
  image: string;
  title: string;
  subtitle?: string;
  specs: LineSpec[];
  actionLabel: string;
  actionHref: string;
  price: ReactNode;
  onRemove?: () => void;
}) {
  const name = [title, subtitle].filter(Boolean).join(" ");

  return (
    <article className={`${s.item} reveal`}>
      <div className={s.media}>
        <img src={asset(image)} alt={name} loading="lazy" />
      </div>

      <div className={s.body}>
        <h3 className={s.title}>{name}</h3>

        <dl className={s.specs}>
          {specs.map((row) => (
            <div key={row.label}>
              <dt>{row.label}:</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>

        <div className={s.foot}>
          <Link href={actionHref} className={s.action}>
            {actionLabel}
          </Link>
          <span className={s.price}>{price}</span>
        </div>
      </div>

      {onRemove && (
        <button
          type="button"
          className={s.remove}
          onClick={onRemove}
          aria-label="Убрать из корзины"
        >
          <TrashIcon />
        </button>
      )}
    </article>
  );
}
