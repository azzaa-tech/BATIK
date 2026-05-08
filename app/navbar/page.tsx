"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { ShoppingCart, CircleUserRound, Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full absolute top-0 left-0 z-50 flex justify-center pt-5">
      
      <div className="w-[85%] h-18 bg-[#D5B13A] rounded-full px-8 py-4 flex items-center justify-between shadow-lg">

        {/* LOGO */}
        <div className="flex items-center">
          <Image
            src="/aset/logo.png"
            alt="logo"
            width={120}
            height={120}
            className="object-contain"
          />
        </div>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex items-center gap-14 text-white font-semibold text-2xl">
          <Link href="#" className="hover:text-yellow-100 transition">
            Profil usaha
          </Link>

          <Link href="#" className="hover:text-yellow-100 transition">
            Produk
          </Link>

          <Link href="#" className="hover:text-yellow-100 transition">
            Produk baru
          </Link>

          <Link href="#" className="hover:text-yellow-100 transition">
            Kontak
          </Link>
        </div>

        {/* ICON */}
        <div className="hidden md:flex items-center gap-5 text-white">
          
          <ShoppingCart
            size={32}
            className="cursor-pointer hover:scale-110 transition"
          />

          {/* GARIS */}
          <div className="w-[2px] h-8 bg-white/60 rounded-full"></div>

          <CircleUserRound
            size={34}
            className="cursor-pointer hover:scale-110 transition"
          />
        </div>

        {/* HAMBURGER */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={35} /> : <Menu size={35} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="absolute top-24 w-[90%] bg-[#D5B13A] rounded-3xl p-6 flex flex-col gap-5 text-white text-xl font-semibold md:hidden shadow-lg">
          
          <Link href="#">Profil usaha</Link>
          <Link href="#">Produk</Link>
          <Link href="#">Produk baru</Link>
          <Link href="#">Kontak</Link>

        </div>
      )}
    </nav>
  );
}