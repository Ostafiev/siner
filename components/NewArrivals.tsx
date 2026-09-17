"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { beads } from "@/lib/data";
import { asset } from "@/lib/asset";
import SectionTitle from "./SectionTitle";
import s from "./NewArrivals.module.css";

const N = beads.length;

/** Кратчайшее смещение i относительно активного слайда по кольцу. */
function wrap(offset: number) {
  let o = offset;
  while (o > N / 2) o -= N;
  while (o < -N / 2) o += N;
  return o;
}

export default function NewArrivals() {
  const [active, setActive] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; done: boolean } | null>(null);

  const go = useCallback((dir: number) => {
    setActive((a) => (a + dir + N) % N);
  }, []);

  /* стрелки на клавиатуре, когда карусель в фокусе */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  /* свайп мышью и пальцем */
  useEffect(() => {
    const el = stage.current;
    if (!el) return;

    const down = (e: PointerEvent) => {
      drag.current = { x: e.clientX, done: false };
    };
    const move = (e: PointerEvent) => {
      const d = drag.current;
      if (!d || d.done) return;
      const dx = e.clientX - d.x;
      if (Math.abs(dx) > 46) {
        go(dx < 0 ? 1 : -1);
        d.done = true;
      }
    };
    const up = () => {
      drag.current = null;
    };

    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [go]);

  /* горизонтальный жест на трекпаде: два пальца влево-вправо.
     Такой жест приходит как wheel с deltaX. После инерции трекпад ещё
     долго досылает события, поэтому один взмах = один слайд: дальше
     блокируемся, пока поток событий не затихнет. */
  useEffect(() => {
    const el = stage.current;
    if (!el) return;

    let travelled = 0;
    let locked = false;
    let quiet: ReturnType<typeof setTimeout>;

    const onWheel = (e: WheelEvent) => {
      /* вертикальную прокрутку страницы не перехватываем */
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;

      /* иначе Safari уведёт браузер «назад» по истории */
      e.preventDefault();

      clearTimeout(quiet);
      quiet = setTimeout(() => {
        travelled = 0;
        locked = false;
      }, 130);

      if (locked) return;

      travelled += e.deltaX;
      if (Math.abs(travelled) > 42) {
        go(travelled > 0 ? 1 : -1);
        travelled = 0;
        locked = true;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      clearTimeout(quiet);
    };
  }, [go]);

  return (
    <section className={s.section} aria-label="Новинки">
      <div className="container">
        <SectionTitle>Новинки</SectionTitle>
      </div>

      <div
        className={`${s.stage} reveal`}
        ref={stage}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="group"
        aria-roledescription="карусель"
      >
        {beads.map((b, i) => {
          const o = wrap(i - active);
          const far = Math.abs(o) > 2;
          return (
            <article
              key={b.id}
              className={s.slide}
              data-offset={o}
              aria-hidden={o !== 0}
              style={{
                // @ts-expect-error — кастомное свойство для CSS
                "--o": o,
                opacity: far ? 0 : 1,
                pointerEvents: far ? "none" : undefined,
                zIndex: 10 - Math.abs(o),
              }}
            >
              <button
                className={s.hit}
                onClick={() => setActive(i)}
                tabIndex={o === 0 ? -1 : 0}
                aria-label={`Показать «${b.title}»`}
              />

              <header className={s.meta}>
                <h3 className={s.name}>{b.title}</h3>
                <p className={s.cat}>{b.category}</p>
              </header>

              <Link href={b.href} className={s.figure} tabIndex={o === 0 ? 0 : -1}>
                <img src={asset(b.image)} alt={b.title} loading={i < 2 ? "eager" : "lazy"} />
              </Link>

            </article>
          );
        })}
      </div>

      <div className="container">
        <div className={s.dots} role="tablist" aria-label="Слайды">
          {beads.map((b, i) => (
            <button
              key={b.id}
              className={`${s.dot} ${i === active ? s.dotActive : ""}`}
              onClick={() => setActive(i)}
              role="tab"
              aria-selected={i === active}
              aria-label={`Слайд ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
