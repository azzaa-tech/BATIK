"use client"

import React from "react"
import Navbar from "../navbar/page"

export default function Page() {
  return (
    <div>
      <Navbar />

      <div className="relative w-full min-h-screen bg-gradient-to-b from-[#691F1E] via-[#7a2625] to-[#4a1413] flex items-center justify-center px-6">

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* CONTENT */}
        <div className="relative z-10 text-center max-w-4xl text-white">

          {/* Eyebrow */}
          <div className="inline-block border border-[#D4AF37]/40 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full text-sm tracking-widest text-[#F5D77A] mb-6 shadow-lg">
            ✦ Keindahan Batik Sulawesi Selatan ✦
          </div>

          {/* TITLE */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Gallery{" "}
            <span className="text-[#D4AF37] italic">
              Batik  Lontara
            </span>
          </h1>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-24 h-[1px] bg-[#D4AF37]"></div>

            <div className="w-3 h-3 rotate-45 bg-[#D4AF37]"></div>

            <div className="w-24 h-[1px] bg-[#D4AF37]"></div>
          </div>

          {/* SUBTITLE */}
          <p className="text-gray-200 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Temukan keindahan kain batik Sulawesi dari warna klasik
            hingga motif yang memukau — warisan budaya yang elegan
            dan abadi.
          </p>

          
          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/hal1" className="mt-8">
            <button className="bg-white/80 border-2 border-yellow-600 h-14 w-64 rounded-xl hover:bg-amber-700 transition-all duration-300">
              <p className="text-[#B45A2A] hover:text-white text-xl font-bold font-serif">
                Jelajahi Lagi
              </p>
            </button>
          </a>


          </div>
        </div>
      </div>
    </div>
  )
}