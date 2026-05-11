"use client"

import { useState } from "react"
import { Clock, Users, Wallet, CheckSquare } from "lucide-react"
import Navbar from "../navbar/page"
import { useRouter } from "next/navigation"

export default function BookingPelatihan() {

  const [form, setForm] = useState({
    nama: "",
    anggota: "",
    tanggal: "",
    noWa: "",
    email: ""
  })

  const [errors, setErrors] = useState<any>({})
  const router = useRouter()

  const fasilitas = [
    "Ruangan ber-AC",
    "Peralatan membatik lengkap",
    "Instruktur berpengalaman",
    "Snack & Minum"
  ]

  const handleSubmit = () => {
    const err: any = {}

    if (!form.nama.trim()) err.nama = "Nama wajib diisi"
    if (!form.anggota.trim()) err.anggota = "Jumlah anggota wajib diisi"
    if (!form.tanggal.trim()) err.tanggal = "Tanggal wajib diisi"
    if (!form.noWa.trim()) err.noWa = "No. WhatsApp wajib diisi"
    if (!form.email.trim()) err.email = "Email wajib diisi"

    setErrors(err)

    if (Object.keys(err).length === 0) {
      router.push("/bookingend")
    }
  }


  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [key]: e.target.value })
    setErrors({ ...errors, [key]: "" })
  }

  return (
    <div className="min-h-screen bg-[#1a0a00] font-sans text-white pb-28 pt-28 px-4 py-10">
      <Navbar />

      {/* JUDUL */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-serif font-bold">Booking Pelatihan</h1>
        <div className="flex items-center justify-center gap-3 mt-2">
          <div className="h-px w-16 bg-yellow-600" />
          <span className="text-yellow-500">✦</span>
          <div className="h-px w-16 bg-yellow-600" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">

        {/* BANNER: Deskripsi + Fasilitas */}
        <div className="flex flex-wrap rounded-2xl overflow-hidden border border-yellow-900">

          {/* Gambar + Deskripsi */}
          <div className="flex flex-1 min-w-[220px] bg-yellow-700/20">
            <img src="/aset/produk.png" alt="batik" className="w-24 h-full object-cover flex-shrink-0" />
            <div className="p-4">
              <p className="text-yellow-400 font-bold text-sm mb-1">Belajar membatik bersama kami!</p>
              <p className="text-gray-300 text-xs leading-relaxed">
                Kami menyediakan tempat pelatihan membatik yang nyaman, lengkap, dan mendukung proses belajar
                bagi berbagai kalangan. Fasilitas dirancang untuk memberikan pengalaman edukatif yang menyenangkan.
              </p>
            </div>
          </div>

          {/* Fasilitas */}
          <div className="bg-yellow-600/20 p-4 flex-1 min-w-[180px]">
            <h2 className="text-lg font-bold font-serif text-white mb-3">Fasilitas</h2>
            <div className="space-y-2">
              {fasilitas.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckSquare size={16} className="text-yellow-400 flex-shrink-0" />
                  <span className="text-sm text-gray-200">{f}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* INFORMASI PELATIHAN */}
        <div>
          <h2 className="text-xl font-bold font-serif text-yellow-400 mb-5">Informasi Pelatiahan</h2>

          <div className="flex flex-wrap gap-6 items-center">

            <div className="space-y-5 flex-1 min-w-[180px]">
              {[
                { icon: <Clock size={20} className="text-yellow-400" />, judul: "Durasi", sub: "1 Hari (4-6 jam)" },
                { icon: <Users size={20} className="text-yellow-400" />, judul: "Minimal peserta", sub: "3 orang" },
                { icon: <Wallet size={20} className="text-yellow-400" />, judul: "Biaya", sub: "Mulai dari Rp150.000/orang" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="bg-yellow-700/30 border border-yellow-600/40 rounded-full p-3 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{item.judul}</p>
                    <p className="text-gray-400 text-sm">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex-1 min-w-[200px]">
              <img src="/aset/halu2.jpg" alt="membatik" className="w-full h-48 object-cover rounded-2xl border border-yellow-900" />
            </div>

          </div>
        </div>

        {/* FORM BOOKING */}
        <div>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-serif font-bold">Booking pelatihan</h2>
            <div className="flex items-center justify-center gap-3 mt-2">
              <div className="h-px w-14 bg-yellow-600" />
              <span className="text-yellow-500">✦</span>
              <div className="h-px w-14 bg-yellow-600" />
            </div>
          </div>

          <div className="bg-[#f0e8df] rounded-2xl p-6 text-gray-800">

            {/* Nama */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-[#2d0000] mb-1">Nama</label>
              <input type="text" value={form.nama} onChange={set("nama")} placeholder="Lainnya..."
                className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none bg-white ${errors.nama ? "border-red-400" : "border-gray-300 focus:border-[#7b1d1d]"}`} />
              {errors.nama && <p className="text-red-500 text-xs mt-1">⚠ {errors.nama}</p>}
            </div>

            {/* Anggota + Tanggal */}
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-[#2d0000] mb-1">Anggota</label>
                <input type="number" value={form.anggota} onChange={set("anggota")} placeholder="Lainnya..."
                  className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none bg-white ${errors.anggota ? "border-red-400" : "border-gray-300 focus:border-[#7b1d1d]"}`} />
                {errors.anggota && <p className="text-red-500 text-xs mt-1">⚠ {errors.anggota}</p>}
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-[#2d0000] mb-1">Tanggal</label>
                <input type="date" value={form.tanggal} onChange={set("tanggal")}
                  className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none bg-white ${errors.tanggal ? "border-red-400" : "border-gray-300 focus:border-[#7b1d1d]"}`} />
                {errors.tanggal && <p className="text-red-500 text-xs mt-1">⚠ {errors.tanggal}</p>}
              </div>
            </div>

            {/* No WA + Email */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-[#2d0000] mb-1">No. Wa</label>
                <input type="tel" value={form.noWa} onChange={set("noWa")} placeholder="08xxxxxxxxxx"
                  className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none bg-white ${errors.noWa ? "border-red-400" : "border-gray-300 focus:border-[#7b1d1d]"}`} />
                {errors.noWa && <p className="text-red-500 text-xs mt-1">⚠ {errors.noWa}</p>}
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-[#2d0000] mb-1">E-mail</label>
                <input type="email" value={form.email} onChange={set("email")} placeholder="email@contoh.com"
                  className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none bg-white ${errors.email ? "border-red-400" : "border-gray-300 focus:border-[#7b1d1d]"}`} />
                {errors.email && <p className="text-red-500 text-xs mt-1">⚠ {errors.email}</p>}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-[#7b1d1d] hover:bg-[#5e1515] text-white font-bold px-10 py-2.5 rounded-lg text-sm transition-colors"
              >
                Seleksi
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}