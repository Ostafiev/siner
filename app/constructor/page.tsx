import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Constructor from "@/components/Constructor";
import s from "./constructor.module.css";

export const metadata: Metadata = {
  title: "Конструктор",
  description: "Соберите браслет из авторских бусин: размер, бусины, застёжка.",
};

export default function ConstructorPage() {
  return (
    <section className={s.page}>
      <div className="container">
        <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Конструктор" }]} />
        <Constructor />
      </div>
    </section>
  );
}
