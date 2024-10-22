const mongoose = require("mongoose");

const BusSchema = new mongoose.Schema({
  busType: String,
  capacity: Number,
  startPoint: String,
  endPoint: String,
  busFare: Number,
},{timestamps:true});

const Bus = mongoose.model("Bus", BusSchema);
module.exports = Bus;