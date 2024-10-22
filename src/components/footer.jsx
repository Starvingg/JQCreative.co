"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

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
            <svg
              id="logo-svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 190.976 57.291"
              className="w-32 h-auto"
              style={{
                fill: isHovered ? "transparent" : "currentColor",
                stroke: isClicked
                  ? "#2563eb"
                  : isHovered
                    ? "white"
                    : "currentColor",
                strokeWidth: isHovered ? "2" : "0",
                transition: "all 0.3s ease",
              }}
            >
              <g>
                <path d="M22.367.054c0,19.062,0,38.077,0,57.237,18.652,0,37.308,0,56.059,0,0-11.402,0-22.8,0-34.315-11.12,0-22.234,0-33.462,0,0,3.717,0,7.435,0,11.351,7.364,0,14.765,0,22.28,0,0,3.97,0,7.742,0,11.582-11.245,0-22.368,0-33.601,0,0-11.528,0-22.973,0-34.534,18.67,0,37.283,0,56.077,0,0,15.241,0,30.493,0,45.894,26.33,0,52.479,0,78.766,0,0-19.055,0-38.107,0-57.269-18.649,0-37.254,0-55.957,0,0,11.428,0,22.769,0,34.249,11.083,0,22.196,0,33.446,0,0-3.693,0-7.452,0-11.389-7.426,0-14.83,0-22.349,0,0-3.888,0-7.601,0-11.457,11.22,0,22.388,0,33.681,0,0,11.449,0,22.895,0,34.468-18.669,0-37.327,0-56.13,0,0-15.257,0-30.461,0-45.816-26.339,0-52.534,0-78.811,0Z" />
                <path d="M10.821,0C7.188,0,3.663,0,0,0c0,19.081,0,38.124,0,57.291,3.539,0,7.112,0,10.821,0,0-18.998,0-38.042,0-57.291Z" />
                <path d="M190.976,0c-3.647,0-7.168,0-10.821,0,0,19.098,0,38.137,0,57.291,3.557,0,7.126,0,10.821,0,0-19.01,0-38.052,0-57.291Z" />
              </g>
            </svg>
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
