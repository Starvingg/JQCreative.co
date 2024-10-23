"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Logo from "./logo";

export default function Footer() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-darker text-light py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div
            className="mb-4 md:mb-0 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setIsClicked(false);
            }}
            onMouseDown={() => setIsClicked(true)}
            onMouseUp={() => setIsClicked(false)}
            onClick={handleLogoClick}
          >
            <Logo
              isClicked={isClicked}
              isHovered={isHovered}
              isClickedColor="#2563eb"
              isHoveredStrokeWidth="2"
              currColor="currentColor"
              isHoveredColor="white"
            />
          </div>
          <nav className="flex space-x-6 mb-4 md:mb-0">
            <Link
              href="/about"
              className="hover:text-primary transition duration-300"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="hover:text-primary transition duration-300"
            >
              Contact Us
            </Link>
            <Link
              href="/get-started"
              className="hover:text-primary transition duration-300"
            >
              Get Started
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:text-primary transition duration-300"
            >
              Privacy Policy
            </Link>
          </nav>
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/company/jqc/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-light transition duration-300"
            >
              <img
                src="/images/social-icons/LinkedIn_SocialMedia.svg"
                alt="LinkedIn"
                width={24}
                height={24}
                className="transition-opacity duration-300 hover:opacity-50"
              />
            </a>
            <a
              href="https://x.com/JQCreative_Co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-light transition duration-300"
            >
              <img
                src="/images/social-icons/X_SocialMedia.svg"
                alt="X"
                width={24}
                height={24}
                className="transition-opacity duration-300 hover:opacity-50"
              />
            </a>
            <a
              href="https://instagram.com/jqcreative.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-light transition duration-300"
            >
              <img
                src="/images/social-icons/Instagram_SocialMedia.svg"
                alt="Instagram"
                width={24}
                height={24}
                className="transition-opacity duration-300 hover:opacity-50"
              />
            </a>
          </div>
        </div>
        <div className="border-t border-dark pt-8 text-center text-sm text-muted">
          © {new Date().getFullYear()} JQ Creative Company LLC. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
