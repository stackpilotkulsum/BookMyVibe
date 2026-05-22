const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: String,
  date: String,
  price: Number
});

module.exports = mongoose.model("Event", eventSchema);
