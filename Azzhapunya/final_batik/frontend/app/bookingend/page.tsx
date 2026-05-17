"use client"

import Link from "next/link"
import Navbar from "../navbar/page"

export default function KonfirmasiBooking() {
  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 sm:px-6 pt-28 pb-28"
      style={{ backgroundColor: "#c9a882" }}
    >
      <Navbar />

      <div className="w-full max-w-2xl mx-auto">
        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-serif text-white text-center mb-2 leading-tight"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Konfirmasi Tempat Booking Membatik
        </h1>

        <div className="flex items-center justify-center gap-3 my-3">
          <div className="h-px w-12 sm:w-16 bg-white/50" />
          <span className="text-white/70 text-lg">✿</span>
          <div className="h-px w-12 sm:w-16 bg-white/50" />
        </div>

        <p className="text-white/80 text-xs sm:text-sm text-center mb-6 sm:mb-8 leading-relaxed">
          Mohon periksa kembali detail booking Anda sebelum dikonfirmasi.
        </p>

        <div
          className="w-full rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col gap-5 sm:gap-6 shadow-lg"
          style={{ backgroundColor: "#f5ede3" }}
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-base flex-shrink-0"
                style={{ backgroundColor: "#c9a882" }}
              >
                📅
              </div>
              <h2 className="font-semibold text-gray-700 text-base sm:text-lg">
                Detail Booking
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/50 rounded-xl p-3">
                <p className="text-gray-400 mb-1 text-xs">Tanggal</p>
                <p className="font-semibold text-gray-700">16 Maret 2026</p>
              </div>

              <div className="bg-white/50 rounded-xl p-3">
                <p className="text-gray-400 mb-1 text-xs">Waktu</p>
                <p className="font-semibold text-gray-700">13.00 – 15.00 WIB</p>
              </div>

              <div className="bg-white/50 rounded-xl p-3">
                <p className="text-gray-400 mb-1 text-xs">Jumlah Peserta</p>
                <p className="font-semibold text-gray-700">4 orang</p>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-base flex-shrink-0"
                style={{ backgroundColor: "#c9a882" }}
              >
                📍
              </div>
              <h2 className="font-semibold text-gray-700 text-base sm:text-lg">
                Lokasi Membatik
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="text-sm text-gray-600 leading-relaxed">
                <p className="font-semibold text-gray-700 uppercase tracking-wide text-xs mb-1">
                  GaLLeRI Membatik Studio
                </p>
                <p>Jl. Batik Raya No.10, Kota Yogyakarta,</p>
                <p>Daerah Istimewa Yogyakarta 55111</p>
              </div>

              <button
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white whitespace-nowrap transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#c9a882" }}
              >
                🗺️ Lihat di Peta
              </button>
            </div>
          </div>

          <hr className="border-gray-200" />

          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-base flex-shrink-0"
                style={{ backgroundColor: "#c9a882" }}
              >
                📋
              </div>
              <h2 className="font-semibold text-gray-700 text-base sm:text-lg">
                Catatan
              </h2>
            </div>

            <ul className="text-sm text-gray-600 flex flex-col gap-2 list-none">
              {[
                "Harap datang 10 menit sebelum jadwal mulai.",
                "Disarankan memakai pakaian yang nyaman.",
                "Pembatalan dapat dilakukan 1 hari sebelum jadwal.",
              ].map((note, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <span className="mt-0.5 text-gray-400">•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <Link
              href="/booking"
              className="w-full text-center border border-[#c9a882] text-[#8a6540] font-semibold py-3 rounded-xl text-sm hover:bg-white/50 transition-colors"
            >
              Kembali
            </Link>

          </div>
        </div>
      </div>
    </div>
  )
}