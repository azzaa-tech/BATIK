"use client";

import React from "react";
import Link from "next/link";


export default function ProdukPage() {
  const produkList = [
    { nama: "Batik Lontara", harga: "Rp 185.000", img: "/aset/produk.png" },
    { nama: "Batik Pria", harga: "Rp 220.000", img: "/aset/halut.png" },
    { nama: "Syal Batik", harga: "Rp 90.000", img: "/aset/halu2.jpg" },
    { nama: "Tas Batik", harga: "Rp 150.000", img: "/aset/produk.png" },
    { nama: "Tas Batik", harga: "Rp 150.000", img: "/aset/produk.png" },
    { nama: "Batik Lontara", harga: "Rp 185.000", img: "/aset/produk.png" },
    { nama: "Batik Pria", harga: "Rp 220.000", img: "/aset/halut.png" },
    { nama: "Syal Batik", harga: "Rp 90.000", img: "/aset/halu2.jpg" },
  ];

  return (
    <div className="bg-white min-h-screen">
      

      {/* Header */}
      <div className="text-center mt-20 mb-10 px-4">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
          Produk
        </h1>
        <div className="flex items-center justify-center gap-3 mt-2">
          <div className="h-px w-20 bg-yellow-600" />
          <span className="text-yellow-500 text-lg">✦</span>
          <div className="h-px w-20 bg-yellow-600" />
        </div>
      </div>

      {/* Grid Produk */}
      <div className="max-w-full px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {produkList.map((produk, i) => (
            <Link href="/detail" key={i}>
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 hover:scale-105 transition cursor-pointer">
                <img
                  src={produk.img}
                  alt={produk.nama}
                  className="w-full h-36 sm:h-40 md:h-44 object-contain"
                />
                <div className="p-3 flex flex-col">
                  <h3 className="font-semibold text-sm sm:text-base">{produk.nama}</h3>
                  <p className="text-[#7b1d1d] font-bold text-sm mt-1">{produk.harga}</p>
                  <Link href="/detail">
                    <button className="w-full mt-3 bg-[#7b1d1d] text-white py-2 rounded-lg text-sm hover:bg-[#5c1414] transition shadow-md hover:shadow-lg">
                      + Keranjang
                    </button>
                  </Link>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}