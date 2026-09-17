import type { Metadata } from "next";
import AccountPage from "@/components/AccountPage";
import WishlistView from "@/components/WishlistView";

export const metadata: Metadata = { title: "Избранное" };

export default function WishlistPage() {
  return (
    <AccountPage crumbs={[{ label: "Главная", href: "/" }, { label: "Избранное" }]}>
      <WishlistView />
    </AccountPage>
  );
}
