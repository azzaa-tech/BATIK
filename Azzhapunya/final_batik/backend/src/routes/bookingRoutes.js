const express = require("express")
const { body } = require("express-validator")

const {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
} = require("../controllers/bookingController")

const {
  authMiddleware,
  adminMiddleware,
  optionalAuthMiddleware,
} = require("../middleware/authMiddleware")

const router = express.Router()

const bookingValidation = [
  body("nama")
    .notEmpty()
    .withMessage("Nama wajib diisi"),

  body("anggota")
    .isInt({ min: 3 })
    .withMessage(
      "Minimal peserta adalah 3 orang"
    ),

  body("tanggal")
    .isDate()
    .withMessage("Tanggal tidak valid"),

  body("noWa")
    .isMobilePhone("any")
    .withMessage(
      "Nomor WhatsApp tidak valid"
    ),

  body("email")
    .isEmail()
    .withMessage("Email tidak valid"),
]

/*
|--------------------------------------------------------------------------
| USER
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  optionalAuthMiddleware,
  bookingValidation,
  createBooking
)

router.get(
  "/my",
  authMiddleware,
  getMyBookings
)

/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/

router.get(
  "/admin",
  authMiddleware,
  adminMiddleware,
  getAllBookings
)

router.put(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  [
    body("status")
      .isIn([
        "pending",
        "confirmed",
        "cancelled",
      ])
      .withMessage("Status tidak valid"),
  ],
  updateBookingStatus
)

module.exports = router