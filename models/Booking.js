const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userEmail: String,
  eventName: String,
  seat: String,
  date: String
});

module.exports = mongoose.model("Booking", bookingSchema);
