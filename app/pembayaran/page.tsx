"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { FileText, Upload, X } from "lucide-react"
import Navbar from "../navbar/page"

const banks = [
  { nama: "BCA Virtual Account", norek: "1234-5678-9012" },
  { nama: "Mandiri Virtual Account", norek: "8901-2345-6789" },
  { nama: "BNI Virtual Account", norek: "5678-9012-3456" },
  { nama: "BRI Virtual Account", norek: "3456-7890-1234" },
]

const bankLabel = ["BCA", "MDR", "BNI", "BRI"]

export default function CheckoutPage() {

  const [form, setForm] = useState({ nama: "", alamat: "", telpon: "", catatan: "" })
  const [errors, setErrors] = useState({})
  const [metodeDipilih, setMetodeDipilih] = useState(null)
  const [dropdown, setDropdown] = useState(null)

  // Bukti transaksi
  const [showModal, setShowModal] = useState(false)
  const [foto, setFoto] = useState(null)
  const [preview, setPreview] = useState(null)
  const inputRef = useRef(null)

  const subtotal = 200000
  const ongkir   = 15000
  const total    = subtotal + ongkir
  const format   = (n) => "Rp" + n.toLocaleString("id-ID")

  const handleFoto = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setFoto(file)
    setPreview(URL.createObjectURL(file))
  }

  const hapusFoto = () => {
    setFoto(null)
    setPreview(null)
    if (inputRef.current) inputRef.current.value = ""
  }

  const handleCheckout = () => {
    const newErrors = {}
    if (!form.nama.trim())      newErrors.nama    = "Nama penerima wajib diisi"
    if (!form.alamat.trim())    newErrors.alamat  = "Alamat wajib diisi"
    if (!form.telpon.trim())    newErrors.telpon  = "No. Telepon wajib diisi"
    if (metodeDipilih === null) newErrors.metode  = "Pilih metode pembayaran dulu"
    if (!foto)                  newErrors.foto    = "Upload bukti transaksi dulu"

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      alert("✅ Pesanan berhasil dikonfirmasi!")
    }
  }

  return (
    <div className="min-h-screen pb-28 pt-28 bg-[#7b1d1d] p-6 font-sans">
      <Navbar />

     <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6 items-start">

        {/* ===== KIRI - Form ===== */}
        <div className="flex-1 min-w-[650px] bg-[#f0e8df] rounded-2xl p-6 shadow-lg">

          <div className="mb-6">
            <Image src="/aset/logo.png" alt="logo" width={90} height={45} className="object-contain" />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-[#2d0000] mb-1">Nama Penerima</label>
            <input type="text" value={form.nama} onChange={(e) => { setForm({ ...form, nama: e.target.value }); setErrors({ ...errors, nama: "" }) }}
              className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none bg-white ${errors.nama ? "border-red-400" : "border-gray-300 focus:border-[#7b1d1d]"}`}
              placeholder="Masukkan nama penerima" />
            {errors.nama && <p className="text-red-500 text-xs mt-1">⚠ {errors.nama}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-[#2d0000] mb-1">Alamat</label>
            <input type="text" value={form.alamat} onChange={(e) => { setForm({ ...form, alamat: e.target.value }); setErrors({ ...errors, alamat: "" }) }}
              className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none bg-white ${errors.alamat ? "border-red-400" : "border-gray-300 focus:border-[#7b1d1d]"}`}
              placeholder="Masukkan alamat lengkap" />
            {errors.alamat && <p className="text-red-500 text-xs mt-1">⚠ {errors.alamat}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-[#2d0000] mb-1">No. Telepon</label>
            <input type="tel" value={form.telpon} onChange={(e) => { setForm({ ...form, telpon: e.target.value }); setErrors({ ...errors, telpon: "" }) }}
              className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none bg-white ${errors.telpon ? "border-red-400" : "border-gray-300 focus:border-[#7b1d1d]"}`}
              placeholder="08xxxxxxxxxx" />
            {errors.telpon && <p className="text-red-500 text-xs mt-1">⚠ {errors.telpon}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#2d0000] mb-1">
              Catatan Untuk Kurir <span className="font-normal text-gray-400">(Opsional)</span>
            </label>
            <input type="text" value={form.catatan} onChange={(e) => setForm({ ...form, catatan: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#7b1d1d] bg-white"
              placeholder="Contoh: titip di depan pintu" />
          </div>

          {/* Tombol Bukti Transaksi */}
          <button
            onClick={() => setShowModal(true)}
            className={`w-full flex items-center justify-center gap-3 border-2 rounded-xl py-3 font-bold text-base transition-colors ${errors.foto ? "border-red-400 text-red-500" : "border-[#7b1d1d] text-[#7b1d1d] hover:bg-[#7b1d1d]/10"}`}
          >
            <FileText size={20} />
            Bukti Transaksi
            {foto && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-normal">
                ✓ Terupload
              </span>
            )}
          </button>
          {errors.foto && <p className="text-red-500 text-xs mt-1">⚠ {errors.foto}</p>}

        </div>

        {/* ===== KANAN - Pembayaran + Summary ===== */}
        <div className="w-full lg:flex-1 bg-[#f0e8df] rounded-3xl p-5 md:p-6 shadow-xl">

          <h2 className="text-base font-bold text-[#2d0000] mb-4">Metode Pembayaran</h2>

          <div className="flex flex-col gap-2 mb-6">
            {banks.map((bank, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div
                  className="flex items-center justify-between px-4 py-3 cursor-pointer"
                  onClick={() => { setMetodeDipilih(i); setDropdown(dropdown === i ? null : i) }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-blue-700 font-bold text-xs bg-blue-100 px-2 py-0.5 rounded">{bankLabel[i]}</span>
                    <span className="text-sm font-medium text-gray-700">{bank.nama}</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${metodeDipilih === i ? "border-[#7b1d1d]" : "border-gray-300"}`}>
                    {metodeDipilih === i && <div className="w-2.5 h-2.5 rounded-full bg-[#7b1d1d]" />}
                  </div>
                </div>
                {dropdown === i && (
                  <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
                    <p className="text-xs text-gray-500 mb-1">Nomor Rekening</p>
                    <p className="text-sm font-bold text-[#7b1d1d] tracking-widest">{bank.norek}</p>
                    <p className="text-xs text-gray-400 mt-1">Atas nama: Gallery Batik Lontara</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {errors.metode && <p className="text-red-500 text-xs mb-3">⚠ {errors.metode}</p>}

          <h2 className="text-base font-bold text-[#2d0000] mb-3">Order Summary</h2>
          <div className="flex flex-col gap-2 text-sm text-gray-600 mb-4">
            <div className="flex justify-between"><span>Subtotal</span><span>{format(subtotal)}</span></div>
            <div className="flex justify-between"><span>Delivery Fee</span><span>{format(ongkir)}</span></div>
            <div className="flex justify-between font-bold text-base text-[#2d0000] border-t border-gray-200 pt-3 mt-1">
              <span>Total</span><span>{format(total)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-[#7b1d1d] text-white rounded-full py-3 text-sm font-bold hover:bg-[#5e1515] transition-colors"
          >
            Go to Checkout
          </button>

        </div>
      </div>

      {/* ===== MODAL BUKTI TRANSAKSI ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-[#2d0000]">Upload Bukti Transaksi</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={22} />
              </button>
            </div>

            {/* Area upload / preview */}
            {!preview ? (
              <div
                onClick={() => inputRef.current?.click()}
                className="border-2 border-dashed border-[#7b1d1d]/40 rounded-xl h-52 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-[#f0e8df] transition-colors"
              >
                <Upload size={36} className="text-[#7b1d1d]/50" />
                <p className="text-sm font-semibold text-[#7b1d1d]">Klik untuk pilih foto</p>
                <p className="text-xs text-gray-400">JPG, PNG, JPEG</p>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden h-52">
                <img src={preview} alt="preview" className="w-full h-full object-cover" />
                <button
                  onClick={hapusFoto}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Input file hidden */}
            <input ref={inputRef} type="file" accept="image/*" onChange={handleFoto} className="hidden" />

            {/* Nama file */}
            {foto && <p className="text-xs text-gray-500 mt-2 text-center truncate">📎 {foto.name}</p>}

            {/* Tombol Batal / Simpan */}
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-300 rounded-xl py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => { if (foto) setShowModal(false) }}
                disabled={!foto}
                className={`flex-1 rounded-xl py-2.5 text-sm font-bold text-white transition-colors ${foto ? "bg-[#7b1d1d] hover:bg-[#5e1515] cursor-pointer" : "bg-gray-300 cursor-not-allowed"}`}
              >
                Simpan
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
