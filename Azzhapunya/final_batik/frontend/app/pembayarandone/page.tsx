"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle } from 'lucide-react'

export default function Page() {
  const router = useRouter()

  return (
    <div className="w-full min-h-screen bg-[#7b1d1d] flex items-center justify-center px-4">
      <div className="bg-[#f5ede4] rounded-3xl shadow-2xl p-10 w-full max-w-sm flex flex-col items-center">

        {/* Logo */}
        <div className="w-full flex justify-start mb-8">
          <img
            src="/aset/asli.png"
            alt="logo"
            className="w-14 h-14 object-contain"
          />
        </div>

        {/* Check Icon */}
        <div className="mb-8">
          <div className="w-28 h-28 rounded-full border-4 border-[#7b1d1d] flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7b1d1d"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-14 h-14"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        {/* Text */}
        <h1 className="text-3xl font-bold text-[#7b1d1d] text-center leading-snug mb-10">
          Pembayaran<br />Berhasil!
        </h1>

        {/* Button */}
        <button
          onClick={() => router.push('/')}
          className="bg-[#7b1d1d] text-white text-sm font-semibold px-8 py-2.5 rounded-full hover:bg-[#5e1515] transition-colors"
        >
          Kembali Ke Beranda
        </button>

      </div>
    </div>
  )
}