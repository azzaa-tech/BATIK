import Nav from "../nav/page"

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white px-8 py-12 font-sans">
      <div className="max-w-5xl mx-auto flex flex-wrap gap-10">

        {/* CONTACT INFO */}
        <div className="flex-1 min-w-[220px]">
          <h3 className="font-bold text-sm tracking-widest mb-5">CONTACT INFO</h3>

          <div className="space-y-4 text-sm text-gray-400">
            <div>
              <p className="font-bold text-white text-xs mb-1">ADDRESS:</p>
              <p>Jl. Batik Lontara No. 12,<br />Makassar, Sulawesi Selatan</p>
            </div>
            <div>
              <p className="font-bold text-white text-xs mb-1">PHONE:</p>
              <p>+62 812-3456-7890</p>
            </div>
            <div>
              <p className="font-bold text-white text-xs mb-1">EMAIL:</p>
              <p>galleribatiklontara@gmail.com</p>
            </div>
          </div>

          <div className="border-l-2 border-gray-600 pl-3 mt-6">
            <p className="text-xs text-gray-500 leading-relaxed">
              Layanan Pengaduan Konsumen dapat menghubungi kami melalui WhatsApp atau email di atas.
            </p>
          </div>

          <div className="flex gap-3 mt-6">
            {[{ label: "f", href: "#" }, { label: "in", href: "#" }, { label: "ig", href: "#" }, { label: "yt", href: "#" }].map((s, i) => (
              <a key={i} href={s.href}
                className="w-8 h-8 rounded border border-gray-600 flex items-center justify-center text-xs text-gray-400 hover:border-yellow-500 hover:text-yellow-500 transition-colors">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* PEMBAYARAN */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="font-bold text-sm tracking-widest mb-5">PEMBAYARAN</h3>
          <div className="grid grid-cols-2 gap-3">
            {["BCA", "Mandiri", "BNI", "BRI", "QRIS", "Transfer"].map((bank, i) => (
              <div key={i}
                className="bg-[#2a2a2a] border border-gray-700 rounded-lg px-4 py-3 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-300">{bank}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PENGIRIMAN */}
        <div className="flex-1 min-w-[160px]">
          <h3 className="font-bold text-sm tracking-widest mb-5">PENGIRIMAN</h3>
          <div className="flex flex-col gap-3">
            {["JNE", "J&T", "SiCepat", "Pos Indonesia"].map((kurir, i) => (
              <div key={i}
                className="bg-[#2a2a2a] border border-gray-700 rounded-lg px-4 py-3 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-300">{kurir}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* MAP */}
      <div className="relative w-full h-[250px] mt-10">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-yellow-900 h-56">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63479.53823953538!2d119.37903!3d-5.14701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbee308f2a0e0d1%3A0x4a5cb5a2ef7a6e71!2sMakassar%2C%20Sulawesi%20Selatan!5e0!3m2!1sid!2sid!4v1680000000000!5m2!1sid!2sid"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-5xl mx-auto border-t border-gray-700 mt-5 pt-5 text-xs text-gray-500 text-center">
        © 2025 Galleri Batik Lontara · Makassar, Sulawesi Selatan · All rights reserved
      </div>
    </footer>
  );
}