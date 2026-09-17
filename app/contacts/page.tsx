import type { Metadata } from "next";
import TextPage from "@/components/TextPage";
import { textPages } from "@/lib/pages";

const page = textPages.contacts;

export const metadata: Metadata = { title: page.title };

export default function Page() {
  return <TextPage page={page} />;
}
