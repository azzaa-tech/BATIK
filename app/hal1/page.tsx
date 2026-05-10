"use client"

import Image from "next/image"
import React from "react"
import Navbar from "../navbar/page"
import Produkbaru from "../produkbaru/page"
import { useEffect, useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
 
} from "lucide-react"

export default function HomePage() {
  const slides = [
    {
      image: "/aset/halut.png",
      title: "Batik Modern",
      desc: "Motif khas Sulawesi Selatan.",
    },
    {
      image: "/aset/halu2.jpg",
      title: "Fashion Pria",
      desc: "Cocok untuk acara formal.",
    },
    {
      image: "/aset/produk.png",
      title: "Produk Lokal",
      desc: "Karya asli pengerajin lokal.",
    },
  ]

  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 20000)

    return () => clearInterval(timer)
  }, [])


  return (

    <div className="min-h-screen pb-28 bg-[#f5f0eb]">
      <Navbar />


      {/* HERO */}
      <div className="p-4 mt-28">

        <div className="relative overflow-hidden rounded-2xl">

          <div
            className="flex duration-500"
            style={{
              transform: `translateX(-${current * 100}%)`
            }}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                className="min-w-full h-[400px] relative"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/40 flex items-center px-20">

                  <div className="text-white">
                    <h1 className="text-4xl font-sans font-extrabold mb-3">
                      {slide.title}
                    </h1>

                    <p className="text-sm mb-4">
                      {slide.desc}
                    </p>

                    <button className="bg-yellow-500 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600">
                      Lihat Koleksi
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* BUTTON */}
          <button
            onClick={() =>
              setCurrent((current - 1 + slides.length) % slides.length)
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() =>
              setCurrent((current + 1) % slides.length)
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* DOTS */}
        <div className="flex justify-center gap-2 mt-4">

          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full cursor-pointer ${current === i
                ? "w-6 bg-[#7b1d1d]"
                : "w-2 bg-gray-400"
                }`}
            />
          ))}

        </div>
      </div>

      {/* KATEGORI */}
      <div className="px-4 mt-8 mb-10">

        <h2 className="text-center text-[#7b1d1d] font-bold text-4xl mb-10">
          Kategori
        </h2>

        <div className="flex justify-center gap-10 flex-wrap">

          {[
            {
              nama: "Pria",
              gambar: "/aset/Suit.png",
            },
            {
              nama: "Wanita",
              gambar: "/aset/dress.png",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#F9B82C] w-30 h-30 rounded-2xl flex flex-col items-center justify-center text-center font-semibold hover:scale-105 transition duration-300"
            >
              <img
                src={item.gambar}
                alt={item.nama}
                className="w-10 h-10 object-contain mb-2"
              />

              <p className="text-[#7b1d1d] text-sm">
                {item.nama}
              </p>
            </div>
          ))}

        </div>
      </div>
      <Produkbaru />

    </div>
  )
}