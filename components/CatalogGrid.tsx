"use client";

import { useState } from "react";
import { PER_PAGE, type Product } from "@/lib/catalog";
import ProductCard from "./ProductCard";
import s from "./CatalogGrid.module.css";

/**
 * Сетка товаров с двумя способами листать, как в макете:
 * «загрузить ещё» доклеивает следующую порцию к текущей,
 * номера страниц перескакивают на нужную и показывают только её.
 */
export default function CatalogGrid({ items }: { items: Product[] }) {
  const total = Math.max(1, Math.ceil(items.length / PER_PAGE));
  const [page, setPage] = useState(1);
  const [extra, setExtra] = useState(0); // сколько порций доклеено кнопкой

  const from = (page - 1) * PER_PAGE;
  const to = from + PER_PAGE * (1 + extra);
  const shown = items.slice(from, to);
  const canLoadMore = to < items.length;

  const goto = (p: number) => {
    setPage(p);
    setExtra(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!items.length) {
    return <p className={s.empty}>В этом разделе пока пусто.</p>;
  }

  return (
    <>
      <div className={s.grid}>
        {shown.map((p) => (
          <ProductCard key={`${p.category}-${p.slug}`} product={p} />
        ))}
      </div>

      {canLoadMore && (
        <button type="button" className={s.more} onClick={() => setExtra((e) => e + 1)}>
          загрузить еще
        </button>
      )}

      {total > 1 && (
        <nav className={s.pager} aria-label="Страницы каталога">
          {pageList(page, total).map((p, i) =>
            p === "…" ? (
              <span key={`gap-${i}`} className={s.gap}>
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                className={`${s.page} ${p === page ? s.pageActive : ""}`}
                onClick={() => goto(p)}
                aria-current={p === page ? "page" : undefined}
              >
                {p}
              </button>
            ),
          )}

          {page < total && (
            <button
              type="button"
              className={s.next}
              onClick={() => goto(page + 1)}
              aria-label="Следующая страница"
            >
              &gt;
            </button>
          )}
        </nav>
      )}
    </>
  );
}

/** 1 2 3 … 9 — соседние страницы плюс последняя. */
function pageList(page: number, total: number): (number | "…")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

  const near = [page - 1, page, page + 1].filter((p) => p >= 1 && p <= total);
  const set = new Set<number>([1, ...near, total]);
  const sorted = [...set].sort((a, b) => a - b);

  const out: (number | "…")[] = [];
  sorted.forEach((p, i) => {
    if (i && p - (sorted[i - 1] as number) > 1) out.push("…");
    out.push(p);
  });
  return out;
}
