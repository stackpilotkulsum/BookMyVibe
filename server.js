require("dotenv").config();
// console.log("MONGO_URI =", process.env.MONGO_URI);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// ----------- MODELS -----------

// USER MODEL
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "user",
  },
});

const User = mongoose.model("User", UserSchema);

// BOOKING MODEL
const BookingSchema = new mongoose.Schema({
  eventName: String,
  date: String,
  seat: String,
  userEmail: String,
});

const Booking = mongoose.model("Booking", BookingSchema);

// ----------- ALLOWED EVENTS (IMPORTANT) -----------

const allowedEvents = [
  "Music Night",
  "Tech Conference",
  "Comedy Show",
  "Drama Theatre",
  "Food Festival",
  "Sports Match",
  "Startup Meetup",
  "Movie Premiere"
];

// ----------- USER REGISTER API -----------

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const existing = await User.findOne({ email });

    if (existing) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    const newUser = new User({
      name,
      email,
      password,
      role: "user",
    });

    await newUser.save();

    res.json({
      success: true,
      message: "Registration successful",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// ----------- USER LOGIN API -----------

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    if (user.password !== password) {
      return res.json({
        success: false,
        message: "Invalid password",
      });
    }

    res.json({
      success: true,
      token: "dummy-token",
      role: user.role || "user",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
// ----------- FORGOT PASSWORD -----------

app.post("/forgot-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.json({
        success: false,
        message: "Email and new password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    user.password = newPassword; 
    await user.save();

    res.json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


// ----------- ADMIN LOGIN -----------

app.post("/adminlogin", async (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@example.com" && password === "admin123") {
    res.json({
      success: true,
      message: "Admin Login Successful",
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid Admin Credentials",
    });
  }
});

// ----------- BOOK TICKET -----------

app.post("/book", async (req, res) => {
  try {
    const { userEmail, eventName, seat, date } = req.body;

    if (!userEmail || !eventName || !seat || !date) {
      return res.json({
        success: false,
        message: "Missing required fields",
      });
    }

    //  BLOCK FAKE EVENTS
    if (!allowedEvents.includes(eventName)) {
      return res.json({
        success: false,
        message: "Invalid event selected",
      });
    }

    //  Prevent double booking (same event + seat + date)
    const existing = await Booking.findOne({ eventName, seat, date });
    if (existing) {
      return res.json({
        success: false,
        message: "Seat already booked for this event & date",
      });
    }

    const booking = new Booking({
      userEmail,
      eventName,
      seat,
      date,
    });

    await booking.save();

    res.json({
      success: true,
      message: "Ticket Booked Successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// ----------- GET MY BOOKINGS -----------

app.get("/mybookings", async (req, res) => {
  try {
    const email = req.query.email;

    if (!email) {
      return res.json([]);
    }

    const bookings = await Booking.find({
      userEmail: email,
    });

    res.json(bookings);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ----------- GET ALL BOOKINGS (ADMIN) -----------

app.get("/allbookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ----------- CHECK SEATS -----------

app.get("/seats", async (req, res) => {
  try {
    const { eventName, date } = req.query;

    const bookings = await Booking.find({ eventName, date });
    const seats = bookings.map((b) => b.seat);

    res.json(seats);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ----------- TEST ROUTE -----------

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// ----------- CANCEL BOOKING -----------

app.delete("/cancelbooking/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Booking.findByIdAndDelete(id);

    if (!deleted) {
      return res.json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      message: "Booking cancelled successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
