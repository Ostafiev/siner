/* Контент главной. Пока статика — когда появится бэкенд/CMS,
   меняется только этот файл, компоненты трогать не нужно. */

export type Bead = {
  id: string;
  title: string;
  category: string;
  price: string;
  currency: string;
  image: string;
  href: string;
};

export const beads: Bead[] = [
  {
    id: "b1",
    title: "название бусины",
    category: "категория",
    price: "цена\nпо запросу",
    currency: "рублей",
    image: "/img/bead-4.png",
    href: "/catalog/1",
  },
  {
    id: "b2",
    title: "название бусины",
    category: "категория",
    price: "цена\nпо запросу",
    currency: "рублей",
    image: "/img/bead-1.png",
    href: "/catalog/2",
  },
  {
    id: "b3",
    title: "название бусины",
    category: "категория",
    price: "цена\nпо запросу",
    currency: "рублей",
    image: "/img/bead-2.png",
    href: "/catalog/3",
  },
  {
    id: "b4",
    title: "название бусины",
    category: "категория",
    price: "цена\nпо запросу",
    currency: "рублей",
    image: "/img/bead-3.png",
    href: "/catalog/4",
  },
  {
    id: "b5",
    title: "название бусины",
    category: "категория",
    price: "цена\nпо запросу",
    currency: "рублей",
    image: "/img/bead-4.png",
    href: "/catalog/5",
  },
];

export type NewsItem = {
  id: string;
  date: string;
  title: string;
  image: string;
  href: string;
};

export const news: NewsItem[] = [
  {
    id: "n1",
    date: "29/01/2023",
    title: "СБОР БУСИНЫ. казалось бы простая штука.",
    image: "/img/news-1.jpg",
    href: "/news/1",
  },
  {
    id: "n2",
    date: "29/01/2023",
    title: "интересные камни недели",
    image: "/img/news-2.jpg",
    href: "/news/2",
  },
  {
    id: "n3",
    date: "29/01/2023",
    title: "добыча шпинели и корундов. Вьетнам. Часть 1.",
    image: "/img/news-3.jpg",
    href: "/news/3",
  },
  {
    id: "n4",
    date: "29/01/2023",
    title: "интересные камни недели",
    image: "/img/news-4.jpg",
    href: "/news/4",
  },
  {
    id: "n5",
    date: "29/01/2023",
    title: "добыча шпинели и корундов. Вьетнам. Часть 1.",
    image: "/img/news-5.jpg",
    href: "/news/5",
  },
];

export const nav = [
  { label: "Конструктор", href: "/constructor" },
  { label: "Каталог", href: "/catalog" },
  { label: "О нас", href: "/about" },
  { label: "Новости", href: "/news" },
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
