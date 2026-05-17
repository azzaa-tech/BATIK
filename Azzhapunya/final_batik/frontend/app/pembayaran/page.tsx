"use client"

import { useState, useRef } from "react"
import { FileText, Upload, X, Copy, Check, Truck } from "lucide-react"
import { useRouter } from "next/navigation"
import Navbar from "../navbar/page"

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

export default function CheckoutPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    nama: "",
    alamat: "",
    telpon: "",
    catatan: "",
  })

  const [errors, setErrors] = useState({})
  const [metodeDipilih, setMetodeDipilih] = useState(null)
  const [dropdown, setDropdown] = useState(null)
  const [ekspedisiDipilih, setEkspedisiDipilih] = useState(null)
  const [copied, setCopied] = useState(null)

  const [showModal, setShowModal] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [foto, setFoto] = useState(null)
  const [preview, setPreview] = useState(null)
  const inputRef = useRef(null)

  const subtotal = 200000
  const ongkir = ekspedisiDipilih
    ? ekspedisi.find((e) => e.id === ekspedisiDipilih)?.ongkir || 0
    : 0

  const total = subtotal + ongkir
  const format = (n) => "Rp" + n.toLocaleString("id-ID")

  const handleFoto = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFoto(file)
    setPreview(URL.createObjectURL(file))
    setErrors({ ...errors, foto: "" })
  }

  const hapusFoto = () => {
    setFoto(null)
    setPreview(null)
    if (inputRef.current) inputRef.current.value = ""
  }

  const handleCopy = (norek, idx) => {
    navigator.clipboard.writeText(norek.replace(/-/g, ""))
    setCopied(idx)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleCheckout = () => {
    const newErrors = {}

    if (!form.nama.trim()) newErrors.nama = "Nama penerima wajib diisi"
    if (!form.alamat.trim()) newErrors.alamat = "Alamat wajib diisi"
    if (!form.telpon.trim()) newErrors.telpon = "No. Telepon wajib diisi"
    if (!ekspedisiDipilih) newErrors.ekspedisi = "Pilih ekspedisi pengiriman dulu"
    if (metodeDipilih === null) newErrors.metode = "Pilih metode pembayaran dulu"
    if (!foto) newErrors.foto = "Upload bukti transaksi dulu"

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setShowSuccess(true)

      setTimeout(() => {
        router.push("/hal1")
      }, 2200)
    }
  }

  return (
    <div className="min-h-screen bg-[#fef6e8] px-4 sm:px-6 lg:px-8 pb-24 pt-24 md:pt-28 font-sans">
      <Navbar />

      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-5 md:gap-6 items-start">
        {/* FORM */}
        <div className="w-full lg:flex-1 bg-[#f0e8df] rounded-2xl md:rounded-3xl p-4 sm:p-6 shadow-lg">
          <div className="mb-4">
            <label className="block text-sm sm:text-base font-semibold text-[#2d0000] mb-1">
              Nama Penerima
            </label>
            <input
              type="text"
              value={form.nama}
              onChange={(e) => {
                setForm({ ...form, nama: e.target.value })
                setErrors({ ...errors, nama: "" })
              }}
              className={`w-full border rounded-xl px-4 py-3 text-sm outline-none bg-white ${
                errors.nama
                  ? "border-red-400"
                  : "border-gray-300 focus:border-[#7b1d1d]"
              }`}
              placeholder="Masukkan nama penerima"
            />
            {errors.nama && (
              <p className="text-red-500 text-xs mt-1">⚠ {errors.nama}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm sm:text-base font-semibold text-[#2d0000] mb-1">
              Alamat
            </label>
            <input
              type="text"
              value={form.alamat}
              onChange={(e) => {
                setForm({ ...form, alamat: e.target.value })
                setErrors({ ...errors, alamat: "" })
              }}
              className={`w-full border rounded-xl px-4 py-3 text-sm outline-none bg-white ${
                errors.alamat
                  ? "border-red-400"
                  : "border-gray-300 focus:border-[#7b1d1d]"
              }`}
              placeholder="Masukkan alamat lengkap"
            />
            {errors.alamat && (
              <p className="text-red-500 text-xs mt-1">⚠ {errors.alamat}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm sm:text-base font-semibold text-[#2d0000] mb-1">
              No. Telepon
            </label>
            <input
              type="tel"
              value={form.telpon}
              onChange={(e) => {
                setForm({ ...form, telpon: e.target.value })
                setErrors({ ...errors, telpon: "" })
              }}
              className={`w-full border rounded-xl px-4 py-3 text-sm outline-none bg-white ${
                errors.telpon
                  ? "border-red-400"
                  : "border-gray-300 focus:border-[#7b1d1d]"
              }`}
              placeholder="08xxxxxxxxxx"
            />
            {errors.telpon && (
              <p className="text-red-500 text-xs mt-1">⚠ {errors.telpon}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm sm:text-base font-semibold text-[#2d0000] mb-1">
              Catatan Untuk Kurir{" "}
              <span className="font-normal text-gray-400">(Opsional)</span>
            </label>
            <input
              type="text"
              value={form.catatan}
              onChange={(e) => setForm({ ...form, catatan: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#7b1d1d] bg-white"
              placeholder="Contoh: titip di depan pintu"
            />
          </div>

          {/* EKSPEDISI */}
          <div className="mb-6">
            <label className="text-sm sm:text-base font-semibold text-[#2d0000] mb-2 flex items-center gap-2">
              <Truck size={16} /> Ekspedisi Pengiriman
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ekspedisi.map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => {
                    setEkspedisiDipilih(exp.id)
                    setErrors({ ...errors, ekspedisi: "" })
                  }}
                  className={`border-2 rounded-2xl p-3 text-left transition-all ${
                    ekspedisiDipilih === exp.id
                      ? "border-[#7b1d1d] bg-white shadow-md"
                      : "border-gray-200 bg-white hover:border-[#7b1d1d]/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-16 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center">
                      <img
                        src={exp.logo}
                        alt={exp.nama}
                        className="max-w-[75%] max-h-[75%] object-contain"
                      />
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        ekspedisiDipilih === exp.id
                          ? "border-[#7b1d1d]"
                          : "border-gray-300"
                      }`}
                    >
                      {ekspedisiDipilih === exp.id && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#7b1d1d]" />
                      )}
                    </div>
                  </div>

                  <p className="text-sm font-bold text-[#2d0000]">{exp.nama}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{exp.layanan}</p>
                  <p className="text-xs font-semibold text-[#7b1d1d] mt-1">
                    {format(exp.ongkir)}
                  </p>
                </button>
              ))}
            </div>

            {errors.ekspedisi && (
              <p className="text-red-500 text-xs mt-1">⚠ {errors.ekspedisi}</p>
            )}
          </div>

          <button
            onClick={() => setShowModal(true)}
            className={`w-full flex flex-wrap items-center justify-center gap-2 border-2 rounded-2xl py-3 font-bold text-sm sm:text-base transition-colors ${
              errors.foto
                ? "border-red-400 text-red-500"
                : "border-[#7b1d1d] text-[#7b1d1d] hover:bg-[#7b1d1d]/10"
            }`}
          >
            <FileText size={20} />
            Bukti Transaksi
            {foto && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-normal">
                ✓ Terupload
              </span>
            )}
          </button>

          {errors.foto && (
            <p className="text-red-500 text-xs mt-1">⚠ {errors.foto}</p>
          )}
        </div>

        {/* PAYMENT */}
        <div className="w-full lg:w-80 bg-[#f0e8df] rounded-2xl md:rounded-3xl p-4 sm:p-6 shadow-xl">
          <h2 className="text-base font-bold text-[#2d0000] mb-4">
            Metode Pembayaran
          </h2>

          <div className="flex flex-col gap-3 mb-6">
            {banks.map((bank, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl border overflow-hidden transition-all ${
                  metodeDipilih === i
                    ? "border-[#7b1d1d] shadow-md"
                    : "border-gray-200"
                }`}
              >
                <div
                  className="flex items-center justify-between gap-3 px-3 sm:px-4 py-3 cursor-pointer"
                  onClick={() => {
                    setMetodeDipilih(i)
                    setDropdown(dropdown === i ? null : i)
                    setErrors({ ...errors, metode: "" })
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-16 h-10 sm:w-20 sm:h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                      <img
                        src={bank.img}
                        alt={bank.nama}
                        className="max-w-[75%] max-h-[75%] object-contain"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-800 leading-tight truncate">
                        {bank.nama}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Klik untuk lihat rekening
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
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
                  <div className="border-t border-gray-100 bg-gray-50 px-3 sm:px-4 py-3">
                    <p className="text-xs text-gray-500 mb-1">Nomor Rekening</p>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <p className="text-sm font-bold text-[#7b1d1d] tracking-widest break-all">
                        {bank.norek}
                      </p>

                      <button
                        onClick={() => handleCopy(bank.norek, i)}
                        className={`w-fit flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
                          copied === i
                            ? "bg-green-100 text-green-600"
                            : "bg-[#7b1d1d]/10 text-[#7b1d1d] hover:bg-[#7b1d1d]/20"
                        }`}
                      >
                        {copied === i ? (
                          <>
                            <Check size={12} /> Tersalin!
                          </>
                        ) : (
                          <>
                            <Copy size={12} /> Salin
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-gray-400 mt-1">
                      Atas nama: Gallery Batik Lontara
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {errors.metode && (
            <p className="text-red-500 text-xs mb-3">⚠ {errors.metode}</p>
          )}

          <h2 className="text-base font-bold text-[#2d0000] mb-3">
            Order Summary
          </h2>

          <div className="flex flex-col gap-2 text-sm text-gray-600 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{format(subtotal)}</span>
            </div>

            <div className="flex justify-between gap-3">
              <span>
                Ongkir{" "}
                {ekspedisiDipilih
                  ? `(${ekspedisi.find((e) => e.id === ekspedisiDipilih)?.nama})`
                  : ""}
              </span>
              <span className="text-right">
                {ekspedisiDipilih ? (
                  format(ongkir)
                ) : (
                  <span className="text-gray-400 italic text-xs">
                    pilih ekspedisi
                  </span>
                )}
              </span>
            </div>

            <div className="flex justify-between font-bold text-base text-[#2d0000] border-t border-gray-200 pt-3 mt-1">
              <span>Total</span>
              <span>{format(total)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-[#7b1d1d] text-white rounded-full py-3 text-sm font-bold hover:bg-[#5e1515] transition-colors"
          >
            Go to Checkout
          </button>
        </div>
      </div>

      {/* MODAL UPLOAD */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-5 sm:p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base sm:text-lg font-bold text-[#2d0000]">
                Upload Bukti Transaksi
              </h3>

              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={22} />
              </button>
            </div>

            {!preview ? (
              <div
                onClick={() => inputRef.current?.click()}
                className="border-2 border-dashed border-[#7b1d1d]/40 rounded-xl h-52 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-[#f0e8df] transition-colors"
              >
                <Upload size={36} className="text-[#7b1d1d]/50" />
                <p className="text-sm font-semibold text-[#7b1d1d]">
                  Klik untuk pilih foto
                </p>
                <p className="text-xs text-gray-400">JPG, PNG, JPEG</p>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden h-52">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />

                <button
                  onClick={hapusFoto}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
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

            {foto && (
              <p className="text-xs text-gray-500 mt-2 text-center truncate">
                📎 {foto.name}
              </p>
            )}

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-300 rounded-xl py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>

              <button
                onClick={() => {
                  if (foto) setShowModal(false)
                }}
                disabled={!foto}
                className={`flex-1 rounded-xl py-2.5 text-sm font-bold text-white transition-colors ${
                  foto
                    ? "bg-[#7b1d1d] hover:bg-[#5e1515] cursor-pointer"
                    : "bg-gray-300 cursor-not-allowed"
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
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm success-fade p-4">
          <div className="bg-white rounded-3xl px-5 sm:px-10 py-8 shadow-2xl flex flex-col items-center success-pop border border-green-100 max-w-md w-full">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-green-100 flex items-center justify-center mb-5 relative">
              <div className="absolute inset-0 rounded-full bg-green-200 success-ping opacity-40"></div>

              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 relative z-10"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-[#2d0000] text-center">
              Pembayaran Berhasil
            </h2>

            <p className="text-sm text-gray-500 mt-2 text-center leading-relaxed">
              Pembayaran telah berhasil dilakukan.
              <br />
              Pesanan kamu sedang diproses oleh admin.
            </p>

            <div className="w-full bg-[#fef6e8] border border-[#7b1d1d]/10 rounded-2xl p-4 mt-5">
              <p className="text-sm font-bold text-[#7b1d1d] mb-1">
                📦 Informasi Pengiriman
              </p>

              <p className="text-xs text-gray-600 leading-relaxed">
                Nomor resi akan dikirim setelah pesanan selesai diproses dan
                paket telah diserahkan ke ekspedisi.
              </p>
            </div>

            <div className="mt-5 w-40 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 success-loading"></div>
            </div>

            <button
              onClick={() => router.push("/hal1")}
              className="mt-6 w-full bg-[#7b1d1d] hover:bg-[#5e1515] text-white py-3 rounded-2xl text-sm font-bold transition-all duration-300 hover:scale-[1.02]"
            >
              Kembali ke Halaman Utama
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        .success-fade {
          animation: successFade 0.3s ease-out;
        }

        .success-pop {
          animation: successPop 0.45s ease-out;
        }

        .success-ping {
          animation: successPing 1.3s ease-out infinite;
        }

        .success-loading {
          animation: successLoading 2.2s linear forwards;
        }

        @keyframes successFade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes successPop {
          0% {
            transform: scale(0.7);
            opacity: 0;
          }
          70% {
            transform: scale(1.05);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes successPing {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes successLoading {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}