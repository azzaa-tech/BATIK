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

    if (file) {
      setPreview(URL.createObjectURL(file))
    }
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

  // ================= FORM TAMBAH PRODUK =================
  if (showForm)
    return (
      <div className="min-h-screen bg-gray-100 flex font-sans">

        {/* SIDEBAR */}
        <Sidebar />

        {/* CONTENT */}
        <div className="flex-1 p-6 md:ml-64">

          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 shadow-sm">

            <h2 className="font-bold text-gray-800 text-base mb-6">
              Tambah Produk
            </h2>

            <div className="flex flex-wrap gap-6">

              {/* FORM */}
              <div className="flex-1 min-w-[220px] space-y-4">

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Nama barang
                  </label>

                  <input
                    type="text"
                    value={form.nama}
                    onChange={set("nama")}
                    placeholder="Masukkan nama barang"
                    className={`w-full border rounded-lg px-3 py-2 text-sm outline-none ${
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

                  <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:border-[#7b1d1d]">

                    <span className="bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-600">
                      Rp
                    </span>

                    <input
                      type="number"
                      value={form.harga}
                      onChange={set("harga")}
                      placeholder="Masukkan harga"
                      className="flex-1 px-3 py-2 text-sm outline-none"
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
                    className={`w-full border rounded-lg px-3 py-2 text-sm outline-none ${
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

              {/* FOTO */}
              <div className="flex-1 min-w-[180px]">

                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Foto produk
                </label>

                <div
                  onClick={() => inputRef.current?.click()}
                  className="border-2 border-dashed border-[#7b1d1d]/40 rounded-xl h-44 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden"
                >

                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <Upload
                        size={32}
                        className="text-[#7b1d1d]/50"
                      />

                      <p className="text-xs text-gray-500 text-center px-4">
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

            {/* DESKRIPSI */}
            <div className="mt-5">

              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Deskripsi
              </label>

              <textarea
                value={form.deskripsi}
                onChange={set("deskripsi")}
                placeholder="Masukkan deskripsi barang"
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#7b1d1d] resize-none"
              />

            </div>

            {/* BUTTON */}
            <div className="flex justify-between items-center mt-6">

              <button
                onClick={() => setShowForm(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                ← Kembali
              </button>

              <button
                onClick={handleSimpan}
                className="bg-[#c8956c] hover:bg-[#b5845a] text-white font-bold px-8 py-2.5 rounded-xl text-sm transition-colors"
              >
                Simpan
              </button>

            </div>

          </div>

        </div>

      </div>
    )

  // ================= LIST PRODUK =================
  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">

      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT */}
      <div className="flex-1 p-6 md:ml-64">

        <div className="flex items-center justify-between mb-6">

          <div>
            <h1 className="font-bold text-gray-800 text-base">
              Produk
            </h1>

            <p className="text-xs text-gray-400">
              Selamat datang, Admin 👋
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-[#7b1d1d] hover:bg-[#5e1515] text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            + Tambah Produk
          </button>

        </div>

        <div className="grid gap-4 sm:grid-cols-2">

          {produk.map((p, i) => (

            <div
              key={i}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
            >

              <div className="flex items-start justify-between mb-2">

                <p className="font-bold text-gray-800 text-sm">
                  {p.nama}
                </p>

                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
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

              <div className="flex gap-2">

                <button className="flex-1 text-xs border border-gray-200 rounded-lg py-2 hover:bg-gray-50 text-gray-600">
                  Edit
                </button>

                <button
                  onClick={() =>
                    setProduk(produk.filter((_, idx) => idx !== i))
                  }
                  className="flex-1 text-xs border border-red-100 rounded-lg py-2 hover:bg-red-50 text-red-500"
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