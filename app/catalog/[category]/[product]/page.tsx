import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductView from "@/components/ProductView";
import { findProduct, getCategory, products } from "@/lib/catalog";
import s from "./product.module.css";

type Params = { params: Promise<{ category: string; product: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ category: p.category, product: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category, product } = await params;
  const item = findProduct(category, product);
  return {
    title: item ? [item.title, item.subtitle].filter(Boolean).join(" ") : "Товар",
    description: item?.description?.replace(/\n/g, " "),
  };
}

export default async function ProductPage({ params }: Params) {
  const { category, product } = await params;
  const cat = getCategory(category);
  const item = findProduct(category, product);
  if (!cat || !item) notFound();

  return (
    <section className={s.page}>
      <div className="container">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Каталог", href: "/catalog" },
            { label: cat.title, href: `/catalog/${cat.slug}` },
            { label: [item.title, item.subtitle].filter(Boolean).join(" ") },
          ]}
        />
        <ProductView product={item} />
      </div>
    </section>
  );
}
