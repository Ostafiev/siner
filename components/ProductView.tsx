"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import ProductGallery from "./ProductGallery";
import {
  defaultBases,
  defaultPearls,
  defaultSizes,
  galleryOf,
  type Product,
} from "@/lib/catalog";
import { useFavorites } from "@/lib/useFavorites";
import { cartId, useCart } from "@/lib/useCart";
import s from "./ProductView.module.css";

/* Сворачиваемый блок вариантов: заголовок, «галочка» справа, содержимое. */
function Group({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(true);
  /* пока блок закрыт или анимируется, содержимое обрезается — иначе поедет
     высота. После раскрытия обрезание снимаем, чтобы золотой кружок выбора
     не срезало по краю колонки. */
  const [clip, setClip] = useState(false);

  useEffect(() => {
    if (!open) {
      setClip(true);
      return;
    }
    const t = setTimeout(() => setClip(false), 430);
    return () => clearTimeout(t);
  }, [open]);

  return (
    <section className={s.group}>
      <button
        type="button"
        className={s.groupHead}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className={s.groupTitle}>{title}</span>
        <span className={`${s.chev} ${open ? "" : s.chevDown}`} aria-hidden="true">
          <svg viewBox="0 0 16 8">
            <path d="M1 7.2 8 1l7 6.2" fill="none" stroke="currentColor" strokeWidth="1.1" />
          </svg>
        </span>
      </button>

      <div className={`${s.groupBody} ${open ? s.open : ""}`}>
        <div className={`${s.groupInner} ${clip ? s.clip : ""}`}>{children}</div>
      </div>
    </section>
  );
}

export default function ProductView({ product }: { product: Product }) {
  const pearls = product.pearls ?? defaultPearls;
  const bases = product.bases ?? defaultBases;
  const sizes = product.sizes ?? defaultSizes;

  const [pearl, setPearl] = useState(pearls[1]?.id ?? pearls[0]?.id);
  const [base, setBase] = useState(bases[2]?.id ?? bases[0]?.id);
  const [size, setSize] = useState(sizes[0]?.id);
  const [tab, setTab] = useState<"about" | "specs">("about");

  const { has, toggle } = useFavorites();
  const cart = useCart();

  /* строка корзины = товар плюс выбранные варианты */
  const chosen = {
    slug: product.slug,
    category: product.category,
    base: bases.find((b) => b.id === base)?.title,
    pearl: pearls.find((p) => p.id === pearl)?.title,
    size: sizes.find((x) => x.id === size)?.title,
  };
  const inCart = cart.has(cartId(chosen));
  const liked = has(product.slug);
  const name = [product.title, product.subtitle].filter(Boolean).join(" ");

  return (
    <div className={s.layout}>
      <ProductGallery images={galleryOf(product)} alt={name} />

      <div className={s.panel}>
        {pearls.length > 0 && (
          <Group title="Вставка">
            <div className={s.pearls}>
              {pearls.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`${s.pearl} ${pearl === p.id ? s.pearlOn : ""}`}
                  style={{ background: p.color }}
                  onClick={() => setPearl(p.id)}
                  aria-pressed={pearl === p.id}
                  aria-label={p.title}
                  title={p.title}
                />
              ))}
            </div>
          </Group>
        )}

        {bases.length > 0 && (
          <Group title="Основа">
            <div className={s.chips}>
              {bases.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  className={`${s.chip} ${base === b.id ? s.chipOn : ""}`}
                  onClick={() => setBase(b.id)}
                  aria-pressed={base === b.id}
                >
                  {b.title}
                </button>
              ))}
            </div>
          </Group>
        )}

        {sizes.length > 0 && (
          <Group title="Размер">
            <div className={s.chips}>
              {sizes.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  className={`${s.chip} ${size === x.id ? s.chipOn : ""}`}
                  onClick={() => setSize(x.id)}
                  aria-pressed={size === x.id}
                >
                  {x.title}
                </button>
              ))}
            </div>
          </Group>
        )}

        <div className={s.actions}>
          {/* «Связаться» — форма заявки, делается вместе с бэком */}
          <button type="button" className={s.btn}>
            Связаться
          </button>
          {inCart ? (
            <Link href="/cart" className={`${s.btn} ${s.buy} ${s.inCart}`}>
              В корзине
            </Link>
          ) : (
            <button
              type="button"
              className={`${s.btn} ${s.buy}`}
              onClick={() => cart.add(chosen)}
            >
              Купить
            </button>
          )}
        </div>

        <button
          type="button"
          className={`${s.fav} ${liked ? s.favOn : ""}`}
          onClick={() => toggle(product.slug)}
          aria-pressed={liked}
        >
          <svg viewBox="0 0 22 20" aria-hidden="true">
            <path
              d="M11 18.2 3.3 10.7A4.6 4.6 0 0 1 11 5.4a4.6 4.6 0 0 1 7.7 5.3L11 18.2Z"
              fill={liked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
          {liked ? "В избранном" : "В избранное"}
        </button>

        <div className={s.tabs} role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "about"}
            className={`${s.tab} ${tab === "about" ? s.tabOn : ""}`}
            onClick={() => setTab("about")}
          >
            Описание
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "specs"}
            className={`${s.tab} ${tab === "specs" ? s.tabOn : ""}`}
            onClick={() => setTab("specs")}
          >
            Характеристики
          </button>
        </div>

        {tab === "about" ? (
          <p className={s.about}>{product.description ?? "Описание появится позже."}</p>
        ) : (
          <dl className={s.specs}>
            {(product.specs ?? []).map((row) => (
              <div key={row.label} className={s.spec}>
                <dt>{row.label}</dt>
                <span className={s.lead} aria-hidden="true" />
                <dd>
                  {row.href ? (
                    <a href={row.href} className={s.specLink}>
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
}
