import { BentoDemo } from "@/components/bent-demo";
import FontTest from "@/components/font-test";
import Footer from "@/components/footer";
import HeroAnimation from "@/components/hero-animation";
import InfinityHero from "@/components/InfinityHero";
import LogoCarousel from "@/components/logo-carousel";
import OurProcess from "@/components/our-process";
import ScrollBar from "@/components/scroll-bar";
import TestimonialSection from "@/components/testimonials";
import { BentoCard } from "@/components/ui/bento-grid";

export default function Home() {
  return (
    <div className="">
      <LogoCarousel />
      <BentoDemo />
      <TestimonialSection />
      <OurProcess />
      <Footer />
    </div>
  );
}
