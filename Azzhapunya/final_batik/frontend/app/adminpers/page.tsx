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
  resi: string;
}

const initialOrders: Order[] = [
  { id: "#001", customer: "Andi Saputra", product: "Blouse Batik 01", total: "Rp 185.000", status: "Selesai", resi: "" },
  { id: "#002", customer: "Siti Rahma", product: "Kemeja Batik Pria", total: "Rp 250.000", status: "Diproses", resi: "" },
  { id: "#003", customer: "Budi Santoso", product: "Syal Batik Sulawesi", total: "Rp 95.000", status: "Diproses", resi: "" },
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
  const [resiInput, setResiInput] = useState<Record<string, string>>({});
  const [resiError, setResiError] = useState<Record<string, boolean>>({});

  const handleStatusChange = (id: string, newStatus: Status) => {
    // Kalau mau set Diperjalanan tapi resi belum diisi, tolak
    if (newStatus === "Diperjalanan") {
      const order = orders.find((o) => o.id === id);
      if (!order?.resi) {
        setResiError((prev) => ({ ...prev, [id]: true }));
        setOpenDropdown(null);
        return;
      }
    }
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
    setOpenDropdown(null);
  };

  const handleResiSave = (id: string) => {
    const val = (resiInput[id] ?? "").trim();
    if (!val) {
      setResiError((prev) => ({ ...prev, [id]: true }));
      return;
    }
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? { ...o, resi: val, status: o.status === "Diproses" ? "Diperjalanan" : o.status }
          : o
      )
    );
    setResiError((prev) => ({ ...prev, [id]: false }));
  };

  const handleResiChange = (id: string, val: string) => {
    setResiInput((prev) => ({ ...prev, [id]: val }));
    if (val.trim()) setResiError((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen  p-6 md:ml-64">
      <Sidebar />
        <div className="w-full  bg-[#7d0000] rounded-2xl px-6 py-5 mb-6 flex items-center gap-4 shadow-md">
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
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        {/* ── Tabel 1: Pesanan ── */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">Pesanan Terbaru</h2>
            <button className="text-sm text-orange-500 hover:underline">Lihat semua</button>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 text-left border-b border-gray-100">
                <th className="pb-2 font-medium w-16">ID</th>
                <th className="pb-2 font-medium w-40">Pelanggan</th>
                <th className="pb-2 font-medium">Produk</th>
                <th className="pb-2 font-medium w-36">Total</th>
                <th className="pb-2 font-medium w-44">Status</th>
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
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === o.id ? null : o.id)
                      }
                      className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full cursor-pointer hover:opacity-80 transition-opacity ${statusStyle[o.status]}`}
                    >
                      {statusIcon[o.status]} {o.status}
                      <span className="opacity-50 text-[10px]">▾</span>
                    </button>

                    {openDropdown === o.id && (
                      <div className="absolute left-0 top-10 z-20 bg-white border border-gray-100 rounded-xl shadow-lg py-1 min-w-[160px]">
                        {statusOptions.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleStatusChange(o.id, opt)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-gray-50 transition-colors"
                          >
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${statusStyle[opt]}`}>
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
        </div>

        {/* ── Tabel 2: Nomor Resi ── */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-semibold text-gray-800">Nomor Resi Pengiriman</h2>
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              Wajib diisi untuk update status ke Diperjalanan
            </span>
          </div>
          <p className="text-xs text-gray-400 mb-4">
            Isi nomor resi → status otomatis berubah menjadi <span className="text-yellow-600 font-medium">🚚 Diperjalanan</span>
          </p>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 text-left border-b border-gray-100">
                <th className="pb-2 font-medium w-16">ID</th>
                <th className="pb-2 font-medium w-40">Pelanggan</th>
                <th className="pb-2 font-medium">Nomor Resi</th>
                <th className="pb-2 font-medium w-36">Status Resi</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-gray-50 last:border-0">
                  <td className="py-3 text-gray-400">{o.id}</td>
                  <td className="py-3 font-medium text-gray-700">{o.customer}</td>
                  <td className="py-3">
                    {o.resi ? (
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded-lg text-xs tracking-wider">
                          {o.resi}
                        </span>
                        <button
                          onClick={() => {
                            setResiInput((prev) => ({ ...prev, [o.id]: o.resi }));
                            setOrders((prev) =>
                              prev.map((x) => (x.id === o.id ? { ...x, resi: "" } : x))
                            );
                          }}
                          className="text-xs text-gray-400 hover:text-red-400 transition-colors"
                        >
                          ✏️ Edit
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Masukkan nomor resi..."
                          value={resiInput[o.id] ?? ""}
                          onChange={(e) => handleResiChange(o.id, e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleResiSave(o.id)}
                          className={`border rounded-lg px-3 py-1.5 text-xs w-52 outline-none transition-colors ${resiError[o.id]
                              ? "border-red-400 bg-red-50 placeholder-red-300 focus:border-red-400"
                              : "border-gray-200 focus:border-blue-400"
                            }`}
                        />
                        <button
                          onClick={() => handleResiSave(o.id)}
                          className="text-xs bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          Simpan
                        </button>
                      </div>
                    )}
                    {resiError[o.id] && !o.resi && (
                      <p className="text-red-400 text-xs mt-1">⚠️ Nomor resi wajib diisi!</p>
                    )}
                  </td>
                  <td className="py-3">
                    {o.resi ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-600 border border-yellow-200">
                        🚚 Terisi
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-400">
                        ⏳ Belum diisi
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Close dropdown on outside click */}
      {openDropdown && (
        <div className="fixed inset-0 z-10" onClick={() => setOpenDropdown(null)} />
      )}
    </div>
  );
}