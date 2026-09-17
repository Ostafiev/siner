"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, contacts } from "@/lib/data";
import { asset } from "@/lib/asset";
import { CartIcon, ChevronIcon, HeartIcon, UserIcon } from "./Icons";
import s from "./Header.module.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  /* закрываем меню при переходе на другую страницу */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Блокируем прокрутку страницы, пока открыто меню */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className={`${s.header} ${scrolled ? s.scrolled : ""}`}>
        <div className={s.inner}>
          {/* ---- левая группа: бургер и язык ---- */}
          <div className={s.left}>
            <button
              className={s.burger}
              onClick={() => setOpen(true)}
              aria-label="Открыть меню"
              aria-expanded={open}
            >
              <span />
              <span />
            </button>

            <button className={s.lang} type="button">
              Ru <ChevronIcon className={s.chevron} />
            </button>
          </div>

          {/* ---- логотип ---- */}
          <Link href="/" className={s.logo} aria-label="SINNERGEMS — на главную">
            <img src={asset("/img/logo-mark.png")} alt="" className={s.logoMark} />
            <span className={`${s.logoText} gold-text`}>SINNERGEMS</span>
          </Link>

          {/* ---- правая группа ---- */}
          <div className={s.right}>
            <Link href="/wishlist" className={s.iconLink} aria-label="Избранное">
              <HeartIcon className={s.icon} />
            </Link>
            <Link href="/cart" className={s.iconLink} aria-label="Корзина">
              <CartIcon className={s.icon} />
            </Link>
            <Link href="/orders" className={s.iconLink} aria-label="Личный кабинет">
              <UserIcon className={s.icon} />
            </Link>
          </div>
        </div>
      </header>

      {/* ---- выезжающее меню ---- */}
      <div
        className={`${s.overlay} ${open ? s.overlayOpen : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <nav className={`${s.drawer} ${open ? s.drawerOpen : ""}`} aria-label="Главное меню">
        <button className={s.close} onClick={() => setOpen(false)} aria-label="Закрыть меню">
          <span />
          <span />
        </button>

        <ul className={s.navList}>
          {nav.map((item, i) => (
            <li key={item.href} style={{ transitionDelay: `${80 + i * 45}ms` }}>
              <Link
                href={item.href}
                className={pathname === item.href ? s.navActive : undefined}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={s.drawerFoot}>
          <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
          <a href={`tel:${contacts.phone}`}>{contacts.phone}</a>
        </div>
      </nav>
    </>
  );
}
