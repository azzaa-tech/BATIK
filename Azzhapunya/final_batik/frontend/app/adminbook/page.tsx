"use client"

import { useState } from "react"
import { CheckCircle, Clock, ChevronDown, X, Bell } from "lucide-react"
import Sidebar from "../sidebarmin/page"

const dataAwal = [
    {
        nama: "Kelompok SMK 3",
        tanggal: "20 Mei 2025",
        anggota: 12,
        status: "konfirmasi",
        noWa: "081234567890",
        email: "smk3@gmail.com",
        catatan: "Peserta membawa perlengkapan sendiri",
    },
    {
        nama: "Komunitas Budaya",
        tanggal: "22 Mei 2025",
        anggota: 8,
        status: "menunggu",
        noWa: "082345678901",
        email: "kombudaya@gmail.com",
        catatan: "Mohon sediakan tempat yang luas",
    },
    {
        nama: "Rina & Teman",
        tanggal: "25 Mei 2025",
        anggota: 4,
        status: "menunggu",
        noWa: "083456789012",
        email: "rina@gmail.com",
        catatan: "-",
    },
]

const statusOptions = ["menunggu", "konfirmasi", "ditolak"]

const StatusBadge = ({ status }) => {
    const map = {
        menunggu: { bg: "bg-yellow-100", text: "text-yellow-700", icon: <Clock size={12} />, label: "Menunggu" },
        konfirmasi: { bg: "bg-green-100", text: "text-green-700", icon: <CheckCircle size={12} />, label: "Dikonfirmasi" },
        ditolak: { bg: "bg-red-100", text: "text-red-600", icon: <X size={12} />, label: "Ditolak" },
    }
    const s = map[status]
    return (
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
            {s.icon} {s.label}
        </span>
    )
}

export default function BookingAdmin() {

    const [list, setList] = useState(dataAwal)
    const [detail, setDetail] = useState(null)   // booking yang dibuka detail-nya
    const [dropdown, setDropdown] = useState(null)   // index yang buka dropdown status

    const ubahStatus = (i, status) => {
        const baru = [...list]
        baru[i].status = status
        setList(baru)
        setDropdown(null)
        if (detail && detail.index === i) setDetail({ ...detail, status })
    }

    return (
        <div className="min-h-screen bg-gray-100 font-sans p-6 md:ml-64">

            <Sidebar />

            {/* Topbar */}
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div>
                    <h1 className="font-bold text-gray-800 text-base">Booking Pelatihan</h1>
                    <p className="text-xs text-gray-400">Selamat datang, Admin 👋</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="relative p-2 rounded-full hover:bg-gray-100">
                        <Bell size={18} className="text-gray-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                    </button>
                    <div className="w-8 h-8 rounded-full bg-[#7b1d1d] flex items-center justify-center text-white text-sm font-bold">A</div>
                </div>
            </header>

            <div className="p-6">
                <div className="bg-white h-100 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                    <div className="px-5 py-4 border-b border-gray-100">
                        <h2 className="font-bold text-gray-800 text-sm">Booking Pelatihan</h2>
                    </div>

                    <div className="divide-y divide-gray-50">
                        {list.map((b, i) => (
                            <div key={i} className="px-5 py-4 flex flex-wrap items-center justify-between gap-3">

                                {/* Info — klik untuk buka detail */}
                                <button
                                    onClick={() => setDetail({ ...b, index: i })}
                                    className="text-left hover:opacity-75 transition-opacity"
                                >
                                    <p className="font-bold text-gray-800 text-sm hover:text-[#7b1d1d]">{b.nama}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">📅 {b.tanggal} · 👥 {b.anggota} orang</p>
                                </button>

                                {/* Status + aksi */}
                                <div className="flex items-center gap-2 relative">

                                    {/* Badge status */}
                                    <StatusBadge status={b.status} />

                                    {/* Dropdown ubah status */}
                                    <div className="relative">
                                        <button
                                            onClick={() => setDropdown(dropdown === i ? null : i)}
                                            className="flex items-center gap-1 text-xs border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 text-gray-600"
                                        >
                                            Ubah <ChevronDown size={12} />
                                        </button>

                                        {dropdown === i && (
                                            <div className="absolute right-0 top-8 bg-white rounded-xl shadow-lg border border-gray-100 z-10 overflow-hidden min-w-[140px]">
                                                {statusOptions.map((opt) => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => ubahStatus(i, opt)}
                                                        className={`w-full text-left px-4 py-2.5 text-xs hover:bg-gray-50 capitalize flex items-center gap-2
                              ${b.status === opt ? "font-bold text-[#7b1d1d]" : "text-gray-600"}`}
                                                    >
                                                        {opt === "menunggu" && "⏳"}
                                                        {opt === "konfirmasi" && "✅"}
                                                        {opt === "ditolak" && "❌"}
                                                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Tombol konfirmasi cepat */}
                                    {b.status === "menunggu" && (
                                        <button
                                            onClick={() => ubahStatus(i, "konfirmasi")}
                                            className="text-xs bg-[#7b1d1d] text-white px-3 py-1.5 rounded-lg hover:bg-[#5e1515] transition-colors font-semibold"
                                        >
                                            Konfirmasi
                                        </button>
                                    )}

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ===== MODAL DETAIL ===== */}
            {detail && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl">

                        <div className="flex items-center justify-between mb-5">
                            <h3 className="font-bold text-gray-800 text-base">Detail Booking</h3>
                            <button onClick={() => setDetail(null)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Nama</span>
                                <span className="font-semibold text-gray-800">{detail.nama}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Tanggal</span>
                                <span className="font-semibold text-gray-800">{detail.tanggal}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Jumlah Anggota</span>
                                <span className="font-semibold text-gray-800">{detail.anggota} orang</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">No. WhatsApp</span>
                                <span className="font-semibold text-gray-800">{detail.noWa}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Email</span>
                                <span className="font-semibold text-gray-800">{detail.email}</span>
                            </div>
                            <div className="flex justify-between items-start gap-4">
                                <span className="text-gray-400 flex-shrink-0">Catatan</span>
                                <span className="font-semibold text-gray-800 text-right">{detail.catatan}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                <span className="text-gray-400">Status</span>
                                <StatusBadge status={detail.status} />
                            </div>
                        </div>

                        <button
                            onClick={() => setDetail(null)}
                            className="mt-6 w-full bg-[#7b1d1d] text-white font-bold py-2.5 rounded-xl text-sm hover:bg-[#5e1515] transition-colors"
                        >
                            Tutup
                        </button>

                    </div>
                </div>
            )}
        </div>

    )
}