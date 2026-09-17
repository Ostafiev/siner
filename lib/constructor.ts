/* Конструктор: бусины, застёжки, размеры и расчёт кольца.
   Собрано по мобильным макетам «Дизайн конструктора бус 1 и 2».
   Картинки бусин и застёжек вырезаны из тех же PDF. */

export type BeadShape = "round" | "oval";

/** Раздел в верхнем ряду меню бусин. */
export type BeadKind = { id: string; title: string; image: string };

export type Bead = {
  id: string;
  kind: string;
  title: string;
  /* если картинки нет — бусина рисуется градиентом (матовый камень) */
  image?: string;
  shape: BeadShape;
  /** размер вдоль нити, мм — им определяется, сколько бусин влезет в изделие */
  along: number;
  /** поперёк нити, мм */
  across: number;
  /* откуда камень — показывается в списке «вы выбрали» */
  origin?: string;
};

export type Clasp = {
  id: string;
  title: string;
  image: string;
  along: number;
  across: number;
};

export const beadKinds: BeadKind[] = [
  { id: "pearl", title: "Жемчуг", image: "/img/beads/kind1.png" },
  { id: "cast", title: "Литая", image: "/img/beads/kind2.png" },
  { id: "stone", title: "Каменная", image: "/img/beads/kind3.png" },
];

/* Овальные бусины нанизаны длинной осью вдоль нити: их острые концы
   упираются в соседние бусины, а не торчат наружу. Поэтому вдоль нити
   у них 11 мм, поперёк 6 — и в изделие их влезает меньше, чем круглых. */
export const beads: Bead[] = [
  { id: "base", kind: "stone", title: "Матовый камень", shape: "round", along: 8, across: 8, origin: "Шри-Ланка" },
  { id: "stone-dark", kind: "stone", title: "Чёрная шпинель", image: "/img/beads/b1.png", shape: "round", along: 8, across: 8, origin: "Шри-Ланка" },
  { id: "stone-silver", kind: "stone", title: "Корунд в серебре", image: "/img/beads/b3.png", shape: "round", along: 8, across: 8, origin: "Вьетнам" },
  { id: "stone-steel", kind: "stone", title: "Серый корунд", image: "/img/beads/b5.png", shape: "round", along: 8, across: 8, origin: "Вьетнам" },
  { id: "stone-plain", kind: "stone", title: "Шпинель с резьбой", image: "/img/beads/kind3.png", shape: "round", along: 8, across: 8, origin: "Вьетнам" },

  { id: "cast-gold", kind: "cast", title: "Золото с чернением", image: "/img/beads/b2.png", shape: "round", along: 8, across: 8, origin: "Филиппины" },
  { id: "cast-warm", kind: "cast", title: "Золото ажурное", image: "/img/beads/b6.png", shape: "round", along: 8, across: 8, origin: "Филиппины" },
  { id: "cast-classic", kind: "cast", title: "Золото с гравировкой", image: "/img/beads/kind2.png", shape: "round", along: 8, across: 8, origin: "Филиппины" },
  { id: "cast-oval", kind: "cast", title: "Золотая маркиза", image: "/img/beads/b4.png", shape: "oval", along: 11, across: 6, origin: "Филиппины" },
  { id: "cast-oval-2", kind: "cast", title: "Маркиза с чернением", image: "/img/beads/kind4.png", shape: "oval", along: 11, across: 6, origin: "Вьетнам" },

  { id: "pearl-white", kind: "pearl", title: "Жемчужина", image: "/img/beads/kind1.png", shape: "round", along: 9, across: 9, origin: "Таиланд" },
];

/* Застёжка размером с бусину: её шарик 8 мм, как круглая бусина, плюс
   короткий язычок. Пропорции картинки 194×139 — отсюда 11 на 8. */
export const clasps: Clasp[] = [
  { id: "black", title: "С чернением", image: "/img/beads/clasp1.png", along: 11, across: 8 },
  { id: "white", title: "С камнями", image: "/img/beads/clasp2.png", along: 11, across: 8 },
];

/** Длина изделия в сантиметрах — как в макете. */
export const lengths = [30, 35, 40, 45, 50, 55, 60];

export const findBead = (id: string) => beads.find((b) => b.id === id);
export const findClasp = (id: string) => clasps.find((c) => c.id === id) ?? clasps[0];
export const beadsOfKind = (kind: string) => beads.filter((b) => b.kind === kind);

/**
 * Сколько бусин помещается в изделие: длина за вычетом застёжки делится
 * на размер бусины вдоль нити. Поэтому длиннее изделие — больше бусин,
 * крупнее бусина — меньше.
 */
export function beadCount(lengthCm: number, beadAlongMm: number, claspAlongMm: number) {
  return Math.max(8, Math.round((lengthCm * 10 - claspAlongMm) / beadAlongMm));
}

export type RingItem = {
  key: string;
  /** позиция в изделии; у застёжки её нет */
  index: number | null;
  bead?: Bead;
  clasp?: Clasp;
  left: number;
  top: number;
  width: number;
  height: number;
  angle: number;
};

/**
 * Раскладка кольца в процентах от габарита — вёрстка не зависит от размера
 * экрана. Элементы кладутся встык по длине дуги, поэтому соседи
 * соприкасаются, даже когда бусины разного размера.
 * Застёжка всегда стоит наверху изделия.
 */
export function ringLayout(slots: string[], clasp: Clasp): RingItem[] {
  type Part = {
    key: string;
    index: number | null;
    bead?: Bead;
    clasp?: Clasp;
    along: number;
    across: number;
    /* застёжка нарисована вдоль горизонтали, бусины — вдоль вертикали */
    flat: boolean;
  };

  const parts: Part[] = [
    { key: "clasp", index: null, clasp, along: clasp.along, across: clasp.across, flat: true },
    ...slots.map((id, i) => {
      const bead = findBead(id) ?? findBead("base")!;
      return { key: `b${i}`, index: i, bead, along: bead.along, across: bead.across, flat: false };
    }),
  ];

  const total = parts.reduce((sum, p) => sum + p.along, 0);
  const r = total / (2 * Math.PI);
  const widest = Math.max(...parts.map((p) => Math.max(p.along, p.across)));
  const extent = 2 * r + widest;

  const start = parts[0].along / 2;
  let acc = 0;

  return parts.map((p) => {
    const centre = acc + p.along / 2;
    acc += p.along;
    const a = -Math.PI / 2 + (centre - start) / r;

    const w = p.flat ? p.along : p.across;
    const h = p.flat ? p.across : p.along;
    const angle = (a * 180) / Math.PI + (p.flat ? 90 : 180);

    return {
      key: p.key,
      index: p.index,
      bead: p.bead,
      clasp: p.clasp,
      left: ((r * Math.cos(a) + extent / 2) / extent) * 100,
      top: ((r * Math.sin(a) + extent / 2) / extent) * 100,
      width: (w / extent) * 100,
      height: (h / extent) * 100,
      angle,
    };
  });
}

/* Шаги из макета «Инструкция» — показываются в модальном окне. */
export const instruction = [
  "Выберите размер изделия согласно инструкции",
  "Выберите бусину в списке справа",
  "Нажмите на место в изделии — бусина встанет туда",
  "Когда всё будет готово, оформите заказ",
];
