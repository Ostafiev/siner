import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CategoryTiles from "@/components/CategoryTiles";
import s from "./catalog.module.css";

export const metadata: Metadata = { title: "Каталог" };

/**
 * Промежуточный экран между главной и товарами: выбор раздела.
 * Сами товары живут на /catalog/[category].
 */
export default function CatalogPage() {
  return (
    <section className={s.page}>
      <div className="container">
        <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Каталог" }]} />
        <CategoryTiles />
      </div>
    </section>
  );
}
