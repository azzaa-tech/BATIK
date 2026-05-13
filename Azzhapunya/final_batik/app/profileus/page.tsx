"use client"

import Navbar from "../navbar/page"

export default function ProfilUsaha() {
  return (
    <div className="min-h-screen bg-[#f5ebe0] font-sans pb-28">
      <Navbar />

      {/* JUDUL */}
      <div className="pt-28 text-center px-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Profil Usaha</h1>
        <div className="flex items-center justify-center gap-3 mt-2">
          <div className="h-px w-16 bg-yellow-600" />
          <span className="text-yellow-600">✦</span>
          <div className="h-px w-16 bg-yellow-600" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 space-y-10">

        {/* BAGIAN 1 - Teks kiri, Gambar kanan */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-serif font-bold leading-snug mb-4">
              <span className="text-yellow-600">Gallery Batik Lontara</span>{" "}
              <span className="text-gray-900">Merupakan</span>
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              usaha yang bergerak di bidang produksi dan penjualan batik khas Makassar yang berdiri
              sejak tahun 2018. Usaha ini didirikan oleh Ibu Ridha Yamin dengan tujuan melestarikan
              budaya lokal melalui motif aksara lontara yang memiliki nilai filosofis.
            </p>
          </div>
          <div className="flex-1 w-full">
            <img
              src="/aset/halut.png"
              alt="Motif Batik"
              className="w-full h-56 md:h-64 object-cover rounded-2xl shadow-md"
            />
          </div>
        </div>

        {/* BAGIAN 2 - Gambar kiri, Teks kanan */}
        <div className="flex flex-col md:flex-row-reverse gap-6 items-center">
          <div className="flex-1">
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Produk yang ditawarkan meliputi kain batik, pakaian jadi seperti kemeja dan dress,
              serta layanan pembuatan seragam sesuai pesanan. Selain itu, Galeri Batik Lontara
              juga menyediakan pelatihan membatik sebagai bentuk edukasi dan pelestarian budaya.
            </p>
          </div>
          <div className="flex-1 w-full">
            <img
              src="/aset/halu2.jpg"
              alt="Produk Batik"
              className="w-full h-56 md:h-64 object-cover rounded-2xl shadow-md"
            />
          </div>
        </div>

        {/* TOMBOL */}
        <div className="flex justify-center pb-4">
          <a href="/produkbaru">
            <button className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold px-8 py-3 rounded-full text-sm transition-colors shadow-md">
              Lihat Produk Kami →
            </button>
          </a>
        </div>

      </div>
    </div>
  )
}