"use client"

import { useEffect, useState } from "react"
import {
  CheckCircle,
  Clock,
  ChevronDown,
  X,
} from "lucide-react"

import Sidebar from "../sidebarmin/page"
import { apiRequest } from "@/lib/api"

type BookingStatus =
  | "menunggu"
  | "konfirmasi"
  | "ditolak"
  | "pending"

type Booking = {
  id: number
  nama: string
  tanggal: string
  anggota: number
  status: BookingStatus
  noWa: string
  email: string
  createdAt?: string
}

const statusOptions: BookingStatus[] = [
  "menunggu",
  "konfirmasi",
  "ditolak",
]

const StatusBadge = ({
  status,
}: {
  status: BookingStatus
}) => {
  const statusMap = {
    menunggu: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      icon: <Clock size={12} />,
      label: "Menunggu",
    },

    pending: {
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

  const s = statusMap[status]

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${s.bg} ${s.text}`}
    >
      {s.icon}
      {s.label}
    </span>
  )
}

export default function BookingAdmin() {
  const [list, setList] = useState<Booking[]>([])
  const [detail, setDetail] =
    useState<Booking | null>(null)

  const [dropdown, setDropdown] =
    useState<number | null>(null)

  const [loading, setLoading] =
    useState<boolean>(true)

  // =========================
  // GET ALL BOOKINGS
  // =========================
  const fetchBookings = async () => {
    try {
      setLoading(true)

      const res = await apiRequest(
        "/bookings/admin",
        {
          method: "GET",
          auth: true,
        }
      )

      console.log(res)

      // FIX ERROR res.data
      setList(res.data || [])
    } catch (error) {
      console.error(error)
      alert("Gagal mengambil data booking")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  // =========================
  // UPDATE STATUS
  // =========================
  const ubahStatus = async (
    id: number,
    status: BookingStatus
  ) => {
    try {
      await apiRequest(
        `/bookings/${id}/status`,
        {
          method: "PUT",
          auth: true,
          body: JSON.stringify({
            status,
          }),
        }
      )

      const updated = list.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
            }
          : item
      )

      setList(updated)

      if (detail && detail.id === id) {
        setDetail({
          ...detail,
          status,
        })
      }

      setDropdown(null)
    } catch (error) {
      console.error(error)
      alert("Gagal mengubah status")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex">
      <Sidebar />

      <div className="flex-1 md:ml-64 w-full p-4 md:p-6 overflow-x-hidden">
        {/* HEADER */}
        <div className="w-full bg-[#7b1d1d] rounded-2xl px-6 py-5 mb-6 flex items-center gap-4 shadow-md">
          <span className="text-3xl">👋</span>

          <div>
            <h1 className="text-white font-bold text-xl">
              Hai, Admin!
            </h1>

            <p className="text-white/70 text-sm mt-1">
              Selamat bekerja — jangan lupa
              periksa booking pelatihan hari
              ini!
            </p>
          </div>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-800">
              Booking Pelatihan
            </h2>

            <span className="text-xs text-gray-400">
              {list.length} booking
            </span>
          </div>

          {/* LOADING */}
          {loading ? (
            <div className="p-10 text-center text-gray-500">
              Loading...
            </div>
          ) : list.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              Belum ada booking
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 text-left bg-gray-50 border-b border-gray-100">
                    <th className="px-5 py-3 font-medium">
                      Nama
                    </th>

                    <th className="px-5 py-3 font-medium">
                      Tanggal
                    </th>

                    <th className="px-5 py-3 font-medium">
                      Anggota
                    </th>

                    <th className="px-5 py-3 font-medium">
                      Status
                    </th>

                    <th className="px-5 py-3 font-medium">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                  {list.map((b, i) => (
                    <tr
                      key={b.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* NAMA */}
                      <td className="px-5 py-4">
                        <button
                          onClick={() =>
                            setDetail(b)
                          }
                          className="text-left"
                        >
                          <p className="font-semibold text-gray-800 hover:text-[#7b1d1d] transition-colors">
                            {b.nama}
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            {b.email}
                          </p>
                        </button>
                      </td>

                      {/* TANGGAL */}
                      <td className="px-5 py-4 text-gray-600">
                        {new Date(
                          b.tanggal
                        ).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </td>

                      {/* ANGGOTA */}
                      <td className="px-5 py-4 text-gray-600">
                        👥 {b.anggota} orang
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-4">
                        <StatusBadge
                          status={b.status}
                        />
                      </td>

                      {/* AKSI */}
                      <td className="px-5 py-4">
                        <div className="relative">
                          <button
                            onClick={() =>
                              setDropdown(
                                dropdown === i
                                  ? null
                                  : i
                              )
                            }
                            className="flex items-center gap-1 text-xs border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-100 text-gray-600 transition"
                          >
                            Ubah{" "}
                            <ChevronDown
                              size={12}
                            />
                          </button>

                          {dropdown === i && (
                            <div className="absolute right-0 top-10 bg-white rounded-xl shadow-lg border border-gray-100 z-20 overflow-hidden min-w-[150px]">
                              {statusOptions.map(
                                (opt) => (
                                  <button
                                    key={opt}
                                    onClick={() =>
                                      ubahStatus(
                                        b.id,
                                        opt
                                      )
                                    }
                                    className={`w-full text-left px-4 py-2.5 text-xs hover:bg-gray-50 flex items-center gap-2 ${
                                      b.status ===
                                      opt
                                        ? "font-bold text-[#7b1d1d]"
                                        : "text-gray-600"
                                    }`}
                                  >
                                    {opt ===
                                      "menunggu" &&
                                      "⏳"}

                                    {opt ===
                                      "konfirmasi" &&
                                      "✅"}

                                    {opt ===
                                      "ditolak" &&
                                      "❌"}

                                    {opt}
                                  </button>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* MODAL DETAIL */}
      {detail && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (
              e.target === e.currentTarget
            ) {
              setDetail(null)
            }
          }}
        >
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-800 text-base">
                Detail Booking
              </h3>

              <button
                onClick={() =>
                  setDetail(null)
                }
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <span className="text-gray-400">
                  Nama
                </span>

                <p className="font-semibold">
                  {detail.nama}
                </p>
              </div>

              <div>
                <span className="text-gray-400">
                  Tanggal
                </span>

                <p className="font-semibold">
                  {new Date(
                    detail.tanggal
                  ).toLocaleDateString(
                    "id-ID",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </p>
              </div>

              <div>
                <span className="text-gray-400">
                  Jumlah Anggota
                </span>

                <p className="font-semibold">
                  {detail.anggota} orang
                </p>
              </div>

              <div>
                <span className="text-gray-400">
                  No WhatsApp
                </span>

                <p className="font-semibold">
                  {detail.noWa}
                </p>
              </div>

              <div>
                <span className="text-gray-400">
                  Email
                </span>

                <p className="font-semibold break-all">
                  {detail.email}
                </p>
              </div>

              <div className="pt-2">
                <StatusBadge
                  status={detail.status}
                />
              </div>
            </div>

            <button
              onClick={() =>
                setDetail(null)
              }
              className="mt-6 w-full bg-[#7b1d1d] text-white font-bold py-2.5 rounded-xl text-sm hover:bg-[#5e1515] transition"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  )
}