"use client"

import { useEffect, useState } from "react"
import { Minus, Plus } from "lucide-react"
import Navbar from "../navbar/page"
import { useRouter } from "next/navigation"
import { apiRequest } from "@/lib/api"

type Product = {
  id: number
  nama: string
  deskripsi: string
  harga: number
  stok: number
  gambar: string
}

export default function ProductDetail() {

  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const params = new URLSearchParams(window.location.search)
        const productId = params.get("id") || "1"
        const response = await apiRequest<Product>(`/products/${productId}`)
        setProduct(response.data || null)
      } catch (error) {
        alert(error instanceof Error ? error.message : "Gagal mengambil detail produk")
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [])

  const addToCart = async () => {
    if (!product) return
    if (!size) {
      alert("Pilih ukuran terlebih dahulu")
      return
    }

    try {
      setSaving(true)
      await apiRequest("/cart", {
        method: "POST",
        auth: true,
        body: JSON.stringify({
          productId: product.id,
          qty,
          size,
        }),
      })
      router.push("/cart")
    } catch (error) {
      alert(error instanceof Error ? error.message : "Gagal menambahkan ke keranjang")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Memuat produk...</div>
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Produk tidak ditemukan.</div>
  }

  return (
    <div className="min-h-screen bg-[#f5f0eb] pb-28 mp-5 flex justify-center items-center">
      <Navbar />

       {/* DETAIL PRODUK */}

      <div className="bg-[#f0e8df] rounded-3xl p-6 max-w-4xl w-full flex flex-col md:flex-row gap-8 shadow-lg">

        {/* GAMBAR */}
        <img
          src={product.gambar || "/aset/produk.png"}
          alt={product.nama}
          className="w-full md:w-[280px] h-[350px] object-cover rounded-2xl"
        />

        {/* DETAIL */}
        <div className="flex-1">

          <h1 className="text-3xl font-bold text-[#2d0000] mb-4">
            {product.nama}
          </h1>

          <p className="text-sm text-gray-600 leading-7 mb-6">
            {product.deskripsi}
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
              Stok : <b>{product.stok}</b>
            </p>
          </div>

          {/* BUTTON */}
          <button onClick={addToCart} disabled={saving || product.stok === 0} className="bg-[#7b1d1d] text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-400">
            {saving ? "Menyimpan..." : "Add to Cart"}
          </button>

        </div>
      </div>
    </div>
  )
}
