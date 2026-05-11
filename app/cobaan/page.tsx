"use client"

import { useState } from "react"
import {
    LayoutDashboard, ShoppingBag, Users, BookOpen,
    Package, TrendingUp, Bell, LogOut, ChevronRight,
    CheckCircle, Clock, XCircle, Eye, Trash2, Menu, X
} from "lucide-react"

// ── DATA DUMMY ──────────────────────────────────────────
const stats = [
    { label: "Total Pendapatan", value: "Rp 12.450.000", icon: "💰", trend: "+12%", up: true },
    { label: "Pesanan Masuk", value: "48", icon: "📦", trend: "+8%", up: true },
    { label: "Produk Terjual", value: "134", icon: "🧵", trend: "+5%", up: true },
    { label: "Booking Pelatihan", value: "9", icon: "📚", trend: "-2%", up: false },
]

const pesanan = [
    { id: "#001", nama: "Andi Saputra", produk: "Blouse Batik 01", total: "Rp 185.000", status: "selesai" },
    { id: "#002", nama: "Siti Rahma", produk: "Kemeja Batik Pria", total: "Rp 250.000", status: "proses" },
    { id: "#003", nama: "Budi Santoso", produk: "Syal Batik Sulawesi", total: "Rp 95.000", status: "dibatalkan" },
    { id: "#004", nama: "Dewi Anggraini", produk: "Batik Parang Klasik", total: "Rp 210.000", status: "proses" },
    { id: "#005", nama: "Reza Firmansyah", produk: "Blouse Batik 01", total: "Rp 185.000", status: "selesai" },
]

const produk = [
    { nama: "Blouse Batik 01", stok: 50, harga: "Rp 185.000", terjual: 32 },
    { nama: "Kemeja Batik Pria", stok: 30, harga: "Rp 250.000", terjual: 21 },
    { nama: "Syal Batik Sulawesi", stok: 12, harga: "Rp 95.000", terjual: 48 },
    { nama: "Batik Parang Klasik", stok: 5, harga: "Rp 210.000", terjual: 15 },
]

const booking = [
    { nama: "Kelompok SMK 3", tanggal: "20 Mei 2025", anggota: 12, status: "konfirmasi" },
    { nama: "Komunitas Budaya", tanggal: "22 Mei 2025", anggota: 8, status: "menunggu" },
    { nama: "Rina & Teman", tanggal: "25 Mei 2025", anggota: 4, status: "menunggu" },
]

const menus = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "pesanan", label: "Pesanan", icon: ShoppingBag },
    { id: "produk", label: "Produk", icon: Package },
    { id: "booking", label: "Booking Pelatihan", icon: BookOpen },
    { id: "pelanggan", label: "Pelanggan", icon: Users },
]

// ── BADGE STATUS ────────────────────────────────────────
function StatusBadge({ status }) {
    const map = {
        selesai: { bg: "bg-green-100", text: "text-green-700", icon: <CheckCircle size={12} />, label: "Selesai" },
        proses: { bg: "bg-blue-100", text: "text-blue-700", icon: <Clock size={12} />, label: "Diproses" },
        dibatalkan: { bg: "bg-red-100", text: "text-red-600", icon: <XCircle size={12} />, label: "Dibatalkan" },
        konfirmasi: { bg: "bg-green-100", text: "text-green-700", icon: <CheckCircle size={12} />, label: "Dikonfirmasi" },
        menunggu: { bg: "bg-yellow-100", text: "text-yellow-700", icon: <Clock size={12} />, label: "Menunggu" },
    }
    const s = map[status]
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
            {s.icon} {s.label}
        </span>
    )
}

