"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Accessibility: Close menu on Escape key or route change
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [mobileOpen]);

  // Accessibility: Close on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileOpen]);

  // Prevent background scroll
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="w-full py-3 px-4 sm:px-8 flex items-center justify-between bg-white/90 backdrop-blur-lg shadow-md fixed top-0 left-0 z-50 font-poppins border-b border-neutral-100 transition-all">
      {/* Logo with subtle rabbit hole hover */}
      <Link
        href="/"
        className="group flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-boonifu-gold rounded"
        aria-label="Go to home"
      >
        <motion.span
          whileHover={{ textShadow: "0px 0px 16px #FFD700" }}
          className="text-2xl font-bold text-boonifu-gold font-quicksand tracking-tight drop-shadow-sm"
        >
          Boonifu
        </motion.span>
        <span className="text-xs bg-boonifu-accent/10 text-boonifu-accent px-2 py-0.5 rounded-full shadow-sm">Beta</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-4">
        {navLinks.map(({ label, href }) => (
          <motion.a
            key={href}
            href={href}
            whileHover={{ scale: 1.08, color: "#FFD700", textShadow: "0 2px 16px #FFD70060" }}
            className="text-base font-medium text-boonifu-orange hover:text-boonifu-gold px-3 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-boonifu-gold transition-all"
          >
            {label}
          </motion.a>
        ))}
        <Link href="/login" tabIndex={-1}>
          <motion.button
            whileHover={{ scale: 1.09, backgroundColor: "#FFB800" }}
            className="ml-3 bg-boonifu-gold text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:bg-boonifu-orange focus:outline-none focus:ring-2 focus:ring-boonifu-gold transition-all"
          >
            Login
          </motion.button>
        </Link>
      </nav>

      {/* Hamburger - enhanced touch target and animation */}
      <motion.button
        className="md:hidden flex items-center justify-center text-boonifu-gold focus:outline-none focus:ring-2 focus:ring-boonifu-gold p-2 rounded-lg shadow hover:bg-boonifu-gold/10 transition"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        onClick={() => setMobileOpen((v) => !v)}
        whileTap={{ scale: 0.93 }}
      >
        {mobileOpen ? (
          <XMarkIcon className="w-8 h-8" />
        ) : (
          <Bars3Icon className="w-8 h-8" />
        )}
      </motion.button>

      {/* Mobile Menu with animated rabbit hole fade-in */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            ref={navRef}
            key="mobile-menu"
            initial={{ opacity: 0, y: -32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 340, damping: 32 }}
            className="fixed inset-0 z-50 flex flex-col px-8 py-10 bg-gradient-to-br from-boonifu-gold/95 via-white/90 to-boonifu-accent/10 text-boonifu-orange border-t-4 border-boonifu-gold shadow-2xl"
            aria-modal="true"
            role="dialog"
            style={{
              background:
                "radial-gradient(ellipse at 60% 20%, #FFD700 0%, #fff 70%, #FFB80011 100%)",
            }}
          >
            <div className="flex items-center justify-between mb-10">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-boonifu-gold rounded"
                aria-label="Go to home"
              >
                <span className="text-2xl font-bold text-boonifu-gold font-quicksand tracking-tight">Boonifu</span>
                <span className="text-xs bg-boonifu-accent/10 text-boonifu-accent px-2 py-0.5 rounded-full">Beta</span>
              </Link>
              <button
                className="text-boonifu-gold focus:outline-none focus:ring-2 focus:ring-boonifu-gold p-2 rounded-lg"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <XMarkIcon className="w-8 h-8" />
              </button>
            </div>
            <ul className="flex flex-col gap-6 text-xl font-semibold">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="block py-2 px-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-boonifu-gold text-boonifu-orange hover:bg-boonifu-gold hover:text-white transition-all"
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li className="mt-5">
                <Link href="/login">
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="w-full bg-boonifu-gold text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-boonifu-orange focus:outline-none focus:ring-2 focus:ring-boonifu-gold transition-all"
                  >
                    Login
                  </button>
                </Link>
              </li>
            </ul>
            <motion.div
              className="mt-auto pt-10 text-center text-xs text-gray-400 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.4 }}
            >
              &copy; {new Date().getFullYear()} Boonifu. All rights reserved.
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}