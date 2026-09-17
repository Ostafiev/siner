import type { Metadata, Viewport } from "next";

/* Шрифты self-hosted: файлы едут из node_modules в бандл, внешних запросов нет.
   Forum — заголовочный из макета. Manrope — временная замена TT Firs Neue. */
import "@fontsource/forum/cyrillic-400.css";
import "@fontsource/forum/latin-400.css";
import "@fontsource-variable/manrope";

import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: {
    default: "SINNERGEMS — авторские бусины и камни",
    template: "%s — SINNERGEMS",
  },
  description:
    "Конструктор и каталог авторских бусин ручной работы. Шпинель, корунды, редкие камни.",
  openGraph: {
    title: "SINNERGEMS",
    description: "Авторские бусины и редкие камни",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0c0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        {/* Шапка и подвал общие для всех страниц: при переходах они
            не перерисовываются, поэтому переход ощущается мгновенным. */}
        <Header />
        <main>{children}</main>
        <Footer />
        <Reveal />
      </body>
    </html>
  );
}
