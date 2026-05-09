"use client"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"

export default function ProductDetail() {

  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")

  return (
    <div className="min-h-screen bg-[#f5f0eb] p-5 flex justify-center items-center">

      <div className="bg-[#f0e8df] rounded-3xl p-6 max-w-4xl w-full flex flex-col md:flex-row gap-8 shadow-lg">

        {/* GAMBAR */}
        <img
          src="/aset/produk.png"
          alt="produk"
          className="w-full md:w-[280px] h-[350px] object-cover rounded-2xl"
        />

        {/* DETAIL */}
        <div className="flex-1">

          <h1 className="text-3xl font-bold text-[#2d0000] mb-4">
            Blouse Batik 01
          </h1>

          <p className="text-sm text-gray-600 leading-7 mb-6">
            Batik premium khas Sulawesi Selatan dengan desain elegan,
            nyaman digunakan untuk acara formal maupun casual.
          </p>

          {/* SIZE */}
          <h2 className="text-sm text-gray-500 mb-3">
            Pilih Ukuran
          </h2>

          <div className="flex gap-3 mb-4 flex-wrap">

            {["S", "M", "L", "XL"].map((item, i) => (
              <button
                key={i}
                onClick={() => setSize(item)}
                className={`px-5 py-2 rounded-full border transition ${
                  size === item
                    ? "bg-[#7b1d1d] text-white"
                    : "bg-white hover:bg-[#7b1d1d] hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}

          </div>

          {/* DESKRIPSI UKURAN */}
          {size && (
            <p className="text-sm text-[#7b1d1d] font-semibold mb-6">
              Ukuran : {size}
            </p>
          )}

          {/* QTY */}
          <div className="flex items-center gap-5 mb-8">

            <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl">

              <button onClick={() => qty > 1 && setQty(qty - 1)}>
                <Minus size={16} />
              </button>

              <span className="font-semibold">
                {qty}
              </span>

              <button onClick={() => setQty(qty + 1)}>
                <Plus size={16} />
              </button>

            </div>

            <p className="text-sm text-gray-600">
              Stok : <b>50</b>
            </p>
          </div>

          {/* BUTTON */}
          <a href='/cart'>
          <button className="bg-[#7b1d1d] text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90">
            Add to Cart
          </button>
          </a>

        </div>
      </div>
    </div>
  )
}