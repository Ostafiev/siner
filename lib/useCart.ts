"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Корзина до появления аккаунтов: список хранится в браузере — так же,
 * как избранное. Когда сделаем регистрацию, эта функция начнёт читать
 * и писать в базу, компоненты менять не придётся.
 *
 * Одна позиция — товар плюс выбранные варианты: одно и то же кольцо
 * с разной основой это две разные строки корзины.
 */
export type CartItem = {
  id: string;
  slug: string;
  category: string;
  base?: string;
  pearl?: string;
  size?: string;
  /* сборка из конструктора: своя подпись, картинка и параметры —
     такой позиции нет в каталоге, поэтому она описывает себя сама */
  custom?: {
    title: string;
    image?: string;
    specs: { label: string; value: string }[];
  };
};

const KEY = "sinnergems:cart";
const EVENT = "sinnergems:cart-changed";

export const cartId = (i: Omit<CartItem, "id">) =>
  [i.slug, i.base ?? "", i.pearl ?? "", i.size ?? ""].join("|");

function read(): CartItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    /* приватный режим или запрет на хранение — работаем без сохранения */
    return [];
  }
}

function write(list: CartItem[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* игнорируем: корзина просто не переживёт перезагрузку */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  /* до первого чтения из браузера показывать «пусто» нельзя — будет мигание */
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setItems(read());
      setReady(true);
    };
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const add = useCallback((item: Omit<CartItem, "id"> & { id?: string }) => {
    const id = item.id ?? cartId(item);
    const list = read();
    if (!list.some((x) => x.id === id)) write([...list, { ...item, id }]);
  }, []);

  const remove = useCallback((id: string) => {
    write(read().filter((x) => x.id !== id));
  }, []);

  const clear = useCallback(() => write([]), []);

  return {
    items,
    ready,
    add,
    remove,
    clear,
    has: (id: string) => items.some((x) => x.id === id),
    /* лежит ли этот товар в корзине хоть в каком-то исполнении */
    hasProduct: (slug: string) => items.some((x) => x.slug === slug),
  };
}
