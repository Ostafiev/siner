"use client";

import Link from "next/link";
import { asset } from "@/lib/asset";
import { products, type Product } from "@/lib/catalog";
import { findBead, findClasp } from "@/lib/constructor";
import { useFavorites } from "@/lib/useFavorites";
import { useAssembly } from "@/lib/useAssembly";
import { useCart } from "@/lib/useCart";
import BeadRing from "./BeadRing";
import { TrashIcon } from "./Icons";
import s from "./WishlistView.module.css";

/** В строке избранного показываем основу и вставку — как в макете. */
function shortSpecs(p: Product) {
  const specs = p.specs ?? [];
  const wanted = specs.filter((x) => x.label === "Основа" || x.label === "Вставка");
  return (wanted.length ? wanted : specs.slice(0, 2)).slice(0, 2);
}

export default function WishlistView() {
  const { ids, toggle } = useFavorites();
  const { add, hasProduct, ready } = useCart();
  const favourite = useAssembly();

  const items = products.filter((p) => ids.includes(p.slug));
  const assembly = favourite.assembly;

  if (!ready || !favourite.ready) return <div className={s.list} aria-hidden="true" />;

  if (!items.length && !assembly) {
    return (
      <div className={s.empty}>
        <p className={s.emptyTitle}>В избранном пока пусто</p>
        <p className={s.emptyNote}>
          Нажмите на сердечко в каталоге — украшение сохранится здесь.
        </p>
        <Link href="/catalog" className={s.emptyLink}>
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className={s.list}>
      {/* собственная сборка из конструктора — отдельной строкой */}
      {assembly && (
        <article className={`${s.row} reveal`}>
          <div className={s.cell}>
            <button
              type="button"
              className={s.remove}
              onClick={() => favourite.clear()}
              aria-label="Убрать сборку из избранного"
            >
              <TrashIcon />
            </button>
          </div>

          <div className={`${s.cell} ${s.media}`}>
            <Link href="/constructor" className={s.ring} aria-label="Открыть в конструкторе">
              <BeadRing slots={assembly.slots} clasp={findClasp(assembly.clasp)} />
            </Link>
          </div>

          <div className={`${s.cell} ${s.body}`}>
            <h3 className={s.title}>
              <Link href="/constructor">Ваше изделие из конструктора</Link>
            </h3>
            <ul className={s.specs}>
              <li>Длина: {assembly.length} см</li>
              <li>Бусин: {assembly.slots.length} шт</li>
              <li>Основа: {findBead(assembly.base)?.title ?? "—"}</li>
            </ul>
          </div>

          <div className={`${s.cell} ${s.act}`}>
            <Link href="/constructor" className={s.btn}>
              Открыть
            </Link>
          </div>
        </article>
      )}

      {items.map((p) => {
        const href = `/catalog/${p.category}/${p.slug}`;
        const inCart = hasProduct(p.slug);
        const name = [p.title, p.subtitle].filter(Boolean).join(" ");

        return (
          <article key={p.slug} className={`${s.row} reveal`}>
            <div className={s.cell}>
              <button
                type="button"
                className={s.remove}
                onClick={() => toggle(p.slug)}
                aria-label="Убрать из избранного"
              >
                <TrashIcon />
              </button>
            </div>

            <div className={`${s.cell} ${s.media}`}>
              <Link href={href}>
                <img src={asset(p.image)} alt={name} loading="lazy" />
              </Link>
            </div>

            <div className={`${s.cell} ${s.body}`}>
              <h3 className={s.title}>
                <Link href={href}>{name}</Link>
              </h3>
              <ul className={s.specs}>
                {shortSpecs(p).map((row) => (
                  <li key={row.label}>
                    {row.label}: {row.value}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${s.cell} ${s.act}`}>
              {inCart ? (
                <Link href="/cart" className={s.btn}>
                  В корзине
                </Link>
              ) : (
                <button
                  type="button"
                  className={s.btn}
                  onClick={() => add({ slug: p.slug, category: p.category })}
                >
                  Купить
                </button>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
