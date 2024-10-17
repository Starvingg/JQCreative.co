"use client";
import FontTest from "@/components/font-test";
import Footer from "@/components/footer";
import InfinityHero from "@/components/InfinityHero";
import LogoCarousel from "@/components/logo-carousel";
import OurProcess from "@/components/our-process";
import ScrollBar from "@/components/scroll-bar";

export default function Home() {
  return (
    <>
      <ScrollBar />
      <LogoCarousel />
      <OurProcess />
      <FontTest />
      <Footer />
    </>
  );
}
