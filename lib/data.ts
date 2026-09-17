/* Контент главной. Пока статика — когда появится бэкенд/CMS,
   меняется только этот файл, компоненты трогать не нужно. */

export type Bead = {
  id: string;
  title: string;
  category: string;
  image: string;
  href: string;
};

/* Бусины в карусели новинок. Цену не показываем — решение заказчика.
   Названия временные, заменятся, когда появится админка. */
export const beads: Bead[] = [
  { id: "b1", title: "Чёрная шпинель", category: "Шри-Ланка", image: "/img/bead-4.png", href: "/constructor" },
  { id: "b2", title: "Золото с чернением", category: "Филиппины", image: "/img/bead-1.png", href: "/constructor" },
  { id: "b3", title: "Корунд с резьбой", category: "Вьетнам", image: "/img/bead-2.png", href: "/constructor" },
  { id: "b4", title: "Золотая маркиза", category: "Филиппины", image: "/img/bead-3.png", href: "/constructor" },
  { id: "b5", title: "Серый корунд", category: "Вьетнам", image: "/img/bead-4.png", href: "/constructor" },
];

/* Новости живут в отдельном файле — там же лежат тексты статей.
   Здесь оставлен реэкспорт, чтобы блок новостей на главной не менялся. */
export { articles as news, type Article as NewsItem } from "./news";

/* Пункты выезжающего меню. Порядок и состав правятся здесь. */
export const nav = [
  { label: "Конструктор", href: "/constructor" },
  { label: "Каталог", href: "/catalog" },
  { label: "Новости", href: "/news" },
  { label: "Избранное", href: "/wishlist" },
  { label: "Корзина", href: "/cart" },
  { label: "Заказы", href: "/orders" },
  { label: "О нас", href: "/about" },
  { label: "Доставка и оплата", href: "/delivery" },
  { label: "Контакты", href: "/contacts" },
];

export const contacts = {
  email: "admin@sinnergem.com",
  phone: "+66816531420",
  socials: [
    { label: "Whatsapp", href: "https://wa.me/66816531420", icon: "whatsapp" },
    { label: "Instagram", href: "#", icon: "instagram" },
    { label: "Telegram", href: "#", icon: "telegram" },
    { label: "Youtube", href: "#", icon: "youtube" },
  ],
  legal: [
    { label: "Конфиденциальность", href: "/privacy" },
    { label: "Пользовательское соглашение", href: "/terms" },
  ],
};
