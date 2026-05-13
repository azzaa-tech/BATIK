"use client"

import { useState } from "react"
import {
  Minus,
  Plus,
  Trash2,
  Tag,
  ArrowRight,
  ShoppingBag,
} from "lucide-react"
import Navbar from "../navbar/page"

export default function CartPage() {
  const [items, setItems] = useState([
    {
      id: 1,
      nama: "Blouse Batik 01",
      size: "Large",
      harga: 185000,
      qty: 1,
      img: "/aset/produk.png",
    },
    {
      id: 2,
      nama: "Kemeja Batik Pria",
      size: "Medium",
      harga: 250000,
      qty: 1,
      img: "/aset/halut.png",
    },
  ])

  const [promo, setPromo] = useState("")
  const [diskon, setDiskon] = useState(0)
  const [promoMsg, setPromoMsg] = useState("")

  const tambah = (id: number) =>
    setItems(
      items.map((i) =>
        i.id === id ? { ...i, qty: i.qty + 1 } : i
      )
    )

  const kurang = (id: number) =>
    setItems(
      items.map((i) =>
        i.id === id && i.qty > 1
          ? { ...i, qty: i.qty - 1 }
          : i
      )
    )

  const hapus = (id: number) =>
    setItems(items.filter((i) => i.id !== id))

  const subtotal = items.reduce(
    (acc, i) => acc + i.harga * i.qty,
    0
  )

  const ongkir = subtotal > 0 ? 15000 : 0
  const potongan = Math.round(subtotal * diskon)
  const total = subtotal + ongkir - potongan

  const format = (n: number) =>
    "Rp" + n.toLocaleString("id-ID")

  const applyPromo = () => {
    if (promo.toUpperCase() === "BATIK10") {
      setDiskon(0.1)
      setPromoMsg("✅ Promo berhasil! Diskon 10%")
    } else if (promo.toUpperCase() === "LONTARA") {
      setDiskon(0.15)
      setPromoMsg("✅ Promo berhasil! Diskon 15%")
    } else {
      setDiskon(0)
      setPromoMsg("❌ Kode promo tidak valid")
    }
  }

  return (
    <div className="min-h-screen bg-[#7b1d1d] pt-28 px-4 py-8 pb-28 font-['Segoe_UI']">

      <Navbar />
      {/* Header */}
      <div className="mx-auto mb-5 flex max-w-[960px] items-center gap-[10px]">
        <ShoppingBag size={22} color="white" />

        <h1 className="m-0 text-[20px] font-bold text-white">
          Keranjang Belanja
        </h1>

        <span className="rounded-full bg-white/20 px-[10px] py-[2px] text-[13px] text-white">
          {items.length} item
        </span>
      </div>

      {/* Main */}
      <div className="mx-auto flex max-w-[960px] flex-wrap items-start gap-5">

        {/* LEFT */}
        <div className="flex-[1_1_480px]">
          <div className="rounded-[18px] bg-[#f0e8df] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">

            <h2 className="mb-4 text-[15px] font-bold uppercase tracking-[0.5px] text-[#7b1d1d]">
              Produk Dipilih
            </h2>

            {items.length === 0 ? (
              <div className="py-10 text-center text-[#aaa]">
                <ShoppingBag
                  size={48}
                  color="#ccc"
                  className="mx-auto mb-3"
                />

                <p className="text-[14px]">
                  Keranjangmu masih kosong
                </p>

                <a
                  href="/produk"
                  className="text-[13px] font-semibold text-[#7b1d1d]"
                >
                  Mulai belanja →
                </a>
              </div>
            ) : (
              <div className="flex flex-col gap-[14px]">

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-[14px] rounded-[12px] bg-white p-[14px] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                  >

                    {/* Foto */}
                    <img
                      src={item.img}
                      alt={item.nama}
                      className="h-[70px] w-[70px] flex-shrink-0 rounded-[10px] object-cover"
                    />

                    {/* Info */}
                    <div className="flex-1">
                      <p className="mb-[3px] text-[14px] font-bold text-[#2d0000]">
                        {item.nama}
                      </p>

                      <p className="mb-[6px] text-[12px] text-[#999]">
                        Ukuran: {item.size}
                      </p>

                      <p className="text-[15px] font-bold text-[#7b1d1d]">
                        {format(item.harga)}
                      </p>
                    </div>

                    {/* Qty */}
                    <div className="flex items-center gap-[10px] rounded-[8px] bg-[#f5f0eb] px-[10px] py-[6px]">
                      <button
                        onClick={() => kurang(item.id)}
                        className="flex cursor-pointer border-none bg-transparent p-0"
                      >
                        <Minus size={14} color="#555" />
                      </button>

                      <span className="min-w-[16px] text-center text-[14px] font-semibold">
                        {item.qty}
                      </span>

                      <button
                        onClick={() => tambah(item.id)}
                        className="flex cursor-pointer border-none bg-transparent p-0"
                      >
                        <Plus size={14} color="#555" />
                      </button>
                    </div>

                    {/* Hapus */}
                    <button
                      onClick={() => hapus(item.id)}
                      className="flex cursor-pointer rounded-[8px] border-none bg-[#fff0f0] p-2"
                    >
                      <Trash2 size={16} color="#cc2222" />
                    </button>

                  </div>
                ))}

              </div>
            )}

          </div>
        </div>

        {/* RIGHT */}
        <div className="min-w-[260px] flex-[0_0_280px]">

          <div className="rounded-[18px] bg-[#f0e8df] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">

            <h2 className="mb-[18px] text-[15px] font-bold uppercase tracking-[0.5px] text-[#7b1d1d]">
              Order Summary
            </h2>

            {/* Promo */}
            <div className="mb-[6px] flex gap-2">

              <div className="flex flex-1 items-center gap-2 rounded-[10px] border border-[#e0d8d0] bg-white px-[14px] py-[10px]">
                <Tag size={15} color="#aaa" />

                <input
                  type="text"
                  placeholder="Kode promo"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  className="w-full border-none bg-transparent text-[13px] text-[#333] outline-none"
                />
              </div>

              <button
                onClick={applyPromo}
                className="cursor-pointer rounded-[10px] border-none bg-[#7b1d1d] px-[14px] text-[13px] font-semibold text-white"
              >
                Apply
              </button>

            </div>

            {/* Promo msg */}
            {promoMsg && (
              <p
                className={`mb-3 pl-1 text-[12px] ${
                  promoMsg.startsWith("✅")
                    ? "text-[#2a7a2a]"
                    : "text-[#cc2222]"
                }`}
              >
                {promoMsg}
              </p>
            )}

            {/* Detail */}
            <div className="mt-[10px] flex flex-col gap-[10px] border-t border-[#ddd6ce] pt-4">

              <div className="flex justify-between text-[13px] text-[#666]">
                <span>Subtotal</span>
                <span>{format(subtotal)}</span>
              </div>

              <div className="flex justify-between text-[13px] text-[#666]">
                <span>Ongkir</span>
                <span>{format(ongkir)}</span>
              </div>

              {diskon > 0 && (
                <div className="flex justify-between text-[13px] text-[#2a7a2a]">
                  <span>Diskon Promo</span>
                  <span>- {format(potongan)}</span>
                </div>
              )}

              <div className="mt-1 flex justify-between border-t border-[#ddd6ce] pt-3 text-[16px] font-bold text-[#2d0000]">
                <span>Total</span>
                <span>{format(total)}</span>
              </div>

            </div>

            {/* Button */}
            <a href="/pembayaran">
            <button
              disabled={items.length === 0}
              className={`mt-[18px] flex w-full items-center justify-center gap-2 rounded-[12px] border-none p-[14px] text-[14px] font-bold text-white ${
                items.length === 0
                  ? "cursor-not-allowed bg-[#ccc]"
                  : "cursor-pointer bg-[#7b1d1d]"
              }`}
            >
              Go to Checkout
              <ArrowRight size={16} />
            </button>
            
            </a>

            {/* Secure */}
            <p className="mt-3 text-center text-[11px] text-[#aaa]">
              🔒 Transaksi aman & terenkripsi
            </p>

          </div>

          {/* Tips */}
          <div className="mt-3 rounded-[12px] bg-white/10 px-[14px] py-3">
            <p className="m-0 text-[12px] leading-[1.6] text-white/70">
              💡 Coba kode{" "}
              <strong className="text-white">
                BATIK10
              </strong>{" "}
              atau{" "}
              <strong className="text-white">
                LONTARA
              </strong>{" "}
              untuk diskon!
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}