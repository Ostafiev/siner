import Link from "next/link";
import { contacts } from "@/lib/data";
import { socialIcons } from "./Icons";
import s from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className="container">
        <div className={s.grid}>
          <div className={s.col}>
            <h3 className={s.head}>Техническая поддержка</h3>
            <p className={s.row}>
              <span className={s.key}>email</span>
              <a className={s.val} href={`mailto:${contacts.email}`}>
                {contacts.email}
              </a>
            </p>
          </div>

          <div className={s.col}>
            <h3 className={s.head}>Информация</h3>
            <ul className={s.list}>
              {contacts.legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={s.col}>
            <h3 className={s.head}>Контакты</h3>
            <p className={s.row}>
              <span className={s.key}>Whatsapp</span>
              <a className={s.val} href={`tel:${contacts.phone}`}>
                {contacts.phone}
              </a>
            </p>
          </div>

          <div className={s.col}>
            <h3 className={s.head}>Соц. сети</h3>
            <ul className={s.socials}>
              {contacts.socials.map((soc) => {
                const Icon = socialIcons[soc.icon];
                return (
                  <li key={soc.label}>
                    <a
                      href={soc.href}
                      aria-label={soc.label}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <Icon className={s.socialIcon} />
                      <span className={s.socialLabel}>{soc.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <p className={s.credit}>
          разработано в <span className={s.creactor}>Creactor</span>
        </p>
      </div>
    </footer>
  );
}
