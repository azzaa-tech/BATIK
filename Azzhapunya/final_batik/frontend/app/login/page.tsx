"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from "next/navigation"
import { apiRequest, setAuthSession } from "@/lib/api"

export default function Page() {

    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {

        if (email === "" || password === "") {
            alert("Please enter email and password first!")
            return
        }

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
    }
    const router = useRouter()

    return (
        <div className="w-full h-screen bg-amber-50">
            <div className="flex items-center justify-center h-full px-4">
                <div className="w-full max-w-md bg-[#EAD7C0] rounded-2xl shadow-xl p-8">

                    {/* Header */}
                    <p className="text-sm text-gray-600 mb-2">Welcome to Lorem</p>
                    <h1 className="text-3xl font-bold mb-6">Sign in</h1>

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
                            className="w-full mt-2 px-4 py-2 rounded-md border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                    </div>

                    {/* Input Password */}
                    <div className="mb-2">
                        <label className="text-sm text-gray-700">
                            Enter your Password
                        </label>

                        <div className="relative mt-2">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
                            />
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex justify-between text-sm mt-2 mb-6">
                        <p>
                            No Account?{" "}
                            <span
                                className="text-orange-500 cursor-pointer hover:underline"
                                onClick={() => router.push("/admindash")}
                            >
                                Sign up
                            </span>
                        </p>

                        <span
                            className="text-orange-500 cursor-pointer hover:underline"
                            onClick={() => router.push("/forgot-password")}
                        >
                            Forgot Password
                        </span>
                    </div>
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

                </div>
            </div>
        </div>
    )
}
