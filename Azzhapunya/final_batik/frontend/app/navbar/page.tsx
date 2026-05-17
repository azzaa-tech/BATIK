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
      <div className="hidden md:flex fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full justify-center px-5">

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
              href="#profileus"
              className="hover:text-yellow-100 transition duration-300"
            >
              Profil usaha
            </a>

            <a
              href="#kontak"
              className="hover:text-yellow-100 transition duration-300"
            >
              Kontak
            </a>

            <a
              href="#produkbaru"
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

          {/* Right Icons */}
          <div className="flex items-center gap-4">

            {/* Cart */}
            <a href="/cart" className="relative">
              <ShoppingCart
                className="text-white cursor-pointer hover:text-[#F2B6BE] hover:scale-110 duration-300"
                size={20}
              />

              {/* Badge */}
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                2
              </span>
            </a>

            <div className="w-[1px] h-6 bg-white/40"></div>

            {/* User */}
            <a href="/login">
              <User
                className="text-white cursor-pointer hover:text-[#F2B6BE] hover:scale-110 duration-300"
                size={22}
              />
            </a>
          </div>
        </div>
      </div>

      {/* ================= MOBILE NAVBAR ================= */}
      <div className="md:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%]">

        <div className="bg-[#703312]/90 backdrop-blur-sm rounded-full px-4 py-3 flex items-center justify-between shadow-xl">

          {/* Logo */}
          <button
            onClick={() =>
              document.getElementById("home")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="flex items-center"
          >
            <img
              src="/aset/asli.png"
              alt="logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </button>

          {/* Home */}
          <button
            onClick={() =>
              document.getElementById("profileus")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="flex items-center"
          >
            <House
              className="text-white hover:text-[#F2B6BE] hover:scale-110 duration-300"
              size={20}
            />
          </button>

          {/* Kontak */}
          <button
            onClick={() =>
              document.getElementById("kontak")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="flex items-center"
          >
            <Mail
              className="text-white hover:text-[#F2B6BE] hover:scale-110 duration-300"
              size={20}
            />
          </button>

          {/* Produk */}
          <button
            onClick={() =>
              document.getElementById("produkbaru")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="flex items-center"
          >
            <Shirt
              className="text-white hover:text-[#F2B6BE] hover:scale-110 duration-300"
              size={20}
            />
          </button>

          {/* Booking */}
          <a
            href="/booking"
            className="flex items-center transition-all duration-300 hover:scale-110"
          >
            <GraduationCap
              className="text-white hover:text-[#F2B6BE] duration-300"
              size={20}
            />
          </a>

          {/* Cart */}
          <a
            href="/cart"
            className="flex items-center relative transition-all duration-300 hover:scale-110"
          >
            <ShoppingCart
              className="text-white hover:text-[#F2B6BE] duration-300"
              size={20}
            />

            {/* Badge */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              2
            </span>
          </a>

          {/* Profile */}
          <a
            href="/login"
            className="flex items-center transition-all duration-300 hover:scale-110"
          >
            <User
              className="text-white hover:text-[#F2B6BE] duration-300"
              size={20}
            />
          </a>
        </div>
      </div>
    </>
  )
}