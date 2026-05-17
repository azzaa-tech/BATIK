"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/api";

type Product = {
  id: number;
  nama: string;
  harga: number;
  gambar: string;
};

export default function ProdukPage() {
  const [produkList, setProdukList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await apiRequest<Product[]>("/products");
        setProdukList(response.data || []);
      } catch (error) {
        alert(error instanceof Error ? error.message : "Gagal mengambil produk");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const format = (n: number) => "Rp " + n.toLocaleString("id-ID");

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
<<<<<<< HEAD
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {loading && <p className="col-span-full text-center">Memuat produk...</p>}
          {!loading && produkList.length === 0 && (
            <p className="col-span-full text-center">Produk belum tersedia.</p>
          )}
          {produkList.map((produk) => (
            <Link href={`/detail?id=${produk.id}`} key={produk.id}>
=======
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 gap-4gap-4">
          {produkList.map((produk, i) => (
            <Link href="/detail" key={i}>
>>>>>>> cbcca701ce283e0e67e94b56139fc102a1fd170b
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 hover:scale-105 transition cursor-pointer">
                <img
                  src={produk.gambar || "/aset/produk.png"}
                  alt={produk.nama}
                  className="w-full h-36 sm:h-40 md:h-44 object-contain"
                />
                <div className="p-3 flex flex-col">
                  <h3 className="font-semibold text-sm sm:text-base">{produk.nama}</h3>
                  <p className="text-[#7b1d1d] font-bold text-sm mt-1">{format(produk.harga)}</p>
                  <span className="block w-full mt-3 bg-[#7b1d1d] text-white py-2 rounded-lg text-sm text-center hover:bg-[#5c1414] transition shadow-md hover:shadow-lg">
                    + Keranjang
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
