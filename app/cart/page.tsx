import type { Metadata } from "next";
import AccountPage from "@/components/AccountPage";
import CartView from "@/components/CartView";

export const metadata: Metadata = { title: "Корзина" };

export default function CartPage() {
  return (
    <AccountPage title="Корзина" account>
      <CartView />
    </AccountPage>
  );
}
