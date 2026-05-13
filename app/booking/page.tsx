"use client"

import { useState } from "react"
import { Clock, Users, Wallet, CheckSquare } from "lucide-react"
import Navbar from "../navbar/page"
import { useRouter } from "next/navigation"

export default function BookingPelatihan() {

  const [form, setForm] = useState({ nama: "", anggota: "", tanggal: "", noWa: "", email: "" })
  const [errors, setErrors] = useState<any>({})
  const router = useRouter()

  const fasilitas = ["Ruangan ber-AC", "Peralatan membatik lengkap", "Instruktur berpengalaman", "Snack & Minum"]

  const handleSubmit = () => {
    const err: any = {}
    if (!form.nama.trim()) err.nama = "Nama wajib diisi"
    if (!form.anggota.trim()) err.anggota = "Jumlah anggota wajib diisi"
    if (!form.tanggal.trim()) err.tanggal = "Tanggal wajib diisi"
    if (!form.noWa.trim()) err.noWa = "No. WhatsApp wajib diisi"
    if (!form.email.trim()) err.email = "Email wajib diisi"
    setErrors(err)
    if (Object.keys(err).length === 0) router.push("/bookingend")
  }

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [key]: e.target.value })
    setErrors({ ...errors, [key]: "" })
  }

  return (
    <div className="min-h-screen bg-[#f5f0eb] font-sans py-12 px-4 pb-28">
      <Navbar />
      <div className="max-w-3xl mx-auto">

      {/* HERO BANNER */}
      <div className="relative h-52 overflow-hidden mt-15  ">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-[#7b1d1d] text-center">
          <h1 className="text-3xl md:text-5xl font-serif font-bold drop-shadow">Booking Pelatihan</h1>
          <div className="flex items-center gap-3 mt-2">
            <div className="h-px w-20 bg-yellow-400" />
            <span className="text-yellow-400">✦</span>
            <div className="h-px w-20 bg-yellow-400" />
          </div>
          <p className="text-lg text-[#7b1d1d] mt-2">Belajar membatik bersama pengrajin lokal Sulawesi Selatan</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

        {/* INFO CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {[
            { icon: <Clock size={32} className="text-[#7b1d1d]" />, judul: "Durasi", sub: "1 Hari (4–6 jam)" },
            { icon: <Users size={32} className="text-[#7b1d1d]" />, judul: "Min. Peserta", sub: "3 orang" },
            { icon: <Wallet size={32} className="text-[#7b1d1d]" />, judul: "Biaya", sub: "Rp150.000/orang" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 flex flex-col items-center text-center shadow-lg border border-gray-200 hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-[#f5ebe0] rounded-full p-5 mb-4">{item.icon}</div>
              <p className="font-bold text-gray-900 text-base">{item.judul}</p>
              <p className="text-gray-600 text-sm mt-1">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* DESKRIPSI + FASILITAS */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-wrap">
            <img src="/aset/produk.png" alt="batik" className="w-32 object-cover flex-shrink-0" />
            <div className="flex-1 min-w-[180px] p-5 border-r border-gray-100">
              <p className="font-bold text-[#7b1d1d] text-3xl mb-2">Belajar membatik bersama kami!</p>
              <p className="text-gray-500 text-lg leading-relaxed">
                Kami menyediakan tempat pelatihan membatik yang nyaman, lengkap, dan mendukung proses belajar
                bagi berbagai kalangan. Fasilitas dirancang untuk memberikan pengalaman edukatif yang menyenangkan.
              </p>
            </div>
            <div className="p-5 flex-1 min-w-[160px]">
              <p className="font-bold text-gray-800 text-2xl mb-3">Fasilitas</p>
              <div className="space-y-2">
                {fasilitas.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckSquare size={14} className="text-[#7b1d1d] flex-shrink-0" />
                    <span className="text-lg text-gray-600">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

          <h2 className="font-bold text-gray-800 text-base mb-5 text-center">Form Booking</h2>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nama</label>
            <input type="text" value={form.nama} onChange={set("nama")} placeholder="Masukkan nama lengkap"
              className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none bg-gray-50 ${errors.nama ? "border-red-400" : "border-gray-200 focus:border-[#7b1d1d]"}`} />
            {errors.nama && <p className="text-red-500 text-xs mt-1">⚠ {errors.nama}</p>}
          </div>

          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Anggota</label>
              <input type="number" value={form.anggota} onChange={set("anggota")} placeholder="Jumlah orang"
                className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none bg-gray-50 ${errors.anggota ? "border-red-400" : "border-gray-200 focus:border-[#7b1d1d]"}`} />
              {errors.anggota && <p className="text-red-500 text-xs mt-1">⚠ {errors.anggota}</p>}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Tanggal</label>
              <input type="date" value={form.tanggal} onChange={set("tanggal")}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none bg-gray-50 ${errors.tanggal ? "border-red-400" : "border-gray-200 focus:border-[#7b1d1d]"}`} />
              {errors.tanggal && <p className="text-red-500 text-xs mt-1">⚠ {errors.tanggal}</p>}
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">No. WhatsApp</label>
              <input type="tel" value={form.noWa} onChange={set("noWa")} placeholder="08xxxxxxxxxx"
                className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none bg-gray-50 ${errors.noWa ? "border-red-400" : "border-gray-200 focus:border-[#7b1d1d]"}`} />
              {errors.noWa && <p className="text-red-500 text-xs mt-1">⚠ {errors.noWa}</p>}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">E-mail</label>
              <input type="email" value={form.email} onChange={set("email")} placeholder="email@contoh.com"
                className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none bg-gray-50 ${errors.email ? "border-red-400" : "border-gray-200 focus:border-[#7b1d1d]"}`} />
              {errors.email && <p className="text-red-500 text-xs mt-1">⚠ {errors.email}</p>}
            </div>
          </div>

          <button onClick={handleSubmit}
            className="w-full bg-[#7b1d1d] hover:bg-[#5e1515] text-white font-bold py-3 rounded-xl text-sm transition-colors">
            Kirim Booking
          </button>

        </div>
      </div>
      </div>
    </div>
  )
}