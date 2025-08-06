"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What do I get after payment?",
    a: "You receive a high-definition poster image with no watermark, ready for print or social media.",
  },
  {
    q: "How do I pay?",
    a: "You can pay instantly using M-Pesa or card. After payment, your HD design is unlocked for download and sharing.",
  },
  {
    q: "Can I use my logo?",
    a: "Yes! You can upload your business logo during the poster creation process (optional).",
  },
  {
    q: "Is Boonifu mobile-friendly?",
    a: "Absolutely! Boonifu is built for mobile users and optimized for low bandwidth.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 px-4 max-w-3xl mx-auto font-poppins">
      <h2 className="text-2xl sm:text-3xl font-bold text-boonifu-orange text-center mb-8 font-quicksand">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((item, i) => (
          <div key={item.q} className="bg-white rounded-lg shadow border border-boonifu-gold/10">
            <button
              className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              aria-controls={`faq-${i}`}
            >
              <span className="text-lg font-medium text-boonifu-gold font-quicksand">{item.q}</span>
              <span className="text-2xl text-boonifu-accent">{open === i ? "−" : "+"}</span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  id={`faq-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-4 text-boonifu-accent"
                >
                  {item.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}