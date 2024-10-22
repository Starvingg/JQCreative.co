'use client'

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Menu, X } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCompanyMenuOpen, setIsCompanyMenuOpen] = useState(false)
  const [isMobileCompanyMenuOpen, setIsMobileCompanyMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const timeoutRef = useRef(null)

  const toggleMenu = () => setIsOpen(!isOpen)

  const toggleMobileCompanyMenu = () => {
    setIsMobileCompanyMenuOpen((prev) => !prev)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleCompanyMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsCompanyMenuOpen(true)
  }

  const handleCompanyMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsCompanyMenuOpen(false)
    }, 250)
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "visible"
    }

    return () => {
      document.body.style.overflow = "visible"
    }
  }, [isOpen])

  return (
    <>
      <header
        className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "" : ""
        }`}
      >
        <div className="w-full">
          <div className="flex justify-between items-center ring-1 ring-muted bg-opacity-90 backdrop-blur-md py-3">
            <div className="flex-shrink-0 px-4">
              <Link href="/" className="flex items-center space-x-2">
                <img
                  src="/images/JQC_SVG_LOGO.svg"
                  alt="Creative Agency Logo"
                  className="h-6"
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden border-black rounded-3xl bg-gray-50 p-1.5 md:flex items-center space-x-6">
              <Link
                href="/services"
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition duration-300"
              >
                Services
              </Link>
              <Link
                href="/products"
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition duration-300"
              >
                Products
              </Link>
              <Link
                href="/blog"
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition duration-300"
              >
                Blog
              </Link>
              <div
                className="relative group"
                onMouseEnter={handleCompanyMouseEnter}
                onMouseLeave={handleCompanyMouseLeave}
              >
                <button className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition duration-300 px-4 py-2">
                  <span>Company</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </nav>

            <div className="hidden md:block px-4">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-3xl text-white bg-blue-600 hover:bg-blue-700 transition duration-300"
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden px-4 py-2 text-gray-500 hover:text-gray-600 transition duration-300"
              onClick={toggleMenu}
            >
              <span className="sr-only">Toggle menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Company Dropdown Menu */}
      <AnimatePresence>
        {isCompanyMenuOpen && (
          <motion.div
            key="company-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 w-48 bg-muted rounded-md shadow-lg py-2 z-50"
          >
            <Link
              href="/about"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition duration-300"
            >
              About Us
            </Link>
            <Link
              href="/faq"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition duration-300"
            >
              FAQ
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            key="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween" }}
            className="fixed inset-0 bg-white z-50 overflow-y-auto"
          >
            <div className="flex justify-between items-center py-4 px-6 border-b">
              <div className="flex-shrink-0">
                <Image
                  src="/images/JQC_SVG_LOGO.svg"
                  alt="Logo"
                  width={64}
                  height={64}
                />
              </div>
              <button
                className="text-gray-500 hover:text-gray-600 focus:outline-none"
                onClick={toggleMenu}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="py-6 px-6 space-y-6">
              <Link
                href="/services"
                className="block text-gray-800 text-xl font-medium"
              >
                Services
              </Link>
              <Link
                href="/products"
                className="block text-gray-800 text-xl font-medium"
              >
                Products
              </Link>
              <Link
                href="/blog"
                className="block text-gray-800 text-xl font-medium"
              >
                Blog
              </Link>
              <div>
                <button
                  onClick={toggleMobileCompanyMenu}
                  className="flex items-center justify-between w-full text-gray-800 text-xl font-medium"
                  aria-expanded={isMobileCompanyMenuOpen}
                >
                  Company
                  <ChevronDown
                    className={`h-5 w-5 transform transition-transform duration-200 ${
                      isMobileCompanyMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isMobileCompanyMenuOpen && (
                    <motion.div
                      key="mobile-company-menu"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-2 space-y-1"
                    >
                      <Link
                        href="/about"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition duration-300"
                      >
                        About Us
                      </Link>
                      <Link
                        href="/faq"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition duration-300"
                      >
                        FAQ
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}