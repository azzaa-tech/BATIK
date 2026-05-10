"use client"

import { MapPin, Phone, Mail, MessageCircle } from "lucide-react"
import Navbar from "../navbar/page"

export default function KontakPage() {
  return (
    <div className="min-h-screen pb-28 bg-[#1a0a00] font-sans text-white px-4 py-10">
      <Navbar />

      {/* JUDUL */}
      <div className="text-center mb-10 mt-18">
        <h1 className="text-3xl font-serif font-bold">Hubungi Kami</h1>
        <div className="flex items-center justify-center gap-3 mt-2">
          <div className="h-px w-16 bg-yellow-600" />
          <span className="text-yellow-500">✦</span>
          <div className="h-px w-16 bg-yellow-600" />
        </div>
        <p className="text-gray-400 text-sm mt-3 max-w-md mx-auto">
          Ada pertanyaan atau ingin pesan batik? Jangan ragu untuk menghubungi kami!
        </p>
      </div>

      <div className="max-w-4xl mx-auto flex flex-wrap gap-6 items-start">

        {/* KIRI - Info Kontak */}
        <div className="flex-1 min-w-[240px] space-y-4">
          {[
            { icon: <MapPin size={20} className="text-yellow-400" />, judul: "Alamat", isi: "Jl. Batik Lontara No. 12, Makassar, Sulawesi Selatan" },
            { icon: <Phone size={20} className="text-yellow-400" />, judul: "Telepon", isi: "+62 812-3456-7890" },
            { icon: <Mail size={20} className="text-yellow-400" />, judul: "Email", isi: "galleribatiklontara@gmail.com" },
            { icon: <MessageCircle size={20} className="text-yellow-400" />, judul: "WhatsApp", isi: "+62 812-3456-7890" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 bg-yellow-700/20 border border-yellow-900 rounded-xl p-4">
              <div className="bg-yellow-700/40 rounded-full p-2 flex-shrink-0">{item.icon}</div>
              <div>
                <p className="font-bold text-white text-sm">{item.judul}</p>
                <p className="text-gray-400 text-sm mt-0.5">{item.isi}</p>
              </div>
            </div>
          ))}

          {/* Jam Operasional */}
          <div className="bg-yellow-700/20 border border-yellow-900 rounded-xl p-4">
            <p className="font-bold text-white text-sm mb-3">🕐 Jam Operasional</p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-gray-300"><span>Senin – Jumat</span><span>08.00 – 17.00</span></div>
              <div className="flex justify-between text-gray-300"><span>Sabtu</span><span>09.00 – 15.00</span></div>
              <div className="flex justify-between text-gray-400"><span>Minggu</span><span>Tutup</span></div>
            </div>
          </div>
        </div>

        {/* KANAN - WA + Sosmed */}
        <div className="flex-1 min-w-[240px] flex flex-col gap-4">

          <div className="bg-yellow-700/20 border border-yellow-900 rounded-xl p-5">
            <p className="font-bold text-white text-sm mb-2">💬 Butuh bantuan cepat?</p>
            <p className="text-gray-400 text-sm mb-4">Hubungi kami langsung via WhatsApp, kami siap membantu!</p>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl text-sm transition-colors">
              <MessageCircle size={18} />
              Chat via WhatsApp
            </a>
          </div>

          <div className="bg-yellow-700/20 border border-yellow-900 rounded-xl p-5">
            <p className="font-bold text-white text-sm mb-3">📱 Ikuti kami di sosmed</p>
            <div className="space-y-2 text-sm text-gray-300">
              <p>📸 Instagram: @galleribatiklontara</p>
              <p>🎵 TikTok: @batiklontara</p>
              <p>📘 Facebook: Galleri Batik Lontara</p>
            </div>
          </div>

        </div>

      </div>

      {/* MAPS */}
      <div className="max-w-4xl mx-auto mt-8">
        <div className="rounded-2xl overflow-hidden border border-yellow-900 h-56">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63479.53823953538!2d119.37903!3d-5.14701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbee308f2a0e0d1%3A0x4a5cb5a2ef7a6e71!2sMakassar%2C%20Sulawesi%20Selatan!5e0!3m2!1sid!2sid!4v1680000000000!5m2!1sid!2sid"
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
          />
        </div>
      </div>

    </div>
  )
}