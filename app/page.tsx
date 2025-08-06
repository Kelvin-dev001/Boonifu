"use client";
import { useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import Gallery from "../components/Gallery";
import WhyBoonifu from "../components/WhyBoonifu";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";
import PosterGeneratorForm from "../components/PosterGeneratorForm";

export default function Home() {
  const [showPosterForm, setShowPosterForm] = useState(false);

  return (
    <>
      <Head>
        <title>Boonifu – Instant Posters for Small and Medium Businesses in Africa</title>
        <meta
          name="description"
          content="Effortlessly create beautiful posters and social media designs for your African business using AI. Pay via M-Pesa. Try Boonifu now!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-boonifu-light to-white font-poppins">
        <Navbar />
        <main className="flex-1">
          <HeroSection onCreatePosterClick={() => setShowPosterForm(true)} />
          <HowItWorks />
          <Gallery />
          <WhyBoonifu />
          <FAQSection />
        </main>
        <Footer />
      </div>
      {/* Modal for Poster Generator Form */}
      {showPosterForm && (
        <PosterGeneratorForm onClose={() => setShowPosterForm(false)} />
      )}
    </>
  );
}