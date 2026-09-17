"use client";

import { usePathname } from "next/navigation";
import { useReveal } from "@/lib/useReveal";

/**
 * Ничего не рисует — только включает появление блоков при скролле.
 * Живёт в общем макете, чтобы работать на всех страницах сразу.
 * Адрес страницы передаём внутрь: при переходе наблюдатели пересобираются
 * заново, иначе новая страница осталась бы прозрачной.
 */
export default function Reveal() {
  useReveal(usePathname());
  return null;
}
