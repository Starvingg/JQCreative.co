"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const logos = [
  {
    id: 1,
    src: "/gallery/logos/JQC_Client_Black-01_Hotworx.svg",
    alt: "Client 1",
  },
  {
    id: 2,
    src: "/gallery/logos/JQC_Client_Black-02_Dotdigital.svg",
    alt: "Client 2",
  },
  {
    id: 3,
    src: "/gallery/logos/JQC_Client_Black-03_EliteAmenity.svg",
    alt: "Client 3",
  },
  {
    id: 4,
    src: "gallery/logos/JQC_Client_Black-04_SuitUp.svg",
    alt: "Client 4",
  },
  {
    id: 5,
    src: "/gallery/logos/JQC_Client_Black_10_Ootd.svg",

    alt: "Client 5",
  },
  {
    id: 6,
    src: "/gallery/logos/JQC_Client_Black-05_JacksJokers.svg",
    alt: "Client 6",
  },
  {
    id: 7,
    src: "/gallery/logos/JQC_Client_Black-06_Pinkloud.svg",
    alt: "Client 7",
  },
  {
    id: 8,
    src: "/gallery/logos/JQC_Client_Black-07_SpringPlace.svg",
    alt: "Client 8",
  },
  {
    id: 9,
    src: "/gallery/logos/JQC_Client_Black-08_Daphne.svg",
    alt: "Client 9",
  },
  {
    id: 10,
    src: "/gallery/logos/JQC_Client_Black-09_Downtime.svg",
    alt: "Client 10",
  },
];

export default function LogoCarousel() {
  const containerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const logoWidth = 150 + 60; // 150px logo width + 60px gap
      const totalWidth = logos.length * logoWidth * 2; // * 2 because of the doubled logos for looping
      container.style.setProperty("--total-width", `${totalWidth}px`);
      setIsReady(true); // Animation starts when the total width is set
    }

    // Safari-specific fix for image loading
    if (
      navigator.userAgent.indexOf("Safari") !== -1 &&
      navigator.userAgent.indexOf("Chrome") === -1
    ) {
      document.querySelectorAll(".logo-image").forEach((img) => {
        if (img instanceof HTMLImageElement) {
          img.loading = "eager";
        }
      });
    }
  }, []);

  return (
    <div className="relative  w-full overflow-hidden py-5">
      <div
        ref={containerRef}
        className={`flex flex-row items-center h-16 ${isReady ? "animate-slide" : ""}`}
      >
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={`${logo.id}-${index}`}
            className="flex-shrink-0 w-[150px] mx-[30px] md:mx-[60px] lg:mx-[70px] flex items-center justify-center"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={150}
              height={100}
              sizes="(max-width:768px) 100px, 150px"
              priority={index < 3}
              className="max-h-20 w-auto object-contain logo-image"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white to-transparent" />
      <div className="absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white to-transparent" />
      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-1 * var(--total-width) / 2));
          }
        }
        .animate-slide {
          animation: slide 60s linear infinite;
          width: var(--total-width);
        }
      `}</style>
    </div>
  );
}
