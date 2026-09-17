import type { Metadata } from "next";
import PageStub from "@/components/PageStub";

export const metadata: Metadata = { title: "Страница не найдена" };

export default function NotFound() {
  return (
    <PageStub
      title="404"
      note="Такой страницы нет. Возможно, ссылка устарела или в адресе опечатка."
    />
  );
}
