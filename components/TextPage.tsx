import Breadcrumbs from "./Breadcrumbs";
import { contacts } from "@/lib/data";
import { socialIcons } from "./Icons";
import type { TextPage as Page } from "@/lib/pages";
import s from "./TextPage.module.css";

/**
 * Текстовая страница: крошки, крупный заголовок, лид и разделы.
 * Макета на такие страницы не было — собрано в стиле сайта.
 * Весь текст берётся из `lib/pages.ts`.
 */
export default function TextPage({ page }: { page: Page }) {
  return (
    <section className={s.page}>
      <div className="container">
        <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: page.title }]} />

        <div className={s.body}>
          {page.notice && <p className={s.notice}>{page.notice}</p>}
          {page.lead && <p className={`${s.lead} reveal`}>{page.lead}</p>}

          {page.blocks.map((b) => (
            <div key={b.heading ?? b.text} className={`${s.block} reveal`}>
              {b.heading && <h2 className={s.heading}>{b.heading}</h2>}
              <p className={s.text}>{b.text}</p>
            </div>
          ))}

          {page.contacts && (
            <div className={`${s.block} reveal`}>
              <dl className={s.contacts}>
                <div>
                  <dt>Почта</dt>
                  <dd>
                    <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
                  </dd>
                </div>
                <div>
                  <dt>Телефон</dt>
                  <dd>
                    <a href={`tel:${contacts.phone}`}>{contacts.phone}</a>
                  </dd>
                </div>
              </dl>

              <ul className={s.socials}>
                {contacts.socials.map((soc) => {
                  const Icon = socialIcons[soc.icon];
                  return (
                    <li key={soc.label}>
                      <a href={soc.href} aria-label={soc.label} target="_blank" rel="noreferrer">
                        {Icon && <Icon className={s.icon} />}
                        <span>{soc.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
