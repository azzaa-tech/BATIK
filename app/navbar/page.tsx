"use client";
import React from "react";
import Link from "next/link";

import {
  Bell,
  Shirt,
  Phone,
  Mail,
  GraduationCap,
  House,
  User,
} from "lucide-react";

export default function Navbar() {
  return (
    <>
      <div className="hidden md:flex fixed top-5 left-1/2 -translate-x-1/2 z-50 mb-20 w-full justify-center px-5">

        <div className="w-full h-16 max-w-6xl bg-[#E7BE49]/90 backdrop-blur-sm rounded-full px-7 py-3 flex items-center justify-between shadow-lg">

          <a href="/halut" className="flex items-center">
            <img
              src="/aset/asli.PNG"
              alt="logo"
              width={60}
              height={60}
              className="object-contain"
            />
          </a>

          <div className="hidden md:flex items-center gap-14 text-white font-bp text-xl">

            <div className="hidden md:flex items-center gap-14 text-white font-bp text-xl">
              <a href="/profileus" className="hover:text-yellow-100 hover:scale-105 duration-300 transition">Profil usaha </a>
              <a href="/kontak" className="hover:text-yellow-100 hover:scale-105 duration-300transition"> Kontak </a>
              <a href="/produkbaru" className="hover:text-yellow-100 hover:scale-105 duration-300transition"> Produk baru </a>
              <a href="/booking" className="hover:text-yellow-100 hover:scale-105 duration-300transition"> Pelatihan Membatik</a>
            </div>

          </div>

          <div className="flex items-center gap-4">

            <Bell
              className="text-white cursor-pointer hover:text-[#F2B6BE] hover:scale-110 duration-300"
              size={20}
            />

            <div className="w-[1px] h-6 bg-white/40"></div>

            <User
              className="text-white cursor-pointer hover:text-[#F2B6BE] hover:scale-110 duration-300"
              size={22}
            />

          </div>
        </div>
      </div>
    
      {/* ================= MOBILE NAVBAR ================= */}
      <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[92%]">

        <div className="bg-[#E7BE49]/90 backdrop-blur-sm rounded-full px-6 py-4 flex items-center justify-between shadow-xl">
          <a href="/halut">
            <img
              src="/aset/asli.png"
              alt="logo"
              width={45}
              height={45}
              className="object-contain"
            />
          </a>

          <a href="/hal1" className="flex items-center">
            <House
              className="text-white hover:text-[#F2B6BE] hover:scale-110 duration-300"
              size={22}
            />
          </a>
          <a href="/kontak" className="flex items-center">
            <Mail
              className="text-white hover:text-[#F2B6BE] hover:scale-110 duration-300"
              size={22}
            />
          </a>

          <a href="/produkbaru" className="flex items-center">
            <Shirt
              className="text-white hover:text-[#F2B6BE] hover:scale-110 duration-300"
              size={22}
            />
          </a>

          <a href="/booking" className="flex items-center">
            <GraduationCap
              className="text-white hover:text-[#F2B6BE] hover:scale-110 duration-300"
              size={22}
            />
          </a>

          <a href="/profileus" className="flex items-center">
            <User
              className="text-white hover:text-[#F2B6BE] hover:scale-110 duration-300"
              size={22}
            />
          </a>
        </div>
      </div>
    </>
  );
}