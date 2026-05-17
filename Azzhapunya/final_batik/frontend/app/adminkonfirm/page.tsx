"use client";

import { useState, useRef, useEffect } from "react";
import {
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Trash2,
  X,
  ImageOff,
  ChevronDown,
} from "lucide-react";
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
    buktiPembayaran:
      "https://placehold.co/400x600/e2e8f0/94a3b8?text=Bukti+Transfer",
  },
  {
    id: "#002",
    pelanggan: "Siti Rahma",
    produk: "Kemeja Batik Pria",
    total: 250000,
    status: "Diproses",
    buktiPembayaran:
      "https://placehold.co/400x600/fef9c3/ca8a04?text=Bukti+Transfer",
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
    buktiPembayaran:
      "https://placehold.co/400x600/dbeafe/3b82f6?text=Bukti+Transfer",
  },
  {
    id: "#005",
    pelanggan: "Reza Firmansyah",
    produk: "Blouse Batik 01",
    total: 185000,
    status: "Selesai",
    buktiPembayaran:
      "https://placehold.co/400x600/dcfce7/16a34a?text=Bukti+Transfer",
  },
];

const statusOptions = [
  {
    value: "Selesai" as Status,
    label: "Selesai",
    icon: <CheckCircle size={13} />,
    badgeClass: "bg-emerald-50 text-emerald-600 border border-emerald-200",
    dropdownClass: "text-emerald-600 hover:bg-emerald-50",
  },
  {
    value: "Diproses" as Status,
    label: "Diproses",
    icon: <Clock size={13} />,
    badgeClass: "bg-blue-50 text-blue-600 border border-blue-200",
    dropdownClass: "text-blue-600 hover:bg-blue-50",
  },
  {
    value: "Dibatalkan" as Status,
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
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold transition-opacity hover:opacity-75 whitespace-nowrap ${cfg.badgeClass}`}
      >
        {cfg.icon}
        {cfg.label}
        <ChevronDown
          size={11}
          className={`transition-transform duration-150 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute top-full right-0 sm:left-0 mt-1.5 w-36 bg-white rounded-xl border border-slate-100 shadow-xl z-30 overflow-hidden py-1">
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
  const [modal, setModal] = useState<{ open: boolean; order: Order | null }>({
    open: false,
    order: null,
  });

  const openModal = (order: Order) => {
    if (order.buktiPembayaran) setModal({ open: true, order });
  };

  const closeModal = () => setModal({ open: false, order: null });

  const handleStatusChange = (orderId: string, newStatus: Status) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );

    setModal((prev) =>
      prev.order?.id === orderId
        ? { ...prev, order: { ...prev.order, status: newStatus } }
        : prev
    );
  };

  const handleDelete = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    if (modal.order?.id === orderId) closeModal();
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex">
      <Sidebar />

      <div className="flex-1 md:ml-64 w-full p-3 sm:p-5 md:p-6 overflow-x-hidden">
        {/* Header */}
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

        {/* Stats */}
        <div className="grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-8">
          {[
            {
              label: "Total Pesanan",
              value: orders.length,
              color: "text-slate-700",
            },
            {
              label: "Diproses",
              value: orders.filter((o) => o.status === "Diproses").length,
              color: "text-blue-600",
            },
            {
              label: "Selesai",
              value: orders.filter((o) => o.status === "Selesai").length,
              color: "text-emerald-600",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 sm:px-5 py-4"
            >
              <p className="text-xs text-slate-400 font-medium mb-1">
                {stat.label}
              </p>
              <p className={`text-xl sm:text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60">
                  {["ID", "Pelanggan", "Produk", "Total", "Status", "Aksi"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {orders.map((order, idx) => (
                  <tr
                    key={order.id}
                    className={`transition-colors hover:bg-slate-50/60 ${
                      idx < orders.length - 1 ? "border-b border-slate-50" : ""
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-slate-400 font-mono">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                      {order.pelanggan}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {order.produk}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-rose-500 whitespace-nowrap">
                      {formatRupiah(order.total)}
                    </td>
                    <td className="px-6 py-4">
                      <StatusDropdown
                        orderId={order.id}
                        current={order.status}
                        onChange={handleStatusChange}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openModal(order)}
                          disabled={!order.buktiPembayaran}
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

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs text-slate-400 font-mono mb-1">
                    {order.id}
                  </p>
                  <h2 className="font-bold text-slate-700 text-sm break-words">
                    {order.pelanggan}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 break-words">
                    {order.produk}
                  </p>
                </div>

                <StatusDropdown
                  orderId={order.id}
                  current={order.status}
                  onChange={handleStatusChange}
                />
              </div>

              <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Total</p>
                  <p className="text-sm font-bold text-rose-500">
                    {formatRupiah(order.total)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openModal(order)}
                    disabled={!order.buktiPembayaran}
                    className={`w-9 h-9 flex items-center justify-center rounded-xl transition-colors ${
                      order.buktiPembayaran
                        ? "text-blue-500 bg-blue-50 hover:bg-blue-100"
                        : "text-slate-300 bg-slate-50 cursor-not-allowed"
                    }`}
                  >
                    <Eye size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(order.id)}
                    className="w-9 h-9 flex items-center justify-center rounded-xl text-red-400 bg-red-50 hover:bg-red-100 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modal.open && modal.order && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-sm max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="min-w-0">
                <p className="text-xs text-slate-400 font-medium">
                  Bukti Pembayaran
                </p>
                <p className="text-sm font-bold text-slate-700 truncate">
                  {modal.order.pelanggan}
                </p>
                <p className="text-xs text-slate-400 font-mono">
                  {modal.order.id}
                </p>
              </div>

              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="bg-slate-50 flex items-center justify-center min-h-52">
              {modal.order.buktiPembayaran ? (
                <img
                  src={modal.order.buktiPembayaran}
                  alt="Bukti pembayaran"
                  className="w-full object-contain max-h-[55vh] sm:max-h-80"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-slate-300 py-10">
                  <ImageOff size={32} />
                  <p className="text-sm">Belum ada bukti dari customer</p>
                </div>
              )}
            </div>

            <div className="px-5 py-3 border-t border-slate-100 flex items-start justify-between gap-4 text-xs text-slate-500">
              <span className="break-words">{modal.order.produk}</span>
              <span className="font-bold text-rose-500 whitespace-nowrap">
                {formatRupiah(modal.order.total)}
              </span>
            </div>

            <div className="px-5 py-4 border-t border-slate-50">
              <p className="text-xs text-slate-400 mb-2.5 font-medium">
                Konfirmasi Status
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {statusOptions.map((opt) => {
                  const isActive = modal.order!.status === opt.value;

                  return (
                    <button
                      key={opt.value}
                      onClick={() =>
                        handleStatusChange(modal.order!.id, opt.value)
                      }
                      className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
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