"use client"
import React from "react"
import Navbar from "../navbar/page"

export default function ProfilUsaha() {
  return (
    <div className="min-h-screen pb-28 bg-[#1a0a00] font-sans text-white px-6 py-12">
        <Navbar/>

      {/* Judul */}
      <div className="text-center mt-28 mb-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-white">Profil Usaha</h1>
        <div className="flex items-center justify-center gap-3 mt-2">
          <div className="h-px w-20 bg-yellow-600" />
          <span className="text-yellow-500 text-lg">✦</span>
          <div className="h-px w-20 bg-yellow-600" />
        </div>
      </div>

      {/* Bagian 1 - Teks kiri, Gambar kanan */}
      <div className="max-w-5xl mx-auto flex flex-wrap gap-8 items-center mb-12">

        {/* Teks */}
        <div className="flex-1 min-w-[260px]">
          <h2 className="text-xl md:text-2xl font-bold font-serif mb-3">
            <span className="text-yellow-400">Gallery Batik Lontara</span>{" "}
            <span className="text-white">Merupakan</span>
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            usaha yang bergerak di bidang produksi dan penjualan batik khas Makassar yang berdiri sejak
            tahun 2018. Usaha ini didirikan oleh Ibu Ridha Yamin dengan tujuan melestarikan budaya lokal
            melalui motif aksara lontara yang memiliki nilai filosofis.
          </p>
        </div>

        {/* Gambar */}
        <div className="flex-1 min-w-[260px]">
          <img
            src="/aset/halut.png"
            alt="Koleksi Batik"
            className="w-full h-52 object-cover rounded-2xl shadow-lg border border-yellow-900"
          />
        </div>

      </div>

      {/* Bagian 2 - Gambar kiri, Teks kanan */}
      <div className="max-w-5xl mx-auto flex flex-wrap gap-8 items-center mb-12">

        {/* Gambar */}
        <div className="flex-1 min-w-[260px]">
          <img
            src="/aset/halu2.jpg"
            alt="Produk Batik"
            className="w-full h-52 object-cover rounded-2xl shadow-lg border border-yellow-900"
          />
        </div>

        {/* Teks */}
        <div className="flex-1 min-w-[260px]">
          <p className="text-gray-300 text-sm leading-relaxed">
            Produk yang ditawarkan meliputi kain batik, pakaian jadi seperti kemeja dan dress, serta
            layanan pembuatan seragam sesuai pesanan. Selain itu, Galeri Batik Lontara juga
            menyediakan pelatihan membatik sebagai bentuk edukasi dan pelestarian budaya.
          </p>
        </div>

      </div>

      {/* Tombol */}
      <div className="flex justify-center">
        <a href="/produk">
          <button className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold px-10 py-3 rounded-full text-sm transition-colors shadow-lg">
            Lihat Produk Kami →
          </button>
        </a>
      </div>

    </div>
  )
}