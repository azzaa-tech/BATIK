"use client"

import { ChangeEvent, useRef, useState } from "react"
import Image from "next/image"
import {
  FileText,
  Upload,
  X,
  Copy,
  Check,
  Truck,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Navbar from "../navbar/page"
import { apiRequest } from "@/lib/api"

const banks = [
  {
    nama: "BCA Virtual Account",
    norek: "1234-5678-9012",
    img: "/aset/bca.jpg",
  },
  {
    nama: "Mandiri Virtual Account",
    norek: "8901-2345-6789",
    img: "/aset/mandiri.jpg",
  },
  {
    nama: "BNI Virtual Account",
    norek: "5678-9012-3456",
    img: "/aset/bni.jpg",
  },
  {
    nama: "BRI Virtual Account",
    norek: "3456-7890-1234",
    img: "/aset/bri.jpg",
  },
]

const ekspedisi = [
  {
    id: "jne",
    nama: "JNE",
    layanan: "Reguler (2-3 hari)",
    ongkir: 15000,
    logo: "/aset/jne.jpg",
  },
  {
    id: "jnt",
    nama: "J&T",
    layanan: "Express (1-2 hari)",
    ongkir: 18000,
    logo: "/aset/jnt.jpg",
  },
]

type CheckoutErrors = Partial<{
  nama: string
  alamat: string
  telpon: string
  metode: string
  ekspedisi: string
  foto: string
}>

type CheckoutItem = {
  productId: number
  qty: number
  size: string
  harga: number
}

export default function CheckoutPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    nama: "",
    alamat: "",
    telpon: "",
    catatan: "",
  })

  const [errors, setErrors] = useState<CheckoutErrors>({})
  const [metodeDipilih, setMetodeDipilih] = useState<number | null>(null)
  const [dropdown, setDropdown] = useState<number | null>(null)
  const [ekspedisiDipilih, setEkspedisiDipilih] = useState<string | null>(null)

  const [copied, setCopied] = useState<number | null>(null)

  const [showModal, setShowModal] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const [foto, setFoto] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const [loading, setLoading] = useState(false)

  const inputRef = useRef<HTMLInputElement | null>(null)

  const subtotal =
    typeof window === "undefined"
      ? 0
      : Number(
          sessionStorage.getItem("batik_checkout_subtotal") || 0
        )

  const ongkir = ekspedisiDipilih
    ? ekspedisi.find((e) => e.id === ekspedisiDipilih)?.ongkir || 0
    : 0

  const total = subtotal + ongkir

  const format = (n: number) =>
    "Rp" + n.toLocaleString("id-ID")

  const handleFoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    setFoto(file)
    setPreview(URL.createObjectURL(file))

    setErrors((prev) => ({
      ...prev,
      foto: "",
    }))
  }

  const hapusFoto = () => {
    setFoto(null)
    setPreview(null)

    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  const handleCopy = (norek: string, idx: number) => {
    navigator.clipboard.writeText(norek.replace(/-/g, ""))

    setCopied(idx)

    setTimeout(() => {
      setCopied(null)
    }, 2000)
  }

  const handleCheckout = async () => {
    const newErrors: CheckoutErrors = {}

    if (!form.nama.trim()) {
      newErrors.nama = "Nama penerima wajib diisi"
    }

    if (!form.alamat.trim()) {
      newErrors.alamat = "Alamat wajib diisi"
    }

    if (!form.telpon.trim()) {
      newErrors.telpon = "No. Telepon wajib diisi"
    }

    if (!ekspedisiDipilih) {
      newErrors.ekspedisi =
        "Pilih ekspedisi pengiriman dulu"
    }

    if (metodeDipilih === null) {
      newErrors.metode =
        "Pilih metode pembayaran dulu"
    }

    if (!foto) {
      newErrors.foto =
        "Upload bukti transaksi dulu"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    const items = JSON.parse(
      sessionStorage.getItem(
        "batik_checkout_items"
      ) || "[]"
    ) as CheckoutItem[]

    if (items.length === 0) {
      alert("Keranjang kosong")
      return
    }

    try {
      setLoading(true)

      const payload = new FormData()

      payload.append("namaPenerima", form.nama)
      payload.append("alamat", form.alamat)
      payload.append("telpon", form.telpon)
      payload.append("catatan", form.catatan)

      payload.append(
        "metodePembayaran",
        banks[metodeDipilih!].nama
      )

      payload.append(
        "ekspedisi",
        ekspedisi.find(
          (e) => e.id === ekspedisiDipilih
        )?.nama || ""
      )

      payload.append("subtotal", String(subtotal))
      payload.append("ongkir", String(ongkir))
      payload.append("total", String(total))

      payload.append("items", JSON.stringify(items))

      payload.append("buktiTransaksi", foto)

      await apiRequest("/orders", {
        method: "POST",
        auth: true,
        body: payload,
      })

      sessionStorage.removeItem(
        "batik_checkout_items"
      )
      sessionStorage.removeItem(
        "batik_checkout_subtotal"
      )

      setShowSuccess(true)

      setTimeout(() => {
        router.push("/hal1")
      }, 2500)
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Checkout gagal"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fef6e8] px-4 sm:px-6 lg:px-8 pb-24 pt-24 md:pt-28 font-sans">
      <Navbar />

      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-5 md:gap-6 items-start">
        {/* FORM */}
        <div className="w-full lg:flex-1 bg-[#f0e8df] rounded-2xl md:rounded-3xl p-4 sm:p-6 shadow-lg">
          <div className="mb-5">
            <Image
              src="/aset/logo.png"
              alt="logo"
              width={90}
              height={45}
              className="object-contain"
            />
          </div>

          {/* NAMA */}
          <div className="mb-4">
            <label className="block text-sm sm:text-base font-semibold text-[#2d0000] mb-1">
              Nama Penerima
            </label>

            <input
              type="text"
              value={form.nama}
              onChange={(e) => {
                setForm({
                  ...form,
                  nama: e.target.value,
                })

                setErrors((prev) => ({
                  ...prev,
                  nama: "",
                }))
              }}
              className={`w-full border rounded-xl px-4 py-3 text-sm outline-none bg-white ${
                errors.nama
                  ? "border-red-400"
                  : "border-gray-300 focus:border-[#7b1d1d]"
              }`}
              placeholder="Masukkan nama penerima"
            />

            {errors.nama && (
              <p className="text-red-500 text-xs mt-1">
                ⚠ {errors.nama}
              </p>
            )}
          </div>

          {/* ALAMAT */}
          <div className="mb-4">
            <label className="block text-sm sm:text-base font-semibold text-[#2d0000] mb-1">
              Alamat
            </label>

            <input
              type="text"
              value={form.alamat}
              onChange={(e) => {
                setForm({
                  ...form,
                  alamat: e.target.value,
                })

                setErrors((prev) => ({
                  ...prev,
                  alamat: "",
                }))
              }}
              className={`w-full border rounded-xl px-4 py-3 text-sm outline-none bg-white ${
                errors.alamat
                  ? "border-red-400"
                  : "border-gray-300 focus:border-[#7b1d1d]"
              }`}
              placeholder="Masukkan alamat lengkap"
            />

            {errors.alamat && (
              <p className="text-red-500 text-xs mt-1">
                ⚠ {errors.alamat}
              </p>
            )}
          </div>

          {/* TELP */}
          <div className="mb-4">
            <label className="block text-sm sm:text-base font-semibold text-[#2d0000] mb-1">
              No. Telepon
            </label>

            <input
              type="tel"
              value={form.telpon}
              onChange={(e) => {
                setForm({
                  ...form,
                  telpon: e.target.value,
                })

                setErrors((prev) => ({
                  ...prev,
                  telpon: "",
                }))
              }}
              className={`w-full border rounded-xl px-4 py-3 text-sm outline-none bg-white ${
                errors.telpon
                  ? "border-red-400"
                  : "border-gray-300 focus:border-[#7b1d1d]"
              }`}
              placeholder="08xxxxxxxxxx"
            />

            {errors.telpon && (
              <p className="text-red-500 text-xs mt-1">
                ⚠ {errors.telpon}
              </p>
            )}
          </div>

          {/* CATATAN */}
          <div className="mb-6">
            <label className="block text-sm sm:text-base font-semibold text-[#2d0000] mb-1">
              Catatan Untuk Kurir
            </label>

            <input
              type="text"
              value={form.catatan}
              onChange={(e) =>
                setForm({
                  ...form,
                  catatan: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7b1d1d] bg-white"
              placeholder="Contoh: titip di depan pintu"
            />
          </div>

          {/* EKSPEDISI */}
          <div className="mb-6">
            <label className="text-sm sm:text-base font-semibold text-[#2d0000] mb-2 flex items-center gap-2">
              <Truck size={16} />
              Ekspedisi Pengiriman
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ekspedisi.map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => {
                    setEkspedisiDipilih(exp.id)

                    setErrors((prev) => ({
                      ...prev,
                      ekspedisi: "",
                    }))
                  }}
                  className={`border-2 rounded-2xl p-3 text-left transition-all ${
                    ekspedisiDipilih === exp.id
                      ? "border-[#7b1d1d] bg-white shadow-md"
                      : "border-gray-200 bg-white hover:border-[#7b1d1d]/40"
                  }`}
                >
                  <p className="text-sm font-bold text-[#2d0000]">
                    {exp.nama}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {exp.layanan}
                  </p>

                  <p className="text-xs font-semibold text-[#7b1d1d] mt-1">
                    {format(exp.ongkir)}
                  </p>
                </button>
              ))}
            </div>

            {errors.ekspedisi && (
              <p className="text-red-500 text-xs mt-1">
                ⚠ {errors.ekspedisi}
              </p>
            )}
          </div>

          {/* UPLOAD */}
          <button
            onClick={() => setShowModal(true)}
            className={`w-full flex items-center justify-center gap-2 border-2 rounded-2xl py-3 font-bold text-sm transition ${
              errors.foto
                ? "border-red-400 text-red-500"
                : "border-[#7b1d1d] text-[#7b1d1d]"
            }`}
          >
            <FileText size={18} />
            Bukti Transaksi
          </button>

          {errors.foto && (
            <p className="text-red-500 text-xs mt-1">
              ⚠ {errors.foto}
            </p>
          )}
        </div>

        {/* PAYMENT */}
        <div className="w-full lg:w-80 bg-[#f0e8df] rounded-2xl p-5 shadow-xl">
          <h2 className="text-base font-bold text-[#2d0000] mb-4">
            Metode Pembayaran
          </h2>

          <div className="flex flex-col gap-3 mb-5">
            {banks.map((bank, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border overflow-hidden"
              >
                <div
                  className="flex items-center justify-between px-4 py-3 cursor-pointer"
                  onClick={() => {
                    setMetodeDipilih(i)
                    setDropdown(
                      dropdown === i ? null : i
                    )

                    setErrors((prev) => ({
                      ...prev,
                      metode: "",
                    }))
                  }}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={bank.img}
                      alt={bank.nama}
                      className="w-16 h-10 object-contain"
                    />

                    <div>
                      <p className="text-sm font-bold">
                        {bank.nama}
                      </p>

                      <p className="text-xs text-gray-400">
                        Klik untuk lihat rekening
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      metodeDipilih === i
                        ? "border-[#7b1d1d]"
                        : "border-gray-300"
                    }`}
                  >
                    {metodeDipilih === i && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#7b1d1d]" />
                    )}
                  </div>
                </div>

                {dropdown === i && (
                  <div className="border-t bg-gray-50 px-4 py-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-[#7b1d1d]">
                        {bank.norek}
                      </p>

                      <button
                        onClick={() =>
                          handleCopy(bank.norek, i)
                        }
                        className="text-xs flex items-center gap-1 bg-[#7b1d1d]/10 text-[#7b1d1d] px-2 py-1 rounded-lg"
                      >
                        {copied === i ? (
                          <>
                            <Check size={12} />
                            Tersalin
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            Salin
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {errors.metode && (
            <p className="text-red-500 text-xs mb-3">
              ⚠ {errors.metode}
            </p>
          )}

          {/* SUMMARY */}
          <div className="flex flex-col gap-2 text-sm text-gray-600 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{format(subtotal)}</span>
            </div>

            <div className="flex justify-between">
              <span>Ongkir</span>
              <span>{format(ongkir)}</span>
            </div>

            <div className="flex justify-between font-bold text-base text-[#2d0000] border-t pt-3">
              <span>Total</span>
              <span>{format(total)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-[#7b1d1d] text-white rounded-full py-3 text-sm font-bold hover:bg-[#5e1515] disabled:bg-gray-400"
          >
            {loading
              ? "Memproses..."
              : "Go to Checkout"}
          </button>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex justify-between mb-5">
              <h3 className="font-bold">
                Upload Bukti Transaksi
              </h3>

              <button
                onClick={() =>
                  setShowModal(false)
                }
              >
                <X size={22} />
              </button>
            </div>

            {!preview ? (
              <div
                onClick={() =>
                  inputRef.current?.click()
                }
                className="border-2 border-dashed rounded-xl h-52 flex flex-col items-center justify-center gap-3 cursor-pointer"
              >
                <Upload size={36} />

                <p className="text-sm">
                  Klik untuk pilih foto
                </p>
              </div>
            ) : (
              <div className="relative h-52 rounded-xl overflow-hidden">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />

                <button
                  onClick={hapusFoto}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFoto}
              className="hidden"
            />

            <div className="flex gap-3 mt-5">
              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="flex-1 border rounded-xl py-2.5 text-sm"
              >
                Batal
              </button>

              <button
                onClick={() => {
                  if (foto) {
                    setShowModal(false)
                  }
                }}
                disabled={!foto}
                className={`flex-1 rounded-xl py-2.5 text-sm font-bold text-white ${
                  foto
                    ? "bg-[#7b1d1d]"
                    : "bg-gray-300"
                }`}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check
                size={40}
                className="text-green-600"
              />
            </div>

            <h2 className="text-2xl font-bold text-[#2d0000]">
              Pembayaran Berhasil
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Pesanan kamu sedang diproses admin
            </p>
          </div>
        </div>
      )}
    </div>
  )
}