require("dotenv").config();

const bcrypt = require("bcryptjs");
const prisma = require("../utils/prisma");

const seed = async () => {
  const password = await bcrypt.hash(process.env.ADMIN_PASSWORD || "admin123", 10);

  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@batik.test" },
    update: { role: "admin" },
    create: {
      nama: "Admin Batik",
      email: process.env.ADMIN_EMAIL || "admin@batik.test",
      password,
      role: "admin",
    },
  });

  await prisma.promoCode.upsert({
    where: { kode: "BATIK10" },
    update: { diskon: 0.1, aktif: true },
    create: { kode: "BATIK10", diskon: 0.1, aktif: true },
  });

  await prisma.promoCode.upsert({
    where: { kode: "LONTARA" },
    update: { diskon: 0.15, aktif: true },
    create: { kode: "LONTARA", diskon: 0.15, aktif: true },
  });

  await prisma.product.upsert({
    where: { id: 1 },
    update: {},
    create: {
      nama: "Blouse Batik 01",
      deskripsi: "Batik premium khas Sulawesi Selatan dengan desain elegan.",
      harga: 185000,
      stok: 50,
      kategori: "Wanita",
      gambar: "/aset/produk.png",
    },
  });

  console.log("Seed selesai. Admin:", process.env.ADMIN_EMAIL || "admin@batik.test");
};

seed()
  .catch((error) => {
    console.error("Seed gagal", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
