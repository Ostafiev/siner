/* Заказы и данные кабинета.
   Аккаунтов на сайте пока нет, поэтому здесь демонстрационные данные —
   они нужны, чтобы страницы кабинета можно было посмотреть и согласовать.
   Когда появится регистрация, этот файл заменится запросом к базе. */

export type OrderStatus = "placed" | "delivered";

export type OrderLine = {
  slug: string;
  category: string;
  /* выбранные варианты — то, что клиент отметил в карточке товара */
  base?: string;
  pearl?: string;
  size?: string;
};

export type Order = {
  id: string;
  status: OrderStatus;
  date: string;
  address: string;
  recipient: string;
  tracking?: string;
  items: OrderLine[];
};

export const statusLabel: Record<OrderStatus, string> = {
  placed: "Оформлен",
  delivered: "Доставлен",
};

const spb = "Санкт-Петербург, Литейный пр-т 15";

export const account = { name: "Name", email: "name@gmail.com" };

export const orders: Order[] = [
  {
    id: "6678453",
    status: "placed",
    date: "21.10.2022",
    address: spb,
    recipient: "Имя Фамилия",
    tracking: "#",
    items: [
      { slug: "ring-10", category: "rings", base: "Золото", pearl: "Золотистый", size: "17" },
      { slug: "ring-11", category: "rings", base: "Серебро с чернением", pearl: "Серый", size: "17" },
    ],
  },
  {
    id: "1178453",
    status: "delivered",
    date: "14.08.2022",
    address: spb,
    recipient: "Имя Фамилия",
    tracking: "#",
    items: [
      { slug: "ring-4", category: "rings", base: "Золото с чернением", size: "17" },
      { slug: "ring-6", category: "rings", base: "Золото", size: "16,5" },
      { slug: "ring-2", category: "rings", base: "Серебро", size: "17" },
      { slug: "ring-8", category: "rings", base: "Серебро с чернением", size: "16" },
    ],
  },
  {
    id: "1178452",
    status: "delivered",
    date: "02.06.2022",
    address: spb,
    recipient: "Имя Фамилия",
    tracking: "#",
    items: [
      { slug: "ring-3", category: "rings", base: "Золото", size: "17" },
      { slug: "ring-5", category: "rings", base: "Золото с чернением", size: "17" },
      { slug: "ring-7", category: "rings", base: "Серебро", size: "16,5" },
      { slug: "ring-9", category: "rings", base: "Серебро с чернением", size: "17" },
    ],
  },
];

export const findOrder = (id: string) => orders.find((o) => o.id === id);
