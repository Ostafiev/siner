import type { Metadata } from "next";
import AccountPage from "@/components/AccountPage";
import OrderCard from "@/components/OrderCard";
import { orders } from "@/lib/orders";
import s from "./orders.module.css";

export const metadata: Metadata = { title: "Заказы" };

export default function OrdersPage() {
  return (
    <AccountPage
      crumbs={[{ label: "Личный кабинет", href: "/orders" }, { label: "Заказы" }]}
      account
    >
      <div className={s.grid}>
        {orders.map((o) => (
          <OrderCard key={o.id} order={o} />
        ))}
      </div>
    </AccountPage>
  );
}
