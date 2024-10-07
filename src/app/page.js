"use client";
import { DualViewDesignProcess } from "@/components/dual-view-design-process";
import FontTest from "@/components/font-test";
import InfinityHero from "@/components/InfinityHero";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <InfinityHero />
      <FontTest />
      {/* <DualViewDesignProcess /> */}
    </>
  );
}
