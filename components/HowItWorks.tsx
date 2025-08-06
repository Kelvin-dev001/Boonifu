"use client";
import { motion } from "framer-motion";

const steps = [
  {
    icon: "📝",
    title: "Describe Your Business",
    desc: "Tell us your business type, vibe, and message.",
  },
  {
    icon: "🎨",
    title: "Preview Your Design",
    desc: "See an instant AI-generated poster (with watermark).",
  },
  {
    icon: "💸",
    title: "Pay & Download Instantly",
    desc: "Pay via M-Pesa. Download your HD design with no watermark.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-16 px-4 sm:px-10 max-w-4xl mx-auto z-10 font-poppins"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-boonifu-orange mb-10 font-quicksand">
        How It Works
      </h2>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.2, type: "spring" }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center w-full sm:w-1/3 min-h-[220px] hover:shadow-xl transition border border-boonifu-gold/10"
          >
            <span className="text-4xl mb-3">{step.icon}</span>
            <h3 className="font-semibold text-lg mb-2 text-boonifu-gold font-quicksand">{step.title}</h3>
            <p className="text-boonifu-accent text-center">{step.desc}</p>
            {i < steps.length - 1 && (
              <motion.div
                className="hidden sm:block absolute right-0 top-1/2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.7 }}
                transition={{ delay: 0.5 + i * 0.2 }}
              >
                <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M6 12h12m0 0l-5-5m5 5l-5 5"
                    stroke="#FFB800"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}