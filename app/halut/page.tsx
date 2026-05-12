"use client"

export default function HeroPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden font-sans">

      {/* Background foto toko */}
      <img
        src="/aset/ya.jpeg"
        alt="Gallery Batik Lontara"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay gelap gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />

      {/* Konten */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 max-w-4xl">

        {/* Sub judul */}
        <p className="text-white/80 text-lg md:text-xl font-light tracking-widest uppercase mb-3">
          Keindahan Batik Sulawesi Selatan
        </p>

        {/* Judul utama */}
        <h1 className="text-6xl md:text-[110px] font-serif font-bold leading-tight mb-5">
          <span className="text-white">Gallery </span>
          <span className="text-yellow-400">Batik Lontara</span>
        </h1>

        {/* Deskripsi */}
        <p className="text-white/85 text-xl md:text-2xl leading-relaxed max-w-2xl mb-8">
          Temukan Keindahan Kain Batik Sulawesi dari warna klasik
          hingga pattern yang menyenangkan.
        </p>

        {/* Tombol */}
        <div>
          <a href="/hal1">
            <button className="border bg-white/70 border-yellow-400 text-[#B45A2A] hover:bg-yellow-400 hover:text-[#2d0000] font-semibold px-8 py-3 rounded-full text-sm transition-all duration-300">
              Jelajahi Lagi
            </button>
          </a>
        </div>

      </div>

      {/* Badge pojok kanan bawah */}
      <div className="absolute bottom-8 right-8 z-10 hidden md:block">
        <img
          src="/aset/logo.png"
          alt="logo"
          className="w-24 h-24 object-contain opacity-80"
        />
      </div>

    </div>
  )
}