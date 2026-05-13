"use client"

import React, { useState, useEffect } from "react"
import Navbar from "../navbar/page"
import Produkbaru from "../produkbaru/page"
import Profileus from "../profileus/page"
import Kontak from "../kontak/page"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function HomePage() {
  const slides = [
    { image: "/aset/halut.png", title: "BATIK LONTARA", sub: "Koleksi Eksklusif 2025" },
    { image: "/aset/halu2.jpg", title: "FASHION PRIA", sub: "Elegan untuk Setiap Momen" },
    { image: "/aset/produk.png", title: "KARYA LOKAL", sub: "Motif Aksara Sulawesi Selatan" },
  ]

  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 20000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <div className="w-full h-screen overflow-hidden font-sans relative">
        <Navbar />

        {/* HERO SLIDER fullscreen */}
        <div className="relative w-full h-full">
          {/* Slides */}
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div key={i} className="min-w-full h-full relative">
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" />

                {/* Teks */}
                <div className="absolute inset-0 flex items-center px-8 md:px-24">
                  <div className="text-white max-w-xl">
                    <p className="text-xs tracking-[0.4em] uppercase mb-3 opacity-75">{slide.sub}</p>
                    <h1 className="text-4xl md:text-7xl font-serif font-bold tracking-widest leading-none mb-6">
                      {slide.title}
                    </h1>
                    <a href="/produk">
                      <button className="border border-white text-white text-xs font-bold tracking-widest px-8 py-3 hover:bg-white hover:text-[#7b1d1d] transition-all duration-300">
                        LIHAT KOLEKSI
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Prev / Next */}
          <button
            onClick={() => setCurrent((p) => (p - 1 + slides.length) % slides.length)}
            className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
          >
            <ChevronLeft size={20} color="white" />
          </button>
          <button
            onClick={() => setCurrent((p) => (p + 1) % slides.length)}
            className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
          >
            <ChevronRight size={20} color="white" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${i === current ? "w-8 h-2 bg-white" : "w-2 h-2 bg-white/40"}`}
              />
            ))}
          </div>

          {/* Nomor slide */}
          <div className="absolute bottom-8 right-8 text-white/60 text-xs font-mono">
            {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div id="produkbaru" className="scroll-mt-10 relative z-10">
        <Produkbaru />
      </div>
      <div id="profileus" className="scroll-mt-10 relative z-10">
        <Profileus />
      </div>
      <div id="kontak" className="scroll-mt-10 relative z-10">
        <Kontak />
      </div>
    </>
  )
}