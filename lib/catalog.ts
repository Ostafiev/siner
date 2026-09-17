/* Каталог: разделы и товары.
   Пока данные лежат здесь. Когда появится админка Payload — этот файл
   заменится запросом к базе, а типы и компоненты останутся теми же. */

export type Category = {
  slug: string;
  title: string;
  /* единственное число — пригодится в заголовках карточек товара */
  titleOne: string;
  /* фотография для плитки на странице разделов; появляется при наведении */
  image?: string;
};

/* Порядок как в макете страницы разделов: серьги, подвески, браслеты, кольца.
   Бусин здесь нет намеренно: они материал для конструктора, а не раздел
   каталога — решение заказчика. */
export const categories: Category[] = [
  { slug: "earrings", title: "Серьги", titleOne: "Серьга" },
  { slug: "pendants", title: "Подвески", titleOne: "Подвеска" },
  { slug: "bracelets", title: "Браслеты", titleOne: "Браслет" },
  { slug: "rings", title: "Кольца", titleOne: "Кольцо" },
];

/* -------------------------------------------------- варианты изделия */

/** Кружок жемчуга: `color` — любой CSS-фон, потом заменится фотографией. */
export type Swatch = { id: string; title: string; color: string };
/** Кнопка-вариант: основа, размер. */
export type Choice = { id: string; title: string };

export const defaultPearls: Swatch[] = [
  { id: "pink", title: "Розовый", color: "radial-gradient(circle at 34% 30%, #fff 0%, #f3ded7 38%, #d9b6ab 70%, #9d776d 100%)" },
  { id: "gold", title: "Золотой", color: "radial-gradient(circle at 34% 30%, #fff6d8 0%, #edcd7f 40%, #c99f42 74%, #8a6a24 100%)" },
  { id: "black", title: "Чёрный", color: "radial-gradient(circle at 34% 30%, #8f9296 0%, #4a4d51 38%, #24262a 72%, #0e0f11 100%)" },
  { id: "white", title: "Белый", color: "radial-gradient(circle at 34% 30%, #fff 0%, #eaf1f6 40%, #c3d2dd 74%, #8fa2b0 100%)" },
];

export const defaultBases: Choice[] = [
  { id: "gold", title: "Золото" },
  { id: "gold-black", title: "Золото с чернением" },
  { id: "silver", title: "Серебро" },
  { id: "silver-black", title: "Серебро с чернением" },
];

export const defaultSizes: Choice[] = [
  { id: "16", title: "16" },
  { id: "16.5", title: "16,5" },
  { id: "17", title: "17" },
  { id: "other", title: "Другой" },
];

/** Строка вкладки «Характеристики». `href` делает значение ссылкой. */
export type Spec = { label: string; value: string; href?: string };

/* -------------------------------------------------- товары */

export type Product = {
  slug: string;
  title: string;
  /* вторая строка подписи в карточке — в макете название всегда двухстрочное */
  subtitle?: string;
  category: string;
  /* цены на сайте не показываем — везде «цена по запросу».
     Поля оставлены: если заказчик передумает, достаточно их заполнить. */
  price?: number;
  currency?: "RUB" | "USD";
  /* превью для сетки каталога */
  image: string;
  /* галерея на странице товара; если пусто — показываем одно превью */
  gallery?: string[];
  description?: string;
  specs?: Spec[];
  /* варианты: если не заданы — берутся общие списки выше */
  pearls?: Swatch[];
  bases?: Choice[];
  sizes?: Choice[];
};

const RING_TEXT =
  "Кольцо с синим и розовым сапфиром и черными бриллиантами. Белое золото с чернением.\nКольцо из серебра с белым покрытием. Центральный камень.";

const RING_SPECS: Spec[] = [
  { label: "Размер", value: "10.2 x 7.3 mm" },
  { label: "Вес", value: "70 г" },
  { label: "Вставка", value: "Сапфир 2.3 карат 13.9 x 10.2 x 7.3 mm" },
  { label: "Сертификат", value: "Открыть", href: "#" },
];

const ring = (n: number, title: string, subtitle: string, extra: Partial<Product> = {}): Product => ({
  slug: `ring-${n}`,
  title,
  subtitle,
  category: "rings",
  image: `/img/products/ring-${n}.png`,
  description: RING_TEXT,
  specs: RING_SPECS,
  ...extra,
});

/* Временные позиции: фотографии вырезаны из макетов.
   Заменяются на настоящие карточки товара из админки. */
export const products: Product[] = [
  ring(1, "Кольцо чернёное", "с чёрным жемчугом", {
    gallery: [
      "/img/products/ring-1-1.jpg",
      "/img/products/ring-1-2.jpg",
      "/img/products/ring-1-3.jpg",
      "/img/products/ring-1-4.jpg",
    ],
  }),
  ring(2, "Кольцо золотое", "со звёздчатым сапфиром"),
  ring(3, "Кольцо розового золота", "со шпинелью"),
  ring(4, "Кольцо чернёное", "с рубеллитом"),
  ring(5, "Кольцо чернёное", "с бриллиантом"),
  ring(6, "Кольцо чернёное", "с опалом"),
  ring(7, "Кольцо розового золота", "с турмалином"),
  ring(8, "Кольцо золотое", "со спессартином"),
  ring(9, "Кольцо чернёное", "с красной шпинелью"),

  ring(10, "Кольцо золотое", "с золотистым жемчугом", {
    specs: [
      { label: "Основа", value: "Золото" },
      { label: "Вставка", value: "Жемчуг" },
      { label: "Размер", value: "17" },
    ],
  }),
  ring(11, "Кольцо серебряное", "с серым жемчугом", {
    specs: [
      { label: "Основа", value: "Серебро с чернением" },
      { label: "Вставка", value: "Жемчуг" },
      { label: "Размер", value: "17" },
    ],
  }),
];

/* Бусины в каталог не попадают: это материал для конструктора.
   Здесь они лежат, чтобы карусель новинок на главной и будущий
   конструктор брали их из одного места. */
export type Bead = { slug: string; title: string; image: string };

export const beads: Bead[] = [
  { slug: "bead-1", title: "Название бусины", image: "/img/bead-1.png" },
  { slug: "bead-2", title: "Название бусины", image: "/img/bead-2.png" },
  { slug: "bead-3", title: "Название бусины", image: "/img/bead-3.png" },
  { slug: "bead-4", title: "Название бусины", image: "/img/bead-4.png" },
];

export const PER_PAGE = 9;

export const getCategory = (slug: string) =>
  categories.find((c) => c.slug === slug);

export const productsOf = (categorySlug?: string) =>
  categorySlug ? products.filter((p) => p.category === categorySlug) : products;

export const findProduct = (categorySlug: string, productSlug: string) =>
  products.find((p) => p.category === categorySlug && p.slug === productSlug);

/** Кадры для галереи: галерея товара либо одно превью из каталога. */
export const galleryOf = (p: Product) =>
  p.gallery && p.gallery.length ? p.gallery : [p.image];

/** «$ 10 000» или «235 000 ₽» — разделитель тонкий пробел, как в макете. */
export function formatPrice(p: Product): string | null {
  if (p.price == null) return null;
  const n = p.price.toLocaleString("ru-RU").replace(/ /g, " ");
  return p.currency === "USD" ? `$ ${n}` : `${n} ₽`;
}
