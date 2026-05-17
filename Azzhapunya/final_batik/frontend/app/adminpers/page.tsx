"use client";

import { useState } from "react";
import Sidebar from "../sidebarmin/page";
import { Eye, X } from "lucide-react";

type Status = "Diproses" | "Diperjalanan" | "Selesai";

interface Order {
  id: string;
  customer: string;
  product: string;
  total: string;
  status: Status;
  alamat: string;
  telpon: string;
  ekspedisi: string;
  pembayaran: string;
  catatan: string;
}

const initialOrders: Order[] = [
  {
    id: "#001",
    customer: "Andi Saputra",
    product: "Blouse Batik 01",
    total: "Rp 185.000",
    status: "Selesai",
    alamat: "Jl. Mawar No. 12, Makassar",
    telpon: "081234567890",
    ekspedisi: "JNE - Reguler",
    pembayaran: "BCA Virtual Account",
    catatan: "-",
  },
  {
    id: "#002",
    customer: "Siti Rahma",
    product: "Kemeja Batik Pria",
    total: "Rp 250.000",
    status: "Diproses",
    alamat: "Jl. Melati No. 5, Gowa",
    telpon: "082345678901",
    ekspedisi: "J&T - Express",
    pembayaran: "Mandiri Virtual Account",
    catatan: "Titip di depan pintu",
  },
  {
    id: "#003",
    customer: "Budi Santoso",
    product: "Syal Batik Sulawesi",
    total: "Rp 95.000",
    status: "Diproses",
    alamat: "Jl. Kenanga No. 8, Maros",
    telpon: "083456789012",
    ekspedisi: "JNE - Reguler",
    pembayaran: "BRI Virtual Account",
    catatan: "-",
  },
];

const statusOptions: Status[] = ["Diproses", "Diperjalanan", "Selesai"];

const statusStyle: Record<Status, string> = {
  Diproses: "bg-blue-50 text-blue-500 border border-blue-200",
  Diperjalanan: "bg-yellow-50 text-yellow-600 border border-yellow-200",
  Selesai: "bg-green-50 text-green-600 border border-green-200",
};

const statusIcon: Record<Status, string> = {
  Diproses: "🕐",
  Diperjalanan: "🚚",
  Selesai: "✅",
};

