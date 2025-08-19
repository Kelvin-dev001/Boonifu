"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-4 text-center">Welcome to Boonifu Poster Builder</h1>
      <p className="mb-6 text-lg text-center">Effortlessly create beautiful posters for your business.</p>
      <Link href="/generate" className="bg-boonifu-gold text-white px-6 py-2 rounded-lg font-bold hover:bg-boonifu-orange transition">
        Start Creating
      </Link>
      <div className="mt-10 text-sm text-gray-400">Sprint 1 MVP Demo</div>
    </main>
  );
}