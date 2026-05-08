import React from 'react'
import Navbar from '../navbar/page'

export default function page() {
  return (
    <div>
      <Navbar />

      <div className="relative w-full h-screen bg-gradient-to-b from-[#691F1E] via-[#7a2625] to-[#4a1413]">

        {/* TEXT */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 md:px-10 text-white">

          <div className="text-2xl md:text-4xl font-serif opacity-80">
            Keindahan Batik Sulawesi Selatan
          </div>

          <div className="text-5xl md:text-7xl lg:text-8xl font-serif mt-3 leading-tight drop-shadow-lg">
            Gallery{" "}
            <span className="text-yellow-500 drop-shadow-md">Batik</span>{" "}
            <span className="text-yellow-500 drop-shadow-md">Lontara</span>
          </div>

          <div className="text-lg md:text-2xl mt-4 max-w-xl opacity-90">
            Temukan Keindahan Kain Batik Sulawesi dari
            <span className="block">
              warna klasik hingga pattern yang menyenangkan.
            </span>
          </div>

          <a href="/login" className="mt-8">
            <button className="bg-white/80 border-2 border-yellow-600 h-14 w-64 rounded-xl hover:bg-amber-700 transition-all duration-300">
              <p className="text-[#B45A2A] hover:text-white text-xl font-bold font-serif">
                Jelajahi Lagi
              </p>
            </button>
          </a>

        </div>
      </div>
    </div>
  )
}