const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User ID is required"],
  },
  studentId: {
    type: String,
    required: [true, "Student ID is required"],
    minlength: [5, "Student ID must be at least 5 characters long"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
  },
  branch: {
    type: String,
    required: [true, "Branch is required"],
  },
  academicYear: {
    type: String,
    required: [true, "Academic year is required"],
  },
  studentMobile: {
    type: Number,
    required: [true, "Student mobile number is required"],
    match: [/^\d{10}$/, "Student mobile number must be 10 digits"],
  },
  parentMobile: {
    type: Number,
    required: [true, "Parent mobile number is required"],
    match: [/^\d{10}$/, "Parent mobile number must be 10 digits"],
  },
  destination: {
    type: String,
    required: [true, "Destination is required"],
  },
  busFare: {
    type: Number,
    required: [true, "Bus fare is required"],
    min: [1, "Bus fare must be a positive value"],
  },
  bookingDate: {
    type: String,
    required: [true, "Booking date is required"],
  },
  bookingUpdateDate: {
    type: String,
  },
  paymentId: {
    type: String,
    // required: [true, "Payment ID is required"],
  },
  payerId: {
    type: String,
    // required: [true, "Payer ID is required"],
  },
  paymentMethod: {
    type: String,
    // required: [true, "Payment method is required"],
    // enum: ["Card", "UPI", "NetBanking", "Wallet"], // Allowing only these payment methods
  },
  paymentStatus: {
    type: String,
    // required: [true, "Payment status is required"],
    // enum: ["Pending", "Completed", "Failed"], // Restricting to these status options
  },
}, { timestamps: true });

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
