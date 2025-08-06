"use client";
import { motion } from "framer-motion";

const reasons = [
  {
    icon: "💰",
    title: "Affordable",
    desc: "Just Ksh 1,500 per poster. No hidden fees.",
  },
  {
    icon: "🌍",
    title: "Made for Africa",
    desc: "M-Pesa payments, local languages, and African styles.",
  },
  {
    icon: "⚡",
    title: "AI-Powered Speed",
    desc: "Generate designs in seconds, no skills required.",
  },
  {
    icon: "📱",
    title: "Mobile & Data Friendly",
    desc: "Works on all devices, optimized for low data.",
  },
];

export default function WhyBoonifu() {
  return (
    <section id="pricing" className="py-16 px-4 max-w-5xl mx-auto font-poppins">
      <h2 className="text-2xl sm:text-3xl font-bold text-boonifu-orange text-center mb-10 font-quicksand">
        Why Choose Boonifu?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {reasons.map((reason, i) => (
          <motion.div
            key={reason.title}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 hover:scale-105 hover:bg-boonifu-light transition border border-boonifu-gold/10"
          >
            <span className="text-4xl mb-3">{reason.icon}</span>
            <h3 className="font-semibold text-lg mb-2 text-boonifu-gold font-quicksand">{reason.title}</h3>
            <p className="text-boonifu-accent text-center">{reason.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}