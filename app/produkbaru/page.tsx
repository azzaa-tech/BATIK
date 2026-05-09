import React from 'react'
import Link from "next/link"

export default function page() {
    return (
        <div>

            {/* PRODUK */}
            <div className="px-4 py-10">

                <h2 className="text-center text-[#7b1d1d] font-bold mb-5 text-2xl">
                    Produk Unggulan
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                    {[
                        {
                            nama: "Batik Lontara",
                            harga: "Rp 185.000",
                            img: "/aset/produk.png",
                        },
                        {
                            nama: "Batik Pria",
                            harga: "Rp 220.000",
                            img: "/aset/halut.png",
                        },
                        {
                            nama: "Syal Batik",
                            harga: "Rp 90.000",
                            img: "/aset/halu2.jpg",
                        },
                        {
                            nama: "Tas Batik",
                            harga: "Rp 150.000",
                            img: "/aset/produk.png",
                        },
                    ].map((produk, i) => (

                        <Link href="/detail" key={i}>

                            <div
                                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-105 duration-300 transition cursor-pointer"
                            >

                                <img
                                    src={produk.img}
                                    alt={produk.nama}
                                    className="w-full h-36 object-cover"
                                />

                                <div className="p-3">

                                    <h3 className="font-semibold text-sm">
                                        {produk.nama}
                                    </h3>

                                    <p className="text-[#7b1d1d] font-bold text-sm mt-1">
                                        {produk.harga}
                                    </p>

                                    <a href='/app/cart'>
                                        <button className="w-full mt-3 bg-[#7b1d1d] text-white py-2 rounded-lg text-sm hover:bg-[#5c1414] transition">
                                            + Keranjang
                                        </button>
                                    </a>


                                </div>
                            </div>

                        </Link>
                    ))}

                </div>
            </div>
        </div>
    )
}