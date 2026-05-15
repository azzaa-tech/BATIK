"use client"

import React from "react"
import Sidebar from "../sidebarmin/page"

// ================= DATA =================

const stats = [
  {
    icon: "💰",
    label: "Total Pendapatan",
    value: "Rp 12.450.000",
    change: "+12%",
    positive: true,
  },
  {
    icon: "📦",
    label: "Pesanan Masuk",
    value: "48",
    change: "+8%",
    positive: true,
  },
  {
    icon: "🧵",
    label: "Produk Terjual",
    value: "134",
    change: "+5%",
    positive: true,
  },
  {
    icon: "📚",
    label: "Booking Pelatihan",
    value: "9",
    change: "-2%",
    positive: false,
  },
]

const orders = [
  {
    id: "#001",
    customer: "Andi Saputra",
    product: "Blouse Batik 01",
    total: "Rp 185.000",
    status: "Selesai",
  },
  {
    id: "#002",
    customer: "Siti Rahma",
    product: "Kemeja Batik Pria",
    total: "Rp 250.000",
    status: "Diproses",
  },
  {
    id: "#003",
    customer: "Budi Santoso",
    product: "Syal Batik Sulawesi",
    total: "Rp 95.000",
    status: "Dibatalkan",
  },
]

const lowStocks = [
  { name: "Syal Batik Sulawesi", stock: 12, danger: false },
  { name: "Batik Parang Klasik", stock: 5, danger: true },
]

const statusStyle: Record<string, string> = {
  Selesai: "bg-green-100 text-green-600",
  Diproses: "bg-blue-100 text-blue-600",
  Dibatalkan: "bg-red-100 text-red-500",
}

const statusIcon: Record<string, string> = {
  Selesai: "✅",
  Diproses: "🕐",
  Dibatalkan: "❌",
}

// ================= PAGE =================

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">

      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT */}
      <div className="flex-1 p-6 md:ml-64">

        {/* Greeting Banner */}
        <div className="w-full bg-[#7d0000] rounded-2xl px-6 py-5 mb-6 flex items-center gap-4 shadow-md">
          <span className="text-3xl">👋</span>
          <div>
            <h1 className="text-white font-bold text-xl leading-tight">
              Hai, Admin!
            </h1>
            <p className="text-white/70 text-sm mt-0.5">
              Selamat bekerja — semoga harimu produktif dan menyenangkan.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div
          className="
            grid grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-4 mb-6
          "
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{s.icon}</span>
                <span
                  className={`
                    text-xs font-semibold
                    px-2 py-0.5 rounded-full
                    ${
                      s.positive
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-500"
                    }
                  `}
                >
                  {s.change}
                </span>
              </div>
              <p className="text-xl font-bold text-gray-800">{s.value}</p>
              <p className="text-sm text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-6 overflow-x-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">Pesanan Terbaru</h2>
            <button className="text-sm text-orange-500 hover:underline">
              Lihat semua
            </button>
          </div>

          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="text-gray-400 text-left border-b border-gray-100">
                <th className="pb-2 font-medium">ID</th>
                <th className="pb-2 font-medium">Pelanggan</th>
                <th className="pb-2 font-medium">Produk</th>
                <th className="pb-2 font-medium">Total</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr
                  key={o.id}
                  className="border-b border-gray-50 last:border-0"
                >
                  <td className="py-3 text-gray-400">{o.id}</td>
                  <td className="py-3 font-medium text-gray-700">{o.customer}</td>
                  <td className="py-3 text-gray-500">{o.product}</td>
                  <td className="py-3 font-semibold text-red-500">{o.total}</td>
                  <td className="py-3">
                    <span
                      className={`
                        inline-flex items-center gap-1
                        text-xs font-medium
                        px-2.5 py-1 rounded-full
                        ${statusStyle[o.status]}
                      `}
                    >
                      {statusIcon[o.status]} {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Low Stock */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="font-semibold text-gray-800 mb-4">⚠️ Stok Menipis</h2>
          <div className="flex flex-col gap-3">
            {lowStocks.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <span className="text-sm text-gray-600">{item.name}</span>
                <span
                  className={`
                    text-xs font-semibold
                    px-2.5 py-1 rounded-full
                    ${
                      item.danger
                        ? "bg-red-100 text-red-500"
                        : "bg-yellow-100 text-yellow-600"
                    }
                  `}
                >
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