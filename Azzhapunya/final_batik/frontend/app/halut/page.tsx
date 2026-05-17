"use client"

export default function HeroPage() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden font-sans">

      <img
        src="/aset/ya.jpeg"
        alt="Gallery Batik Lontara"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black/80 via-black/55 to-black/25" />

      <div className="relative z-10 min-h-screen flex flex-col justify-center px-5 sm:px-8 md:px-16 max-w-4xl">

        <p className="text-white/80 text-sm sm:text-base md:text-xl font-light tracking-[0.25em] uppercase mb-3">
          Keindahan Batik Sulawesi Selatan
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-[110px] font-serif font-bold leading-tight mb-5">
          <span className="text-white block sm:inline">Gallery </span>
          <span className="text-yellow-400 block sm:inline">
            Batik Lontara
          </span>
        </h1>

        <p className="text-white/85 text-base sm:text-lg md:text-2xl leading-relaxed max-w-xl mb-8">
          Temukan Keindahan Kain Batik Sulawesi dari warna klasik
          hingga pattern yang menyenangkan.
        </p>

        <a href="/hal1">
          <button className="bg-white/80 border border-yellow-400 text-[#B45A2A] hover:bg-yellow-400 hover:text-[#2d0000] font-semibold px-7 py-3 rounded-full text-sm sm:text-base transition-all duration-300 shadow-lg">
            Jelajahi Lagi
          </button>
        </a>

      </div>

      <div className="absolute bottom-5 right-5 z-10 hidden md:block">
        <img
          src="/aset/logo.png"
          alt="logo"
          className="w-20 h-20 md:w-24 md:h-24 object-contain opacity-80"
        />
      </div>

    </div>
  )
}