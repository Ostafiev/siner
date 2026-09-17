"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Избранное до появления аккаунтов: список хранится в браузере.
 * Когда сделаем регистрацию — эта же функция начнёт читать и писать в базу,
 * компоненты менять не придётся.
 */
const KEY = "sinnergems:favorites";
const EVENT = "sinnergems:favorites-changed";

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    /* приватный режим или запрет на хранение — работаем без сохранения */
    return [];
  }
}

function write(list: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* игнорируем: избранное просто не переживёт перезагрузку */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function useFavorites() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setIds(read());
    sync();
    /* одно сердечко нажали — обновляются все на странице */
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((id: string) => {
    const list = read();
    write(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  }, []);

  return { ids, toggle, has: (id: string) => ids.includes(id) };
}
