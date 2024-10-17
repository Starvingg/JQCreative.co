"use client";
import FontTest from "@/components/font-test";
import Footer from "@/components/footer";
import InfinityHero from "@/components/InfinityHero";
import LogoCarousel from "@/components/logo-carousel";
import OurProcess from "@/components/our-process";
import ScrollBar from "@/components/scroll-bar";
import TestimonialSection from "@/components/testimonials";

export default function Home() {
  return (
    <>
      <ScrollBar />
      <LogoCarousel />
      <OurProcess />
      <TestimonialSection />
      <FontTest />
      <Footer />
    </>
  );
}
