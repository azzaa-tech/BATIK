"use client";

import { useState, useRef, useEffect } from "react";
import { CheckCircle, Clock, XCircle, Eye, Trash2, X, ImageOff, ChevronDown } from "lucide-react";
import Sidebar from "../sidebarmin/page";

type Status = "Selesai" | "Diproses" | "Dibatalkan";

interface Order {
  id: string;
  pelanggan: string;
  produk: string;
  total: number;
  status: Status;
  buktiPembayaran?: string;
}

const initialOrders: Order[] = [
  {
    id: "#001",
    pelanggan: "Andi Saputra",
    produk: "Blouse Batik 01",
    total: 185000,
    status: "Selesai",
    buktiPembayaran: "https://placehold.co/400x600/e2e8f0/94a3b8?text=Bukti+Transfer",
  },
  {
    id: "#002",
    pelanggan: "Siti Rahma",
    produk: "Kemeja Batik Pria",
    total: 250000,
    status: "Diproses",
    buktiPembayaran: "https://placehold.co/400x600/fef9c3/ca8a04?text=Bukti+Transfer",
  },
  {
    id: "#003",
    pelanggan: "Budi Santoso",
    produk: "Syal Batik Sulawesi",
    total: 95000,
    status: "Dibatalkan",
  },
  {
    id: "#004",
    pelanggan: "Dewi Anggraini",
    produk: "Batik Parang Klasik",
    total: 210000,
    status: "Diproses",
    buktiPembayaran: "https://placehold.co/400x600/dbeafe/3b82f6?text=Bukti+Transfer",
  },
  {
    id: "#005",
    pelanggan: "Reza Firmansyah",
    produk: "Blouse Batik 01",
    total: 185000,
    status: "Selesai",
    buktiPembayaran: "https://placehold.co/400x600/dcfce7/16a34a?text=Bukti+Transfer",
  },
];

const statusOptions: {
  value: Status;
  label: string;
  icon: React.ReactNode;
  badgeClass: string;
  dropdownClass: string;
}[] = [
  {
    value: "Selesai",
    label: "Selesai",
    icon: <CheckCircle size={13} />,
    badgeClass: "bg-emerald-50 text-emerald-600 border border-emerald-200",
    dropdownClass: "text-emerald-600 hover:bg-emerald-50",
  },
  {
    value: "Diproses",
    label: "Diproses",
    icon: <Clock size={13} />,
    badgeClass: "bg-blue-50 text-blue-600 border border-blue-200",
    dropdownClass: "text-blue-600 hover:bg-blue-50",
  },
  {
    value: "Dibatalkan",
    label: "Dibatalkan",
    icon: <XCircle size={13} />,
    badgeClass: "bg-red-50 text-red-500 border border-red-200",
    dropdownClass: "text-red-500 hover:bg-red-50",
  },
];

function formatRupiah(amount: number) {
  return "Rp " + amount.toLocaleString("id-ID");
}