export default function TabelPesanan() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [detailOrder, setDetailOrder] = useState<Order | null>(null);

  const handleStatusChange = (id: string, newStatus: Status) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
    setOpenDropdown(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <Sidebar />

      <div className="flex-1 md:ml-64 w-full p-3 sm:p-5 md:p-6 overflow-x-hidden">
        <div className="w-full bg-[#7b1d1d] rounded-2xl px-4 py-4 sm:px-6 sm:py-5 mb-5 sm:mb-6 flex items-start sm:items-center gap-3 sm:gap-4 shadow-md">
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

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-visible pb-24 md:pb-20">
          <div className="px-4 sm:px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
            <h2 className="font-semibold text-gray-800 text-sm sm:text-base">
              Daftar Pesanan
            </h2>

            <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100 whitespace-nowrap">
              {orders.length} pesanan
            </span>
          </div>

          <div className="hidden md:block overflow-x-auto overflow-y-visible pb-20">
            <table className="w-full min-w-[950px] text-sm">
              <thead>
                <tr className="text-gray-400 text-left border-b border-gray-100 bg-gray-50/60">
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Pelanggan</th>
                  <th className="px-4 py-3 font-medium">No. Telpon</th>
                  <th className="px-4 py-3 font-medium">Produk</th>
                  <th className="px-4 py-3 font-medium">Alamat</th>
                  <th className="px-4 py-3 font-medium">Ekspedisi</th>
                  <th className="px-4 py-3 font-medium">Pembayaran</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((o) => (
                  <tr
                    key={o.id}
                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-400 text-xs font-mono">
                      {o.id}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-700">
                      {o.customer}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {o.telpon}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{o.product}</td>
                    <td
                      className="px-4 py-3 text-gray-500 text-xs max-w-[130px] truncate"
                      title={o.alamat}
                    >
                      {o.alamat}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs bg-orange-50 text-orange-600 border border-orange-200 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                        {o.ekspedisi}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                        {o.pembayaran.split(" ")[0]}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-red-500 whitespace-nowrap">
                      {o.total}
                    </td>

                    <td className="px-4 py-3 relative">
                      <button
                        onClick={() =>
                          setOpenDropdown(openDropdown === o.id ? null : o.id)
                        }
                        className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full cursor-pointer hover:opacity-80 transition-opacity whitespace-nowrap ${statusStyle[o.status]}`}
                      >
                        {statusIcon[o.status]} {o.status}
                        <span className="opacity-50 text-[10px]">▾</span>
                      </button>

                      {openDropdown === o.id && (
                        <div className="absolute right-0 top-10 z-50 bg-white border border-gray-100 rounded-xl shadow-lg py-1 min-w-[170px]">
                          {statusOptions.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => handleStatusChange(o.id, opt)}
                              className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-gray-50 transition-colors"
                            >
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${statusStyle[opt]}`}
                              >
                                {statusIcon[opt]} {opt}
                              </span>

                              {o.status === opt && (
                                <span className="ml-auto text-green-500">✓</span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <button
                        onClick={() => setDetailOrder(o)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                        title="Lihat detail"
                      >
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden divide-y divide-gray-100 pb-24">
            {orders.map((o) => (
              <div key={o.id} className="p-4 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-bold text-gray-800 text-sm break-words">
                      {o.customer}
                    </p>

                    <p className="text-xs text-gray-400 mt-1 break-words">
                      {o.id} · {o.telpon}
                    </p>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-1 rounded-full flex-shrink-0 whitespace-nowrap ${statusStyle[o.status]}`}
                  >
                    {statusIcon[o.status]} {o.status}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs text-gray-600 font-medium break-words">
                    {o.product}
                  </p>

                  <p className="text-xs text-gray-400 leading-relaxed break-words">
                    📍 {o.alamat}
                  </p>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs bg-orange-50 text-orange-600 border border-orange-200 px-2 py-0.5 rounded-full">
                    {o.ekspedisi}
                  </span>

                  <span className="text-xs bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-full">
                    {o.pembayaran.split(" ")[0]}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Total</p>
                    <span className="font-semibold text-red-500 text-sm">
                      {o.total}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative z-30">
                      <button
                        onClick={() =>
                          setOpenDropdown(openDropdown === o.id ? null : o.id)
                        }
                        className="text-xs border border-gray-200 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50 flex items-center gap-1 whitespace-nowrap"
                      >
                        Ubah Status
                        <span className="text-[10px] opacity-50">▾</span>
                      </button>

                      {openDropdown === o.id && (
                        <div className="absolute right-0 top-10 z-50 bg-white border border-gray-100 rounded-xl shadow-lg py-1 min-w-[170px]">
                          {statusOptions.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => handleStatusChange(o.id, opt)}
                              className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-gray-50 transition-colors"
                            >
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${statusStyle[opt]}`}
                              >
                                {statusIcon[opt]} {opt}
                              </span>

                              {o.status === opt && (
                                <span className="ml-auto text-green-500">✓</span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setDetailOrder(o)}
                      className="w-9 h-9 flex items-center justify-center rounded-xl text-blue-500 bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      <Eye size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {detailOrder && (
        <div
          className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
          onClick={(e) => e.target === e.currentTarget && setDetailOrder(null)}
        >
          <div className="bg-white w-full sm:max-w-md max-h-[88vh] overflow-y-auto sm:rounded-2xl rounded-t-2xl p-5 sm:p-6 shadow-2xl">
            <div className="flex justify-center mb-3 sm:hidden">
              <div className="w-10 h-1 rounded-full bg-gray-200" />
            </div>

            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-800 text-base">
                Detail Pesanan
              </h3>

              <button
                onClick={() => setDetailOrder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              {[
                { label: "ID Pesanan", value: detailOrder.id },
                { label: "Pelanggan", value: detailOrder.customer },
                { label: "No. Telepon", value: detailOrder.telpon },
                { label: "Produk", value: detailOrder.product },
                { label: "Alamat", value: detailOrder.alamat },
                { label: "Ekspedisi", value: detailOrder.ekspedisi },
                { label: "Pembayaran", value: detailOrder.pembayaran },
                { label: "Catatan", value: detailOrder.catatan },
                { label: "Total", value: detailOrder.total },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between items-start gap-4"
                >
                  <span className="text-gray-400 flex-shrink-0 text-xs sm:text-sm">
                    {label}
                  </span>

                  <span className="font-semibold text-gray-800 text-right text-xs sm:text-sm break-words max-w-[60%]">
                    {value}
                  </span>
                </div>
              ))}

              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="text-gray-400 text-xs sm:text-sm">Status</span>

                <span
                  className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${statusStyle[detailOrder.status]}`}
                >
                  {statusIcon[detailOrder.status]} {detailOrder.status}
                </span>
              </div>
            </div>

            <button
              onClick={() => setDetailOrder(null)}
              className="mt-6 w-full bg-[#7b1d1d] text-white font-bold py-2.5 rounded-xl text-sm hover:bg-[#5e1515] transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {openDropdown && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setOpenDropdown(null)}
        />
      )}
    </div>
  );
}