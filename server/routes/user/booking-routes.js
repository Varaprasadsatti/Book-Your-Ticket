const express = require("express")

const {createBooking,getAllBookingsByUser,getBookingDetails} = require("../../controllers/user/booking-controller")

const router = express.Router();

router.post("/create",createBooking);
router.get("/list/:userId",getAllBookingsByUser);
router.get("/details/:id",getBookingDetails);
// router.post("/order",createOrder);

module.exports = router;