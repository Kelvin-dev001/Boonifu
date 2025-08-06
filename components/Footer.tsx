"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-white/90 py-10 px-4 border-t-2 border-boonifu-gold/30 mt-16 font-poppins shadow-inner">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-boonifu-gold font-quicksand drop-shadow-sm">Boonifu</span>
          <span className="text-xs bg-boonifu-accent/10 text-boonifu-accent px-2 py-0.5 rounded-full shadow">
            Made in Africa 🇰🇪
          </span>
        </div>
        <div className="flex gap-5 text-boonifu-accent text-xl">
          <motion.a
            href="https://wa.me/"
            target="_blank"
            whileHover={{ color: "#25D366", scale: 1.15 }}
            className="hover:text-boonifu-gold transition flex items-center gap-1"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
            <span className="hidden sm:inline text-sm">WhatsApp</span>
          </motion.a>
          <motion.a
            href="https://instagram.com/"
            target="_blank"
            whileHover={{ color: "#E1306C", scale: 1.15 }}
            className="hover:text-boonifu-gold transition flex items-center gap-1"
            aria-label="Instagram"
          >
            <FaInstagram />
            <span className="hidden sm:inline text-sm">Instagram</span>
          </motion.a>
          <motion.a
            href="https://facebook.com/"
            target="_blank"
            whileHover={{ color: "#1877F3", scale: 1.15 }}
            className="hover:text-boonifu-gold transition flex items-center gap-1"
            aria-label="Facebook"
          >
            <FaFacebook />
            <span className="hidden sm:inline text-sm">Facebook</span>
          </motion.a>
        </div>
        <div className="text-xs text-boonifu-gold mt-2 sm:mt-0 text-center">
          &copy; {new Date().getFullYear()} Boonifu. All rights reserved.
        </div>
      </div>
    </footer>
  );
}