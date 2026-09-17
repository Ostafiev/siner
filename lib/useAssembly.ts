"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Сборка из конструктора, отложенная в избранное.
 * Хранится в браузере, как и остальное избранное — когда появятся аккаунты,
 * эта функция начнёт ходить в базу, компоненты не изменятся.
 *
 * Сборка одна: сердечко на холсте её сохраняет и снимает, конструктор при
 * возврате её восстанавливает, а страница избранного показывает отдельной
 * строкой — иначе надпись «вы можете вернуться к нему позже» была бы ложью.
 */
export type Assembly = {
  length: number;
  base: string;
  clasp: string;
  slots: string[];
};

const KEY = "sinnergems:constructor";
const EVENT = "sinnergems:constructor-changed";

/** Подпись сборки: по ней понимаем, отложена ли ровно эта версия. */
export const assemblyKey = (a: Assembly) =>
  `${a.length}|${a.clasp}|${a.slots.join(",")}`;

function read(): Assembly | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as Assembly;
    return v?.slots?.length ? v : null;
  } catch {
    /* приватный режим или запрет на хранение */
    return null;
  }
}

function write(a: Assembly | null) {
  try {
    if (a) localStorage.setItem(KEY, JSON.stringify(a));
    else localStorage.removeItem(KEY);
  } catch {
    /* игнорируем: сборка просто не переживёт перезагрузку */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function useAssembly() {
  const [assembly, setAssembly] = useState<Assembly | null>(null);
  /* до первого чтения из браузера показывать «пусто» нельзя — будет мигание */
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setAssembly(read());
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

  const save = useCallback((a: Assembly) => write(a), []);
  const clear = useCallback(() => write(null), []);

  return { assembly, ready, save, clear };
}
