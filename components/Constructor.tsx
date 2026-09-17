"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { asset } from "@/lib/asset";
import {
  beadCount,
  beadKinds,
  beadsOfKind,
  clasps,
  findBead,
  findClasp,
  instruction,
  lengths,
} from "@/lib/constructor";
import { useCart } from "@/lib/useCart";
import { assemblyKey, useAssembly } from "@/lib/useAssembly";
import BeadRing from "./BeadRing";
import { CheckIcon } from "./Icons";
import s from "./Constructor.module.css";

/* Сворачиваемый блок. Пока он закрыт или анимируется, содержимое обрезается —
   иначе «поедет» высота. Как только блок раскрылся, обрезание снимаем, чтобы
   рамки и кружки выбора не срезало по краю. */
function Group({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  const [clip, setClip] = useState(true);

  useEffect(() => {
    if (!open) {
      setClip(true);
      return;
    }
    const t = setTimeout(() => setClip(false), 430);
    return () => clearTimeout(t);
  }, [open]);

  return (
    <section className={s.group}>
      <button type="button" className={s.groupHead} onClick={onToggle} aria-expanded={open}>
        <span className={s.groupTitle}>{title}</span>
        <span className={`${s.chev} ${open ? "" : s.chevDown}`} aria-hidden="true">
          <svg viewBox="0 0 16 8">
            <path d="M1 7.2 8 1l7 6.2" fill="none" stroke="currentColor" strokeWidth="1.1" />
          </svg>
        </span>
      </button>
      <div className={`${s.groupBody} ${open ? s.open : ""}`}>
        <div className={`${s.groupInner} ${clip ? s.clip : ""}`}>{children}</div>
      </div>
    </section>
  );
}

export default function Constructor() {
  const [length, setLength] = useState(30);
  const [base, setBase] = useState("base");
  const [claspId, setClaspId] = useState(clasps[0].id);
  const [slots, setSlots] = useState<string[]>([]);

  /* бусина, выбранная в списке: следующий клик по изделию поставит её на место */
  const [picked, setPicked] = useState<string | null>(null);

  const [kind, setKind] = useState(beadKinds[1].id);
  const [panel, setPanel] = useState<"beads" | "clasp" | "size" | null>(null);
  const [full, setFull] = useState(false);
  const [help, setHelp] = useState(false);
  const [savedPopup, setSavedPopup] = useState(false);

  const cart = useCart();
  const favourite = useAssembly();
  const clasp = findClasp(claspId);
  const baseBead = findBead(base);
  const baseAlong = baseBead?.along ?? 8;

  /* Пересобираем изделие при смене длины, основной бусины или застёжки.
     Поставленные вручную бусины сохраняем по номерам позиций. */
  useEffect(() => {
    const n = beadCount(length, baseAlong, clasp.along);
    setSlots((prev) =>
      Array.from({ length: n }, (_, i) => {
        const old = prev[i];
        return old && old !== "base" && old !== base ? old : base;
      }),
    );
  }, [length, base, baseAlong, clasp.along]);

  /* отложенную сборку подхватываем один раз, при первом заходе на страницу */
  const [restored, setRestored] = useState(false);
  useEffect(() => {
    if (restored || !favourite.ready || !favourite.assembly) return;
    const a = favourite.assembly;
    setLength(a.length);
    setBase(a.base);
    setClaspId(a.clasp);
    setSlots(a.slots);
    setRestored(true);
  }, [favourite.ready, favourite.assembly, restored]);

  const current = { length, base, clasp: claspId, slots };
  /* сердечко горит, только если отложена ровно эта версия изделия */
  const isSaved =
    !!favourite.assembly && assemblyKey(favourite.assembly) === assemblyKey(current);

  /* Сводка «вы выбрали»: одинаковые бусины сходятся в одну строку. */
  const summary = useMemo(() => {
    const map = new Map<string, number>();
    slots.forEach((id) => map.set(id, (map.get(id) ?? 0) + 1));
    return [...map.entries()]
      .map(([id, count]) => ({ bead: findBead(id), count }))
      .filter((x) => x.bead)
      .sort((a, b) => b.count - a.count);
  }, [slots]);

  /* клик по месту в изделии — выбранная бусина встаёт сразу */
  const place = (index: number) => {
    if (!picked) {
      setPanel("beads");
      return;
    }
    setSlots((prev) => prev.map((v, i) => (i === index ? picked : v)));
  };

  const fillAll = () => {
    if (!picked) return;
    setBase(picked);
    setSlots((prev) => prev.map(() => picked));
  };

  /* убрать бусину из сборки — все её позиции возвращаются к основной */
  const dropBead = (id: string) => {
    if (id === base) return;
    setSlots((prev) => prev.map((v) => (v === id ? base : v)));
  };

  /* сердечко переключает: отложить или убрать из избранного */
  const toggleFavourite = () => {
    if (isSaved) {
      favourite.clear();
      return;
    }
    favourite.save(current);
    setSavedPopup(true);
  };

  const buy = () => {
    cart.add({
      id: `constructor:${length}:${claspId}:${slots.join(",")}`,
      slug: "constructor",
      category: "constructor",
      custom: {
        title: "Изделие из конструктора",
        image: summary[0]?.bead?.image ?? "/img/beads/kind3.png",
        specs: [
          { label: "Длина", value: `${length} см` },
          { label: "Бусин", value: `${slots.length} шт` },
          { label: "Застёжка", value: clasp.title },
        ],
      },
    });
  };

  const inCart = cart.items.some((i) => i.category === "constructor");

  return (
    <div className={`${s.layout} ${full ? s.isFull : ""}`}>
      {/* -------------------------------------------------- холст */}
      <div className={s.stage}>
        <button
          type="button"
          className={s.round}
          onClick={() => setHelp(true)}
          aria-label="Как пользоваться конструктором"
        >
          ?
        </button>

        <button
          type="button"
          className={`${s.heart} ${isSaved ? s.heartOn : ""}`}
          onClick={toggleFavourite}
          aria-pressed={isSaved}
          aria-label={isSaved ? "Убрать изделие из избранного" : "Сохранить изделие в избранное"}
        >
          <svg viewBox="0 0 22 20" aria-hidden="true">
            <path
              d="M11 18.2 3.3 10.7A4.6 4.6 0 0 1 11 5.4a4.6 4.6 0 0 1 7.7 5.3L11 18.2Z"
              fill={isSaved ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={s.ringWrap}>
          <BeadRing slots={slots} clasp={clasp} onPlace={place} />
        </div>

        <button
          type="button"
          className={s.expand}
          onClick={() => setFull(!full)}
          aria-label={full ? "Свернуть просмотр" : "Развернуть просмотр"}
        >
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M8 12 3 17m0 0h4m-4 0v-4M12 8l5-5m0 0h-4m4 0v4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* -------------------------------------------------- меню */}
      <div className={s.panels}>
        <Group
          title="Бусины"
          open={panel === "beads"}
          onToggle={() => setPanel(panel === "beads" ? null : "beads")}
        >
          <div className={s.kinds}>
            {beadKinds.map((k) => (
              <button
                key={k.id}
                type="button"
                className={`${s.kind} ${kind === k.id ? s.kindOn : ""}`}
                onClick={() => setKind(k.id)}
                aria-pressed={kind === k.id}
              >
                <img src={asset(k.image)} alt="" />
                <span>{k.title}</span>
              </button>
            ))}
          </div>

          <p className={s.hint}>
            {picked
              ? `${findBead(picked)?.title}: нажимайте на места в изделии — бусина встанет туда.`
              : "Выберите бусину, потом нажмите на место в изделии."}
          </p>

          <div className={s.grid}>
            {beadsOfKind(kind).map((b) => (
              <button
                key={b.id}
                type="button"
                className={`${s.pick} ${picked === b.id ? s.pickOn : ""}`}
                onClick={() => setPicked(picked === b.id ? null : b.id)}
                aria-pressed={picked === b.id}
                title={b.title}
              >
                {b.image ? (
                  <img src={asset(b.image)} alt={b.title} loading="lazy" />
                ) : (
                  <span className={s.stoneBead} aria-hidden="true" />
                )}
              </button>
            ))}
          </div>

          <button type="button" className={s.fill} onClick={fillAll} disabled={!picked}>
            Заполнить всё
          </button>
        </Group>

        <Group
          title="Застёжка"
          open={panel === "clasp"}
          onToggle={() => setPanel(panel === "clasp" ? null : "clasp")}
        >
          <div className={s.clasps}>
            {clasps.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`${s.claspBtn} ${claspId === c.id ? s.claspOn : ""}`}
                onClick={() => setClaspId(c.id)}
                aria-pressed={claspId === c.id}
                title={c.title}
              >
                <img src={asset(c.image)} alt={c.title} />
              </button>
            ))}
          </div>
        </Group>

        <Group
          title="Размер"
          open={panel === "size"}
          onToggle={() => setPanel(panel === "size" ? null : "size")}
        >
          <div className={s.sizes}>
            {lengths.map((l) => (
              <button
                key={l}
                type="button"
                className={`${s.size} ${length === l ? s.sizeOn : ""}`}
                onClick={() => setLength(l)}
                aria-pressed={length === l}
              >
                {l}
              </button>
            ))}
            <button type="button" className={s.size} onClick={() => setHelp(true)}>
              Другой
            </button>
          </div>
          <button type="button" className={s.sizeHelp} onClick={() => setHelp(true)}>
            Инструкция по выбору размера
          </button>
        </Group>

        {/* -------------------------------------------------- вы выбрали */}
        <section className={s.chosen}>
          <h2 className={s.chosenTitle}>Вы выбрали</h2>
          <div className={s.chosenRow}>
            {summary.map(({ bead, count }) => (
              <div key={bead!.id} className={s.chip}>
                <span className={s.chipMedia}>
                  {bead!.image ? (
                    <img src={asset(bead!.image)} alt="" />
                  ) : (
                    <span className={s.stoneBead} aria-hidden="true" />
                  )}
                </span>
                <span className={s.chipBody}>
                  <span className={s.chipName}>{bead!.title}</span>
                  <span className={s.chipOrigin}>{bead!.origin}</span>
                </span>
                <span className={s.chipCount}>{count} шт</span>
                {bead!.id !== base && (
                  <button
                    type="button"
                    className={s.chipDrop}
                    onClick={() => dropBead(bead!.id)}
                    aria-label={`Убрать «${bead!.title}» из изделия`}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className={s.actions}>
          {/* «Связаться» — форма заявки, делается вместе с бэком */}
          <button type="button" className={s.btn}>
            Связаться
          </button>
          <button
            type="button"
            className={`${s.btn} ${s.buy}`}
            onClick={buy}
            disabled={inCart}
          >
            {inCart ? "В корзине" : "Купить"}
          </button>
        </div>
      </div>

      {/* -------------------------------------------------- инструкция */}
      {help && (
        <div className={s.modal} role="dialog" aria-modal="true">
          <div className={s.sheet}>
            <button
              type="button"
              className={s.close}
              onClick={() => setHelp(false)}
              aria-label="Закрыть"
            >
              <span />
              <span />
            </button>
            <h2 className={s.sheetTitle}>
              Как пользоваться
              <br />
              конструктором
            </h2>
            <ol className={s.steps}>
              {instruction.map((step, i) => (
                <li key={step}>
                  <span className={s.stepNum}>{i + 1}</span>
                  <span className={s.stepText}>{step}</span>
                </li>
              ))}
            </ol>
            <button type="button" className={s.start} onClick={() => setHelp(false)}>
              Начать
            </button>
          </div>
        </div>
      )}

      {/* -------------------------------------------------- добавлено в избранное */}
      {savedPopup && (
        <div className={s.modal} role="dialog" aria-modal="true">
          <div className={s.popup}>
            <button
              type="button"
              className={s.close}
              onClick={() => setSavedPopup(false)}
              aria-label="Закрыть"
            >
              <span />
              <span />
            </button>
            <div className={s.popupRing}>
              <BeadRing slots={slots} clasp={clasp} />
            </div>
            <p className={s.popupTitle}>
              <CheckIcon className={s.popupCheck} />
              Ваше изделие добавлено в избранное!
            </p>
            <p className={s.popupNote}>Вы можете вернуться к нему позже.</p>
          </div>
        </div>
      )}
    </div>
  );
}
