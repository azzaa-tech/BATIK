"use client"

import { useState } from "react"
import Image from "next/image"

const banks = [
  {
    nama: "BCA Virtual Account",
    norek: "1234-5678-9012",
    logo: "🏦",
  },
  {
    nama: "Mandiri Virtual Account",
    norek: "8901-2345-6789",
    logo: "🏦",
  },
  {
    nama: "BNI Virtual Account",
    norek: "5678-9012-3456",
    logo: "🏦",
  },
  {
    nama: "BRI Virtual Account",
    norek: "3456-7890-1234",
    logo: "🏦",
  },
]

export default function CheckoutPage() {

  const [form, setForm] = useState({ nama: "", alamat: "", telpon: "", catatan: "" })
  const [metodeDipilih, setMetodeDipilih] = useState(null)
  const [dropdown, setDropdown] = useState(null) // index bank yang dibuka dropdown-nya

  const subtotal = 200000
  const ongkir   = 15000
  const total    = subtotal + ongkir
  const format   = (n) => "Rp" + n.toLocaleString("id-ID")

  return (
    <div className="min-h-screen bg-[#7b1d1d] p-6 font-sans">

      <div className="max-w-5xl mx-auto flex gap-6 flex-wrap items-start">

        {/* ===== KIRI - Form ===== */}
        <div className="flex-1 min-w-[280px] bg-[#f0e8df] rounded-2xl p-6 shadow-lg">

          {/* Logo */}
          <div className="mb-6">
            <Image src="/aset/logo.png" alt="logo" width={90} height={45} className="object-contain" />
          </div>

          {/* Nama Penerima */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-[#2d0000] mb-1">Nama Penerima</label>
            <input
              type="text"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#7b1d1d] bg-white"
              placeholder="Masukkan nama penerima"
            />
          </div>

          {/* Alamat */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-[#2d0000] mb-1">Alamat</label>
            <input
              type="text"
              value={form.alamat}
              onChange={(e) => setForm({ ...form, alamat: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#7b1d1d] bg-white"
              placeholder="Masukkan alamat lengkap"
            />
          </div>

          {/* No. Telepon */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-[#2d0000] mb-1">No. Telepon</label>
            <input
              type="tel"
              value={form.telpon}
              onChange={(e) => setForm({ ...form, telpon: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#7b1d1d] bg-white"
              placeholder="08xxxxxxxxxx"
            />
          </div>

          {/* Catatan */}
          <div className="mb-2">
            <label className="block text-sm font-semibold text-[#2d0000] mb-1">Catatan Untuk Kurir <span className="font-normal text-gray-400">(Opsional)</span></label>
            <input
              type="text"
              value={form.catatan}
              onChange={(e) => setForm({ ...form, catatan: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#7b1d1d] bg-white"
              placeholder="Contoh: titip di depan pintu"
            />
          </div>

        </div>

        {/* ===== KANAN - Pembayaran + Summary ===== */}
        <div className="flex-1 min-w-[280px] bg-[#f0e8df] rounded-2xl p-6 shadow-lg">

          {/* Metode Pembayaran */}
          <h2 className="text-base font-bold text-[#2d0000] mb-4">Metode Pembayaran</h2>

          <div className="flex flex-col gap-2 mb-6">
            {banks.map((bank, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">

                {/* Baris utama */}
                <div
                  className="flex items-center justify-between px-4 py-3 cursor-pointer"
                  onClick={() => {
                    setMetodeDipilih(i)
                    setDropdown(dropdown === i ? null : i)
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-blue-700 font-bold text-sm bg-blue-100 px-2 py-0.5 rounded">BCA</span>
                    <span className="text-sm font-medium text-gray-700">{bank.nama}</span>
                  </div>

                  {/* Radio */}
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${metodeDipilih === i ? "border-[#7b1d1d]" : "border-gray-300"}`}>
                    {metodeDipilih === i && <div className="w-2.5 h-2.5 rounded-full bg-[#7b1d1d]" />}
                  </div>
                </div>

                {/* Dropdown no rekening */}
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

          {/* Order Summary */}
          <h2 className="text-base font-bold text-[#2d0000] mb-3">Order Summary</h2>

          <div className="flex flex-col gap-2 text-sm text-gray-600 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{format(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>{format(ongkir)}</span>
            </div>
            <div className="flex justify-between font-bold text-base text-[#2d0000] border-t border-gray-200 pt-3 mt-1">
              <span>Total</span>
              <span>{format(total)}</span>
            </div>
          </div>

          {/* Tombol */}
          <button className="w-full bg-[#7b1d1d] text-white rounded-full py-3 text-sm font-bold hover:bg-[#5e1515] transition-colors">
            Go to Checkout
          </button>

        </div>

      </div>
    </div>
  )
}