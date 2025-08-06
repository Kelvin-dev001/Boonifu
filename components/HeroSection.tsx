"use client";
import { motion } from "framer-motion";
import MascotCarousel from "@/components/MascotCarousel";

type HeroSectionProps = {
  onCreatePosterClick?: () => void;
};

export default function HeroSection({ onCreatePosterClick }: HeroSectionProps) {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center items-center text-center pt-32 pb-10 bg-boonifu-light relative overflow-hidden font-poppins">
      {/* Animated gradient blobs with subtle rabbit hole effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.38, scale: 1.14, x: [0, 30, 0], y: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        className="absolute -top-40 -left-36 w-[28rem] h-[28rem] bg-boonifu-gold rounded-full filter blur-3xl opacity-70 z-0"
        style={{
          background: "radial-gradient(circle at 30% 30%, #FFD70099 70%, #fff0 100%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.74 }}
        animate={{ opacity: 0.23, scale: 1.13, x: [0, -18, 0], y: [0, 12, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-boonifu-accent rounded-full filter blur-3xl opacity-60 z-0"
        style={{
          background: "radial-gradient(circle at 70% 60%, #FFB800BB 70%, #fff0 100%)",
        }}
      />
      <motion.h1
        initial={{ y: 64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 70, delay: 0.17 }}
        className="text-4xl sm:text-6xl font-extrabold text-boonifu-orange drop-shadow-lg relative z-10 font-quicksand leading-tight"
      >
        Instant Posters & Social Media Designs<br />
        <span className="text-boonifu-gold">for Your Business</span>
      </motion.h1>
      <motion.p
        initial={{ y: 48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 60 }}
        className="mt-6 text-xl sm:text-2xl text-boonifu-accent font-medium relative z-10"
      >
        Starting at <span className="font-bold text-boonifu-gold">Ksh 50</span>.<br />
        No design skills needed. Prompt-Pay-Download.
      </motion.p>
      <motion.button
        whileHover={{
          scale: 1.1,
          backgroundColor: "#FFD700",
          boxShadow: "0 8px 32px #ffd70044",
        }}
        whileTap={{ scale: 0.95 }}
        className="mt-10 px-10 py-4 bg-boonifu-gold text-white text-xl font-bold rounded-2xl shadow-xl hover:bg-boonifu-orange transition relative z-10 font-poppins"
        onClick={onCreatePosterClick}
      >
        Create Poster
      </motion.button>
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-14 z-10 w-full"
      >
        <MascotCarousel />
      </motion.div>
    </section>
  );
}