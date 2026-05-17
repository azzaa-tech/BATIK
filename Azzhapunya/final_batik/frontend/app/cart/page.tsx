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
import Nav from "../nav/page"
import Produk from "../produk/page"

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
    setItems(items.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)))

  const kurang = (id: number) =>
    setItems(
      items.map((i) =>
        i.id === id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i
      )
    )

  const hapus = (id: number) => setItems(items.filter((i) => i.id !== id))

  const subtotal = items.reduce((acc, i) => acc + i.harga * i.qty, 0)

  const ongkir = subtotal > 0 ? 15000 : 0
  const potongan = Math.round(subtotal * diskon)
  const total = subtotal + ongkir - potongan

  const format = (n: number) => "Rp" + n.toLocaleString("id-ID")

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
    <div>
      <div className="min-h-screen  bg-[#f5f0eb] pt-28 px-3 sm:px-4 py-8 pb-28 font-['Segoe_UI']">
        <Nav />

        {/* Header */}
        <div className="mx-auto mb-5 flex max-w-[960px] items-center gap-[10px]">
          <ShoppingBag size={22} color="#7b1d1d" />

          <h1 className="m-0 text-[18px] sm:text-[20px] font-bold text-[#7b1d1d]">
            Keranjang Belanja
          </h1>

          <span className="rounded-full bg-[#f0e8df] px-[10px] py-[2px] text-[12px] sm:text-[13px] text-[#7b1d1d]">
            {items.length} item
          </span>
        </div>

        {/* Main */}
        <div className="mx-auto flex max-w-[960px] flex-col lg:flex-row items-start gap-5">
          {/* LEFT */}
          <div className="w-full flex-[1_1_480px]">
            <div className="rounded-[20px] bg-[#f8f0e0] p-4 sm:p-7 w-full shadow-[0_6px_25px_rgba(0,0,0,0.12)]">
              <h2 className="mb-4 text-[15px] sm:text-[16px] font-bold uppercase tracking-[0.5px] text-[#7b1d1d]">
                Produk Dipilih
              </h2>

              {items.length === 0 ? (
                <div className="py-12 text-center text-[#aaa]">
                  <ShoppingBag
                    size={60}
                    color="#ccc"
                    className="mx-auto mb-3"
                  />

                  <p className="text-[15px]">Keranjangmu masih kosong</p>

                  <a
                    href="/produk"
                    className="text-[14px] font-semibold text-[#7b1d1d]"
                  >
                    Mulai belanja →
                  </a>
                </div>
              ) : (
                <div className="flex flex-col gap-[18px]">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-[14px] sm:gap-[16px] rounded-[14px] bg-white p-[14px] sm:p-[16px] shadow-[0_3px_10px_rgba(0,0,0,0.08)]"
                    >
                      <div className="flex items-start gap-3 sm:gap-[16px] flex-1 w-full">
                        {/* Foto */}
                        <img
                          src={item.img}
                          alt={item.nama}
                          className="h-[82px] w-[82px] sm:h-[80px] sm:w-[80px] flex-shrink-0 rounded-[12px] object-cover"
                        />

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="mb-[4px] text-[14px] sm:text-[15px] font-bold text-[#2d0000] break-words">
                            {item.nama}
                          </p>

                          <p className="mb-[6px] text-[12px] sm:text-[13px] text-[#999]">
                            Ukuran: {item.size}
                          </p>

                          <p className="text-[15px] sm:text-[16px] font-bold text-[#7b1d1d]">
                            {format(item.harga)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 w-full sm:w-auto">
                        {/* Qty */}
                        <div className="flex items-center gap-[12px] rounded-[10px] bg-[#f5f0eb] px-[12px] py-[8px]">
                          <button
                            onClick={() => kurang(item.id)}
                            className="flex cursor-pointer border-none bg-transparent p-0"
                          >
                            <Minus size={16} color="#555" />
                          </button>

                          <span className="min-w-[18px] text-center text-[14px] font-semibold">
                            {item.qty}
                          </span>

                          <button
                            onClick={() => tambah(item.id)}
                            className="flex cursor-pointer border-none bg-transparent p-0"
                          >
                            <Plus size={16} color="#555" />
                          </button>
                        </div>

                        {/* Hapus */}
                        <button
                          onClick={() => hapus(item.id)}
                          className="flex cursor-pointer rounded-[10px] border-none bg-[#fff0f0] p-2"
                        >
                          <Trash2 size={18} color="#cc2222" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:min-w-[280px] lg:flex-[0_0_300px]">
            <div className="rounded-[20px] bg-[#f7f7f7] p-4 sm:p-7 shadow-[0_6px_25px_rgba(0,0,0,0.12)]">
              <h2 className="mb-[20px] text-[15px] sm:text-[16px] font-bold uppercase tracking-[0.5px] text-[#7b1d1d]">
                Order Summary
              </h2>

              {/* Promo */}
              <div className="mb-[8px] flex flex-col sm:flex-row gap-2">
                <div className="flex flex-1 items-center gap-2 rounded-[12px] border border-[#e0d8d0] bg-white px-[16px] py-[12px]">
                  <Tag size={16} color="#aaa" />

                  <input
                    type="text"
                    placeholder="Kode promo"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    className="w-full border-none bg-transparent text-[14px] text-[#333] outline-none"
                  />
                </div>

                <button
                  onClick={applyPromo}
                  className="cursor-pointer rounded-[12px] border-none bg-[#7b1d1d] px-[16px] py-3 sm:py-0 text-[14px] font-semibold text-white"
                >
                  Apply
                </button>
              </div>

              {/* Promo msg */}
              {promoMsg && (
                <p
                  className={`mb-3 pl-1 text-[13px] ${
                    promoMsg.startsWith("✅")
                      ? "text-[#2a7a2a]"
                      : "text-[#cc2222]"
                  }`}
                >
                  {promoMsg}
                </p>
              )}

              {/* Detail */}
              <div className="mt-[12px] flex flex-col gap-[12px] border-t border-[#ddd6ce] pt-5">
                <div className="flex justify-between text-[14px] text-[#666]">
                  <span>Subtotal</span>
                  <span>{format(subtotal)}</span>
                </div>

                <div className="flex justify-between text-[14px] text-[#666]">
                  <span>Ongkir</span>
                  <span>{format(ongkir)}</span>
                </div>

                {diskon > 0 && (
                  <div className="flex justify-between text-[14px] text-[#2a7a2a]">
                    <span>Diskon Promo</span>
                    <span>- {format(potongan)}</span>
                  </div>
                )}

                <div className="mt-2 flex justify-between border-t border-[#ddd6ce] pt-4 text-[16px] font-bold text-[#2d0000]">
                  <span>Total</span>
                  <span>{format(total)}</span>
                </div>
              </div>

              {/* Button */}
              <a href="/pembayaran">
                <button
                  disabled={items.length === 0}
                  className={`mt-[20px] flex w-full items-center justify-center gap-2 rounded-[14px] border-none p-[16px] text-[14px] font-bold text-white ${
                    items.length === 0
                      ? "cursor-not-allowed bg-[#ccc]"
                      : "cursor-pointer bg-[#7b1d1d]"
                  }`}
                >
                  Go to Checkout
                  <ArrowRight size={18} />
                </button>
              </a>

              {/* Secure */}
              <p className="mt-4 text-center text-[12px] text-[#aaa]">
                🔒 Transaksi aman & terenkripsi
              </p>
            </div>

            {/* Tips */}
            <div className="mt-4 rounded-[16px] bg-[#f0f0f0] px-[18px] py-[14px]">
              <p className="m-0 text-[13px] leading-[1.6] text-[#333]">
                💡 Coba kode{" "}
                <strong className="text-[#7b1d1d]">BATIK10</strong> atau{" "}
                <strong className="text-[#7b1d1d]">LONTARA</strong> untuk
                diskon!
              </p>
            </div>
          </div>
        </div>
      </div>

      <Produk />
    </div>
  )
}