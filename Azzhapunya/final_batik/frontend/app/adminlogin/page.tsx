"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

export default function SignInPage() {

  const router = useRouter()
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [errors, setErrors] = useState({})

  const handleMasuk = () => {
    const err = {}

    if (!user.trim()) err.user = "Username wajib diisi"
    if (!pass.trim()) err.pass = "Password wajib diisi"

    setErrors(err)

    if (Object.keys(err).length === 0) {

      // LOGIN KHUSUS ADMIN
      if (user === "admin" && pass === "admin123") {
        router.push("/admin")

      } else {
        alert("Username atau password salah!")
      }
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center font-sans"
      style={{
        background:
          "radial-gradient(ellipse at center, #e8c99a 0%, #d4a96a 100%)",
      }}
    >

      {/* Card */}
      <div className="bg-[#f5efe6] rounded-2xl shadow-xl px-10 py-10 w-full max-w-sm flex flex-col items-center">

        {/* Logo */}
        <Image
          src="/aset/lagii.png"
          alt="logo"
          width={200}
          height={200}
          className="object-contain mb-4"
        />

        {/* Judul */}
        <h1 className="text-2xl font-serif font-bold text-gray-800 mb-1">
          Sign In
        </h1>

        <p className="text-sm text-gray-500 text-center mb-6">
          Selamat datang jangan lupa
          <br />
          masukan datanya ya!
        </p>

        {/* Input User */}
        <div className="w-full mb-3">
          <input
            type="text"
            placeholder="User :"
            value={user}
            onChange={(e) => {
              setUser(e.target.value)
              setErrors({ ...errors, user: "" })
            }}
            className={`w-full border rounded-full px-4 py-2.5 text-sm outline-none bg-transparent
            ${errors.user
                ? "border-red-400"
                : "border-[#b5845a] focus:border-[#7b1d1d]"
              }`}
          />

          {errors.user && (
            <p className="text-red-500 text-xs mt-1 pl-2">
              ⚠ {errors.user}
            </p>
          )}
        </div>

        {/* Input Password */}
        <div className="w-full mb-2">
          <div className="relative">

            <input
              type={showPass ? "text" : "password"}
              placeholder="Password :"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value)
                setErrors({ ...errors, pass: "" })
              }}
              className={`w-full border rounded-full px-4 py-2.5 text-sm outline-none bg-transparent pr-10
              ${errors.pass
                  ? "border-red-400"
                  : "border-[#b5845a] focus:border-[#7b1d1d]"
                }`}
            />

            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>

          </div>

          {errors.pass && (
            <p className="text-red-500 text-xs mt-1 pl-2">
              ⚠ {errors.pass}
            </p>
          )}
        </div>

        {/* Lupa Password */}
        <div className="w-full flex justify-end mb-5">
          <a
            href="#"
            className="text-xs text-[#b5845a] hover:underline"
          >
            Lupa Kata Sandi ?
          </a>
        </div>

        {/* Tombol Masuk */}
        <button
          onClick={() => router.push("/admindash")}
          className="w-full bg-[#c8956c] hover:bg-[#b5845a] text-white font-bold py-2.5 rounded-full text-sm transition-colors shadow"
        >
          Masuk
        </button>

      </div>
    </div>
  )
}