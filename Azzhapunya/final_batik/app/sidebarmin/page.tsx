"use client"

import React, { useState } from "react"
import Link from "next/link"

import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  BookOpen,
  BadgeCheck,
  LogOut,
} from "lucide-react"

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64
          bg-[#7b1d1d] flex flex-col shadow-xl
          transition-transform duration-300

          ${sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }

          md:translate-x-0
        `}
      >

        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <img
            src="/aset/asli.png"
            alt="logo"
            className="w-10 h-10 object-contain"
          />
          <div>
            <p className="text-white font-bold text-sm">
              Galleri Batik
            </p>
            <p className="text-yellow-300 text-xs">
              Lontara · Admin
            </p>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-4 space-y-2">

          <Link
            href="/admindash"
            className="
              w-full flex items-center gap-3
              px-4 py-3 rounded-xl
              text-lg font-medium
              text-white/70
              hover:bg-white/10
              hover:text-white
              transition-all
            "
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            href="/adminpers"
            className="
               w-full flex items-center gap-3
              px-4 py-3 rounded-xl
              text-lg font-medium
              text-white/70
              hover:bg-white/10
              hover:text-white
              transition-all
            "
          >
            <ShoppingBag size={18} />
            Pesanan
          </Link>

          <Link
            href="/adminpesanan"
            className="
               w-full flex items-center gap-3
              px-4 py-3 rounded-xl
              text-lg font-medium
              text-white/70
              hover:bg-white/10
              hover:text-white
              transition-all
            "
          >
            <Package size={18} />
            Produk
          </Link>

          <Link
            href="/adminbook"
            className="
               w-full flex items-center gap-3
              px-4 py-3 rounded-xl
              text-lg font-medium
              text-white/70
              hover:bg-white/10
              hover:text-white
              transition-all
            "
          >
            <BookOpen size={18} />
            Booking
          </Link>

          <Link
            href="/adminkonfirm"
            className="
               w-full flex items-center gap-3
              px-4 py-3 rounded-xl
              text-lg font-medium
              text-white/70
              hover:bg-white/10
              hover:text-white
              transition-all
            "
          >
            <BadgeCheck size={18} />
            Konfirmasi Pembayaran
          </Link>

        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/10">
          <button
            className="
              w-full flex items-center gap-3
              px-4 py-3 rounded-xl
              text-lg text-white/70
              hover:bg-white/10
              hover:text-white
              transition-all
            "
          >
            <LogOut size={18} />
            Keluar
          </button>
        </div>

      </aside>

      {/* Overlay Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  )
}