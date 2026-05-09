"use client";
import React from "react";
import Link from "next/link";

import {
  Bell,
  Box,
  CircleAlert,
  House,
  User,
} from "lucide-react";

export default function Navbar() {
  return (
    <>
      <div className="hidden md:flex fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full justify-center px-5">

        <div className="w-full h-20 max-w-6xl bg-[#E7BE49]/90 backdrop-blur-sm rounded-full px-7 py-3 flex items-center justify-between shadow-lg">

          <a href="/halut" className="flex items-center">
            <img
              src="/aset/asli.PNG"
              alt="logo" width={60} height={60} className="object-contain"
            />
          </a>

          <div className="hidden md:flex items-center gap-14 text-white font-bp text-xl">
             <a href="#" className="hover:text-yellow-100 hover:scale-105 duration-300 transition">Profil usaha </a> 
             <a href="#" className="hover:text-yellow-100 hover:scale-105 duration-300transition"> Kontak </a> 
             <a href="#" className="hover:text-yellow-100 hover:scale-105 duration-300transition"> Produk baru </a> 
             <a href="#" className="hover:text-yellow-100 hover:scale-105 duration-300transition"> Pelatihan Membatik</a>
              </div>

          <div className="flex items-center gap-4">

            <Bell
              className="text-white cursor-pointer hover:text-[#F2B6BE] hover:scale-110 duration-300"
              size={18}
            />

            <div className="w-[1px] h-6 bg-white/40"></div>

            <button className="bg-white text-[#5A1520] px-6 py-2 rounded-full text-sm font-semibold hover:scale-105 duration-300">
              Masuk
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE NAVBAR ================= */}
      <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[92%]">

        <div className="bg-[#5A1520]/90 backdrop-blur-sm rounded-full px-6 py-4 flex items-center justify-between shadow-xl">

          <House
            className="text-white hover:text-[#F2B6BE] hover:scale-110 duration-300"
            size={22}
          />

          <Box
            className="text-white hover:text-[#F2B6BE] hover:scale-110 duration-300"
            size={22}
          />

          <CircleAlert
            className="text-white hover:text-[#F2B6BE] hover:scale-110 duration-300"
            size={22}
          />

          <Bell
            className="text-white hover:text-[#F2B6BE] hover:scale-110 duration-300"
            size={22}
          />

          <User
            className="text-white hover:text-[#F2B6BE] hover:scale-110 duration-300"
            size={22}
          />
        </div>
      </div>
    </>
  );
}