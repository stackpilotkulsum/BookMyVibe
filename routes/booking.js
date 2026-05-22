const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router();

// BOOK TICKET (called from Payment page)
router.post("/book", async (req, res) => {
  try {
    const { userEmail, eventName, seat, date } = req.body;

    if (!userEmail || !eventName || !seat) {
      return res.json({
        success: false,
        message: "Missing required fields"
      });
    }

    // Prevent double booking (same event + seat + date)
    const existing = await Booking.findOne({ eventName, seat, date });
    if (existing) {
      return res.json({
        success: false,
        message: "Seat already booked for this event & date"
      });
    }

    const booking = new Booking({
      userEmail,
      eventName,
      seat,
      date
    });

    await booking.save();

    // ✅ Send JSON, React will handle navigation
    res.json({
      success: true,
      message: "Booking successful"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Booking failed"
    });
  }
});

// FETCH BOOKINGS FOR A SPECIFIC USER
router.get("/mybookings", async (req, res) => {
  try {
    const email = req.query.email;

    if (!email) {
      return res.json([]);
    }

    const bookings = await Booking.find({ userEmail: email });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to load bookings"
    });
  }
});

// GET BOOKED SEATS FOR AN EVENT + DATE
router.get("/seats", async (req, res) => {
  try {
    const { eventName, date } = req.query;

    const bookings = await Booking.find({ eventName, date });
    const seats = bookings.map(b => b.seat);

    res.json(seats);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to load seats"
    });
  }
});

// GET ALL BOOKINGS (ADMIN)
router.get("/allbookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings); // return array directly (React expects this)
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to load all bookings"
    });
  }
});

module.exports = router;
