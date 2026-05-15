"use client";

import { useState } from "react";
import Sidebar from "../sidebarmin/page";

type Status = "Diproses" | "Diperjalanan" | "Selesai";

interface Order {
  id: string;
  customer: string;
  product: string;
  total: string;
  status: Status;
}

const initialOrders: Order[] = [
  { id: "#001", customer: "Andi Saputra", product: "Blouse Batik 01", total: "Rp 185.000", status: "Selesai" },
  { id: "#002", customer: "Siti Rahma", product: "Kemeja Batik Pria", total: "Rp 250.000", status: "Diproses" },
  { id: "#003", customer: "Budi Santoso", product: "Syal Batik Sulawesi", total: "Rp 95.000", status: "Diproses" },
];

const statusOptions: Status[] = ["Diproses", "Diperjalanan", "Selesai"];

const statusStyle: Record<Status, string> = {
  Diproses: "bg-blue-100 text-blue-600",
  Diperjalanan: "bg-yellow-100 text-yellow-600",
  Selesai: "bg-green-100 text-green-600",
};

const statusIcon: Record<Status, string> = {
  Diproses: "🕐",
  Diperjalanan: "🚚",
  Selesai: "✅",
};

export default function PesananTerbaru() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleStatusChange = (id: string, newStatus: Status) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
    setOpenDropdown(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 md:ml-64 w-full">
      <Sidebar />
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
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

        <div className="flex items-center gap-3">


        </div>

      </div>

      {/* Table */}
      <table className="w-full text-sm">
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
            <tr key={o.id} className="border-b border-gray-50 last:border-0">
              <td className="py-3 text-gray-400">{o.id}</td>
              <td className="py-3 font-medium text-gray-700">{o.customer}</td>
              <td className="py-3 text-gray-500">{o.product}</td>
              <td className="py-3 font-semibold text-red-500">{o.total}</td>
              <td className="py-3 relative">
                {/* Badge / trigger */}
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === o.id ? null : o.id)
                  }
                  className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full cursor-pointer transition-opacity hover:opacity-80 ${statusStyle[o.status]}`}
                >
                  {statusIcon[o.status]} {o.status}
                  <span className="ml-0.5 opacity-60">▾</span>
                </button>

                {/* Dropdown */}
                {openDropdown === o.id && (
                  <div className="absolute left-0 top-10 z-10 bg-white border border-gray-100 rounded-xl shadow-lg py-1 min-w-[150px]">
                    {statusOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleStatusChange(o.id, opt)}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-gray-50 transition-colors ${o.status === opt ? "font-semibold" : "text-gray-600"
                          }`}
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
            </tr>
          ))}
        </tbody>
      </table>

      {/* Close dropdown on outside click */}
      {openDropdown && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setOpenDropdown(null)}
        />
      )}
    </div>
  );
}