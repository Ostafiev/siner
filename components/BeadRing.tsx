"use client";

import { asset } from "@/lib/asset";
import { ringLayout, type Clasp } from "@/lib/constructor";
import s from "./BeadRing.module.css";

/**
 * Изделие кольцом: застёжка наверху, дальше бусины встык.
 * Один компонент и на холсте конструктора, и в поп-апе, и превью
 * в избранном — отличается только тем, кликаются ли бусины.
 */
export default function BeadRing({
  slots,
  clasp,
  onPlace,
}: {
  slots: string[];
  clasp: Clasp;
  /* если передан — по бусинам можно кликать */
  onPlace?: (index: number) => void;
}) {
  const layout = ringLayout(slots, clasp);

  return (
    <div className={s.ring}>
      {layout.map((p) => {
        const style = {
          left: `${p.left}%`,
          top: `${p.top}%`,
          width: `${p.width}%`,
          height: `${p.height}%`,
          transform: `translate(-50%, -50%) rotate(${p.angle}deg)`,
        };

        if (p.index == null) {
          return (
            <span key={p.key} className={s.clasp} style={style}>
              <img src={asset(p.clasp!.image)} alt="" draggable={false} />
            </span>
          );
        }

        const inner = p.bead?.image ? (
          <img src={asset(p.bead.image)} alt="" draggable={false} />
        ) : (
          <span className={s.stone} aria-hidden="true" />
        );

        return onPlace ? (
          <button
            key={p.key}
            type="button"
            className={s.bead}
            style={style}
            onClick={() => onPlace(p.index!)}
            aria-label={`Позиция ${p.index! + 1}: ${p.bead?.title ?? ""}`}
          >
            {inner}
          </button>
        ) : (
          <span key={p.key} className={s.bead} style={style}>
            {inner}
          </span>
        );
      })}
    </div>
  );
}