// ── MAIN ────────────────────────────────────────────────
export default function AdminDashboard() {
    const [aktif, setAktif] = useState("dashboard")
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans">

            {/* ── SIDEBAR ── */}
            <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[#7b1d1d] flex flex-col shadow-xl
        transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:z-auto
      `}>

                {/* Logo */}
                <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
                    <img src="/aset/logo.png" alt="logo" className="w-10 h-10 object-contain" />
                    <div>
                        <p className="text-white font-bold text-sm leading-tight">Galleri Batik</p>
                        <p className="text-yellow-300 text-xs">Lontara · Admin</p>
                    </div>
                </div>

                {/* Menu */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    {menus.map((m) => {
                        const Icon = m.icon
                        const isAktif = aktif === m.id
                        return (
                            <button key={m.id} onClick={() => { setAktif(m.id); setSidebarOpen(false) }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left
                  ${isAktif ? "bg-white/15 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"}`}>
                                <Icon size={18} />
                                {m.label}
                                {isAktif && <ChevronRight size={14} className="ml-auto" />}
                            </button>
                        )
                    })}
                </nav>

                {/* Logout */}
                <div className="px-3 py-4 border-t border-white/10">
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/60 hover:bg-white/10 hover:text-white transition-all">
                        <LogOut size={18} />
                        Keluar
                    </button>
                </div>
            </aside>

            {/* Overlay mobile */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* ── KONTEN UTAMA ── */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Topbar */}
                <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-20">
                    <div className="flex items-center gap-3">
                        <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
                            <Menu size={22} className="text-gray-600" />
                        </button>
                        <div>
                            <h1 className="text-base font-bold text-gray-800 capitalize">
                                {menus.find(m => m.id === aktif)?.label}
                            </h1>
                            <p className="text-xs text-gray-400">Selamat datang, Admin 👋</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="relative p-2 rounded-full hover:bg-gray-100">
                            <Bell size={18} className="text-gray-600" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                        </button>
                        <div className="w-8 h-8 rounded-full bg-[#7b1d1d] flex items-center justify-center text-white text-sm font-bold">A</div>
                    </div>
                </header>

                {/* ── HALAMAN: DASHBOARD ── */}
                {aktif === "dashboard" && (
                    <main className="flex-1 p-4 md:p-6 space-y-6">

                        {/* Stat cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {stats.map((s, i) => (
                                <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                                    <div className="flex items-start justify-between mb-3">
                                        <span className="text-2xl">{s.icon}</span>
                                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.up ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                                            {s.trend}
                                        </span>
                                    </div>
                                    <p className="text-lg font-bold text-gray-800">{s.value}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Pesanan terbaru */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                                <h2 className="font-bold text-gray-800 text-sm">Pesanan Terbaru</h2>
                                <button onClick={() => setAktif("pesanan")} className="text-xs text-[#7b1d1d] font-semibold hover:underline">Lihat semua</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50 text-gray-500 text-xs">
                                        <tr>
                                            <th className="px-5 py-3 text-left">ID</th>
                                            <th className="px-5 py-3 text-left">Pelanggan</th>
                                            <th className="px-5 py-3 text-left hidden md:table-cell">Produk</th>
                                            <th className="px-5 py-3 text-left">Total</th>
                                            <th className="px-5 py-3 text-left">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {pesanan.slice(0, 3).map((p, i) => (
                                            <tr key={i} className="hover:bg-gray-50">
                                                <td className="px-5 py-3 text-gray-400 font-mono">{p.id}</td>
                                                <td className="px-5 py-3 font-medium text-gray-700">{p.nama}</td>
                                                <td className="px-5 py-3 text-gray-500 hidden md:table-cell">{p.produk}</td>
                                                <td className="px-5 py-3 font-semibold text-[#7b1d1d]">{p.total}</td>
                                                <td className="px-5 py-3"><StatusBadge status={p.status} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Stok menipis */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                            <h2 className="font-bold text-gray-800 text-sm mb-4">⚠️ Stok Menipis</h2>
                            <div className="space-y-3">
                                {produk.filter(p => p.stok <= 12).map((p, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700">{p.nama}</span>
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.stok <= 5 ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-700"}`}>
                                            Stok: {p.stok}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </main>
                )}

                {/* ── HALAMAN: PESANAN ── */}
                {aktif === "pesanan" && (
                    <main className="flex-1 p-4 md:p-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-5 py-4 border-b border-gray-100">
                                <h2 className="font-bold text-gray-800 text-sm">Semua Pesanan</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50 text-gray-500 text-xs">
                                        <tr>
                                            <th className="px-5 py-3 text-left">ID</th>
                                            <th className="px-5 py-3 text-left">Pelanggan</th>
                                            <th className="px-5 py-3 text-left hidden md:table-cell">Produk</th>
                                            <th className="px-5 py-3 text-left">Total</th>
                                            <th className="px-5 py-3 text-left">Status</th>
                                            <th className="px-5 py-3 text-left">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {pesanan.map((p, i) => (
                                            <tr key={i} className="hover:bg-gray-50">
                                                <td className="px-5 py-3 text-gray-400 font-mono">{p.id}</td>
                                                <td className="px-5 py-3 font-medium text-gray-700">{p.nama}</td>
                                                <td className="px-5 py-3 text-gray-500 hidden md:table-cell">{p.produk}</td>
                                                <td className="px-5 py-3 font-semibold text-[#7b1d1d]">{p.total}</td>
                                                <td className="px-5 py-3"><StatusBadge status={p.status} /></td>
                                                <td className="px-5 py-3">
                                                    <div className="flex gap-2">
                                                        <button className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"><Eye size={14} /></button>
                                                        <button className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"><Trash2 size={14} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>
                )}

                {/* ── HALAMAN: PRODUK ── */}
                {aktif === "produk" && (
                    <main className="flex-1 p-4 md:p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-bold text-gray-700 text-sm">Daftar Produk</h2>
                            <button className="bg-[#7b1d1d] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#5e1515] transition-colors">
                                + Tambah Produk
                            </button>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                            {produk.map((p, i) => (
                                <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-start mb-3">
                                        <p className="font-bold text-gray-800 text-sm">{p.nama}</p>
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.stok <= 5 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"}`}>
                                            Stok: {p.stok}
                                        </span>
                                    </div>
                                    <p className="text-[#7b1d1d] font-bold mb-1">{p.harga}</p>
                                    <p className="text-xs text-gray-400">Terjual: {p.terjual} pcs</p>
                                    <div className="flex gap-2 mt-4">
                                        <button className="flex-1 text-xs border border-gray-200 rounded-lg py-1.5 hover:bg-gray-50 text-gray-600">Edit</button>
                                        <button className="flex-1 text-xs border border-red-100 rounded-lg py-1.5 hover:bg-red-50 text-red-500">Hapus</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                )}

                {/* ── HALAMAN: BOOKING ── */}
                {aktif === "booking" && (
                    <main className="flex-1 p-4 md:p-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-5 py-4 border-b border-gray-100">
                                <h2 className="font-bold text-gray-800 text-sm">Booking Pelatihan</h2>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {booking.map((b, i) => (
                                    <div key={i} className="px-5 py-4 flex flex-wrap items-center justify-between gap-3">
                                        <div>
                                            <p className="font-bold text-gray-800 text-sm">{b.nama}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">📅 {b.tanggal} · 👥 {b.anggota} orang</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <StatusBadge status={b.status} />
                                            {b.status === "menunggu" && (
                                                <button className="text-xs bg-[#7b1d1d] text-white px-3 py-1.5 rounded-lg hover:bg-[#5e1515] transition-colors">
                                                    Konfirmasi
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </main>
                )}

                {/* ── HALAMAN: PELANGGAN ── */}
                {aktif === "pelanggan" && (
                    <main className="flex-1 p-4 md:p-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-5 py-4 border-b border-gray-100">
                                <h2 className="font-bold text-gray-800 text-sm">Data Pelanggan</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50 text-gray-500 text-xs">
                                        <tr>
                                            <th className="px-5 py-3 text-left">Nama</th>
                                            <th className="px-5 py-3 text-left">Produk Terakhir</th>
                                            <th className="px-5 py-3 text-left">Total Belanja</th>
                                            <th className="px-5 py-3 text-left">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {pesanan.map((p, i) => (
                                            <tr key={i} className="hover:bg-gray-50">
                                                <td className="px-5 py-3 font-medium text-gray-700">{p.nama}</td>
                                                <td className="px-5 py-3 text-gray-500">{p.produk}</td>
                                                <td className="px-5 py-3 font-semibold text-[#7b1d1d]">{p.total}</td>
                                                <td className="px-5 py-3"><StatusBadge status={p.status} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>
                )}
            </div>
        </div>
    )
}