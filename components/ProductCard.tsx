"use client";

import Link from "next/link";
import { asset } from "@/lib/asset";
import { type Product } from "@/lib/catalog";
import { useFavorites } from "@/lib/useFavorites";
import s from "./ProductCard.module.css";

export default function ProductCard({ product }: { product: Product }) {
  const { has, toggle } = useFavorites();
  const liked = has(product.slug);
  const href = `/catalog/${product.category}/${product.slug}`;

  return (
    <article className={`${s.card} reveal`}>
      <Link href={href} className={s.hit} aria-label={product.title} />

      <button
        type="button"
        className={`${s.like} ${liked ? s.liked : ""}`}
        onClick={() => toggle(product.slug)}
        aria-pressed={liked}
        aria-label={liked ? "Убрать из избранного" : "В избранное"}
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
      </button>

      <div className={s.media}>
        <img src={asset(product.image)} alt={product.title} loading="lazy" />
      </div>

      <div className={s.foot}>
        <h3 className={s.title}>
          {product.title}
          {product.subtitle && <span className={s.subtitle}>{product.subtitle}</span>}
        </h3>
      </div>
    </article>
  );
}
