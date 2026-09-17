import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { asset } from "@/lib/asset";
import { articles, findArticle, otherArticles } from "@/lib/news";
import s from "./article.module.css";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const a = findArticle(slug);
  return { title: a?.title ?? "Статья", description: a?.excerpt };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();

  const others = otherArticles(slug);

  return (
    <article className={s.page}>
      <div className="container">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Новости", href: "/news" },
            { label: article.title },
          ]}
        />

        <time className={s.date}>{article.date}</time>

        <div className={`${s.cover} reveal`}>
          <img src={asset(article.image)} alt="" />
        </div>

        <div className={s.body}>
          <p className={`${s.lead} reveal`}>{article.excerpt}</p>
          {article.body.map((p, i) => (
            <p key={i} className={`${s.text} reveal`}>
              {p}
            </p>
          ))}
        </div>

        {others.length > 0 && (
          <section className={s.other}>
            <h2 className={s.otherTitle}>Другие новости</h2>
            <div className={s.otherGrid}>
              {others.map((a) => (
                <Link key={a.slug} href={`/news/${a.slug}`} className={`${s.card} reveal`}>
                  <span className={s.thumb}>
                    <img src={asset(a.image)} alt="" loading="lazy" />
                  </span>
                  <time className={s.cardDate}>{a.date}</time>
                  <span className={s.cardTitle}>{a.title}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
