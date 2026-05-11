"use client"

import { MapPin, Phone } from "lucide-react"

export default function GetInTouch() {
  return (
    <div className="min-h-screen font-sans">

      {/* ===== BAGIAN ATAS ===== */}
      <div className="text-center mb-10 mt-18">
        <h1 className="text-4xl text-white font-serif font-bold">Hubungi Kami</h1>
        <div className="flex items-center justify-center gap-3 mt-2">
          <div className="h-px w-16 bg-yellow-600" />
          <span className="text-yellow-500">✦</span>
          <div className="h-px w-16 bg-yellow-600" />
        </div>
        <p className="text-white text-sm mt-3 max-w-md mx-auto">
          Ada pertanyaan atau ingin pesan batik? Jangan ragu untuk menghubungi kami!
        </p>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-wrap gap-10 items-start">
        {/*initnya */}

        {/* Kiri - Judul */}
        <div className="flex-1 min-w-[220px]">
          <h1 className="text-4xl font-bold text-white mb-4">Get In Touch</h1>
          <p className="text-white text-sm leading-relaxed max-w-xs">
            Kami senang mendengar dari Anda! Jika ada pertanyaan, butuh bantuan,
            atau ingin tahu lebih lanjut tentang produk batik kami, tim kami siap membantu.
          </p>
        </div>

        {/* Kanan - Info kontak */}
        <div className="flex gap-6 flex-wrap">

          {/* Alamat */}
          <div className="min-w-[160px]">
            <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center mb-3">
              <MapPin size={18} className="text-teal-500" />
            </div>
            <p className="font-bold text-white text-sm mb-1">Our Address</p>
            <p className="text-white text-sm">Jl. Batik Lontara No. 12</p>
            <p className="text-white text-sm">Makassar, Sulawesi Selatan</p>
          </div>

          {/* Kontak */}
          <div className="min-w-[160px]">
            <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center mb-3">
              <Phone size={18} className="text-teal-500" />
            </div>
            <p className="font-bold text-white text-sm mb-1">Our Contact Info</p>
            <p className="text-white text-sm">+62 812-3456-7890</p>
            <p className="text-white text-sm">galleribatiklontara@gmail.com</p>
          </div>

        </div>

      </div>

      {/* ===== MAPS ===== */}
      <div className="relative w-full h-[420px]">
        <div className="max-w-4xl mx-auto mt-8">
        <div className="rounded-2xl overflow-hidden border border-yellow-900 h-56">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63479.53823953538!2d119.37903!3d-5.14701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbee308f2a0e0d1%3A0x4a5cb5a2ef7a6e71!2sMakassar%2C%20Sulawesi%20Selatan!5e0!3m2!1sid!2sid!4v1680000000000!5m2!1sid!2sid"
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
          />
        </div>
      </div>

      </div>

        {/* Tombol Get Directions */}

    </div>
  )
}