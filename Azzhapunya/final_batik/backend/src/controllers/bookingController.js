const { validationResult } = require("express-validator");
const prisma = require("../utils/prisma");

const createBooking = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validasi gagal",
        errors: errors.array(),
      });
    }

    const { nama, anggota, tanggal, noWa, email } = req.body;
    console.log("[BOOKING CREATE]", { nama, anggota, tanggal, noWa, email });
    const booking = await prisma.booking.create({
      data: {
        userId: req.user ? req.user.id : null,
        nama,
        anggota: Number(anggota),
        tanggal: new Date(tanggal),
        noWa,
        email,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Booking berhasil dibuat",
      data: booking,
    });
  } catch (error) {
    return next(error);
  }
};

const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({
      success: true,
      message: "Booking berhasil diambil",
      data: bookings,
    });
  } catch (error) {
    return next(error);
  }
};

const getAllBookings = async (req, res, next) => {
  try {
    const { status } = req.query;
    const bookings = await prisma.booking.findMany({
      where: status ? { status } : {},
      include: {
        user: {
          select: {
            id: true,
            nama: true,
            email: true,
            noWa: true,
            role: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({
      success: true,
      message: "Semua booking berhasil diambil",
      data: bookings,
    });
  } catch (error) {
    return next(error);
  }
};

const updateBookingStatus = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validasi gagal",
        errors: errors.array(),
      });
    }

    const booking = await prisma.booking.update({
      where: { id: Number(req.params.id) },
      data: { status: req.body.status },
    });

    return res.status(200).json({
      success: true,
      message: "Status booking berhasil diperbarui",
      data: booking,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
};
