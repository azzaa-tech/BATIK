"use client"

import { useState } from "react"
import { Clock, Users, Wallet, CheckSquare } from "lucide-react"

export default function BookingPelatihan() {

  const [form, setForm] = useState({ nama: "", anggota: "", tanggal: "", noWa: "", email: "" })

  const fasilitas = [
    "Ruangan ber-AC",
    "Perlatan membatik lengkap",
    "Instruktur berpengalaman",
    "Snack & Minum",
  ]

  return (
    <div className="min-h-screen bg-[#1a0a00] font-sans text-white px-6 py-12">

      {/* ===== JUDUL ===== */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-white">Booking Pelatihan</h1>
        <div className="flex items-center justify-center gap-3 mt-2">
          <div className="h-px w-20 bg-yellow-600" />
          <span className="text-yellow-500 text-lg">✦</span>
          <div className="h-px w-20 bg-yellow-600" />
        </div>
      </div>

      {/* ===== BAGIAN ATAS: Deskripsi + Fasilitas ===== */}
      <div className="max-w-5xl mx-auto flex flex-wrap gap-8 items-start mb-12">

        {/* Gambar + Deskripsi */}
        <div className="flex-1 min-w-[260px]">
          <img
            src="/aset/produk.png"
            alt="Pelatihan Batik"
            className="w-full h-40 object-cover rounded-2xl border border-yellow-900 mb-4"
          />
          <div className="bg-yellow-700/30 border border-yellow-600/40 rounded-xl p-4">
            <p className="text-yellow-400 font-bold text-sm mb-2">Belajar membatik bersama kami!</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Kami menyediakan tempat pelatihan membatik yang nyaman, lengkap, dan mendukung proses belajar
              bagi berbagai kalangan, mulai dari individu, komunitas, sekolah, hingga instansi. Fasilitas
              kami tersedia dirancang untuk memberikan pengalaman membatik yang menyenangkan sekaligus
              edukatif, dengan bimbingan yang jelas sehingga peserta dapat memahami teknik dasar hingga
              pengembangan kreativitas dalam membatik.
            </p>
          </div>
        </div>

        {/* Fasilitas */}
        <div className="flex-1 min-w-[220px]">
          <h2 className="text-2xl font-serif font-bold text-white mb-5">Fasilitas</h2>
          <div className="flex flex-col gap-3">
            {fasilitas.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckSquare size={20} className="text-yellow-500 flex-shrink-0" />
                <span className="text-gray-200 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ===== INFORMASI PELATIAHAN ===== */}
      <div className="max-w-5xl mx-auto mb-12">
        <h2 className="text-xl font-bold font-serif text-yellow-400 mb-6">Informasi Pelatiahan</h2>

        <div className="flex flex-wrap gap-8 items-center">

          {/* Info items */}
          <div className="flex flex-col gap-6 flex-1 min-w-[220px]">

            <div className="flex items-center gap-4">
              <div className="bg-yellow-700/30 border border-yellow-600/40 rounded-full p-3">
                <Clock size={22} className="text-yellow-400" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Durasi</p>
                <p className="text-gray-400 text-sm">1 Hari (4-6 jam)</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-yellow-700/30 border border-yellow-600/40 rounded-full p-3">
                <Users size={22} className="text-yellow-400" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Minimal peserta</p>
                <p className="text-gray-400 text-sm">3 orang</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-yellow-700/30 border border-yellow-600/40 rounded-full p-3">
                <Wallet size={22} className="text-yellow-400" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Biaya</p>
                <p className="text-gray-400 text-sm">Mulai dari Rp150.000/orang</p>
              </div>
            </div>

          </div>

          {/* Gambar kanan */}
          <div className="flex-1 min-w-[240px]">
            <img
              src="/aset/halu2.jpg"
              alt="Membatik"
              className="w-full h-52 object-cover rounded-2xl border border-yellow-900 shadow-lg"
            />
          </div>

        </div>
      </div>

      {/* ===== FORM BOOKING ===== */}
      <div className="max-w-5xl mx-auto">

        {/* Sub judul */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif font-bold text-white">Booking pelatihan</h2>
          <div className="flex items-center justify-center gap-3 mt-2">
            <div className="h-px w-16 bg-yellow-600" />
            <span className="text-yellow-500">✦</span>
            <div className="h-px w-16 bg-yellow-600" />
          </div>
        </div>

        <div className="bg-[#f0e8df] rounded-2xl p-6 shadow-lg text-gray-800">

          {/* Nama */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-[#2d0000] mb-1">Nama</label>
            <input
              type="text"
              placeholder="Lainnya..."
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#7b1d1d] bg-white"
            />
          </div>

          {/* Anggota + Tanggal */}
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-[140px]">
              <label className="block text-sm font-semibold text-[#2d0000] mb-1">Anggota</label>
              <input
                type="number"
                placeholder="Lainnya..."
                value={form.anggota}
                onChange={(e) => setForm({ ...form, anggota: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#7b1d1d] bg-white"
              />
            </div>
            <div className="flex-1 min-w-[140px]">
              <label className="block text-sm font-semibold text-[#2d0000] mb-1">Tanggal</label>
              <input
                type="date"
                value={form.tanggal}
                onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#7b1d1d] bg-white"
              />
            </div>
          </div>

          {/* No WA + Email */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[140px]">
              <label className="block text-sm font-semibold text-[#2d0000] mb-1">No. Wa</label>
              <input
                type="tel"
                placeholder="08xxxxxxxxxx"
                value={form.noWa}
                onChange={(e) => setForm({ ...form, noWa: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#7b1d1d] bg-white"
              />
            </div>
            <div className="flex-1 min-w-[140px]">
              <label className="block text-sm font-semibold text-[#2d0000] mb-1">E-mail</label>
              <input
                type="email"
                placeholder="email@contoh.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#7b1d1d] bg-white"
              />
            </div>
          </div>

          {/* Tombol */}
          <div className="flex justify-end">
            <button className="bg-[#7b1d1d] hover:bg-[#5e1515] text-white font-bold px-10 py-2.5 rounded-lg text-sm transition-colors">
              Seleksi
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}