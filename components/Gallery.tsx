"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const posters = [
  { src: "/samples/poster1.jpeg", alt: "Sample Poster 1" },
  { src: "/samples/poster2.jpg", alt: "Sample Poster 2" },
  { src: "/samples/poster3.jpg", alt: "Sample Poster 3" }
];

export default function Gallery() {
  const [index, setIndex] = useState(0);

  function prev() {
    setIndex((i) => (i === 0 ? posters.length - 1 : i - 1));
  }
  function next() {
    setIndex((i) => (i === posters.length - 1 ? 0 : i + 1));
  }

  return (
    <section className="py-16 px-4 max-w-5xl mx-auto text-center font-poppins">
      <h2 className="text-2xl sm:text-3xl font-bold text-boonifu-orange mb-8 font-quicksand">
        See What Others Made with Boonifu
      </h2>
      <div className="relative flex justify-center items-center">
        <button
          aria-label="Previous"
          className="absolute left-0 sm:-left-10 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow hover:bg-boonifu-gold/30 transition border border-boonifu-gold/30"
          onClick={prev}
        >
          <span className="text-2xl text-boonifu-gold">‹</span>
        </button>
        <div className="w-72 h-96 rounded-lg overflow-hidden shadow-xl bg-boonifu-light flex items-center justify-center border border-boonifu-gold/20">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={posters[index].src}
              alt={posters[index].alt}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.1 }}
              className="object-cover w-full h-full"
            />
          </AnimatePresence>
        </div>
        <button
          aria-label="Next"
          className="absolute right-0 sm:-right-10 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow hover:bg-boonifu-gold/30 transition border border-boonifu-gold/30"
          onClick={next}
        >
          <span className="text-2xl text-boonifu-gold">›</span>
        </button>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {posters.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to poster ${i + 1}`}
            className={`w-3 h-3 rounded-full ${index === i ? "bg-boonifu-gold" : "bg-gray-300"} transition`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}