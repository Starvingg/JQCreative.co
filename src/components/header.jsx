'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'

const NavLink = ({ href, children }) => (
  <Link href={href} className="text-gray-600 hover:text-gray-900 relative group">
    {children}
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </Link>
)

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCompanyMenuOpen, setIsCompanyMenuOpen] = useState(false)
  const [isMobileCompanyMenuOpen, setIsMobileCompanyMenuOpen] = useState(false)
  const companyMenuRef = useRef(null)
  const timeoutRef = useRef(null)

  const toggleMenu = () => setIsOpen(!isOpen)

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

  const toggleMobileCompanyMenu = () => {
    setIsMobileCompanyMenuOpen((prev) => !prev)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (companyMenuRef.current && !companyMenuRef.current.contains(event.target)) {
        setIsCompanyMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }

    return () => {
      document.body.style.overflow = 'visible'
    }
  }, [isOpen])

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-screen-2xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="20" fill="#4A90E2" />
              <path d="M12 20L18 26L28 16" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="sr-only">Creative Agency</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink href="/services">Services</NavLink>
            <NavLink href="/products">Products</NavLink>
            <NavLink href="/blog">Blog</NavLink>
            <div
              className="relative group"
              onMouseEnter={handleCompanyMouseEnter}
              onMouseLeave={handleCompanyMouseLeave}
              ref={companyMenuRef}
            >
              <button className="text-gray-600 hover:text-gray-900 flex items-center relative">
                Company
                <ChevronDown className="ml-1 h-4 w-4" />
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <AnimatePresence>
                {isCompanyMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                  >
                    <Link href="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      About Us
                    </Link>
                    <Link href="/faq" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      FAQ
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link href="/contact" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
              Contact Us
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            <span className="sr-only">Toggle menu</span>
            {isOpen ? <X className="h-6 w-6 text-gray-900" /> : <Menu className="h-6 w-6 text-gray-900" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white fixed top-[72px] left-0 w-full h-[calc(100vh-72px)] overflow-y-auto z-40"
          >
            <div className="max-w-screen-2xl mx-auto px-4 py-4 space-y-2">
              <Link href="/services" className="block text-gray-600 hover:text-gray-900 bg-gray-100 rounded p-2">
                Services
              </Link>
              <Link href="/products" className="block text-gray-600 hover:text-gray-900 bg-gray-100 rounded p-2">
                Products
              </Link>
              <Link href="/blog" className="block text-gray-600 hover:text-gray-900 bg-gray-100 rounded p-2">
                Blog
              </Link>
              <div className="bg-gray-100 rounded p-2">
                <button
                  onClick={toggleMobileCompanyMenu}
                  className="text-gray-600 hover:text-gray-900 flex items-center w-full justify-between"
                >
                  Company
                  <ChevronDown
                    className={`h-4 w-4 transform transition-transform duration-200 ${
                      isMobileCompanyMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isMobileCompanyMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-2 space-y-2"
                    >
                      <Link href="/about" className="block text-sm text-gray-700 hover:text-gray-900 bg-gray-200 rounded p-2">
                        About Us
                      </Link>
                      <Link href="/faq" className="block text-sm text-gray-700 hover:text-gray-900 bg-gray-200 rounded p-2">
                        FAQ
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link
                href="/contact"
                className="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 text-center"
              >
                Contact Us
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
