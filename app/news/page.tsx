import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import NewsList from "@/components/NewsList";
import { articles } from "@/lib/news";
import s from "./news.module.css";

export const metadata: Metadata = {
  title: "Новости",
  description: "Камни недели, поездки на копи и заметки о работе SINNERGEMS.",
};

export default function NewsPage() {
  return (
    <section className={s.page}>
      <div className="container">
        <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Новости" }]} />
        <NewsList items={articles} />
      </div>
    </section>
  );
}
