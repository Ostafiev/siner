"use client";

import { useEffect } from "react";

/**
 * Ставит класс .is-visible всем элементам с классом .reveal, когда они
 * попадают во вьюпорт.
 *
 * Важно: блоки нужно ловить не только при первой загрузке. Переход между
 * страницами в Next происходит без перезагрузки — общий макет остаётся на
 * месте, меняется только содержимое. Поэтому здесь два наблюдателя:
 *   IntersectionObserver — показывает блок, когда до него долистали;
 *   MutationObserver — замечает блоки, которых в момент запуска ещё не было
 *     (новая страница, подгруженные карточки каталога) и отдаёт их первому.
 * Без второго новая страница осталась бы прозрачной до перезагрузки.
 */
export function useReveal(key?: string) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const instant = reduced || !("IntersectionObserver" in window);

    const io = instant
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add("is-visible");
              io?.unobserve(entry.target);
            });
          },
          { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
        );

    /* взять в работу все ещё не показанные .reveal внутри узла */
    const watch = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)").forEach((n) => {
        if (io) io.observe(n);
        else n.classList.add("is-visible");
      });
    };

    watch(document);

    const mo = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.classList.contains("reveal") && !node.classList.contains("is-visible")) {
            if (io) io.observe(node);
            else node.classList.add("is-visible");
          }
          watch(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io?.disconnect();
      mo.disconnect();
    };
  }, [key]);
}
