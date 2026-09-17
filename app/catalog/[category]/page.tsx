import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import CatalogGrid from "@/components/CatalogGrid";
import { categories, getCategory, productsOf } from "@/lib/catalog";
import s from "../catalog.module.css";

type Params = { params: Promise<{ category: string }> };

/* адреса разделов известны заранее — страницы соберутся статически */
export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params;
  return { title: getCategory(category)?.title ?? "Каталог" };
}

export default async function CategoryPage({ params }: Params) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  return (
    <section className={s.page}>
      <div className="container">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Каталог", href: "/catalog" },
            { label: cat.title },
          ]}
        />
        <CatalogGrid items={productsOf(cat.slug)} />
      </div>
    </section>
  );
}
