"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import NewArrivals from "@/components/NewArrivals";
import News from "@/components/News";
import Footer from "@/components/Footer";
import { useReveal } from "@/lib/useReveal";

export default function HomePage() {
  useReveal();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Showcase />
        <NewArrivals />
        <News />
      </main>
      <Footer />
    </>
  );
}