function StatusDropdown({
  orderId,
  current,
  onChange,
}: {
  orderId: string;
  current: Status;
  onChange: (id: string, status: Status) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const cfg = statusOptions.find((s) => s.value === current)!;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
        <Sidebar/>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-opacity hover:opacity-75 ${cfg.badgeClass}`}
        >
        {cfg.icon}
        {cfg.label}
        <ChevronDown size={11} className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1.5 w-36 bg-white rounded-xl border border-slate-100 shadow-xl z-20 overflow-hidden py-1">
          {statusOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(orderId, opt.value);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold transition-colors ${opt.dropdownClass}`}
            >
              {opt.icon}
              {opt.label}
              {current === opt.value && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-current opacity-60" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function OrderConfirmationPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [modal, setModal] = useState<{ open: boolean; order: Order | null }>({ open: false, order: null });

  const openModal = (order: Order) => {
    if (order.buktiPembayaran) setModal({ open: true, order });
  };

  const closeModal = () => setModal({ open: false, order: null });

  const handleStatusChange = (orderId: string, newStatus: Status) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
    // sync ke modal kalau sedang dibuka
    setModal((prev) =>
      prev.order?.id === orderId ? { ...prev, order: { ...prev.order!, status: newStatus } } : prev
    );
  };

  const handleDelete = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    if (modal.order?.id === orderId) closeModal();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Dashboard Admin</p>
          <h1 className="text-2xl font-bold text-slate-800">Semua Pesanan</h1>
          <p className="text-sm text-slate-500 mt-1">
            Klik badge status untuk ubah status · Klik ikon mata untuk lihat bukti pembayaran
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Pesanan", value: orders.length, color: "text-slate-700" },
            { label: "Diproses", value: orders.filter((o) => o.status === "Diproses").length, color: "text-blue-600" },
            { label: "Selesai", value: orders.filter((o) => o.status === "Selesai").length, color: "text-emerald-600" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-4">
              <p className="text-xs text-slate-400 font-medium mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  {["ID", "Pelanggan", "Produk", "Total", "Status", "Aksi"].map((h) => (
                    <th key={h} className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr
                    key={order.id}
                    className={`transition-colors hover:bg-slate-50/60 ${idx < orders.length - 1 ? "border-b border-slate-50" : ""}`}
                  >
                    <td className="px-6 py-4 text-sm text-slate-400 font-mono">{order.id}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-700">{order.pelanggan}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{order.produk}</td>
                    <td className="px-6 py-4 text-sm font-bold text-rose-500">{formatRupiah(order.total)}</td>

                    {/* Status — dropdown admin */}
                    <td className="px-6 py-4">
                      <StatusDropdown
                        orderId={order.id}
                        current={order.status}
                        onChange={handleStatusChange}
                      />
                    </td>

                    {/* Aksi */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openModal(order)}
                          disabled={!order.buktiPembayaran}
                          title={order.buktiPembayaran ? "Lihat bukti pembayaran" : "Belum ada bukti"}
                          className={`p-1.5 rounded-lg transition-colors ${
                            order.buktiPembayaran
                              ? "text-blue-400 hover:text-blue-600 hover:bg-blue-50"
                              : "text-slate-200 cursor-not-allowed"
                          }`}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(order.id)}
                          title="Hapus pesanan"
                          className="p-1.5 rounded-lg text-red-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Lihat Bukti Pembayaran */}
      {modal.open && modal.order && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div>
                <p className="text-xs text-slate-400 font-medium">Bukti Pembayaran</p>
                <p className="text-sm font-bold text-slate-700">
                  {modal.order.pelanggan}{" "}
                  <span className="text-slate-400 font-normal font-mono text-xs">{modal.order.id}</span>
                </p>
              </div>
              <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Foto bukti — read only */}
            <div className="bg-slate-50 flex items-center justify-center min-h-48">
              {modal.order.buktiPembayaran ? (
                <img
                  src={modal.order.buktiPembayaran}
                  alt="Bukti pembayaran"
                  className="w-full object-contain max-h-80"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-slate-300 py-10">
                  <ImageOff size={32} />
                  <p className="text-sm">Belum ada bukti dari customer</p>
                </div>
              )}
            </div>

            {/* Info ringkas */}
            <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>{modal.order.produk}</span>
              <span className="font-bold text-rose-500">{formatRupiah(modal.order.total)}</span>
            </div>

            {/* Ubah status dari dalam modal */}
            <div className="px-5 py-4 border-t border-slate-50">
              <p className="text-xs text-slate-400 mb-2.5 font-medium">Konfirmasi Status</p>
              <div className="flex gap-2">
                {statusOptions.map((opt) => {
                  const isActive = modal.order!.status === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleStatusChange(modal.order!.id, opt.value)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        isActive
                          ? opt.badgeClass + " shadow-sm"
                          : "border-slate-100 text-slate-400 hover:border-slate-200 hover:text-slate-500 bg-white"
                      }`}
                    >
                      {opt.icon}
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}