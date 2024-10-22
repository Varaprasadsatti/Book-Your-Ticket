const express = require("express")

const {getBookingDetails,editBookingDetails,deleteBooking,getAllBookings} = require("../../controllers/admin/booking-controller")

const router = express.Router();

router.get("/details/:id",getBookingDetails);
router.put("/edit/:id",editBookingDetails);
router.delete("/delete/:id",deleteBooking);
router.get("/all",getAllBookings);

module.exports = router;