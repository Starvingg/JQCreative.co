"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CardStack } from "./ui/card-stack";
import { Highlight } from "./highlight-section";
import Fader from "./fader";
const CARDS = [
  {
    id: 0,
    name: "Manu Arora",
    designation: "Senior Software Engineer",
    content: (
      <p>
        These cards are amazing, <Highlight>I want to use them</Highlight> in my
        project. Framer motion is a godsend ngl tbh fam 🙏
      </p>
    ),
  },
  {
    id: 1,
    name: "Elon Musk",
    designation: "Senior Shitposter",
    content: (
      <p>
        I dont like this Twitter thing,{" "}
        <Highlight>deleting it right away</Highlight> because yolo. Instead, I
        would like to call it <Highlight>X.com</Highlight> so that it can easily
        be confused with adult sites.
      </p>
    ),
  },
  {
    id: 2,
    name: "Tyler Durden",
    designation: "Manager Project Mayhem",
    content: (
      <p>
        The first rule of
        <Highlight>Fight Club</Highlight> is that you do not talk about fight
        club. The second rule of
        <Highlight>Fight club</Highlight> is that you DO NOT TALK about fight
        club.
      </p>
    ),
  },
];

export default function TestimonialSection() {
  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-2  items-center">
          <div className="w-full lg:w-1/2 mb-8  lg:mb-0">
            <Fader duration={0.4} delay={0.6}>
              <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
                What Our Customers Say
              </h2>
              <p className="text-lg sm:text-xl text-gray-600">
                Don't just take our word for it. Here's what our clients have to
                say about our services.
              </p>
            </Fader>
          </div>
          <Fader
            duration={0.8}
            delay={0.8}
            classStyle="w-full lg:w-1/2 relative h-[40rem] sm:h-[30rem]"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <CardStack items={CARDS} />
            </div>
          </Fader>
        </div>
      </div>
    </section>
  );
}
