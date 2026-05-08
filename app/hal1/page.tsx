"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import {
  Search,
  ShoppingBag,
  Bell,
  CircleUserRound,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react"

export default function HomePage() {
  const slides = [
  {
    image: "/aset/halut.png",
    title: "Koleksi Batik Modern",
    desc: "Menampilkan batik elegan dengan motif khas Nusantara.",
  },

  {
    image: "/aset/halu2.jpg",
    title: "Fashion Pria Premium",
    desc: "Cocok digunakan untuk acara formal maupun santai.",
  },

  {
    image: "/aset/produk.png",
    title: "Produk Lokal Berkualitas",
    desc: "Dukung pengerajin lokal dengan membeli batik asli Indonesia.",
  },
]

  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="bg-gray-100 min-h-screen overflow-hidden">
      
      {/* NAVBAR */}
      <div className="bg-[#7b1d1d] px-4 md:px-8 py-4 flex items-center justify-between">
        
        {/* logo */}
       <div className="flex items-center">
                 <Image
                   src="/aset/logo.png"
                   alt="logo"
                   width={120}
                   height={120}
                   className="object-contain"
                 />
               </div>

        {/* search */}
        <div className="hidden md:flex bg-white w-[45%] rounded-full items-center px-4 py-2 shadow-md">
          <Search className="text-gray-500" size={20} />
          
          <input
            type="text"
            placeholder="mencari apa ?"
            className="w-full outline-none px-3 text-sm"
          />
        </div>

        {/* desktop icon */}
        <div className="hidden md:flex gap-5 text-white">
          <ShoppingBag className="cursor-pointer" />
          <Bell className="cursor-pointer" />
          <CircleUserRound className="cursor-pointer" />
        </div>

        {/* mobile menu */}
        <div className="md:hidden text-white">
          <Menu size={28} />
        </div>
      </div>

      {/* SEARCH MOBILE */}
      <div className="md:hidden px-4 mt-5">
        <div className="bg-white rounded-full flex items-center px-4 py-2 shadow-md">
          <Search className="text-gray-500" size={18} />
          
          <input
            type="text"
            placeholder="mencari apa ?"
            className="w-full outline-none px-3 text-sm"
          />
        </div>
      </div>

      {/* CATEGORY */}
      <div className="flex justify-center gap-5 md:gap-12 mt-8 flex-wrap px-4">
        
        <div className="bg-yellow-300 w-24 h-24 md:w-28 md:h-28 rounded-2xl shadow-lg flex flex-col items-center justify-center hover:scale-105 duration-300 cursor-pointer">
          <span className="text-3xl md:text-4xl">🧣</span>
          <p className="font-semibold mt-2 text-sm md:text-base">
            Syal
          </p>
        </div>

        <div className="bg-yellow-400 w-24 h-24 md:w-28 md:h-28 rounded-2xl shadow-lg flex flex-col items-center justify-center hover:scale-105 duration-300 cursor-pointer">
          <span className="text-3xl md:text-4xl">🤵</span>
          <p className="font-semibold mt-2 text-sm md:text-base">
            Pria
          </p>
        </div>

        <div className="bg-yellow-300 w-24 h-24 md:w-28 md:h-28 rounded-2xl shadow-lg flex flex-col items-center justify-center hover:scale-105 duration-300 cursor-pointer">
          <span className="text-3xl md:text-4xl">👗</span>
          <p className="font-semibold mt-2 text-sm md:text-base">
            Wanita
          </p>
        </div>
      </div>

      {/* SLIDER */}
      <div className="flex justify-center mt-10 px-4 md:px-6">
        <div className="relative w-full max-w-5xl h-[220px] md:h-[350px] overflow-hidden rounded-[30px] md:rounded-[40px] shadow-xl">

          {/* IMAGE */}
          <div
            className="flex transition-all duration-700"
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="min-w-full h-[220px] md:h-[350px] relative"
              >
                <img
                  src={slide.image}
                  alt="batik"
                  className="w-full h-full object-cover"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-black/35 flex items-center">
                  
                  <div className="text-white px-6 md:ml-12 max-w-sm">
                    
                    <h1 className="text-2xl md:text-5xl font-bold leading-tight">
                      Koleksi batik elegan
                    </h1>

                    <p className="mt-3 text-[11px] md:text-sm">
                      Menyediakan batik Nusantara berkualitas
                      dengan ragam motif yang mencerminkan
                      budaya dan tradisi Indonesia.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* LEFT */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 md:left-5 -translate-y-1/2 bg-white/70 p-1 md:p-2 rounded-full"
          >
            <ChevronLeft size={20} />
          </button>

          {/* RIGHT */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 md:right-5 -translate-y-1/2 bg-white/70 p-1 md:p-2 rounded-full"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* DOTS */}
      <div className="flex justify-center gap-3 mt-5 pb-10">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              current === index
                ? "bg-[#7b1d1d]"
                : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  )
} 