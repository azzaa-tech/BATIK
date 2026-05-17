"use client"

import React from "react"
import {
  Shirt,
  Mail,
  GraduationCap,
  House,
  User,
  ShoppingCart,
} from "lucide-react"

export default function Navbar() {
  return (
    <>
      {/* ================= DESKTOP ================= */}
      <div className="hidden md:flex fixed top-5 left-1/2 -translate-x-1/2 z-50 mb-20 w-full justify-center px-5">
        <div className="w-full h-16 max-w-6xl bg-[#703312]/90 backdrop-blur-sm rounded-full px-7 py-3 flex items-center justify-between shadow-lg">
          
          {/* Logo */}
          <a href="/halut" className="flex items-center">
            <img
              src="/aset/asli.PNG"
              alt="logo"
              width={60}
              height={60}
              className="object-contain"
            />
          </a>

          {/* Menu */}
          <div className="hidden md:flex items-center gap-14 text-white font-bp text-xl">
            <a
              href="/hal1"
              className="hover:text-yellow-100 transition duration-300"
            >
              Profil usaha
            </a>

            <a
              href="/hal1"
              className="hover:text-yellow-100 transition duration-300"
            >
              Kontak
            </a>

            <a
              href="/hal1"
              className="hover:text-yellow-100 transition duration-300"
            >
              Produk
            </a>

            <a
              href="/booking"
              className="hover:text-yellow-100 transition duration-300"
            >
              Pelatihan Membatik
            </a>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <a href="/cart">
              <ShoppingCart
                className="text-white cursor-pointer hover:text-[#F2B6BE] hover:scale-110 duration-300"
                size={20}
              />
            </a>

            <div className="w-[1px] h-6 bg-white/40"></div>

            <a href="/login">
              <User
                className="text-white cursor-pointer hover:text-[#F2B6BE] hover:scale-110 duration-300"
                size={22}
              />
            </a>
          </div>
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[94%]">
        <div className="bg-[#703312]/90 backdrop-blur-sm rounded-full px-4 py-4 flex items-center justify-between shadow-xl">

          {/* Logo */}
          <a href="/halut">
            <img
              src="/aset/asli.png"
              alt="logo"
              width={42}
              height={42}
              className="object-contain"
            />
          </a>

          {/* Home */}
          <a href="/hal1" className="flex items-center">
            <House
              className="text-white hover:text-[#F2B6BE] hover:scale-110 duration-300"
              size={20}
            />
          </a>

          {/* Contact */}
          <a href="/hal1" className="flex items-center">
            <Mail
              className="text-white hover:text-[#F2B6BE] hover:scale-110 duration-300"
              size={20}
            />
          </a>

          {/* Product */}
          <a href="/hal1" className="flex items-center">
            <Shirt
              className="text-white hover:text-[#F2B6BE] hover:scale-110 duration-300"
              size={20}
            />
          </a>

          {/* Booking */}
          <a href="/booking" className="flex items-center">
            <GraduationCap
              className="text-white hover:text-[#F2B6BE] hover:scale-110 duration-300"
              size={20}
            />
          </a>

          {/* Cart */}
          <a href="/cart" className="flex items-center relative">
            <ShoppingCart
              className="text-white hover:text-[#F2B6BE] hover:scale-110 duration-300"
              size={20}
            />

            {/* Badge jumlah pesanan */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              2
            </span>
          </a>

          {/* Profile */}
          <a href="/profileus" className="flex items-center">
            <User
              className="text-white hover:text-[#F2B6BE] hover:scale-110 duration-300"
              size={20}
            />
          </a>
        </div>
      </div>
    </>
  )
}