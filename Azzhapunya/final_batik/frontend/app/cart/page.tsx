"use client"

import { useEffect, useState } from "react"
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
import { apiRequest } from "@/lib/api"

type CartItem = {
  id: number
  productId: number
  nama: string
  size: string
  harga: number
  qty: number
  img: string
}

type ApiCart = {
  items: Array<{
    id: number
    productId: number
    qty: number
    size: string
    product: {
      nama: string
      harga: number
      gambar: string
    }
  }>
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  const [promo, setPromo] = useState("")
  const [diskon, setDiskon] = useState(0)
  const [promoMsg, setPromoMsg] = useState("")

  // ================= LOAD CART =================
  useEffect(() => {
    const loadCart = async () => {
      try {
        const response = await apiRequest<ApiCart>("/cart", {
          auth: true,
        })

        setItems(
          (response.data?.items || []).map((item) => ({
            id: item.id,
            productId: item.productId,
            nama: item.product.nama,
            size: item.size,
            harga: item.product.harga,
            qty: item.qty,
            img: item.product.gambar || "/aset/produk.png",
          }))
        )
      } catch (error) {
        alert(
          error instanceof Error
            ? error.message
            : "Gagal mengambil keranjang"
        )
      } finally {
        setLoading(false)
      }
    }

    loadCart()
  }, [])

  // ================= FORMAT =================
  const format = (n: number) => "Rp " + n.toLocaleString("id-ID")

  // ================= TOTAL =================
  const subtotal = items.reduce(
    (acc, item) => acc + item.harga * item.qty,
    0
  )

  const ongkir = subtotal > 0 ? 15000 : 0
  const potongan = Math.round(subtotal * diskon)
  const total = subtotal + ongkir - potongan

  // ================= UPDATE QTY =================
  const updateQty = async (id: number, qty: number) => {
    if (qty < 1) return

    try {
      await apiRequest(`/cart/${id}`, {
        method: "PUT",
        auth: true,
        body: JSON.stringify({ qty }),
      })

      setItems(
        items.map((item) =>
          item.id === id ? { ...item, qty } : item
        )
      )
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Gagal update keranjang"
      )
    }
  }

  // ================= HAPUS =================
  const hapus = async (id: number) => {
    try {
      await apiRequest(`/cart/${id}`, {
        method: "DELETE",
        auth: true,
      })

      setItems(items.filter((item) => item.id !== id))
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Gagal menghapus item"
      )
    }
  }

  // ================= PROMO =================
  const applyPromo = async () => {
    try {
      const response = await apiRequest<{
        diskon: number
        message: string
      }>("/cart/promo", {
        method: "POST",
        body: JSON.stringify({
          kode: promo,
        }),
      })

      const nextDiskon = response.data?.diskon || 0

      setDiskon(nextDiskon)
      setPromoMsg(
        response.data?.message || "Promo berhasil digunakan"
      )

      sessionStorage.setItem(
        "batik_checkout_discount",
        String(nextDiskon)
      )
    } catch (error) {
      setDiskon(0)

      setPromoMsg(
        error instanceof Error
          ? error.message
          : "Kode promo tidak valid"
      )
    }
  }

  // ================= CHECKOUT =================
  const goToCheckout = () => {
    sessionStorage.setItem(
      "batik_checkout_items",
      JSON.stringify(
        items.map((item) => ({
          productId: item.productId,
          qty: item.qty,
          size: item.size,
          harga: item.harga,
        }))
      )
    )

    sessionStorage.setItem(
      "batik_checkout_subtotal",
      String(subtotal)
    )

    sessionStorage.setItem(
      "batik_checkout_ongkir",
      String(ongkir)
    )

    sessionStorage.setItem(
      "batik_checkout_total",
      String(total)
    )

    window.location.href = "/pembayaran"
  }

  return (
    <div>
      <div className="min-h-screen bg-[#f5f0eb] pt-28 px-3 sm:px-4 py-8 pb-28 font-['Segoe_UI']">
        <Nav />

        {/* HEADER */}
        <div className="mx-auto mb-5 flex max-w-[960px] items-center gap-[10px]">
          <ShoppingBag size={22} color="#7b1d1d" />

          <h1 className="m-0 text-[18px] sm:text-[20px] font-bold text-[#7b1d1d]">
            Keranjang Belanja
          </h1>

          <span className="rounded-full bg-[#f0e8df] px-[10px] py-[2px] text-[12px] sm:text-[13px] text-[#7b1d1d]">
            {items.length} item
          </span>
        </div>

        {/* MAIN */}
        <div className="mx-auto flex max-w-[960px] flex-col lg:flex-row items-start gap-5">
          {/* LEFT */}
          <div className="w-full flex-[1_1_480px]">
            <div className="rounded-[20px] bg-[#f8f0e0] p-4 sm:p-7 w-full shadow-[0_6px_25px_rgba(0,0,0,0.12)]">
              <h2 className="mb-4 text-[15px] sm:text-[16px] font-bold uppercase tracking-[0.5px] text-[#7b1d1d]">
                Produk Dipilih
              </h2>

              {loading ? (
                <div className="py-12 text-center text-[#999]">
                  Memuat keranjang...
                </div>
              ) : items.length === 0 ? (
                <div className="py-12 text-center text-[#aaa]">
                  <ShoppingBag
                    size={60}
                    color="#ccc"
                    className="mx-auto mb-3"
                  />

                  <p className="text-[15px]">
                    Keranjangmu masih kosong
                  </p>

                  <a
                    href="/produkbaru"
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
                        {/* FOTO */}
                        <img
                          src={item.img}
                          alt={item.nama}
                          className="h-[82px] w-[82px] sm:h-[80px] sm:w-[80px] flex-shrink-0 rounded-[12px] object-cover"
                        />

                        {/* INFO */}
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
                        {/* QTY */}
                        <div className="flex items-center gap-[12px] rounded-[10px] bg-[#f5f0eb] px-[12px] py-[8px]">
                          <button
                            onClick={() =>
                              updateQty(item.id, item.qty - 1)
                            }
                            className="flex cursor-pointer border-none bg-transparent p-0"
                          >
                            <Minus size={16} color="#555" />
                          </button>

                          <span className="min-w-[18px] text-center text-[14px] font-semibold">
                            {item.qty}
                          </span>

                          <button
                            onClick={() =>
                              updateQty(item.id, item.qty + 1)
                            }
                            className="flex cursor-pointer border-none bg-transparent p-0"
                          >
                            <Plus size={16} color="#555" />
                          </button>
                        </div>

                        {/* HAPUS */}
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

              {/* PROMO */}
              <div className="mb-[8px] flex flex-col sm:flex-row gap-2">
                <div className="flex flex-1 items-center gap-2 rounded-[12px] border border-[#e0d8d0] bg-white px-[16px] py-[12px]">
                  <Tag size={16} color="#aaa" />

                  <input
                    type="text"
                    placeholder="Kode promo"
                    value={promo}
                    onChange={(e) =>
                      setPromo(e.target.value)
                    }
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

              {/* PROMO MESSAGE */}
              {promoMsg && (
                <p
                  className={`mb-3 pl-1 text-[13px] ${
                    diskon > 0
                      ? "text-[#2a7a2a]"
                      : "text-[#cc2222]"
                  }`}
                >
                  {promoMsg}
                </p>
              )}

              {/* DETAIL */}
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

              {/* BUTTON */}
              <button
                onClick={goToCheckout}
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

              {/* SECURE */}
              <p className="mt-4 text-center text-[12px] text-[#aaa]">
                🔒 Transaksi aman & terenkripsi
              </p>
            </div>

            {/* TIPS */}
            <div className="mt-4 rounded-[16px] bg-[#f0f0f0] px-[18px] py-[14px]">
              <p className="m-0 text-[13px] leading-[1.6] text-[#333]">
                💡 Coba kode{" "}
                <strong className="text-[#7b1d1d]">
                  BATIK10
                </strong>{" "}
                atau{" "}
                <strong className="text-[#7b1d1d]">
                  LONTARA
                </strong>{" "}
                untuk diskon!
              </p>
            </div>
          </div>
        </div>
      </div>

      <Produk />
    </div>
  )
}