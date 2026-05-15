"use client"

import React from "react"
import Sidebar from "../sidebarmin/page"

const stats = [
  { icon: "💰", label: "Total Pendapatan", value: "Rp 12.450.000", change: "+12%", positive: true },
  { icon: "📦", label: "Pesanan Masuk", value: "48", change: "+8%", positive: true },
  { icon: "🧵", label: "Produk Terjual", value: "134", change: "+5%", positive: true },
  { icon: "📚", label: "Booking Pelatihan", value: "9", change: "-2%", positive: false },
]

const orders = [
  {
    id: "#001",
    customer: "Andi Saputra",
    product: "Blouse Batik 01",
    total: "Rp 185.000",
    status: "Selesai",
    telpon: "081234567890",
    alamat: "Jl. Mawar No. 12, Makassar",
    ekspedisi: "JNE - Reguler",
    pembayaran: "BCA",
  },
  {
    id: "#002",
    customer: "Siti Rahma",
    product: "Kemeja Batik Pria",
    total: "Rp 250.000",
    status: "Diproses",
    telpon: "082345678901",
    alamat: "Jl. Melati No. 5, Gowa",
    ekspedisi: "J&T - Express",
    pembayaran: "Mandiri",
  },
  {
    id: "#003",
    customer: "Budi Santoso",
    product: "Syal Batik Sulawesi",
    total: "Rp 95.000",
    status: "Dibatalkan",
    telpon: "083456789012",
    alamat: "Jl. Kenanga No. 8, Maros",
    ekspedisi: "JNE - Reguler",
    pembayaran: "BRI",
  },
]

const lowStocks = [
  { name: "Syal Batik Sulawesi", stock: 12, danger: false },
  { name: "Batik Parang Klasik", stock: 5, danger: true },
]

const statusStyle: Record<string, string> = {
  Selesai: "bg-green-50 text-green-600 border border-green-200",
  Diproses: "bg-blue-50 text-blue-500 border border-blue-200",
  Dibatalkan: "bg-red-50 text-red-500 border border-red-200",
}

const statusIcon: Record<string, string> = {
  Selesai: "✅",
  Diproses: "🕐",
  Dibatalkan: "❌",
}

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">

      <Sidebar />

      <div className="flex-1 p-4 sm:p-6 md:ml-64">

        {/* Greeting Banner */}
        <div className="w-full bg-[#7b1d1d] rounded-2xl px-5 py-4 sm:px-6 sm:py-5 mb-6 flex items-start sm:items-center gap-4 shadow-md">
          <span className="text-2xl sm:text-3xl mt-0.5 sm:mt-0">👋</span>
          <div>
            <h1 className="text-white font-bold text-lg sm:text-xl leading-tight">Hai, Admin!</h1>
            <p className="text-white/70 text-xs sm:text-sm mt-0.5">
              Selamat bekerja — semoga harimu produktif dan menyenangkan.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{s.icon}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.positive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
                  {s.change}
                </span>
              </div>
              <p className="text-xl font-bold text-gray-800">{s.value}</p>
              <p className="text-sm text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Pesanan Terbaru</h2>
            <button className="text-sm text-orange-500 hover:underline">Lihat semua</button>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 text-left border-b border-gray-100 bg-gray-50/60">
                  <th className="px-5 py-3 font-medium">ID</th>
                  <th className="px-5 py-3 font-medium">Pelanggan</th>
                  <th className="px-5 py-3 font-medium">No. Telpon</th>
                  <th className="px-5 py-3 font-medium">Produk</th>
                  <th className="px-5 py-3 font-medium">Alamat</th>
                  <th className="px-5 py-3 font-medium">Ekspedisi</th>
                  <th className="px-5 py-3 font-medium">Pembayaran</th>
                  <th className="px-5 py-3 font-medium">Total</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors">
                    <td className="px-5 py-3 text-gray-400 text-xs font-mono">{o.id}</td>
                    <td className="px-5 py-3 font-medium text-gray-700">{o.customer}</td>
                    <td className="px-5 py-3 text-gray-500 text-xs">{o.telpon}</td>
                    <td className="px-5 py-3 text-gray-500">{o.product}</td>
                    <td className="px-5 py-3 text-gray-500 text-xs max-w-[130px] truncate" title={o.alamat}>{o.alamat}</td>
                    <td className="px-5 py-3">
                      <span className="text-xs bg-orange-50 text-orange-600 border border-orange-200 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                        {o.ekspedisi}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-xs bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-full font-medium">
                        {o.pembayaran}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-semibold text-red-500 whitespace-nowrap">{o.total}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${statusStyle[o.status]}`}>
                        {statusIcon[o.status]} {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-100">
            {orders.map((o) => (
              <div key={o.id} className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{o.customer}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{o.id} · {o.telpon}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${statusStyle[o.status]}`}>
                    {statusIcon[o.status]} {o.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600 font-medium">{o.product}</p>
                <p className="text-xs text-gray-400 truncate">📍 {o.alamat}</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs bg-orange-50 text-orange-600 border border-orange-200 px-2 py-0.5 rounded-full">{o.ekspedisi}</span>
                  <span className="text-xs bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-full">{o.pembayaran}</span>
                </div>
                <p className="font-semibold text-red-500 text-sm">{o.total}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="font-semibold text-gray-800 mb-4">⚠️ Stok Menipis</h2>
          <div className="flex flex-col gap-3">
            {lowStocks.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.name}</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${item.danger ? "bg-red-100 text-red-500" : "bg-yellow-100 text-yellow-600"}`}>
                  Stok: {item.stock}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}