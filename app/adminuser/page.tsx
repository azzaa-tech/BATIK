"use client"

import { useRouter } from "next/navigation"
import { User, Database } from "lucide-react"

export default function RolePage() {

  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-sans px-4"
      style={{ background: "radial-gradient(ellipse at center, #e8c99a 0%, #d4a96a 100%)" }}>

      {/* Logo + Judul */}
      <div className="text-center mb-10">
        <img src="/aset/lagii.png" alt="logo" className="w-50 h-50 object-contain mx-auto mb-3" />
        <h1 className="text-2xl font-serif font-bold text-[#2d0000]">Galleri Batik Lontara</h1>
        <p className="text-sm text-[#7b4a2a] mt-1">Masuk sebagai siapa?</p>
      </div>

      {/* Card pilihan */}
      <div className="bg-[#f5efe6] rounded-3xl shadow-xl p-8 flex gap-6 flex-wrap justify-center">

        {/* USER */}
        <button
          onClick={() => router.push("/login")}
          className="group flex flex-col items-center gap-3 bg-[#e8ddd0] hover:bg-[#d4c4b0] rounded-2xl px-10 py-8 transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <div className="bg-[#c8a882] group-hover:bg-[#b5845a] rounded-2xl p-5 transition-all duration-300">
            <User size={48} color="white" strokeWidth={1.5} />
          </div>
          <span className="bg-[#7b1d1d] text-white text-sm font-bold px-6 py-1.5 rounded-full tracking-widest">
            USER
          </span>
        </button>

        {/* ADMIN */}
        <button
          onClick={() => router.push("/adminlogin")}
          className="group flex flex-col items-center gap-3 bg-[#e8f0e0] hover:bg-[#d4e4c4] rounded-2xl px-10 py-8 transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <div className="bg-[#8ab870] group-hover:bg-[#6a9a50] rounded-2xl p-5 transition-all duration-300">
            <Database size={48} color="white" strokeWidth={1.5} />
          </div>
          <span className="bg-[#4a7a30] text-white text-sm font-bold px-6 py-1.5 rounded-full tracking-widest">
            ADMIN
          </span>
        </button>

      </div>

      {/* Footer kecil */}
      <p className="text-xs text-[#7b4a2a]/60 mt-8">© 2025 Galleri Batik Lontara · Makassar</p>

    </div>
  )
}