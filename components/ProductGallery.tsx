"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import s from "./ProductGallery.module.css";

/**
 * Галерея товара. Один и тот же набор кадров показывается по-разному:
 * на десктопе — большой кадр и лента миниатюр со стрелкой,
 * на телефоне — свайп по кадру и точки под ним.
 */
export default function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [i, setI] = useState(0);
  const strip = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const last = images.length - 1;

  const go = (n: number) => setI(Math.min(last, Math.max(0, n)));

  /* выбранная миниатюра всегда видна в ленте */
  useEffect(() => {
    const el = strip.current?.children[i] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }, [i]);

  /* свайп по большому кадру — на телефоне это основной способ листать */
  useEffect(() => {
    const el = frame.current;
    if (!el || images.length < 2) return;
    let x0: number | null = null;

    const down = (e: PointerEvent) => {
      x0 = e.clientX;
    };
    const up = (e: PointerEvent) => {
      if (x0 == null) return;
      const dx = e.clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 40) go(dx < 0 ? i + 1 : i - 1);
    };

    el.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  });

  return (
    <div className={s.wrap}>
      <div className={s.frame} ref={frame}>
        <div className={s.track} style={{ transform: `translateX(${-i * 100}%)` }}>
          {images.map((src, n) => (
            <img
              key={src}
              src={asset(src)}
              alt={n === 0 ? alt : `${alt} — фото ${n + 1}`}
              draggable={false}
              loading={n === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>

        {images.length > 1 && (
          <div className={s.dots}>
            {images.map((src, n) => (
              <button
                key={src}
                type="button"
                className={n === i ? s.dotOn : s.dot}
                onClick={() => go(n)}
                aria-label={`Фото ${n + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className={s.thumbs}>
          <div className={s.strip} ref={strip}>
            {images.map((src, n) => (
              <button
                key={src}
                type="button"
                className={`${s.thumb} ${n === i ? s.thumbOn : ""}`}
                onClick={() => go(n)}
                aria-label={`Фото ${n + 1}`}
              >
                <img src={asset(src)} alt="" loading="lazy" draggable={false} />
              </button>
            ))}
          </div>

          <button
            type="button"
            className={s.next}
            onClick={() => go(i + 1)}
            disabled={i === last}
            aria-label="Следующее фото"
          >
            <svg viewBox="0 0 24 12" aria-hidden="true">
              <path
                d="M0 6h22M16 1l6 5-6 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
