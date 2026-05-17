"use client"

import { useState, useRef } from "react"
import { Upload } from "lucide-react"
import Sidebar from "../sidebarmin/page"

const dataProduk = [
  { nama: "Blouse Batik 01", harga: "Rp 185.000", stok: 50, terjual: 32 },
  { nama: "Kemeja Batik Pria", harga: "Rp 250.000", stok: 30, terjual: 21 },
  { nama: "Syal Batik Sulawesi", harga: "Rp 95.000", stok: 12, terjual: 48 },
  { nama: "Batik Parang Klasik", harga: "Rp 210.000", stok: 5, terjual: 15 },
]

export default function ProdukAdmin() {
  const [produk, setProduk] = useState(dataProduk)
  const [showForm, setShowForm] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const inputRef = useRef<HTMLInputElement | null>(null)

  const [form, setForm] = useState({
    nama: "",
    harga: "",
    stok: "",
    deskripsi: "",
  })

  const [errors, setErrors] = useState<any>({})

  const set = (key: string) => (e: any) => {
    setForm({ ...form, [key]: e.target.value })
    setErrors({ ...errors, [key]: "" })
  }

  const handleFoto = (e: any) => {
    const file = e.target.files[0]
    if (file) setPreview(URL.createObjectURL(file))
  }

  const handleSimpan = () => {
    const err: any = {}

    if (!form.nama.trim()) err.nama = "Wajib diisi"
    if (!form.harga.trim()) err.harga = "Wajib diisi"
    if (!form.stok.trim()) err.stok = "Wajib diisi"

    setErrors(err)
    if (Object.keys(err).length > 0) return

    setProduk([
      ...produk,
      {
        nama: form.nama,
        harga: "Rp " + Number(form.harga).toLocaleString("id-ID"),
        stok: Number(form.stok),
        terjual: 0,
      },
    ])

    setForm({
      nama: "",
      harga: "",
      stok: "",
      deskripsi: "",
    })

    setPreview(null)
    setShowForm(false)
  }

  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-100 flex font-sans">
        <Sidebar />

        <div className="flex-1 md:ml-64 w-full p-3 sm:p-5 md:p-6 overflow-x-hidden">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-800 text-base sm:text-lg mb-5 sm:mb-6">
              Tambah Produk
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Nama barang
                  </label>

                  <input
                    type="text"
                    value={form.nama}
                    onChange={set("nama")}
                    placeholder="Masukkan nama barang"
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none ${
                      errors.nama
                        ? "border-red-400"
                        : "border-gray-300 focus:border-[#7b1d1d]"
                    }`}
                  />

                  {errors.nama && (
                    <p className="text-red-500 text-xs mt-1">
                      ⚠ {errors.nama}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Harga barang
                  </label>

                  <div
                    className={`flex border rounded-lg overflow-hidden ${
                      errors.harga
                        ? "border-red-400"
                        : "border-gray-300 focus-within:border-[#7b1d1d]"
                    }`}
                  >
                    <span className="bg-gray-100 px-3 py-2.5 text-sm font-semibold text-gray-600">
                      Rp
                    </span>

                    <input
                      type="number"
                      value={form.harga}
                      onChange={set("harga")}
                      placeholder="Masukkan harga"
                      className="flex-1 min-w-0 px-3 py-2.5 text-sm outline-none"
                    />
                  </div>

                  {errors.harga && (
                    <p className="text-red-500 text-xs mt-1">
                      ⚠ {errors.harga}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Stok
                  </label>

                  <input
                    type="number"
                    value={form.stok}
                    onChange={set("stok")}
                    placeholder="Masukkan jumlah stok"
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none ${
                      errors.stok
                        ? "border-red-400"
                        : "border-gray-300 focus:border-[#7b1d1d]"
                    }`}
                  />

                  {errors.stok && (
                    <p className="text-red-500 text-xs mt-1">
                      ⚠ {errors.stok}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Foto produk
                </label>

                <div
                  onClick={() => inputRef.current?.click()}
                  className="border-2 border-dashed border-[#7b1d1d]/40 rounded-xl h-48 sm:h-full min-h-48 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden"
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <Upload size={32} className="text-[#7b1d1d]/50" />

                      <p className="text-xs text-gray-500 text-center px-4 leading-relaxed">
                        Klik untuk upload foto
                        <br />
                        atau drag & drop file di sini
                      </p>
                    </>
                  )}
                </div>

                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFoto}
                  className="hidden"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Deskripsi
              </label>

              <textarea
                value={form.deskripsi}
                onChange={set("deskripsi")}
                placeholder="Masukkan deskripsi barang"
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#7b1d1d] resize-none"
              />
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-3 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="w-full sm:w-auto text-sm text-gray-500 hover:text-gray-700 py-2"
              >
                ← Kembali
              </button>

              <button
                onClick={handleSimpan}
                className="w-full sm:w-auto bg-[#c8956c] hover:bg-[#b5845a] text-white font-bold px-8 py-2.5 rounded-xl text-sm transition-colors"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      <Sidebar />

      <div className="flex-1 md:ml-64 w-full p-3 sm:p-5 md:p-6 overflow-x-hidden">
        <div className="w-full bg-[#7d0000] rounded-2xl px-4 py-4 sm:px-6 sm:py-5 mb-5 sm:mb-6 flex items-start sm:items-center gap-3 sm:gap-4 shadow-md">
          <span className="text-2xl sm:text-3xl">👋</span>

          <div className="min-w-0">
            <h1 className="text-white font-bold text-base sm:text-xl leading-tight">
              Hai, Admin!
            </h1>
            <p className="text-white/70 text-xs sm:text-sm mt-1 leading-relaxed">
              Selamat bekerja — semoga harimu produktif dan menyenangkan.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
          <h2 className="font-bold text-gray-800 text-base sm:text-lg">
            Produk
          </h2>

          <button
            onClick={() => setShowForm(true)}
            className="bg-[#7b1d1d] hover:bg-[#5e1515] text-white font-bold px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-colors whitespace-nowrap"
          >
            + Tambah Produk
          </button>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {produk.map((p, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <p className="font-bold text-gray-800 text-sm break-words">
                  {p.nama}
                </p>

                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                    p.stok <= 5
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  Stok: {p.stok}
                </span>
              </div>

              <p className="text-[#7b1d1d] font-bold text-base mb-1">
                {p.harga}
              </p>

              <p className="text-xs text-gray-400 mb-4">
                Terjual: {p.terjual} pcs
              </p>

              <div className="grid grid-cols-2 gap-2">
                <button className="text-xs border border-gray-200 rounded-lg py-2 hover:bg-gray-50 text-gray-600">
                  Edit
                </button>

                <button
                  onClick={() => setProduk(produk.filter((_, idx) => idx !== i))}
                  className="text-xs border border-red-100 rounded-lg py-2 hover:bg-red-50 text-red-500"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}