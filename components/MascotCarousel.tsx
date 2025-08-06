// components/MascotCarousel.tsx
"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const mascots = [
  {
    src: "/mascot-baker.svg",
    alt: "Baker Mascot",
    label: "Baker",
  },
  {
    src: "/mascot-mamamboga.svg",
    alt: "Mama Mboga",
    label: "Mama Mboga",
  },
  {
    src: "/mascot-shopkeeper.svg",
    alt: "Shopkeeper Mascot",
    label: "Shopkeeper",
  },
  
  {
    src: "/mascot-artist.svg",
    alt: "Artist Mascot",
    label: "Artist",
  },
  {
    src: "/mascot-butcher.svg",
    alt: "Butcher Mascot",
    label: "Butcher",
  },
  {
    src: "/mascot-fashion.svg",
    alt: "Fashion Designer Mascot",
    label: "Fashion Designer",
  },
  {
    src: "/mascot-rider.svg",
    alt: "Rider  Mascot",
    label: "Rider",
  },
  {
    src: "/mascot-salonist.svg",
    alt: "Salonist Mascot",
    label: "Salonist",
  },
  {
    src: "/mascot-lawyer.svg",
    alt: "lawyer Mascot",
    label: "Lawyer",
  },
  {
    src: "/mascot-pastor.svg",
    alt: "pastor Mascot",
    label: "Pastor",
  },
  {
    src: "/mascot-Handyman.svg",
    alt: "handyman Mascot",
    label: "Handy-man",
  },
  // Add more mascots here
];

export default function MascotCarousel({
  interval = 1500, // ms between transitions
}: { interval?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((curr) => (curr + 1) % mascots.length);
    }, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return (
    <div className="relative w-60 h-60 flex items-center justify-center mx-auto">
      <AnimatePresence mode="wait">
        <motion.img
          key={mascots[index].src}
          src={mascots[index].src}
          alt={mascots[index].alt}
          className="absolute w-56 h-56 object-contain"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </AnimatePresence>
      {/* Optional: Add label below */}
      <div className="absolute bottom-2 w-full flex justify-center">
        <span className="bg-boonifu-gold text-boonifu-accent text-lg font-quicksand px-3 py-1 rounded shadow">
          {mascots[index].label}
        </span>
      </div>
    </div>
  );
}