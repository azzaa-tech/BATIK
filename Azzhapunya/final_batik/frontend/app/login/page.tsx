"use client"

import React, { useState } from 'react'
import { useRouter } from "next/navigation"
<<<<<<< HEAD
import { apiRequest, setAuthSession } from "@/lib/api"
=======
import { AlertCircle, X } from "lucide-react"
>>>>>>> cbcca701ce283e0e67e94b56139fc102a1fd170b

export default function Page() {

    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
<<<<<<< HEAD
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {

=======
    const [toast, setToast] = useState(false)

    const showToast = () => {
        setToast(true)
        setTimeout(() => setToast(false), 3500)
    }

    const handleLogin = () => {
>>>>>>> cbcca701ce283e0e67e94b56139fc102a1fd170b
        if (email === "" || password === "") {
            showToast()
            return
        }
<<<<<<< HEAD

        try {
            setLoading(true)
            const response = await apiRequest<{
                token: string
                user: { id: number; nama: string; email: string; role: string }
            }>("/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            })

            if (response.data) {
                setAuthSession(response.data.token, response.data.user)
            }

            router.push("/hal1")
        } catch (error) {
            alert(error instanceof Error ? error.message : "Login gagal")
        } finally {
            setLoading(false)
        }
=======
        window.location.href = "/hal1"
>>>>>>> cbcca701ce283e0e67e94b56139fc102a1fd170b
    }

    const router = useRouter()

    return (
        <div className="w-full h-screen bg-amber-50">

            {/* Toast Notification */}
            <div
                className={`
                    fixed top-5 left-1/2 -translate-x-1/2 z-50
                    flex items-center gap-3
                    bg-white border border-red-100
                    shadow-xl rounded-2xl
                    px-4 py-3 min-w-[280px] max-w-xs
                    transition-all duration-300
                    ${toast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
                `}
            >
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <AlertCircle size={16} className="text-red-500" />
                </div>
                <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">Isi semua kolom dulu</p>
                    <p className="text-xs text-gray-400 mt-0.5">Email dan password tidak boleh kosong.</p>
                </div>
                <button
                    onClick={() => setToast(false)}
                    className="text-gray-300 hover:text-gray-500 transition-colors flex-shrink-0"
                >
                    <X size={15} />
                </button>
            </div>

            <div className="flex items-center justify-center h-full px-4">
                <div className="w-full max-w-md">

                    {/* Card */}
                    <div className="bg-[#EAD7C0] rounded-2xl shadow-xl p-8">
                        <div className="flex flex-col items-center mb-6">
                            <img
                                src="/aset/asli.png"
                                alt="logo"
                                className="w-25 h-25 object-contain"
                            />
                            <h2 className="text-2xl font-bold text-amber-950 mt-4">Jangan lupa untuk login!</h2>
                        </div>

                        {/* Input Email */}
                        <div className="mb-4">
                            <label className="text-sm text-gray-700">
                                Enter your username or email address
                            </label>
                            <input
                                type="text"
                                placeholder="Username or email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full mt-2 px-4 py-2 rounded-md border border-[#7b1d1d] focus:outline-none focus:ring-2 focus:ring-orange-300"
                            />
                        </div>

                        {/* Input Password */}
                        <div className="mb-4">
                            <label className="text-sm text-gray-700">
                                Enter your Password
                            </label>
                            <div className="relative mt-2">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 rounded-md border border-[#7b1d1d] focus:outline-none focus:ring-2 focus:ring-orange-300"
                                />
                            </div>
                        </div>

                        {/* Button */}
                        <button
                            onClick={handleLogin}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold shadow-md transition"
                        >
                            Sign in
                        </button>

                        {/* Divider */}
                        <div className="flex items-center my-6">
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <p className="px-3 text-gray-400 text-sm">Or</p>
                            <div className="flex-1 h-px bg-gray-300"></div>
                        </div>

                        {/* Google Button */}
                        <button className="w-full bg-white py-2 rounded-lg shadow flex items-center justify-center gap-2 hover:bg-gray-100 transition">
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="google"
                                className="w-5 h-5"
                            />
                            <span className="text-sm text-gray-700">
                                Sign in with Google
                            </span>
                        </button>

                    </div>
<<<<<<< HEAD
                    {/* Button */}
                    <button
                        onClick={handleLogin}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold shadow-md transition"
                    >
                        {loading ? "Memproses..." : "Sign in"}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-1 h-px bg-gray-300"></div>
                        <p className="px-3 text-gray-400 text-sm">Or</p>
                        <div className="flex-1 h-px bg-gray-300"></div>
                    </div>

                    {/* Google Button */}
                    <button className="w-full bg-white py-2 rounded-lg shadow flex items-center justify-center gap-2 hover:bg-gray-100 transition">
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="google"
                            className="w-5 h-5"
                        />

                        <span className="text-sm text-gray-700">
                            Sign in with Google
                        </span>
                    </button>

=======
>>>>>>> cbcca701ce283e0e67e94b56139fc102a1fd170b
                </div>
            </div>
        </div>
    )
}
