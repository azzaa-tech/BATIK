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
  User,
  Menu,
  X,
} from "lucide-react"

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      {/* Hamburger Button — Mobile Only */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="
          fixed top-4 right-4 z-50
          md:hidden
          bg-[#7b1d1d] text-white
          p-2 rounded-xl shadow-lg
        "
      >
        <Menu size={22} />
      </button>

      {/* Overlay — Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64
          bg-[#7b1d1d] flex flex-col shadow-xl
          transition-transform duration-300

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >

        {/* Close Button — Mobile Only */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="
            absolute top-4 right-4
            md:hidden
            text-white/60 hover:text-white
            transition-colors
          "
        >
          <X size={20} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <img
            src="/aset/asli.png"
            alt="logo"
            className="w-10 h-10 object-contain"
          />
          <div>
            <p className="text-white font-bold text-sm">Galleri Batik</p>
            <p className="text-yellow-300 text-xs">Lontara · Admin</p>
          </div>
        </div>

        {/* Profile Section */}
        <div className="px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/10">
            <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
              <User size={18} className="text-[#7b1d1d]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">
                Admin Utama
              </p>
              <p className="text-white/50 text-xs truncate">
                admin@lontara.id
              </p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">

          {[
            { href: "/admindash", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
            { href: "/adminpers", icon: <ShoppingBag size={18} />, label: "Pesanan" },
            { href: "/adminpesanan", icon: <Package size={18} />, label: "Produk" },
            { href: "/adminbook", icon: <BookOpen size={18} />, label: "Booking" },
            { href: "/adminkonfirm", icon: <BadgeCheck size={18} />, label: "Konfirmasi Pembayaran" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className="
                w-full flex items-center gap-3
                px-4 py-3 rounded-xl
                text-base font-medium
                text-white/70
                hover:bg-white/10
                hover:text-white
                transition-all
              "
            >
              {item.icon}
              {item.label}
            </Link>
          ))}

        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/10">
          <a href="/hal1">

            <button
              className="
              w-full flex items-center gap-3
              px-4 py-3 rounded-xl
              text-base text-white/70
              hover:bg-white/10
              hover:text-white
              transition-all
            "
            >
              <LogOut size={18} />
              Keluar
            </button>
          </a>
        </div>

      </aside>
    </>
  )
}