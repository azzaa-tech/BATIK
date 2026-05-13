"use client";
import Link from "next/link";
import Navbar from "../navbar/page";

export default function KonfirmasiBooking() {
  return (
    <div
      className="min-h-screen flex flex-col items-center pb-28 pt-28 justify-center px-4 py-12"
      style={{ backgroundColor: "#c9a882" }}
    >
        <Navbar />
      {/* Title */}
      <h1
        className="text-3xl md:text-4xl font-serif text-white text-center mb-2"
        style={{ fontFamily: "Georgia, serif" }}
      >
        Konfirmasi Tempat Booking Membatik
      </h1>

      {/* Divider with icon */}
      <div className="flex items-center gap-3 my-3">
        <div className="h-px w-16 bg-white/50" />
        <span className="text-white/70 text-lg">✿</span>
        <div className="h-px w-16 bg-white/50" />
      </div>

      {/* Subtitle */}
      <p className="text-white/80 text-sm text-center mb-8">
        Mohon periksa kembali detail booking Ada sebelum di konfimasi.
      </p>

      {/* Card */}
      <div
        className="w-full max-w-2xl rounded-2xl p-6 md:p-8 flex flex-col gap-6"
        style={{ backgroundColor: "#f5ede3" }}
      >
        {/* Detail Booking */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-base"
              style={{ backgroundColor: "#c9a882" }}
            >
              📅
            </div>
            <h2 className="font-semibold text-gray-700 text-lg">Detail Booking</h2>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-400 mb-1">Tanggal</p>
              <p className="font-semibold text-gray-700">16 Maret 2026</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Waktu</p>
              <p className="font-semibold text-gray-700">13.00 – 15.00 WIB</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Jumlah Peserta</p>
              <p className="font-semibold text-gray-700">4 orang</p>
            </div>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Lokasi */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-base"
              style={{ backgroundColor: "#c9a882" }}
            >
              📍
            </div>
            <h2 className="font-semibold text-gray-700 text-lg">Lokasi Membatik</h2>
          </div>
          <div className="flex items-start justify-between gap-4">
            <div className="text-sm text-gray-600 leading-relaxed">
              <p className="font-semibold text-gray-700 uppercase tracking-wide text-xs mb-1">
                GaLLeRI Membatik Studio
              </p>
              <p>Jl. Batik Raya No.10, Kota Yogyakarta,</p>
              <p>Daerah Istimewa Yogyakarta 55111</p>
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white whitespace-nowrap transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#c9a882" }}
            >
              🗺️ Lihat di Peta
            </button>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Catatan */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-base"
              style={{ backgroundColor: "#c9a882" }}
            >
              📋
            </div>
            <h2 className="font-semibold text-gray-700 text-lg">Catatan</h2>
          </div>
          <ul className="text-sm text-gray-600 flex flex-col gap-1.5 list-none">
            {[
              "harap datang 10 menit sebelum jadwal mulai.",
              "Disarankan memakai pakaian yang nyaman.",
              "Pembatalan dapat dilakukan 1 hari sebelum jadwal.",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5 text-gray-400">•</span>
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}