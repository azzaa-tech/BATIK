"use client"

import { useState } from "react"
import { CheckCircle, Clock, ChevronDown, X } from "lucide-react"
import Sidebar from "../sidebarmin/page"

type BookingStatus = "menunggu" | "konfirmasi" | "ditolak"
type Booking = {
    nama: string
    tanggal: string
    anggota: number
    status: BookingStatus
    noWa: string
    email: string
    catatan: string
}
type BookingDetail = Booking & { index: number }

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

const statusOptions: BookingStatus[] = ["menunggu", "konfirmasi", "ditolak"]

<<<<<<< HEAD
const StatusBadge = ({ status }: { status: BookingStatus }) => {
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
=======
const StatusBadge = ({ status }) => {
  const map = {
    menunggu: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      icon: <Clock size={12} />,
      label: "Menunggu",
    },
    konfirmasi: {
      bg: "bg-green-100",
      text: "text-green-700",
      icon: <CheckCircle size={12} />,
      label: "Dikonfirmasi",
    },
    ditolak: {
      bg: "bg-red-100",
      text: "text-red-600",
      icon: <X size={12} />,
      label: "Ditolak",
    },
  }

  const s = map[status]

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap ${s.bg} ${s.text}`}
    >
      {s.icon} {s.label}
    </span>
  )
>>>>>>> cbcca701ce283e0e67e94b56139fc102a1fd170b
}

export default function BookingAdmin() {
  const [list, setList] = useState(dataAwal)
  const [detail, setDetail] = useState(null)
  const [dropdown, setDropdown] = useState(null)

<<<<<<< HEAD
    const [list, setList] = useState<Booking[]>(dataAwal as Booking[])
    const [detail, setDetail] = useState<BookingDetail | null>(null)   // booking yang dibuka detail-nya
    const [dropdown, setDropdown] = useState<number | null>(null)   // index yang buka dropdown status

    const ubahStatus = (i: number, status: BookingStatus) => {
        const baru = [...list]
        baru[i].status = status
        setList(baru)
        setDropdown(null)
        if (detail && detail.index === i) setDetail({ ...detail, status })
=======
  const ubahStatus = (i, status) => {
    const baru = [...list]
    baru[i].status = status
    setList(baru)
    setDropdown(null)

    if (detail && detail.index === i) {
      setDetail({ ...detail, status })
>>>>>>> cbcca701ce283e0e67e94b56139fc102a1fd170b
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex">
      <Sidebar />

      <div className="flex-1 md:ml-64 w-full p-3 sm:p-5 md:p-6 overflow-x-hidden">
        <div className="w-full bg-[#7b1d1d] rounded-2xl px-4 py-4 sm:px-6 sm:py-5 mb-5 sm:mb-6 flex items-start sm:items-center gap-3 sm:gap-4 shadow-md">
          <span className="text-2xl sm:text-3xl">👋</span>

          <div className="min-w-0">
            <h1 className="text-white font-bold text-base sm:text-xl leading-tight">
              Hai, Admin!
            </h1>
            <p className="text-white/70 text-xs sm:text-sm mt-1 leading-relaxed">
              Selamat bekerja — jangan lupa periksa booking pelatihan hari ini!
            </p>
          </div>
        </div>

<<<<<<< HEAD
    )
}
=======
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 sm:px-5 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
            <h2 className="font-bold text-gray-800 text-sm sm:text-base">
              Booking Pelatihan
            </h2>
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {list.length} booking
            </span>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 text-left bg-gray-50 border-b border-gray-100">
                  <th className="px-5 py-3 font-medium">Nama</th>
                  <th className="px-5 py-3 font-medium">Tanggal</th>
                  <th className="px-5 py-3 font-medium">Anggota</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Aksi</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {list.map((b, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <button
                        onClick={() => setDetail({ ...b, index: i })}
                        className="text-left"
                      >
                        <p className="font-semibold text-gray-800 hover:text-[#7b1d1d] transition-colors">
                          {b.nama}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {b.email}
                        </p>
                      </button>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      📅 {b.tanggal}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      👥 {b.anggota} orang
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={b.status} />
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <button
                            onClick={() =>
                              setDropdown(dropdown === i ? null : i)
                            }
                            className="flex items-center gap-1 text-xs border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-100 text-gray-600 transition-colors"
                          >
                            Ubah <ChevronDown size={12} />
                          </button>

                          {dropdown === i && (
                            <div className="absolute right-0 top-9 bg-white rounded-xl shadow-lg border border-gray-100 z-20 overflow-hidden min-w-[150px]">
                              {statusOptions.map((opt) => (
                                <button
                                  key={opt}
                                  onClick={() => ubahStatus(i, opt)}
                                  className={`w-full text-left px-4 py-2.5 text-xs hover:bg-gray-50 flex items-center gap-2 ${
                                    b.status === opt
                                      ? "font-bold text-[#7b1d1d]"
                                      : "text-gray-600"
                                  }`}
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

                        {b.status === "menunggu" && (
                          <button
                            onClick={() => ubahStatus(i, "konfirmasi")}
                            className="text-xs bg-[#7b1d1d] text-white px-3 py-1.5 rounded-lg hover:bg-[#5e1515] transition-colors font-semibold"
                          >
                            Konfirmasi
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-100">
            {list.map((b, i) => (
              <div key={i} className="p-4 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <button
                    onClick={() => setDetail({ ...b, index: i })}
                    className="text-left flex-1 min-w-0"
                  >
                    <p className="font-bold text-gray-800 text-sm leading-tight hover:text-[#7b1d1d] transition-colors break-words">
                      {b.nama}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 break-words">
                      {b.email}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      📅 {b.tanggal}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      👥 {b.anggota} orang
                    </p>
                  </button>

                  <StatusBadge status={b.status} />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <button
                      onClick={() => setDropdown(dropdown === i ? null : i)}
                      className="w-full flex items-center justify-center gap-1 text-xs border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-100 text-gray-600 transition-colors"
                    >
                      Ubah Status <ChevronDown size={12} />
                    </button>

                    {dropdown === i && (
                      <div className="absolute left-0 top-10 bg-white rounded-xl shadow-lg border border-gray-100 z-20 overflow-hidden min-w-full">
                        {statusOptions.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => ubahStatus(i, opt)}
                            className={`w-full text-left px-4 py-2.5 text-xs hover:bg-gray-50 flex items-center gap-2 ${
                              b.status === opt
                                ? "font-bold text-[#7b1d1d]"
                                : "text-gray-600"
                            }`}
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

                  <button
                    onClick={() => setDetail({ ...b, index: i })}
                    className="w-full text-xs border border-gray-200 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Detail
                  </button>

                  {b.status === "menunggu" && (
                    <button
                      onClick={() => ubahStatus(i, "konfirmasi")}
                      className="col-span-2 text-xs bg-[#7b1d1d] text-white px-3 py-2 rounded-lg hover:bg-[#5e1515] transition-colors font-semibold"
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

      {/* Modal Detail */}
      {detail && (
        <div
          className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
          onClick={(e) => e.target === e.currentTarget && setDetail(null)}
        >
          <div className="bg-white w-full sm:max-w-md max-h-[88vh] overflow-y-auto sm:rounded-2xl rounded-t-2xl p-5 sm:p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-800 text-base">
                Detail Booking
              </h3>

              <button
                onClick={() => setDetail(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              {[
                { label: "Nama", value: detail.nama },
                { label: "Tanggal", value: detail.tanggal },
                { label: "Jumlah Anggota", value: `${detail.anggota} orang` },
                { label: "No. WhatsApp", value: detail.noWa },
                { label: "Email", value: detail.email },
                { label: "Catatan", value: detail.catatan },
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
                <span className="text-gray-400 text-xs sm:text-sm">
                  Status
                </span>
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
>>>>>>> cbcca701ce283e0e67e94b56139fc102a1fd170b
